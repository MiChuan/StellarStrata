import React, { useState, useRef } from "react";
import CustomDatePicker from "../components/DatePicker";
import StarChartCard from "../components/StarChartCard";
import ArtifactCard from "../components/ArtifactCard";
import ExportButton from "../components/ExportButton";
import ShareFooter from "../components/ShareFooter";
import MusicPlayer from "../components/MusicPlayer";
import { generateStarChart } from "../data/astronomy";
import { getArtifactsByDate, getRandomArtifacts, Artifact } from "../data/artifacts";
import { StarChart } from "../data/astronomy";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [starChart, setStarChart] = useState<StarChart | null>(null);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsLoading(true);

    setTimeout(() => {
      const chart = generateStarChart(date);
      setStarChart(chart);

      const month = date.getMonth() + 1;
      const day = date.getDate();
      const foundArtifacts = getArtifactsByDate(month, day);
      
      if (foundArtifacts.length > 0) {
        setArtifacts(foundArtifacts);
      } else {
        setArtifacts(getRandomArtifacts(2));
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {!selectedDate && (
          <>
            <div className="flex justify-center mb-8">
              <MusicPlayer src="/music/home.mp3" title="风雨草" />
            </div>
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <CustomDatePicker onDateSelect={handleDateSelect} />
            </div>
          </>
        )}

        {selectedDate && (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => {
                  setSelectedDate(null);
                  setStarChart(null);
                  setArtifacts([]);
                }}
                className="px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white hover:bg-slate-700/50 transition-colors"
              >
                返回选择日期
              </button>
              <div className="text-white text-lg">
                <span className="text-purple-400">出生日期：</span>
                {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
              </div>
            </div>

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Sparkles className="w-16 h-16 text-amber-400 animate-spin" />
                <p className="mt-4 text-white text-lg">正在探索星图与历史...</p>
              </div>
            )}

            {!isLoading && starChart && (
              <div className="w-full max-w-6xl flex justify-center mb-6">
                <MusicPlayer src="/music/card.mp3" title="快睡，天快亮" autoPlay />
              </div>
            )}

            {!isLoading && starChart && (
              <div ref={cardsRef} className="w-full max-w-6xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-4 rounded-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
                  <StarChartCard data={starChart} />
                  <div className="space-y-6">
                    {artifacts.map((artifact) => (
                      <ArtifactCard key={artifact.id} artifact={artifact} />
                    ))}
                  </div>
                </div>
                <ShareFooter />
              </div>
            )}

            {!isLoading && starChart && (
              <div className="flex items-center justify-center mt-8">
                <ExportButton targetRef={cardsRef} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
