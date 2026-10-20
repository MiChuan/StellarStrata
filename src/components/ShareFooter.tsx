import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

/**
 * 分享页脚：站点二维码 + 网址，导出图片时会一起被截取，
 * 方便他人扫码访问 StellarStrata。
 */
export default function ShareFooter() {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

  useEffect(() => {
    // 运行时拼接站点地址，本地开发与子路径部署都能指向正确位置
    const url = `${window.location.origin}${import.meta.env.BASE_URL}`;
    setSiteUrl(url);

    // 二维码库按需加载，不占用首屏体积
    import("qrcode")
      .then(({ default: QRCode }) =>
        QRCode.toDataURL(url, {
          margin: 1,
          width: 240,
          color: { dark: "#0b1120", light: "#ffffff" },
          errorCorrectionLevel: "M",
        }),
      )
      .then(setQrDataUrl)
      .catch((error) => console.error("生成二维码失败:", error));
  }, []);

  const displayUrl = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="relative flex items-center justify-between gap-4 bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-purple-500/30 shadow-2xl overflow-hidden">

      <div className="relative min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-base sm:text-lg font-bold text-amber-300">StellarStrata</h3>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm">探索你生日那天的星空与历史</p>
        <p className="text-purple-300/90 text-[11px] sm:text-xs mt-1.5">
          扫码开启你的专属星图与文物
        </p>
        {displayUrl && (
          <p className="text-slate-500 text-[11px] mt-0.5 break-all">{displayUrl}</p>
        )}
      </div>

      {qrDataUrl && (
        <div className="relative flex-shrink-0 bg-white p-1.5 rounded-xl">
          <img src={qrDataUrl} alt="站点二维码" width={96} height={96} className="w-20 h-20 sm:w-24 sm:h-24 block" />
        </div>
      )}
    </div>
  );
}
