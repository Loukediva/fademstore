'use client'
import { useState, useEffect, useDeferredValue } from 'react' // Import unique et propre
import { supabase } from '../utils/supabase'
import { Gamepad2, Briefcase, MessageSquare, Play, Globe, LayoutGrid, Info, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link';

export default function Home() {
  const [apps, setApps] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tous')
  
  // Utilisation de useDeferredValue pour la fluidité
  const deferredSearch = useDeferredValue(search);

  // Ajoutez un état pour gérer la page actuelle
const [page, setPage] = useState(0);

// 1. Appel initial au chargement
useEffect(() => {
  fetchData(0);
}, []);

// 2. La fonction fetchData est maintenant prête à être appelée
async function fetchData(pageIndex: number) {
  const from = pageIndex * 50;
  const to = from + 49;
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('clicks', { ascending: false })
    .range(from, to); 

  if (error) console.error("Erreur :", error);
  else setApps(prev => [...prev, ...(data || [])]);
}

  const handleAppClick = async (app: any) => {
    const newClicks = (app.clicks || 0) + 1;
    await supabase.from('applications').update({ clicks: newClicks }).eq('id', app.id);
    setApps(prev => prev.map(a => a.id === app.id ? { ...a, clicks: newClicks } : a));
  };

  const categories = ['Tous', ...Array.from(new Set(apps.map(a => a.category)))]

  const getIcon = (cat: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'Tous': <LayoutGrid size={16} />,
      'Jeux': <Gamepad2 size={16} />,
      'Communication': <MessageSquare size={16} />,
      'Productivité': <Briefcase size={16} />,
      'Divertissement': <Play size={16} />,
    }
    return icons[cat] || <Globe size={16} />
  }

  // Filtrage optimisé avec deferredSearch
  const filteredApps = apps.filter(app => 
    app.name?.toLowerCase().includes(deferredSearch.toLowerCase()) && 
    (category === 'Tous' || app.category === category)
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-2">Fademstore</h1>
            <p className="text-gray-500 text-lg">Découvrez la sélection premium des meilleures PWA.</p>
          </div>
          <Link href="/about" className="p-3 bg-white rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all border border-gray-100">
            <Info size={20} className="text-gray-600" />
          </Link>
        </header>
        
        <input 
          type="text" 
          placeholder="Rechercher parmi les applications..." 
          className="w-full p-5 pl-6 bg-white border border-gray-200 rounded-3xl shadow-sm mb-10 outline-none focus:ring-4 focus:ring-blue-500/20 text-gray-900 transition-colors"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)} 
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all active:scale-95 ${category === cat ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {getIcon(cat)} {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredApps.map((app, index) => (
              <motion.div 
                layout
                key={app.id || `app-${index}`} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 relative group"
              >
                {app.is_pwa && (
                  <span className="absolute top-4 right-4 bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-lg uppercase">PWA</span>
                )}
                <img 
                  src={app.logo_url} 
                  alt={app.name} 
                  className="w-16 h-16 rounded-2xl mb-4 shadow-inner object-cover bg-gray-100"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + app.name; }}
                />
                <h3 className="font-bold text-gray-900 text-lg truncate">{app.name}</h3>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-4">
                  <MousePointer2 size={12} /> {app.clicks || 0} clics
                </div>
                <a 
                  href={app.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => handleAppClick(app)}
                  className="block w-full text-center bg-gray-900 text-white py-2 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
                >
                  Ouvrir
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-10">
  <button 
    onClick={() => {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }}
    className="px-8 py-3 bg-white border border-gray-200 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
  >
    Charger plus d'applications
  </button>
</div>
      </div>
    </main>
  )
}