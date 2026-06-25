export default function IslamicPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="islamic-geo" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5">
            {/* Outer 8-pointed star */}
            <polygon points="60,10 70,40 100,30 80,55 100,80 70,72 60,102 50,72 20,80 40,55 20,30 50,40" />
            {/* Inner circle */}
            <circle cx="60" cy="55" r="18" />
            {/* Inner 6-pointed star */}
            <polygon points="60,37 66,49 80,49 69,58 73,72 60,64 47,72 51,58 40,49 54,49" />
            {/* Corner diamonds */}
            <polygon points="0,0 12,15 0,30 -12,15" />
            <polygon points="120,0 132,15 120,30 108,15" />
            <polygon points="0,90 12,105 0,120 -12,105" />
            <polygon points="120,90 132,105 120,120 108,105" />
            {/* Connecting lines */}
            <line x1="0" y1="15" x2="48" y2="37" />
            <line x1="120" y1="15" x2="72" y2="37" />
            <line x1="0" y1="105" x2="48" y2="82" />
            <line x1="120" y1="105" x2="72" y2="82" />
            {/* Arabesque arches */}
            <path d="M 10 60 Q 30 40 50 55" />
            <path d="M 70 55 Q 90 40 110 60" />
            <path d="M 10 60 Q 30 80 50 65" />
            <path d="M 70 65 Q 90 80 110 60" />
          </g>
        </pattern>
        <pattern id="islamic-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.2" />
          <circle cx="0" cy="0" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="40" cy="0" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="0" cy="40" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="40" cy="40" r="1" fill="currentColor" opacity="0.15" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-dots)" />
      <rect width="100%" height="100%" fill="url(#islamic-geo)" />
    </svg>
  );
}
