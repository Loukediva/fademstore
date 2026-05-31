import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-black transition mb-8">
          <ArrowLeft size={20} /> Retour au store
        </Link>
        
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">À propos de Fademstore</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            Bienvenue sur <strong>Fademstore</strong>, votre sélection premium des meilleures applications web (PWA). 
            Notre mission est de centraliser les outils les plus performants pour vous faire gagner du temps au quotidien.
          </p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8">Pourquoi Fademstore ?</h2>
          <p>
            Nous sélectionnons rigoureusement chaque application pour sa fiabilité, son design et sa rapidité. 
            Contrairement aux app stores classiques, Fademstore se concentre uniquement sur des solutions web légères et accessibles partout.
          </p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8">Technologies</h2>
          <p>
            Ce projet est construit avec amour en utilisant <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, 
            <strong> Supabase</strong> pour la base de données et <strong>Framer Motion</strong> pour des animations fluides.
          </p>
        </div>
      </div>
    </main>
  );
}