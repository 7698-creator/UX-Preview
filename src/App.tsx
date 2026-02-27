import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Gamepad2, 
  BarChart3, 
  Users, 
  Settings, 
  Plus, 
  ChevronRight, 
  Bot, 
  Zap, 
  Trophy, 
  MousePointer2, 
  Eye, 
  Play, 
  Save, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Share2,
  Download,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import confetti from 'canvas-confetti';
import { cn } from './lib/utils';

// --- Types ---

type GameType = 'wheel' | 'scratch' | 'advent' | 'promo' | 'conditions';

interface Game {
  id: string;
  name: string;
  type: GameType;
  status: 'idea' | 'simulated' | 'live_ready' | 'live';
  createdAt: string;
  players: number;
  conversions: number;
}

// --- Mock Data ---

const MOCK_GAMES: Game[] = [
  { id: '1', name: 'Summer Spin 2024', type: 'wheel', status: 'live', createdAt: '2024-05-01', players: 12400, conversions: 1840 },
  { id: '2', name: 'Winter Scratch Off', type: 'scratch', status: 'live', createdAt: '2023-12-15', players: 45000, conversions: 8200 },
  { id: '3', name: 'New Year Advent', type: 'advent', status: 'simulated', createdAt: '2024-02-20', players: 0, conversions: 0 },
];

