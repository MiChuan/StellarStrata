import { Star, Sparkles, Orbit, Moon } from "lucide-react";
import { StarChart, Season } from "../data/astronomy";
import MoonPhaseIcon from "./MoonPhaseIcon";
import springChart from "../assets/starcharts/spring.webp";
import summerChart from "../assets/starcharts/summer.webp";
import autumnChart from "../assets/starcharts/autumn.webp";
import winterChart from "../assets/starcharts/winter.webp";

const seasonCharts: Record<Season, string> = {
  spring: springChart,
  summer: summerChart,
  autumn: autumnChart,
  winter: winterChart,
};

interface StarChartCardProps {
  data: StarChart;
}

export default function StarChartCard({ data }: StarChartCardProps) {
  const chartImage = seasonCharts[data.season];

  return (
    <div className="relative transition-transform duration-500 ease-out hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40 rounded-2xl blur-xl opacity-40" />
      <div className="relative bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-purple-500/30 shadow-2xl overflow-hidden">

        <div className="relative flex items-center gap-3 mb-4">
          <Star className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg sm:text-xl font-semibold text-white">星图</h2>
          <span className="ml-auto text-xs sm:text-sm text-slate-400 tabular-nums">{data.date}</span>
        </div>

        <div className="relative flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* 星图海报 */}
          <div className="relative lg:w-[38%] flex-shrink-0 rounded-xl overflow-hidden border border-purple-500/20 bg-slate-950 self-start">
            <a
              href={chartImage}
              target="_blank"
              rel="noreferrer"
              title="查看大图"
              className="block cursor-zoom-in group"
            >
              <img
                src={chartImage}
                alt={`${data.seasonLabel}季北半球星图`}
                width={1600}
                height={2262}
                className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
                decoding="async"
              />
            </a>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 text-amber-300 text-xs pointer-events-none">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{data.seasonLabel}季星图 · 点击看大图</span>
            </div>
          </div>

          {/* 数据区 */}
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/60 rounded-xl p-3.5 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-1.5">
                  <Star className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-slate-400">黄道十二宫</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white">{data.zodiacSign}</p>
              </div>

              <div className="bg-slate-800/60 rounded-xl p-3.5 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-1.5">
                  <Moon className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-slate-400">月相</span>
                </div>
                <div className="flex items-center gap-2">
                  <MoonPhaseIcon phaseIndex={data.moonPhaseIndex} size={24} />
                  <div className="min-w-0">
                    <p className="text-base sm:text-lg font-bold text-white leading-tight">
                      {data.moonPhase}
                    </p>
                    <p className="text-[11px] text-amber-300/80 leading-tight">
                      亮面 {data.moonIllumination}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Orbit className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-400">行星位置</span>
                <span className="ml-auto text-[11px] text-slate-500">黄经近似值</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {data.planets.map((planet) => (
                  <div
                    key={planet.name}
                    className="bg-slate-800/40 rounded-lg px-2.5 py-2 border border-purple-500/10"
                  >
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="text-white text-sm font-medium">{planet.name}</span>
                      <span className="text-[11px] text-slate-400 tabular-nums">
                        {planet.degree.toFixed(1)}°
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-purple-300">{planet.zodiac}</span>
                      {planet.retrograde && (
                        <span className="text-[10px] px-1 rounded bg-rose-500/15 text-rose-300 border border-rose-500/25">
                          逆
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-slate-400">当晚可见星座</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.visibleConstellations.map((constellation) => (
                  <span
                    key={constellation.name}
                    className="px-2.5 py-1 bg-purple-500/15 rounded-full text-xs sm:text-sm text-white border border-purple-500/20"
                    title={constellation.visibility}
                  >
                    {constellation.name}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
                行星位置按开普勒轨道平均要素估算，误差通常在 1°~2°；月相以朔望月推算；
                星座取北半球傍晚常见亮星座。内容仅供趣味参考。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
