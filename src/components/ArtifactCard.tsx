import React from "react";
import { Landmark, Calendar, MapPin, Info } from "lucide-react";
import { Artifact } from "../data/artifacts";

interface ArtifactCardProps {
  artifact: Artifact;
}

export default function ArtifactCard({ artifact }: ArtifactCardProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-orange-900/30 to-yellow-900/30 rounded-2xl blur-xl opacity-30" />
      <div className="relative bg-gradient-to-br from-slate-900/95 via-amber-900/10 to-slate-900/95 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="flex items-center gap-3 mb-4">
          <Landmark className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-semibold text-white">历史文物</h2>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-4 aspect-square border border-amber-500/20">
          <img
            src={artifact.imageUrl}
            alt={artifact.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-xl font-bold text-white">{artifact.name}</h3>
            <p className="text-amber-400 text-sm">{artifact.era}</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-3 border border-amber-500/20">
            <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-gray-400 block">发现日期</span>
              <span className="text-white">{artifact.discoveryDate}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-3 border border-amber-500/20">
            <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-gray-400 block">出土地点</span>
              <span className="text-white">{artifact.location}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-400">文物介绍</span>
          </div>
          <p className="text-white text-sm leading-relaxed">{artifact.description}</p>
        </div>
      </div>
    </div>
  );
}
