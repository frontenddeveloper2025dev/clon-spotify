import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SongList from './components/SongList';
import Player from './components/Player';
import LoadingSpinner from './components/LoadingSpinner';
import { usePlayer } from './hooks/usePlayer';
import { fetchSongs } from './services/api';
import { Song } from './types';

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    audioRef,
    playerState,
    currentIndex,
    playSong,
    playPause,
    nextSong,
    prevSong,
    setVolume,
    toggleRepeat,
    toggleShuffle,
    seekTo,
    updateTime,
    handleSongEnd,
  } = usePlayer(songs);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true);
        const data = await fetchSongs();
        setSongs(data.songs);
        setError(null);
      } catch (err) {
        setError('Error al cargar las canciones. Por favor, intenta de nuevo.');
        console.error('Error loading songs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors"
          >
            Recargar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-black">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <SongList
          songs={songs}
          currentSong={playerState.currentSong}
          isPlaying={playerState.isPlaying}
          onSongSelect={playSong}
        />
      </div>
      
      <Player
        audioRef={audioRef}
        currentSong={playerState.currentSong}
        isPlaying={playerState.isPlaying}
        currentTime={playerState.currentTime}
        duration={playerState.duration}
        volume={playerState.volume}
        isRepeat={playerState.isRepeat}
        isShuffle={playerState.isShuffle}
        onPlayPause={playPause}
        onNext={nextSong}
        onPrev={prevSong}
        onVolumeChange={setVolume}
        onToggleRepeat={toggleRepeat}
        onToggleShuffle={toggleShuffle}
        onSeek={seekTo}
        onTimeUpdate={updateTime}
        onSongEnd={handleSongEnd}
      />
    </div>
  );
}

export default App;