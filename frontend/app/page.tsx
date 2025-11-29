"use client";

import React, { useState } from "react";
import { RouteCard } from "./components/RouteCard";
import { NavigationView } from "./components/NavigationView";
import { RerouteModal } from "./components/RerouteModal";
import { ComparisonView } from "./components/ComparisonView";
import {
  mockRoutes,
  mockHealthMetrics,
  mockRerouteOptions,
} from "./data/mockData";
import { Route as RouteType } from "./types";
import {
  Search,
  MapPin,
  Award,
  Menu,
  ArrowLeft,
  GitCompare,
} from "lucide-react";
import dynamic from "next/dynamic";

// ❌ 删掉这一行：import { RealMap } from "./components/RealMap";

// ✅ 改成动态加载
const RealMapClient = dynamic(
  () => import("./components/RealMap").then((m) => m.RealMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 w-full rounded-3xl bg-[var(--color-background)] flex items-center justify-center text-sm text-[var(--color-text-secondary)]">
        Loading map...
      </div>
    ),
  }
);

type AppView = "home" | "route-selection" | "navigation" | "comparison";

export default function App() {
  const [view, setView] = useState<AppView>("home");
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);
  const [destination, setDestination] = useState("");
  const [destinationCoords, setDestinationCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showRerouteModal, setShowRerouteModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState(mockHealthMetrics);

  const resolveDestinationCoords = (name: string) => {
    const key = name.toLowerCase().trim();
    if (key.includes("downtown")) return { lat: 3.1466, lng: 101.7116 };
    if (key.includes("green park")) return { lat: 3.155, lng: 101.713 };
    if (key.includes("riverside")) return { lat: 3.1505, lng: 101.695 };
    // Default: Bukit Bintang area
    return { lat: 3.1466, lng: 101.7116 };
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim()) {
      setDestinationCoords(resolveDestinationCoords(destination));
      setView("route-selection");
      setSelectedRoute(null);
    }
  };

  const handleRouteSelect = (routeId: string) => {
    const route = mockRoutes.find((r) => r.id === routeId);
    if (route) {
      setSelectedRoute(route);
      setDestination(route.name);
      setDestinationCoords(
        route.destinationCoords || resolveDestinationCoords(route.name)
      );
    }
  };

  const handleStartNavigation = () => {
    if (selectedRoute) {
      setView("navigation");
      // Simulate a transit delay after 5 seconds
      setTimeout(() => {
        setShowRerouteModal(true);
      }, 5000);
    }
  };

  const handleNavigationComplete = () => {
    // Update health metrics
    if (selectedRoute) {
      setHealthMetrics((prev) => ({
        ...prev,
        pollutantsAvoided:
          prev.pollutantsAvoided + (selectedRoute.co2Saved || 0),
        zenPoints: prev.zenPoints + 50,
        dailySteps: prev.dailySteps + 500,
      }));
    }
    setView("home");
    setSelectedRoute(null);
    setDestination("");
    setDestinationCoords(null);
  };

  const handleRerouteSelect = (optionId: string) => {
    setShowRerouteModal(false);
    // In a real app, this would update the route
  };

  // Home View
  if (view === "home") {
    return (
      <div className="min-h-screen bg-linear-to-br from-(--color-background) to-[#E6F7F7]">
        {/* Header */}
        <header className="px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-2xl flex items-center justify-center text-white text-xl">
              🧘
            </div>
            <div>
              <h1 className="text-2xl">ZenWay</h1>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Your healthy commute companion
              </p>
            </div>
          </div>
          <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Main Content */}
        <main className="px-6 mt-8">
          {/* Health Stats Card */}
          <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1>Today&apos;s Impact</h1>
              <Award className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl text-[var(--color-primary)] mb-1">
                  {healthMetrics.zenPoints}
                </div>
                <div className="text-xs text-[var(--color-text-secondary)]">
                  Zen Points
                </div>
              </div>
              <div>
                <div className="text-2xl text-[var(--color-primary)] mb-1">
                  {healthMetrics.dailySteps}
                </div>
                <div className="text-xs text-[var(--color-text-secondary)]">
                  Steps
                </div>
              </div>
              <div>
                <div className="text-2xl text-[var(--color-primary)] mb-1">
                  {healthMetrics.pollutantsAvoided}g
                </div>
                <div className="text-xs text-[var(--color-text-secondary)]">
                  CO₂ Saved
                </div>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch}>
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4">
                <Search className="w-5 h-5 text-[var(--color-text-secondary)]" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="flex-1 outline-none text-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white py-4 hover:opacity-90 transition-opacity"
              >
                Find Healthy Routes
              </button>
            </div>
          </form>

          {/* Quick Access */}
          <div className="mt-8">
            <h4 className="mb-4 text-[var(--color-text-secondary)]">
              Recent Destinations
            </h4>
            <div className="space-y-3">
              {["Downtown Office", "Green Park Station", "Riverside Café"].map(
                (place, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDestination(place);
                      setDestinationCoords(resolveDestinationCoords(place));
                      setSelectedRoute(null);
                      setView("route-selection");
                    }}
                    className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-[var(--color-background)] rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div className="flex-1 text-left">
                      <div>{place}</div>
                      <div className="text-xs text-[var(--color-text-secondary)]">
                        25 min · Low crowd
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Route Selection View
  if (view === "route-selection") {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        {/* Header */}
        <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <button
            onClick={() => setView("home")}
            className="w-10 h-10 bg-[var(--color-gray-light)] rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 mx-4">
            <div className="text-sm text-[var(--color-text-secondary)]">To</div>
            <div>{destination}</div>
          </div>
          <button
            onClick={() => setShowComparison(true)}
            className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            <GitCompare className="w-4 h-4" />
            <span className="text-sm">Compare</span>
          </button>
        </header>

        {/* Map */}
        <div className="h-80 p-6">
          <RealMapClient
            selectedRoute={selectedRoute || undefined}
            destinationCoords={
              selectedRoute?.destinationCoords || destinationCoords || undefined
            }
            destinationLabel={destination}
          />
        </div>

        {/* Routes */}
        <div className="px-6 pb-6">
          <h3 className="mb-4">Available Routes</h3>
          <div className="space-y-4">
            {mockRoutes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                onSelect={handleRouteSelect}
                isSelected={selectedRoute?.id === route.id}
              />
            ))}
          </div>

          {/* Start Button */}
          {selectedRoute && (
            <button
              onClick={handleStartNavigation}
              className="w-full mt-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white py-4 rounded-3xl shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Navigation
            </button>
          )}
        </div>

        {/* Comparison Modal */}
        {showComparison && (
          <ComparisonView
            routes={mockRoutes}
            onClose={() => setShowComparison(false)}
          />
        )}
      </div>
    );
  }

  // Navigation View
// 片段示例
if (view === "navigation" && selectedRoute) {
  return (
    <>
      <NavigationView
        route={selectedRoute}
        onComplete={handleNavigationComplete}
        onExit={() => setView("home")}  // 🔙 回到首页
      />
      <RerouteModal
        isOpen={showRerouteModal}
        onClose={() => setShowRerouteModal(false)}
        options={mockRerouteOptions}
        onSelectOption={handleRerouteSelect}
      />
    </>
  );
}


  return null;
}
