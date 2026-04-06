import { CalendarIcon, ATMIcon } from "@/components/Icons";

interface SidebarProps {
  activeTab: "calendar" | "atm";
  onTabChange: (tab: "calendar" | "atm") => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    { id: "calendar" as const, label: "Calendar", Icon: CalendarIcon },
    { id: "atm" as const, label: "Emmett's Bank", Icon: ATMIcon },
  ];

  return (
    <div className="w-[180px] h-full bg-sidebar flex flex-col">
      {/* Header */}
      <div className="px-4 py-5">
        <h1 className="text-sm font-semibold text-text-primary tracking-tight leading-snug">
          Baker Family Hub
        </h1>
      </div>

      {/* Navigation tabs */}
      <nav className="flex flex-col gap-0.5 px-2">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm font-medium rounded-r-md transition-colors duration-150 text-left ${
                isActive
                  ? "bg-sidebar-active border-l-[3px] border-accent text-text-primary"
                  : "border-l-[3px] border-transparent text-text-secondary hover:bg-sidebar-active/50"
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
