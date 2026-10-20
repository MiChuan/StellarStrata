import { useEffect, useState } from "react";
import { Shader, Nebula, FloatingParticles, Aurora, Vignette, FilmGrain } from "shaders/react";

/**
 * 全屏动态星空背景。
 *
 * 用 shaders.com 的 WebGPU 组件渲染：深空星云 + 漂浮星尘 + 顶部极光，
 * 再叠一层暗角与胶片颗粒压住氛围。整层绝对定位铺满视口，内容用更高的
 * z-index 浮在上面。
 *
 * 兼容性：WebGPU 不可用时（旧浏览器 / 禁用 GPU）自动降级回纯 CSS 星空，
 * 页面内容不受影响。
 */
export default function StarryBackground() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    // 不支持的浏览器让 Shader 直接透明，这里也关闭 shader 层以省资源
    if (typeof navigator !== "undefined" && !navigator.gpu) {
      setSupported(false);
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* 兜底：CSS 星点，WebGPU 层未渲染时仍保留星空氛围 */}
      <CssStarField />

      {supported && (
        <Shader
          className="absolute inset-0"
          style={{ position: "absolute", inset: 0 }}
          toneMapping="agx"
          onUnavailable={() => setSupported(false)}
        >
          {/* 中央深空星云：紫/蓝气体，暗一些以免抢走前景可读性 */}
          <Nebula
            center={{ x: 0.28, y: 0.75 }}
            scale={1.3}
            coreColor="#ffd9b0"
            gasColor="#6d4aff"
            veilColor="#1b2a5e"
            density={0.5}
            cavity={0.65}
            billow={0.8}
            gasScale={2.2}
            dust={0.5}
            glow={0.4}
            stars={0.3}
            starScale={0.8}
            twinkle={0.5}
            opacity={0.42}
          />

          {/* 右上角暖色星云，形成冷暖对比 */}
          <Nebula
            center={{ x: 0.88, y: 0.18 }}
            scale={1.1}
            coreColor="#ffe3c0"
            gasColor="#ff5e7a"
            veilColor="#2a2440"
            density={0.4}
            cavity={0.6}
            billow={0.75}
            gasScale={2.0}
            dust={0.4}
            glow={0.35}
            stars={0.25}
            opacity={0.32}
          />

          {/* 漂浮星尘，缓慢上升，让背景始终在呼吸 */}
          <FloatingParticles
            count={90}
            speed={0.35}
            twinkle={0.7}
            particleSize={0.6}
            softness={0.8}
            particleColor="#cdd6ff"
            opacity={0.55}
          />

          {/* 顶部极光帘幕，缓慢摆动 */}
          <Aurora
            center={{ x: 0.5, y: 0 }}
            height={110}
            intensity={26}
            speed={1.2}
            waviness={30}
            colorA="#4c2fa0"
            colorB="#7c3aed"
            colorC="#1694e8"
            opacity={0.28}
          />

          {/* 暗角：把视线引向中央内容 */}
          <Vignette color="#000000" intensity={0.42} falloff={0.95} />

          {/* 轻微胶片颗粒，减少大面积渐变的色带 */}
          <FilmGrain strength={0.12} animated />
        </Shader>
      )}
    </div>
  );
}

/**
 * CSS 兜底星空（与改造前的星点一致，作为 shader 未启用时的后备）。
 * 固定在模块级，避免重渲染导致星点「跳」。
 */
const CSS_STARS = Array.from({ length: 70 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const roll = (offset: number) => ((seed * (offset + 7)) % 1000) / 1000;
  return {
    id: i,
    left: roll(1) * 100,
    top: roll(2) * 100,
    opacity: 0.15 + roll(3) * 0.4,
    size: roll(4) > 0.88 ? 2 : 1,
    delay: roll(5) * 4,
  };
});

function CssStarField() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {CSS_STARS.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
