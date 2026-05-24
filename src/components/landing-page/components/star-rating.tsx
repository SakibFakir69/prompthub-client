


export function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? "#F59E0B" : "#d1d5db", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}