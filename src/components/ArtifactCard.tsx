import { useState } from "react";
import { Landmark, Calendar, MapPin, Info, ImageOff } from "lucide-react";
import { Artifact } from "../data/artifacts";

interface ArtifactCardProps {
  artifact: Artifact;
  /** 是否与出生日期同年同日出土 */
  exact?: boolean;
  /** 首屏第一张图立即加载，其余延迟加载 */
  eager?: boolean;
}

export default function ArtifactCard({ artifact, exact = false, eager = false }: ArtifactCardProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative transition-transform duration-500 ease-out hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-orange-900/25 to-yellow-900/20 rounded-2xl blur-xl opacity-30" />
      <div className="relative bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-amber-500/25 shadow-2xl overflow-hidden">

        <div className="relative rounded-xl overflow-hidden mb-4 aspect-[4/3] border border-amber-500/20 bg-slate-950">
          {failed ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-500">
              <ImageOff className="w-8 h-8" />
              <span className="text-xs">图片待补充</span>
            </div>
          ) : (
            <img
              src={artifact.imageUrl}
              alt={`${artifact.name}（${artifact.era}）`}
              width={840}
              height={723}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              onError={() => setFailed(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {artifact.name}
              </h3>
            </div>
            <p className="text-amber-400/90 text-xs sm:text-sm mt-0.5">{artifact.era}</p>
          </div>
          {exact && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-amber-500/90 text-slate-950 text-[11px] font-semibold">
              同日出土
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
          <div className="flex items-start gap-2.5 bg-slate-800/50 rounded-lg p-2.5 border border-amber-500/15">
            <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[11px] text-slate-400 block">发现时间</span>
              <span className="text-sm text-white break-words">{artifact.discoveryDate}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-slate-800/50 rounded-lg p-2.5 border border-amber-500/15">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[11px] text-slate-400 block">出土地点</span>
              <span className="text-sm text-white break-words">{artifact.location}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 rounded-lg p-3 border border-amber-500/15">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-slate-400">文物简介</span>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{artifact.description}</p>
        </div>
      </div>
    </div>
  );
}
