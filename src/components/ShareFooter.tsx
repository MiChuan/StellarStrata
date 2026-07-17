import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Sparkles } from "lucide-react";

/**
 * 分享页脚：展示站点二维码与网址，导出图片时一并被截取，
 * 方便他人扫码访问 StellarStrata。
 */
export default function ShareFooter() {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [siteUrl, setSiteUrl] = useState<string>("");

  useEffect(() => {
    // 运行时计算站点地址：本地开发与 GitHub Pages 子路径均可正确指向
    const url = `${window.location.origin}${import.meta.env.BASE_URL}`;
    setSiteUrl(url);

    QRCode.toDataURL(url, {
      margin: 1,
      width: 240,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    })
      .then(setQrDataUrl)
      .catch((err) => console.error("生成二维码失败:", err));
  }, []);

  const displayUrl = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="relative mt-2">
      <div className="relative flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur-md rounded-2xl p-5 border border-purple-500/30 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">
              StellarStrata
            </h3>
          </div>
          <p className="text-gray-400 text-sm">探索你生日那天的星空与历史</p>
          <p className="text-purple-300 text-xs mt-2">扫码开启你的专属星图与文物 ·</p>
          {displayUrl && (
            <p className="text-gray-500 text-xs mt-0.5 break-all">{displayUrl}</p>
          )}
        </div>

        {qrDataUrl && (
          <div className="relative flex-shrink-0 bg-white p-2 rounded-xl">
            <img
              src={qrDataUrl}
              alt="站点二维码"
              className="w-24 h-24"
            />
          </div>
        )}
      </div>
    </div>
  );
}
