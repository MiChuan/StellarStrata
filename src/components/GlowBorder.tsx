import { useEffect, useRef, useState } from "react";
import { Shader, LightEdge } from "shaders/react";
import type { ReactNode } from "react";

interface GlowBorderProps {
  children: ReactNode;
  /** 光边主色（默认紫） */
  colorA?: string;
  /** 光边次色（默认青） */
  colorB?: string;
  /** 光边亮度 0~1 */
  intensity?: number;
  /** 是否让光点流动（动画） */
  animated?: boolean;
  className?: string;
}

/**
 * 发光描边容器：在卡片上叠一层 WebGPU 的 LightEdge 光边，
 * 光斑沿卡片圆角边框流动，给结果页卡片增加「呼吸」的科技感描边。
 *
 * LightEdge 的形状用「画布高度」作单位（画布高度 = 1），
 * 因此这里用 ResizeObserver 测出容器宽高比，动态计算圆角矩形的
 * 半宽/半高/圆角，保证光边始终贴合卡片边框。
 * WebGPU 不可用时自动退化为纯卡片（无光边）。
 */
export default function GlowBorder({
  children,
  colorA = "#8b5cf6",
  colorB = "#22d3ee",
  intensity = 0.55,
  animated = true,
  className,
}: GlowBorderProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof navigator !== "undefined" && !navigator.gpu) setSupported(false);
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setSize({ w: rect.width, h: rect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // LightEdge 形状参数：单位为画布高度（canvas height = 1）
  const { w, h } = size;
  const hasSize = w > 0 && h > 0;
  const shape = hasSize
    ? JSON.stringify({
        type: "roundedRectSDF",
        // 半宽（画布高度单位）= 宽 / (2 × 高)
        radius: Math.max(0.001, w / (2 * h)),
        // 半高 = 0.5（画布高度的一半）
        height: 0.5,
        // 圆角 16px 折算成画布高度单位
        rounding: Math.min(0.05, 16 / h),
      })
    : undefined;

  return (
    <div ref={boxRef} className={`relative ${className ?? ""}`}>
      {/* 内容 */}
      <div className="relative">{children}</div>

      {/* WebGPU 发光描边层：覆盖在内容之上，pointer-events 穿透不挡交互 */}
      {supported && hasSize && shape && (
        <Shader
          className="absolute inset-0 pointer-events-none"
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
          toneMapping="linear"
          onUnavailable={() => setSupported(false)}
        >
          <LightEdge
            shape={shape}
            colorA={colorA}
            colorB={colorB}
            intensity={intensity}
            thickness={0.08}
            softness={0.7}
            bloom={0.4}
            spots={animated ? 3 : 0}
            spotSize={0.4}
            smoke={0.15}
            speed={animated ? 0.7 : 0}
            opacity={0.85}
          />
        </Shader>
      )}
    </div>
  );
}
