import { CalendarIcon, WeatherIcon, ATMIcon } from "@/components/Icons";

type TabId = "calendar" | "weather" | "atm";

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    { id: "calendar" as const, label: "Calendar", Icon: CalendarIcon },
    { id: "weather" as const, label: "Weather", Icon: WeatherIcon },
    { id: "atm" as const, label: "Emmett's Bank", Icon: ATMIcon },
  ];

  return (
    <div className="w-[240px] h-full bg-sidebar flex flex-col">
      {/* Header */}
      <div className="px-4 py-5">
        <h1 className="text-lg font-semibold text-text-primary tracking-tight leading-snug">
          Baker Family Hub
        </h1>
      </div>

      {/* Navigation tabs */}
      <nav className="flex flex-col gap-2 px-2">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center gap-3.5 w-full px-4 py-4 text-lg font-medium rounded-r-lg transition-colors duration-150 text-left ${
                isActive
                  ? "bg-sidebar-active border-l-[4px] border-accent text-text-primary"
                  : "border-l-[4px] border-transparent text-text-secondary hover:bg-sidebar-active/50"
              }`}
            >
              <Icon className="shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
