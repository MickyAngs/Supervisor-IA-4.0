import { 
  LayoutDashboard, 
  Box, 
  Camera, 
  FileText
} from 'lucide-react';

interface MenuItem {
  icon: typeof LayoutDashboard;
  label: string;
  id: string;
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Box, label: 'Modelo BIM', id: 'bim' },
  { icon: Camera, label: 'Auditoría Visual', id: 'auditoria' },
  { icon: FileText, label: 'Reportes', id: 'reportes' },
];

interface SidebarProps {
  activeView: string;
  onViewChange: (viewId: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-72 h-screen bg-slate-deep border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-electric to-orange-safety rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rotate-45" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Supervisor.AI</h1>
            <p className="text-xs text-cyan-electric font-mono tracking-wider">v4.0</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === item.id
                ? 'bg-gradient-to-r from-orange-safety/20 to-cyan-electric/20 border border-orange-safety/30 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* n8n Status Widget */}
      <div className="p-4 m-4 glass rounded-xl border-l-2 border-green-400">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">n8n</p>
            <p className="text-sm font-bold text-green-400">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
