import { motion } from 'framer-motion';

interface RatingGaugeProps {
  rating: number; // 0-10
  size?: number;
  strokeWidth?: number;
}

export default function RatingGauge({ rating, size = 60, strokeWidth = 5 }: RatingGaugeProps) {
  const percentage = Math.round(rating * 10);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const color =
    percentage >= 70 ? '#4ade80' : percentage >= 50 ? '#fbbf24' : '#f87171';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#374151"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <span
        className="absolute text-sm font-bold text-white"
        style={{ fontSize: size * 0.22 }}
      >
        {percentage}
        <span className="text-[0.65em]">%</span>
      </span>
    </div>
  );
}
