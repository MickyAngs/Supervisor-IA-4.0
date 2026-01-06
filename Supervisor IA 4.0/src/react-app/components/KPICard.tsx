import { LucideIcon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: 'cyan' | 'orange' | 'green';
  data: number[];
}

export default function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color,
  data
}: KPICardProps) {
  const colorClasses = {
    cyan: 'from-cyan-electric/20 to-cyan-electric/5 border-cyan-electric/30 text-cyan-electric',
    orange: 'from-orange-safety/20 to-orange-safety/5 border-orange-safety/30 text-orange-safety',
    green: 'from-green-400/20 to-green-400/5 border-green-400/30 text-green-400',
  };

  const lineColors = {
    cyan: '#00E5FF',
    orange: '#FF6D00',
    green: '#4ADE80',
  };

  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <div className={`glass rounded-[20px] p-6 bg-gradient-to-br ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold font-mono">{value}</h3>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      
      <div className="h-16 -mx-2 -mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={lineColors[color]} 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
