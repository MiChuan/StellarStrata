import { useState } from "react";
import { Download, Loader2, Check, AlertTriangle } from "lucide-react";

interface ExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

/** 等待容器内所有图片解码完成，避免导出图出现空白图片位 */
async function waitForImages(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map((img) =>
      img.complete && img.naturalWidth > 0
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
    ),
  );
}

export default function ExportButton({ targetRef }: ExportButtonProps) {
  const [status, setStatus] = useState<"idle" | "exporting" | "done" | "error">("idle");

  const handleExport = async () => {
    const target = targetRef.current;
    if (!target || status === "exporting") return;

    setStatus("exporting");

    try {
      await waitForImages(target);
      // html2canvas 体积较大，点导出时才加载
      const { default: html2canvas } = await import("html2canvas");

      const canvas = await html2canvas(target, {
        scale: Math.min(2, Math.max(1, 2400 / target.offsetWidth)),
        backgroundColor: "#05070f",
        useCORS: true,
        allowTaint: false,
        imageTimeout: 15000,
        logging: false,
        windowWidth: document.documentElement.scrollWidth,
        onclone: (doc) => {
          // 截图时冻结动画，防止渐变位置抖动
          doc.querySelectorAll("*").forEach((el) => {
            (el as HTMLElement).style.animation = "none";
          });
        },
      });

      const link = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10);
      link.download = `stellarstrata-${stamp}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setStatus("done");
      window.setTimeout(() => setStatus("idle"), 2500);
    } catch (error) {
      console.error("导出失败:", error);
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const label =
    status === "exporting"
      ? "导出中..."
      : status === "done"
        ? "已保存到下载目录"
        : status === "error"
          ? "导出失败，请重试"
          : "导出为图片";

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={status === "exporting"}
      className={`inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 ${
        status === "done"
          ? "bg-emerald-600 text-white"
          : status === "error"
            ? "bg-rose-600 text-white"
            : "bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.03]"
      } disabled:opacity-60 disabled:cursor-wait disabled:hover:scale-100`}
    >
      {status === "exporting" ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{label}</span>
        </>
      ) : status === "done" ? (
        <>
          <Check className="w-5 h-5" />
          <span>{label}</span>
        </>
      ) : status === "error" ? (
        <>
          <AlertTriangle className="w-5 h-5" />
          <span>{label}</span>
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
