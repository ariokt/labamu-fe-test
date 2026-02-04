'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search Pokemon...' }: SearchBarProps) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-120 bg-white rounded-xl z-20 opacity-70">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-4 bg-darker-bg border-4 border-retro-yellow/30 rounded-xl placeholder-gray-500 font-body focus:outline-none focus:border-retro-yellow transition-all shadow-lg focus:shadow-retro-yellow/30"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-6 h-6 text-retro-yellow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}