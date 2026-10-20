interface MoonPhaseIconProps {
  /** 0 新月 → 4 满月 → 7 残月 */
  phaseIndex: number;
  size?: number;
  className?: string;
}

/**
 * 用两段圆弧拼出月相：半圆 + 由 |cos(相位)| 控制的明暗界线椭圆。
 * 纯 SVG 绘制，导出图片时也能正确保留。
 */
export default function MoonPhaseIcon({ phaseIndex, size = 28, className }: MoonPhaseIconProps) {
  const index = ((phaseIndex % 8) + 8) % 8;
  const phase = index / 8;
  const R = 10;
  const lit = index !== 0;
  const rx = Math.abs(Math.cos(2 * Math.PI * phase)) * R;
  // 界线椭圆的弯向决定亮面是「月牙」还是「凸月」
  const sweep = phase % 0.5 < 0.25 ? 0 : 1;
  const isWaxing = phase < 0.5;

  // 亮面从一端的极点绕到另一端，再沿界线椭圆折回
  const limb = isWaxing
    ? `M 0 ${-R} A ${R} ${R} 0 0 1 0 ${R}`
    : `M 0 ${-R} A ${R} ${R} 0 0 0 0 ${R}`;
  const terminator = `A ${rx.toFixed(2)} ${R} 0 0 ${sweep} 0 ${-R}`;

  return (
    <svg
      viewBox="-12 -12 24 24"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="0" cy="0" r={R} fill="#0b1120" stroke="rgba(251,191,36,0.35)" strokeWidth="0.8" />
      {lit && <path d={`${limb} ${terminator} Z`} fill="#fcd34d" />}
      <circle cx="0" cy="0" r={R} fill="none" stroke="rgba(251,191,36,0.45)" strokeWidth="0.8" />
    </svg>
  );
}
