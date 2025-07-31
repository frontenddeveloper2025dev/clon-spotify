import React from 'react';
import { Music, Heart, Clock, Home, Search, Library } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-black text-white p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Music className="w-8 h-8 text-green-500" />
        <h1 className="text-xl font-bold">Playlist Online</h1>
      </div>
      
      <nav className="space-y-4">
        <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
          <Home className="w-5 h-5" />
          <span>Inicio</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
          <Search className="w-5 h-5" />
          <span>Buscar</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
          <Library className="w-5 h-5" />
          <span>Tu biblioteca</span>
        </div>
      </nav>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
          <Heart className="w-5 h-5" />
          <span>Canciones que te gustan</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
          <Clock className="w-5 h-5" />
          <span>Reproducidos recientemente</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;