import React from 'react';
import { Play, Music } from 'lucide-react';
import { Song } from '../types';

interface SongListProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onSongSelect: (song: Song, index: number) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, currentSong, isPlaying, onSongSelect }) => {
  const formatSongName = (name: string) => {
    return name.replace(/[-_]/g, ' ').replace(/\.(mp3|wav|ogg)$/i, '');
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Tu música</h2>
        <p className="text-gray-400">{songs.length} canciones</p>
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm border-b border-gray-800 pb-2 mb-4">
          <div className="col-span-1">#</div>
          <div className="col-span-6">TÍTULO</div>
          <div className="col-span-3">CATEGORÍA</div>
          <div className="col-span-2">ACCIONES</div>
        </div>

        {songs.map((song, index) => {
          const isCurrentSong = currentSong?.id === song.id;
          
          return (
            <div
              key={song.id}
              className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group ${
                isCurrentSong ? 'bg-gray-800 text-green-500' : ''
              }`}
              onClick={() => onSongSelect(song, index)}
            >
              <div className="col-span-1 text-gray-400">
                {isCurrentSong && isPlaying ? (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                    <div className="w-1 h-4 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-4 bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                ) : (
                  <span className="group-hover:hidden">{index + 1}</span>
                )}
                <Play className="w-4 h-4 hidden group-hover:block" />
              </div>
              
              <div className="col-span-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-medium ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
                    {formatSongName(song.name)}
                  </div>
                  <div className="text-sm text-gray-400">Artista desconocido</div>
                </div>
              </div>
              
              <div className="col-span-3 text-gray-400 capitalize">
                {song.category}
              </div>
              
              <div className="col-span-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSongSelect(song, index);
                  }}
                  className="opacity-0 group-hover:opacity-100 bg-green-500 hover:bg-green-600 text-black rounded-full p-2 transition-all duration-200 hover:scale-105"
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongList;