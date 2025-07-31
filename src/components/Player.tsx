import React, { useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle,
  Music
} from 'lucide-react';
import { Song } from '../types';

interface PlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isRepeat: boolean;
  isShuffle: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onVolumeChange: (volume: number) => void;
  onToggleRepeat: () => void;
  onToggleShuffle: () => void;
  onSeek: (time: number) => void;
  onTimeUpdate: () => void;
  onSongEnd: () => void;
}

const Player: React.FC<PlayerProps> = ({
  audioRef,
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  isRepeat,
  isShuffle,
  onPlayPause,
  onNext,
  onPrev,
  onVolumeChange,
  onToggleRepeat,
  onToggleShuffle,
  onSeek,
  onTimeUpdate,
  onSongEnd,
}) => {
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onSongEnd);
    audio.addEventListener('loadedmetadata', onTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onSongEnd);
      audio.removeEventListener('loadedmetadata', onTimeUpdate);
    };
  }, [onTimeUpdate, onSongEnd]);

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatSongName = (name: string) => {
    return name.replace(/[-_]/g, ' ').replace(/\.(mp3|wav|ogg)$/i, '');
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    onSeek(newTime);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    onSeek(newTime);
  };

  const volumeUp = () => {
    onVolumeChange(Math.min(1, volume + 0.1));
  };

  const volumeDown = () => {
    onVolumeChange(Math.max(0, volume - 0.1));
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gray-900 border-t border-gray-800 px-4 py-3">
      <audio ref={audioRef} />
      
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Current Song Info */}
        <div className="flex items-center gap-4 w-80">
          {currentSong ? (
            <>
              <div className="w-14 h-14 bg-gray-700 rounded flex items-center justify-center">
                <Music className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">
                  {formatSongName(currentSong.name)}
                </div>
                <div className="text-gray-400 text-sm">Artista desconocido</div>
              </div>
            </>
          ) : (
            <div className="text-gray-400">Selecciona una canción</div>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleShuffle}
              className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
                isShuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={onPrev}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              disabled={!currentSong}
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={onPlayPause}
              className="bg-white hover:bg-gray-200 text-black rounded-full p-3 transition-all duration-200 hover:scale-105 disabled:opacity-50"
              disabled={!currentSong}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            <button
              onClick={onNext}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              disabled={!currentSong}
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={onToggleRepeat}
              className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
                isRepeat ? 'text-green-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            
            <div className="flex-1 relative group">
              <div
                className="h-1 bg-gray-600 rounded-full cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-white rounded-full transition-colors group-hover:bg-green-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
              />
            </div>
            
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-3 w-80 justify-end">
          <button
            onClick={volumeDown}
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <VolumeX className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <div className="w-20 h-1 bg-gray-600 rounded-full">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-8">
              {Math.round(volume * 100)}
            </span>
          </div>
          
          <button
            onClick={volumeUp}
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;