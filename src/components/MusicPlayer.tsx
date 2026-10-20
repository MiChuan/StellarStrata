import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music, AlertCircle } from "lucide-react";

interface MusicPlayerProps {
  src: string;
  title: string;
  autoPlay?: boolean;
  /** 首页大文件用 none，避免一进来就下载整首曲目 */
  preload?: "none" | "metadata" | "auto";
}

function formatTime(time: number) {
  if (!time || Number.isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({
  src,
  title,
  autoPlay = false,
  preload = "metadata",
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setFailed(true);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    if (autoPlay) {
      // 浏览器可能阻止自动播放：静默失败，等待用户手动点击
      audio.play().catch(() => {});
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      // 卸载时停止播放，避免切换页面后音乐继续响
      audio.pause();
    };
  }, [autoPlay, src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || failed) return;
    if (isPlaying) audio.pause();
    else audio.play().catch(() => setFailed(true));
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const value = Number(event.target.value);
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40 rounded-2xl blur-xl opacity-40" />
      <div className="relative bg-slate-900/90 rounded-2xl px-4 py-3.5 border border-purple-500/30 shadow-2xl">
        <audio ref={audioRef} src={src} preload={preload} loop={false} />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            disabled={failed}
            aria-label={isPlaying ? "暂停" : "播放"}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 disabled:hover:scale-100"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              {failed ? (
                <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              ) : (
                <Music className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              )}
              <span className="text-sm text-white truncate">
                {failed ? "音频加载失败" : title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={progress}
                onChange={handleSeek}
                disabled={failed}
                className="flex-1 h-1 accent-purple-400 cursor-pointer disabled:cursor-not-allowed"
                aria-label="播放进度"
              />
              <span className="text-[11px] text-slate-400 tabular-nums flex-shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "取消静音" : "静音"}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/70 text-slate-300 hover:text-white border border-purple-500/20 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
