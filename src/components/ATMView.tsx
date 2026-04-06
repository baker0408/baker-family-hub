export default function ATMView() {
  return (
    <div className="relative w-full h-full" style={{ backgroundColor: "#FAF8F5" }}>
      <iframe
        src="https://vaultquest.app/atm"
        className="absolute inset-0 w-full h-full border-none"
        allow="fullscreen"
        allowFullScreen
        loading="lazy"
        title="ATM"
      />
    </div>
  );
}
