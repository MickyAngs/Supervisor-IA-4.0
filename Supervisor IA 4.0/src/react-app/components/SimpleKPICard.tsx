import { LucideIcon } from 'lucide-react';

interface SimpleKPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'cyan' | 'orange' | 'green';
  showProgress?: boolean;
  progress?: number;
}

export default function SimpleKPICard({ 
  title, 
  value, 
  icon: Icon, 
  color,
  showProgress = false,
  progress = 0
}: SimpleKPICardProps) {
  const colorClasses = {
    cyan: {
      bg: 'from-cyan-electric/20 to-cyan-electric/5',
      border: 'border-cyan-electric/30',
      text: 'text-cyan-electric',
      progress: 'bg-cyan-electric'
    },
    orange: {
      bg: 'from-orange-safety/20 to-orange-safety/5',
      border: 'border-orange-safety/30',
      text: 'text-orange-safety',
      progress: 'bg-orange-safety'
    },
    green: {
      bg: 'from-green-400/20 to-green-400/5',
      border: 'border-green-400/30',
      text: 'text-green-400',
      progress: 'bg-green-400'
    },
  };

  const colors = colorClasses[color];

  return (
    <div className={`glass rounded-[20px] p-6 bg-gradient-to-br ${colors.bg} border ${colors.border}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-2">{title}</p>
          <h3 className={`text-4xl font-bold font-mono ${colors.text}`}>{value}</h3>
        </div>
        <div className={`p-4 rounded-xl bg-gradient-to-br ${colors.bg} ${colors.border} border`}>
          <Icon size={32} className={colors.text} />
        </div>
      </div>
      
      {showProgress && (
        <div className="mt-4">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className={`h-full ${colors.progress} rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
