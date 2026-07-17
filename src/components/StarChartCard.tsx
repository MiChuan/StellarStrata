import React from "react";
import { Star, Moon, Sparkles, Orbit } from "lucide-react";
import { StarChart, Season } from "../data/astronomy";
import springChart from "../assets/starcharts/spring.jpg";
import summerChart from "../assets/starcharts/summer.jpg";
import autumnChart from "../assets/starcharts/autumn.jpg";
import winterChart from "../assets/starcharts/winter.jpg";

const seasonCharts: Record<Season, string> = {
  spring: springChart,
  summer: summerChart,
  autumn: autumnChart,
  winter: winterChart
};

interface StarChartCardProps {
  data: StarChart;
}

export default function StarChartCard({ data }: StarChartCardProps) {
  const chartImage = seasonCharts[data.season];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-blue-900/50 rounded-2xl blur-xl opacity-50" />
      <div className="relative bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-semibold text-white">星图</h2>
          <span className="ml-auto text-sm text-gray-400">{data.date}</span>
        </div>

        <div className="relative mb-6 rounded-xl overflow-hidden border border-purple-500/20">
          <img
            src={chartImage}
            alt={`四季星图-${data.seasonLabel}`}
            className="w-full h-auto block"
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-amber-400 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>{data.seasonLabel}季星图</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">黄道十二宫</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.zodiacSign}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-gray-400">月相</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.moonPhase}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Orbit className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">行星位置</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data.planets.slice(0, 6).map((planet, index) => (
              <div
                key={index}
                className="bg-slate-800/30 rounded-lg p-3 border border-purple-500/10 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{planet.name}</span>
                  <span className="text-xs text-purple-400">{planet.position}</span>
                </div>
                <span className="text-xs text-gray-500">{planet.zodiac}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-sm text-gray-400">可见星座</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.visibleConstellations.map((constellation, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm text-white border border-purple-500/20"
              >
                {constellation.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
