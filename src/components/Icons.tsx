interface IconProps {
  size?: number;
  className?: string;
}

export function CalendarIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
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

export function WeatherIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="3" />
      <line x1="10" y1="2.5" x2="10" y2="4" />
      <line x1="10" y1="16" x2="10" y2="17.5" />
      <line x1="3.5" y1="10" x2="5" y2="10" />
      <line x1="15" y1="10" x2="16.5" y2="10" />
      <line x1="5.4" y1="5.4" x2="6.5" y2="6.5" />
      <line x1="13.5" y1="13.5" x2="14.6" y2="14.6" />
      <line x1="14.6" y1="5.4" x2="13.5" y2="6.5" />
      <line x1="6.5" y1="13.5" x2="5.4" y2="14.6" />
    </svg>
  );
}

export function ATMIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
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
