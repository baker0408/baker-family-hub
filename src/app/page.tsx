"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CalendarView from "@/components/CalendarView";
import ATMView from "@/components/ATMView";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"calendar" | "atm">("calendar");

  return (
    <div className="flex flex-col-reverse md:flex-row h-screen overflow-hidden bg-bg">
      {/* Bottom tab bar on mobile, sidebar on desktop */}
      <div className="shrink-0 md:hidden border-t border-accent/20 bg-sidebar">
        <nav className="flex">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-sm font-medium transition-colors duration-150 ${
              activeTab === "calendar"
                ? "text-text-primary border-t-2 border-accent"
                : "text-text-secondary"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="16" height="14" rx="2" />
              <line x1="2" y1="9" x2="18" y2="9" />
              <line x1="6" y1="2" x2="6" y2="6" />
              <line x1="14" y1="2" x2="14" y2="6" />
            </svg>
            Calendar
          </button>
          <button
            onClick={() => setActiveTab("atm")}
            className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-sm font-medium transition-colors duration-150 ${
              activeTab === "atm"
                ? "text-text-primary border-t-2 border-accent"
                : "text-text-secondary"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="2" width="14" height="16" rx="2" />
              <path d="M10 6C8.5 6 7.5 6.8 7.5 8C7.5 9.2 8.5 9.5 10 10C11.5 10.5 12.5 10.8 12.5 12C12.5 13.2 11.5 14 10 14" />
              <line x1="10" y1="4.5" x2="10" y2="6" />
              <line x1="10" y1="14" x2="10" y2="15.5" />
            </svg>
            ATM
          </button>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-hidden">
        {activeTab === "calendar" ? <CalendarView /> : <ATMView />}
      </main>
    </div>
  );
}
