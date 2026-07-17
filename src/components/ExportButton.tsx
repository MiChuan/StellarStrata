import React, { useState } from "react";
import { Download, Loader2, Check } from "lucide-react";
import html2canvas from "html2canvas";

interface ExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportButton({ targetRef }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isExported, setIsExported] = useState(false);

  const handleExport = async () => {
    if (!targetRef.current) return;

    setIsExporting(true);
    setIsExported(false);

    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2,
        backgroundColor: "#0f172a",
        useCORS: true,
        imageTimeout: 15000,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `stellarstrata-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setIsExported(true);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
      setTimeout(() => setIsExported(false), 3000);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
        isExported
          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
          : "bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isExporting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>导出中...</span>
        </>
      ) : isExported ? (
        <>
          <Check className="w-5 h-5" />
          <span>导出成功</span>
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          <span>导出为图片</span>
        </>
      )}
    </button>
  );
}
