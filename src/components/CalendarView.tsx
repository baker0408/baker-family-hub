export default function CalendarView() {
  return (
    <div className="relative w-full h-full" style={{ backgroundColor: "#FAF8F5" }}>
      <iframe
        src="https://www.canva.com/design/DAGyIdYlqPA/1jpe75IGSz4gd3UQwWV3ag/view?embed"
        className="absolute inset-0 w-full h-full border-none"
        allow="fullscreen"
        allowFullScreen
        loading="lazy"
        title="Family Calendar"
      />
    </div>
  );
}
