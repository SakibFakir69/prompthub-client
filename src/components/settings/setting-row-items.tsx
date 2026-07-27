
import {

  ChevronRight,
 
} from 'lucide-react';

export const RowItem = ({
  icon,
  iconBg,
  label,
  sublabel,
  onPress,
  danger = false,
  right,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
}) => {
  const rowContent = (
    <>
      <div
        className="flex items-center justify-center mr-3 w-9 h-9 rounded-xl flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${danger ? 'text-red-600' : 'text-gray-900'}`}>
          {label}
        </p>
        {sublabel && (
          <p className="mt-0.5 text-xs text-gray-400 truncate">{sublabel}</p>
        )}
      </div>

      <div className="flex items-center justify-end ml-2 flex-shrink-0">
        {right ?? <ChevronRight size={16} className="text-gray-300" />}
      </div>
    </>
  );

  const className =
    "flex w-full items-center text-left px-4 py-3 bg-white transition-colors duration-150 hover:bg-gray-50/80 active:bg-gray-100";

  
  if (right) {
    return (
      <div
        role={onPress ? 'button' : undefined}
        tabIndex={onPress ? 0 : undefined}
        onClick={onPress}
        onKeyDown={
          onPress
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPress();
                }
              }
            : undefined
        }
        className={`${className} ${onPress ? 'cursor-pointer' : ''}`}
      >
        {rowContent}
      </div>
    );
  }

  return (
    <button onClick={onPress} type="button" className={className}>
      {rowContent}
    </button>
  );
};