interface SidebarProps {
  activeTab: "calendar" | "atm";
  onTabChange: (tab: "calendar" | "atm") => void;
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
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
      <line x1="6" y1="12" x2="6" y2="12.01" strokeWidth="2" />
      <line x1="10" y1="12" x2="10" y2="12.01" strokeWidth="2" />
      <line x1="14" y1="12" x2="14" y2="12.01" strokeWidth="2" />
    </svg>
  );
}

function ATMIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
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
  );
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    { id: "calendar" as const, label: "Calendar", Icon: CalendarIcon },
    { id: "atm" as const, label: "ATM", Icon: ATMIcon },
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