const ANALYTICS_DATA = [
  { name: 'Mon', users: 4000, wins: 2400 },
  { name: 'Tue', users: 3000, wins: 1398 },
  { name: 'Wed', users: 2000, wins: 9800 },
  { name: 'Thu', users: 2780, wins: 3908 },
  { name: 'Fri', users: 1890, wins: 4800 },
  { name: 'Sat', users: 2390, wins: 3800 },
  { name: 'Sun', users: 3490, wins: 4300 },
];

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'games', icon: Gamepad2, label: 'Games' },
    { id: 'cdp', icon: Users, label: 'CDP (Marketing)' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 border-r border-zinc-200 bg-white h-screen flex flex-col sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white">
          <Bot size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight">BotForge</span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              activeTab === item.id 
                ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" 
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-100">
        <div className="bg-zinc-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Current Plan</p>
          <p className="text-sm font-bold text-zinc-900">Pro Marketer</p>
          <div className="mt-3 h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-900 w-3/4" />
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">7,500 / 10,000 MAU used</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ onCreateGame }: { onCreateGame: () => void }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Welcome back, Alex</h1>
          <p className="text-zinc-500 mt-1">Your marketing bots are performing 12% better this week.</p>
        </div>
        <button 
          onClick={onCreateGame}
          className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-200"
        >
          <Plus size={20} />
          Create New Game
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Players', value: '57.4k', trend: '+12.5%', icon: Users },
          { label: 'Avg. Conversion', value: '14.2%', trend: '+2.1%', icon: Zap },
          { label: 'Prizes Claimed', value: '12,840', trend: '+5.4%', icon: Trophy },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-zinc-50 rounded-lg">
                <stat.icon size={20} className="text-zinc-900" />
              </div>
              <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-zinc-500 text-sm mt-4">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Traffic Overview</h3>
            <select className="text-sm border-none bg-zinc-50 rounded-lg px-3 py-1 font-medium">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="users" stroke="#18181b" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Recent Games</h3>
          <div className="space-y-4">
            {MOCK_GAMES.map((game) => (
              <div key={game.id} className="flex items-center gap-4 p-3 hover:bg-zinc-50 rounded-xl transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                  <Gamepad2 size={20} className="text-zinc-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{game.name}</p>
                  <p className="text-xs text-zinc-500 capitalize">{game.type} • {game.status}</p>
                </div>
                <ChevronRight size={16} className="text-zinc-300" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors">
            View all games
          </button>
        </div>
      </div>
    </div>
  );
};

const CDPView = () => {
  const users = [
    { id: '1', name: 'John Doe', telegram: '@johndoe', lastGame: 'Summer Spin', segment: 'High Value', joined: '2h ago' },
    { id: '2', name: 'Sarah Smith', telegram: '@sarah_s', lastGame: 'Winter Scratch', segment: 'New User', joined: '5h ago' },
    { id: '3', name: 'Mike Ross', telegram: '@mross', lastGame: 'Summer Spin', segment: 'Churn Risk', joined: '1d ago' },
    { id: '4', name: 'Emma Wilson', telegram: '@emma_w', lastGame: 'Advent Calendar', segment: 'Loyal', joined: '2d ago' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Customer Data Platform</h1>
          <p className="text-zinc-500 mt-1">Manage and segment your Telegram audience for targeted marketing.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50">
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800">
            <Filter size={16} /> Create Segment
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users by name, telegram, or segment..." 
              className="w-full pl-10 pr-4 py-2 bg-zinc-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-500">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50 text-zinc-500 text-[11px] uppercase tracking-wider font-bold">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Telegram</th>
              <th className="px-6 py-4">Last Game</th>
              <th className="px-6 py-4">Segment</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-bold text-sm">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-500">{user.telegram}</td>
                <td className="px-6 py-4 text-sm text-zinc-900 font-medium">{user.lastGame}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide",
                    user.segment === 'High Value' ? "bg-emerald-50 text-emerald-700" :
                    user.segment === 'Churn Risk' ? "bg-rose-50 text-rose-700" :
                    "bg-zinc-100 text-zinc-600"
                  )}>
                    {user.segment}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400">{user.joined}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-zinc-400 hover:text-zinc-900">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Game Creator Wizard ---

const GameCreator = ({ onCancel, onComplete }: { onCancel: () => void, onComplete: () => void }) => {
  const [step, setStep] = useState<'idea' | 'generating' | 'simulated' | 'live_ready'>('idea');
  const [gameData, setGameData] = useState({
    name: '',
    type: 'wheel' as GameType,
    color: '#18181b',
    prizes: [
      { id: '1', name: '10% Discount', prob: 40, color: '#f4f4f5' },
      { id: '2', name: 'Free Shipping', prob: 30, color: '#e4e4e7' },
      { id: '3', name: 'Buy 1 Get 1', prob: 20, color: '#d4d4d8' },
      { id: '4', name: 'Grand Prize: iPhone', prob: 10, color: '#18181b' },
    ]
  });

  const handleAutoGenerate = () => {
    setStep('generating');
    setTimeout(() => {
      setStep('simulated');
    }, 2500);
  };

  const templates = [
    { id: 'wheel', name: 'Lucky Wheel', desc: 'Classic spin-to-win experience', icon: Zap },
    { id: 'scratch', name: 'Scratch Card', desc: 'Interactive reveal mechanics', icon: MousePointer2 },
    { id: 'advent', name: 'Advent Calendar', desc: 'Multi-day engagement tool', icon: Trophy },
    { id: 'promo', name: 'Promo Codes', desc: 'Direct reward distribution', icon: BarChart3 },
    { id: 'conditions', name: 'Conditions', desc: 'Task-based participation', icon: CheckCircle2 },
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-zinc-100 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-500">
            <ArrowLeft size={20} />
          </button>
          <div className="h-4 w-[1px] bg-zinc-200" />
          <h2 className="font-bold text-zinc-900">
            {step === 'idea' ? 'New Campaign' : gameData.name || 'Untitled Campaign'}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          {step === 'simulated' && (
            <>
              <button className="flex items-center gap-2 px-4 py-2 text-zinc-500 hover:text-zinc-900 text-sm font-bold transition-colors">
                <Save size={18} /> Save Draft
              </button>
              <button 
                onClick={() => setStep('live_ready')}
                className="bg-zinc-900 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-zinc-200 hover:bg-zinc-800 transition-all"
              >
                Go Live
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 'idea' && (
            <motion.div 
              key="idea"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto"
            >
              <div className="max-w-2xl w-full space-y-12">
                <div className="text-center space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight">What's the big idea?</h1>
                  <p className="text-zinc-500 text-lg">Give your campaign a name and choose a game template.</p>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Campaign Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Summer Sale Extravaganza"
                    value={gameData.name}
                    onChange={(e) => setGameData({...gameData, name: e.target.value})}
                    className="w-full text-3xl font-bold border-b-2 border-zinc-100 focus:border-zinc-900 outline-none pb-4 transition-colors placeholder:text-zinc-200"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Select Template</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setGameData({...gameData, type: t.id as GameType})}
                        className={cn(
                          "flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all",
                          gameData.type === t.id 
                            ? "border-zinc-900 bg-zinc-50 shadow-md" 
                            : "border-zinc-100 hover:border-zinc-200"
                        )}
                      >
                        <div className={cn(
                          "p-3 rounded-xl",
                          gameData.type === t.id ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-500"
                        )}>
                          <t.icon size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900">{t.name}</p>
                          <p className="text-sm text-zinc-500 mt-1">{t.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    disabled={!gameData.name}
                    onClick={handleAutoGenerate}
                    className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-zinc-200 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    Generate Campaign <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'generating' && (
            <motion.div 
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-900 text-white"
            >
              <div className="max-w-md w-full text-center space-y-8">
                <div className="relative w-24 h-24 mx-auto">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-zinc-700 border-t-white rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Bot size={32} />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Building your campaign...</h2>
                  <p className="text-zinc-400">AI is generating prizes, probabilities, and UI themes based on your industry.</p>
                </div>
                <div className="space-y-3 text-left bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50">
                  {[
                    'Analyzing market trends...',
                    'Generating default prize pool...',
                    'Setting up Telegram bot hooks...',
                    'Optimizing conversion paths...'
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.5 }}
                        className="w-2 h-2 bg-emerald-500 rounded-full"
                      />
                      <span className="text-zinc-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'simulated' && (
            <motion.div 
              key="simulated"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex overflow-hidden"
            >
              {/* Sidebar Editor */}
              <div className="w-80 border-r border-zinc-100 bg-white flex flex-col shrink-0 overflow-y-auto">
                <div className="p-6 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Visual Theme</h3>
                    <div className="flex gap-2">
                      {['#18181b', '#059669', '#2563eb', '#db2777', '#d97706'].map((c) => (
                        <button 
                          key={c}
                          onClick={() => setGameData({...gameData, color: c})}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            gameData.color === c ? "border-zinc-900 scale-110" : "border-transparent"
                          )}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Prize Pool</h3>
                      <button className="text-xs font-bold text-zinc-900 hover:underline">+ Add</button>
                    </div>
                    <div className="space-y-2">
                      {gameData.prizes.map((p) => (
                        <div key={p.id} className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                            <div>
                              <p className="text-xs font-bold">{p.name}</p>
                              <p className="text-[10px] text-zinc-500">{p.prob}% chance</p>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-900">
                            <Settings size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Traffic Simulation</h3>
                    <div className="bg-zinc-900 rounded-xl p-4 text-white">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-xs font-bold opacity-60">Estimated Results</p>
                        <Zap size={14} className="text-yellow-400" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Est. Players</span>
                          <span className="font-bold">1,200</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Est. Leads</span>
                          <span className="font-bold text-emerald-400">184</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '15%' }}
                            className="h-full bg-emerald-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="flex-1 bg-zinc-50 flex items-center justify-center p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                
                <div className="relative">
                  {/* Phone Frame */}
                  <div className="w-[320px] h-[640px] bg-white rounded-[3rem] border-[8px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col relative">
                    {/* Status Bar */}
                    <div className="h-10 bg-zinc-900 flex items-center justify-between px-8 text-white text-[10px] font-bold">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-2 bg-white/40 rounded-sm" />
                        <div className="w-4 h-2 bg-white rounded-sm" />
                      </div>
                    </div>

                    {/* Bot Header */}
                    <div className="p-4 border-b border-zinc-100 flex items-center gap-3 bg-white">
                      <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                        <Bot size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{gameData.name || 'BotForge Game'}</p>
                        <p className="text-[10px] text-emerald-500 font-bold">bot • online</p>
                      </div>
                    </div>

                    {/* Game Content */}
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-black tracking-tight" style={{ color: gameData.color }}>SPIN & WIN!</h2>
                        <p className="text-xs text-zinc-500 font-medium">Try your luck and win exclusive prizes from our store.</p>
                      </div>

                      {/* Wheel Visualization */}
                      <div className="relative w-56 h-56">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-full h-full rounded-full border-8 border-zinc-900 relative overflow-hidden shadow-xl"
                        >
                          {[0, 90, 180, 270].map((deg, i) => (
                            <div 
                              key={i}
                              className="absolute inset-0 origin-center"
                              style={{ 
                                transform: `rotate(${deg}deg)`,
                                background: `conic-gradient(from 0deg, ${i % 2 === 0 ? gameData.color : '#f4f4f5'} 0deg 90deg, transparent 90deg)`
                              }}
                            />
                          ))}
                        </motion.div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-6 bg-zinc-900 clip-path-triangle" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white rounded-full border-4 border-zinc-900 shadow-lg flex items-center justify-center">
                            <div className="w-2 h-2 bg-zinc-900 rounded-full" />
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                          });
                        }}
                        className="w-full py-4 rounded-2xl font-black text-white shadow-lg transition-transform active:scale-95"
                        style={{ backgroundColor: gameData.color }}
                      >
                        SPIN NOW
                      </button>

                      <p className="text-[10px] text-zinc-400">By playing you agree to receive marketing updates.</p>
                    </div>
                  </div>

                  {/* Floating Labels */}
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute -right-48 top-20 bg-white p-4 rounded-2xl border border-zinc-200 shadow-xl w-40 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Eye size={16} />
                      <span className="text-xs font-bold">Live Preview</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">This is exactly what your customers will see in Telegram.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'live_ready' && (
            <motion.div 
              key="live_ready"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center p-8"
            >
              <div className="max-w-md w-full space-y-8 text-center">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">Ready to Launch!</h1>
                  <p className="text-zinc-500">Your campaign is economically valid and ready for traffic.</p>
                </div>

                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 text-left space-y-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Launch Checklist</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Prize pool verified', status: 'done' },
                      { label: 'Telegram Bot connected', status: 'done' },
                      { label: 'Marketing tracking active', status: 'done' },
                      { label: 'Payment method linked', status: 'pending' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-700">{item.label}</span>
                        {item.status === 'done' ? (
                          <CheckCircle2 size={18} className="text-emerald-500" />
                        ) : (
                          <AlertCircle size={18} className="text-amber-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep('simulated')}
                    className="flex-1 py-4 border border-zinc-200 rounded-xl font-bold hover:bg-zinc-50 transition-colors"
                  >
                    Back to Edit
                  </button>
                  <button 
                    onClick={onComplete}
                    className="flex-1 py-4 bg-zinc-900 text-white rounded-xl font-bold shadow-lg shadow-zinc-200 hover:bg-zinc-800 transition-all"
                  >
                    Publish Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200 border border-zinc-100 overflow-hidden flex flex-col">
          <div className="p-12 space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-zinc-200">
                <Bot size={32} />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">BotForge</h1>
                <p className="text-zinc-500 font-medium">The ultimate Telegram marketing engine.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Work Email</label>
                <input 
                  type="email" 
                  placeholder="alex@company.com" 
                  className="w-full px-4 py-4 bg-zinc-50 border-none rounded-xl focus:ring-2 focus:ring-zinc-900 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-4 py-4 bg-zinc-50 border-none rounded-xl focus:ring-2 focus:ring-zinc-900 transition-all outline-none"
                />
              </div>
            </div>

            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-zinc-200 hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              Sign In
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-zinc-400 font-bold">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors font-bold text-sm">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors font-bold text-sm">
                <Share2 size={16} /> GitHub
              </button>
            </div>
          </div>
          <div className="bg-zinc-50 p-6 text-center border-t border-zinc-100">
            <p className="text-sm text-zinc-500">Don't have an account? <button className="text-zinc-900 font-bold hover:underline">Sign up for free</button></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex font-sans text-zinc-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <Dashboard onCreateGame={() => setIsCreating(true)} />
            </motion.div>
          )}
          {activeTab === 'cdp' && (
            <motion.div
              key="cdp"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <CDPView />
            </motion.div>
          )}
          {activeTab === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Your Campaigns</h1>
                  <p className="text-zinc-500 mt-1">Manage and monitor your active gaming bots.</p>
                </div>
                <button onClick={() => setIsCreating(true)} className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                  <Plus size={20} /> Create New
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_GAMES.map((game) => (
                  <div key={game.id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-zinc-50 rounded-xl group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        <Gamepad2 size={24} />
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide",
                        game.status === 'live' ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                      )}>
                        {game.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                    <p className="text-sm text-zinc-500 mb-6 capitalize">{game.type} Campaign</p>
                    
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-zinc-100">
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Players</p>
                        <p className="font-bold">{(game.players / 1000).toFixed(1)}k</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Conversions</p>
                        <p className="font-bold">{(game.conversions / 1000).toFixed(1)}k</p>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 py-3 bg-zinc-50 text-zinc-900 rounded-xl font-bold text-sm hover:bg-zinc-100 transition-colors">
                      View Analytics
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {isCreating && (
        <GameCreator 
          onCancel={() => setIsCreating(false)} 
          onComplete={() => {
            setIsCreating(false);
            setActiveTab('games');
          }} 
        />
      )}
    </div>
  );
}
