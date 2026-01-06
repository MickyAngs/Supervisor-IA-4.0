import { TrendingUp, AlertTriangle, CheckCircle2, BarChart3 } from 'lucide-react';
import SimpleKPICard from '@/react-app/components/SimpleKPICard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { mes: 'Ene', fisico: 12, financiero: 15 },
  { mes: 'Feb', fisico: 24, financiero: 28 },
  { mes: 'Mar', fisico: 35, financiero: 38 },
  { mes: 'Abr', fisico: 42.5, financiero: 45 },
];

export default function DashboardView() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        <SimpleKPICard
          title="Avance Físico"
          value="42.5%"
          icon={TrendingUp}
          color="cyan"
          showProgress={true}
          progress={42.5}
        />
        <SimpleKPICard
          title="Alertas de Seguridad"
          value="03"
          icon={AlertTriangle}
          color="orange"
        />
        <SimpleKPICard
          title="Normas RNE"
          value="98%"
          icon={CheckCircle2}
          color="green"
        />
      </div>

      {/* Summary Chart */}
      <div className="glass rounded-[20px] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-electric/20 rounded-lg">
            <BarChart3 className="text-cyan-electric" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Progreso del Proyecto</h2>
            <p className="text-sm text-gray-400">Avance físico vs financiero</p>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="mes" 
                stroke="#64748b"
                style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
              />
              <YAxis 
                stroke="#64748b"
                style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F172A', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="fisico" 
                stroke="#00E5FF" 
                strokeWidth={3}
                dot={{ fill: '#00E5FF', r: 6 }}
                name="Avance Físico"
              />
              <Line 
                type="monotone" 
                dataKey="financiero" 
                stroke="#FF6D00" 
                strokeWidth={3}
                dot={{ fill: '#FF6D00', r: 6 }}
                name="Avance Financiero"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-6 pt-6 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-cyan-electric" />
            <span className="text-sm text-gray-400">Avance Físico</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-safety" />
            <span className="text-sm text-gray-400">Avance Financiero</span>
          </div>
        </div>
      </div>
    </div>
  );
}
