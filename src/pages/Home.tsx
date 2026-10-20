import { useMemo, useRef, useState } from "react";
import CustomDatePicker from "../components/DatePicker";
import StarChartCard from "../components/StarChartCard";
import ArtifactCard from "../components/ArtifactCard";
import ExportButton from "../components/ExportButton";
import ShareFooter from "../components/ShareFooter";
import MusicPlayer from "../components/MusicPlayer";
import { generateStarChart, StarChart } from "../data/astronomy";
import { getArtifactsForDate, ArtifactMatch } from "../data/artifacts";
import { ArrowLeft, Landmark, Sparkles } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

/**
 * 星空背景在模块加载时算一次即可。
 * 之前写在 JSX 里用 Math.random()，每次重渲染星星都会重新排布，页面会「跳」。
 */
const STARS = Array.from({ length: 70 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const roll = (offset: number) => ((seed * (offset + 7)) % 1000) / 1000;
  return {
    id: i,
    left: roll(1) * 100,
    top: roll(2) * 100,
    opacity: 0.25 + roll(3) * 0.6,
    size: roll(4) > 0.88 ? 2 : 1,
    delay: roll(5) * 4,
  };
});

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [artifacts, setArtifacts] = useState<ArtifactMatch[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  const starChart: StarChart | null = useMemo(
    () => (selectedDate ? generateStarChart(selectedDate) : null),
    [selectedDate],
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setArtifacts(getArtifactsForDate(date, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedDate(null);
    setArtifacts([]);
  };

  const allExact = artifacts.length > 0 && artifacts.every((item) => item.exact);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 relative overflow-hidden">
      {/* 背景星点 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {STARS.map((star) => (
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

      {/* 星云光晕 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        {!selectedDate && (
          <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-6rem)]">
            <MusicPlayer src={`${BASE}music/home.mp3`} title="风雨草" preload="none" />
            <div className="flex-1 flex flex-col items-center justify-center w-full py-8 sm:py-10">
              <CustomDatePicker onDateSelect={handleDateSelect} />
            </div>
          </div>
        )}

        {selectedDate && starChart && (
          <div className="flex flex-col items-center animate-fade-up">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/70 border border-slate-600/80 rounded-lg text-slate-200 hover:bg-slate-700/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                重新选择
              </button>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/60 border border-purple-500/25 text-slate-200 text-sm sm:text-base">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-purple-300">出生日期</span>
                <span className="text-white tabular-nums">{starChart.date}</span>
              </div>
              <MusicPlayer src={`${BASE}music/card.mp3`} title="快睡，天快亮" autoPlay />
            </div>

            <div
              ref={cardsRef}
              className="w-full max-w-6xl bg-slate-950/80 p-3 sm:p-4 rounded-2xl border border-slate-800/80"
            >
              <StarChartCard data={starChart} />

              <div className="mt-4 sm:mt-5">
                <div className="flex items-center gap-2 px-1 mb-3">
                  <Landmark className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-semibold text-white">出土文物</h2>
                  <span className="ml-auto text-[11px] text-amber-300/80">
                    {allExact ? "与你的生日同日出土" : "出土日期与你的生日最接近"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {artifacts.map((match, index) => (
                    <ArtifactCard
                      key={match.artifact.id}
                      artifact={match.artifact}
                      exact={match.exact}
                      eager={index === 0}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 sm:mt-5">
                <ShareFooter />
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <ExportButton targetRef={cardsRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
