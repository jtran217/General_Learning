interface TimerProps {
    remaining: number
    total: number
    isRunning: boolean
  }
  
  export default function Timer({ remaining, total, isRunning }: TimerProps) {
    const radius = 52
    const circumference = 2 * Math.PI * radius
    const progress = remaining / total
    const dashoffset = circumference * (1 - progress)
  
    const mins = Math.floor(remaining / 60)
    const secs = remaining % 60
    const isLow = remaining <= 10 && remaining > 0
  
    return (
      <div className="relative flex items-center justify-center w-40 h-40 shrink-0 overflow-visible">
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 overflow-visible"
          width="160"
          height="160"
          viewBox="0 0 160 160"
        >
          {/* Track — center shifted so round linecaps are not clipped */}
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--border)" strokeWidth="10" />
          {/* Progress ring */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={isLow ? '#ef4444' : '#6366f1'}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            style={{
              transition: isRunning
                ? 'stroke-dashoffset 1s linear, stroke 0.3s ease'
                : 'stroke 0.3s ease',
            }}
          />
        </svg>
        <span
          className={`text-3xl font-mono font-bold tabular-nums transition-colors ${
            isLow ? 'text-red-400' : 'text-white'
          }`}
        >
          {mins}:{secs.toString().padStart(2, '0')}
        </span>
      </div>
    )
  }
  