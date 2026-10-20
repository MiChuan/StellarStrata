import { lazy, Suspense, useMemo, useRef, useState } from "react";
import CustomDatePicker from "../components/DatePicker";
import StarChartCard from "../components/StarChartCard";
import ArtifactCard from "../components/ArtifactCard";
import ExportButton from "../components/ExportButton";
import ShareFooter from "../components/ShareFooter";
import MusicPlayer from "../components/MusicPlayer";
import { generateStarChart, StarChart } from "../data/astronomy";
import { getArtifactsForDate, ArtifactMatch } from "../data/artifacts";
import { ArrowLeft, Landmark, Sparkles } from "lucide-react";

// WebGPU 组件库体积较大，按需异步加载，避免拖慢首屏
const StarryBackground = lazy(() => import("../components/StarryBackground"));
const GlowBorder = lazy(() => import("../components/GlowBorder"));

const BASE = import.meta.env.BASE_URL;

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
    <div className="min-h-screen bg-[#05070f] relative overflow-hidden">
      {/* WebGPU 动态星空背景（星云 + 星尘 + 极光），不支持时降级为 CSS 星点 */}
      <Suspense fallback={null}>
        <StarryBackground />
      </Suspense>

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
              <div className="animate-fade-up-stagger" style={{ animationDelay: "0.05s" }}>
                <Suspense fallback={<StarChartCard data={starChart} />}>
                  <GlowBorder colorA="#8b5cf6" colorB="#22d3ee" intensity={0.5}>
                    <StarChartCard data={starChart} />
                  </GlowBorder>
                </Suspense>
              </div>

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
                    <div
                      key={match.artifact.id}
                      className="animate-fade-up-stagger"
                      style={{ animationDelay: `${0.15 + index * 0.12}s` }}
                    >
                      <Suspense fallback={<ArtifactCard artifact={match.artifact} exact={match.exact} eager={index === 0} />}>
                        <GlowBorder colorA="#f59e0b" colorB="#fb7185" intensity={0.45}>
                          <ArtifactCard
                            artifact={match.artifact}
                            exact={match.exact}
                            eager={index === 0}
                          />
                        </GlowBorder>
                      </Suspense>
                    </div>
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
