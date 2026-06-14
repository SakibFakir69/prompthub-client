interface ProfileStatsProps {
  promptCount: number;
  followers: number;
  following: number;
}

export default function ProfileStats({
  promptCount,
  followers,
  following,
}: ProfileStatsProps) {
  const stats = [
    { label: "Prompts",   value: promptCount },
    { label: "Followers", value: followers   },
    { label: "Following", value: following   },
  ];

  return (
    <div className="grid grid-cols-3 divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden w-full">
      {stats.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center py-4 bg-gray-50/50">
          <span className="text-xl font-semibold text-gray-900">{value}</span>
          <span className="text-[11px] text-gray-500 uppercase tracking-wider mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}