// frontend/app/components/NavigationView.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Route } from "../types";
import {
  Wind,
  Droplet,
  Award,
  Navigation as NavigationIcon,
  Clock,
  CloudSun,
  ArrowLeft,
  Crosshair,
} from "lucide-react";
import dynamic from "next/dynamic";

const RealMapClient = dynamic(
  () => import("./RealMap").then((m) => m.RealMap),
  { ssr: false }
);

interface NavigationViewProps {
  route: Route;
  onComplete: () => void;
  /** optional – so old code不会报错 */
  onExit?: () => void;
}

const breathNudges = [
  {
    id: 1,
    icon: "🌿",
    text: "Passing a greener segment, try a deep breath in 4s, out 4s.",
    textZh: "路过绿化区，试试 4 秒吸气、4 秒呼气～",
  },
  {
    id: 2,
    icon: "🧘",
    text: "Relax your shoulders and unclench your jaw.",
    textZh: "放松肩膀，下巴不要用力～",
  },
  {
    id: 3,
    icon: "🚶",
    text: "Notice your steps: right, left, right, left.",
    textZh: "感受脚步节奏：右脚、左脚、右脚、左脚～",
  },
];

export const NavigationView: React.FC<NavigationViewProps> = ({
  route,
  onComplete,
  onExit,
}) => {
  const [progress, setProgress] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(route.duration);
  const [remainingDistance, setRemainingDistance] = useState(
    route.distance || 0.8
  );
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentNudge] = useState(0);
  const [hydrationLogged, setHydrationLogged] = useState(false);
  const [recenterToken, setRecenterToken] = useState(0); // 👉 控制地图居中

  const totalDuration = route.duration;
  const startTime = React.useMemo(() => new Date(), []);
  const eta = React.useMemo(() => {
    const t = new Date(startTime);
    t.setMinutes(t.getMinutes() + totalDuration);
    return t;
  }, [startTime, totalDuration]);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const segments =
    route.walkingSegments && route.walkingSegments.length > 0
      ? route.walkingSegments
      : [
        {
          distance: route.distance || 0.8,
          duration: route.duration,
          startPoint: "Start",
          endPoint: "Destination",
          isLastMile: true,
        },
      ];

  useEffect(() => {
    const durationMs = route.duration * 60 * 1000;
    const start = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsed = now - start;
      const fraction = Math.min(elapsed / durationMs, 1);

      setProgress(fraction);
      setRemainingMinutes(Math.max(Math.round(route.duration * (1 - fraction)), 0));
      setRemainingDistance(
        Math.max(
          Number(
            ((route.distance || 0.8) * (1 - fraction)).toFixed(2)
          ),
          0
        )
      );

      let cum = 0;
      const totalDur = segments.reduce((s, seg) => s + seg.duration, 0);
      const target = totalDur * fraction;
      for (let i = 0; i < segments.length; i++) {
        cum += segments[i].duration;
        if (target <= cum) {
          setCurrentSegmentIndex(i);
          break;
        }
      }

      if (fraction < 1) {
        requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [onComplete, route.distance, route.duration, segments]);

  const currentSegment = segments[currentSegmentIndex];
  const isLastSegment = currentSegmentIndex === segments.length - 1;

  const nudge = breathNudges[currentNudge];

  const formatSegmentLabel = () => {
    if (!currentSegment) return "";
    if (isLastSegment && currentSegment.isLastMile) {
      return "Last mile walk / 最后一段步行";
    }
    return `${currentSegment.startPoint} → ${currentSegment.endPoint}`;
  };

  const now = new Date();
  const weather = {
    temp: 29,
    condition: "Partly cloudy",
    aqi: route.aqi,
    aqiLabel: route.aqi <= 50 ? "Good" : route.aqi <= 100 ? "Moderate" : "Unhealthy",
  };

  const formatRemaining = () =>
    `${remainingMinutes} min · ${remainingDistance.toFixed(2)} km walk`;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#E6F7F7] to-white">
      {/* 🔙 Back to home */}
      {onExit && (
        <button
          type="button"
          onClick={onExit}
          className="absolute left-4 top-4 z-30 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs shadow hover:bg-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {/* 顶部：剩余时间 + 当前段信息 */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">Remaining · 剩余</div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-semibold">
                {remainingMinutes} min
              </div>
              <div className="text-sm text-slate-600">
                · {remainingDistance.toFixed(2)} km walk
              </div>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              <span>
                ETA {formatTime(eta)} · 预计到达 {formatTime(eta)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#2C7A7B] px-3 py-1 text-xs text-white">
              <NavigationIcon className="w-4 h-4" />
              <span>
                {isLastSegment ? "Walk segment" : "MRT segment"}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Next: {isLastSegment ? "—" : "Walk / 下一步：Walk"}
            </div>
          </div>
        </div>

        {/* 中间：实时导览提示 */}
        <div className="px-6 pb-4">
          <div className="flex items-start gap-3 rounded-3xl bg-white px-4 py-3 shadow-sm">
            <div className="mt-1 text-lg">〰️</div>
            <div>
              <p className="text-sm">
                {nudge.text} / {nudge.textZh}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Segment: {formatSegmentLabel()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 中间：真正的地图导航区域（使用 RealMap） */}
      <div className="absolute inset-0 pt-28 pb-40 px-6">
        <div className="relative w-full h-full rounded-3xl mx-6 overflow-hidden shadow-inner bg-slate-100">
          <RealMapClient
            selectedRoute={route}
            destinationCoords={route.destinationCoords}
            destinationLabel={route.name}
            recenterToken={recenterToken}
          />

          {/* 🔘 Center map 按钮 */}
          <button
            type="button"
            onClick={() => setRecenterToken((t) => t + 1)}
            className="absolute right-3 bottom-3 z-20 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs shadow hover:bg-white"
          >
            <Crosshair className="w-3 h-3" />
            <span>Center map</span>
          </button>
        </div>
      </div>

      {/* 右下角 Hydration 按钮 */}
      <div className="absolute right-12 bottom-12 text-white">
        <button
          onClick={() => setHydrationLogged(!hydrationLogged)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-[var(--color-secondary)] hover:opacity-90 transition"
        >
          <Droplet className="w-6 h-6" />
        </button>
      </div>

      {/* 底部固定：天气 + 进度总结 */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-gradient-to-t from-white via-white/95 to-transparent">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white shadow-md px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#E6F7F7] p-2">
                <Award className="w-5 h-5 text-[#2C7A7B]" />
              </div>
              <div>
                <div className="text-sm font-medium">
                  {progress < 1
                    ? "Stay with your breath, you’re doing great."
                    : "Arrived mindfully. Nice work!"}
                </div>
                <div className="text-[11px] text-slate-500">
                  {formatRemaining()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <div className="flex items-center gap-1">
                <CloudSun className="w-4 h-4" />
                <span>
                  {weather.temp}°C · {weather.condition}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-4 h-4" />
                <span>
                  AQI {weather.aqi} · {weather.aqiLabel}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Droplet className="w-4 h-4" />
                <span>
                  Hydration: {hydrationLogged ? "✔ logged" : "tap to log"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center text-[11px] text-slate-400">
            Tap an option to adjust your route / 如需调整路线，可选择上方选项
          </div>
        </div>
      </div>
    </div>
  );
};
