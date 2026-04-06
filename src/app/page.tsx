"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CalendarView from "@/components/CalendarView";
import ATMView from "@/components/ATMView";
import WeatherView from "@/components/WeatherView";
import { CalendarIcon, WeatherIcon, ATMIcon } from "@/components/Icons";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"calendar" | "weather" | "atm">("calendar");

  return (
    <div className="flex flex-col-reverse md:flex-row h-screen overflow-hidden bg-bg">
      {/* Bottom tab bar on mobile, sidebar on desktop */}
      <div className="shrink-0 md:hidden border-t border-accent/20 bg-sidebar">
        <nav className="flex">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex-1 py-5 flex items-center justify-center gap-2.5 text-lg font-medium transition-colors duration-150 ${
              activeTab === "calendar"
                ? "text-text-primary border-t-[3px] border-accent"
                : "text-text-secondary"
            }`}
          >
            <CalendarIcon size={32} />
            Calendar
          </button>
          <button
            onClick={() => setActiveTab("weather")}
            className={`flex-1 py-5 flex items-center justify-center gap-2.5 text-lg font-medium transition-colors duration-150 ${
              activeTab === "weather"
                ? "text-text-primary border-t-[3px] border-accent"
                : "text-text-secondary"
            }`}
          >
            <WeatherIcon size={32} />
            Weather
          </button>
          <button
            onClick={() => setActiveTab("atm")}
            className={`flex-1 py-5 flex items-center justify-center gap-2.5 text-lg font-medium transition-colors duration-150 ${
              activeTab === "atm"
                ? "text-text-primary border-t-[3px] border-accent"
                : "text-text-secondary"
            }`}
          >
            <ATMIcon size={32} />
            Emmett's Bank
          </button>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-hidden">
        {activeTab === "calendar" && <CalendarView />}
        {activeTab === "weather" && <WeatherView />}
        {activeTab === "atm" && <ATMView />}
      </main>
    </div>
  );
}
