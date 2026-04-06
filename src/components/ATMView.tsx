"use client";

import { useState } from "react";

export default function ATMView() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full" style={{ backgroundColor: "#FAF8F5" }}>
      {loading && (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          <p className="mt-3 text-sm text-text-secondary">Loading ATM...</p>
        </div>
      )}
      <iframe
        src="https://vaultquest.app/atm"
        className="absolute inset-0 z-10 w-full h-full border-none"
        allow="fullscreen"
        allowFullScreen
        loading="lazy"
        title="ATM"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
