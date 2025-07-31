import { useState, useRef, useCallback, useEffect } from 'react';
import { Song, PlayerState } from '../types';

export const usePlayer = (songs: Song[]) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isRepeat: false,
    isShuffle: false,
  });

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [shuffleOrder, setShuffleOrder] = useState<number[]>([]);

  // Generate shuffle order when shuffle is enabled
  useEffect(() => {
    if (playerState.isShuffle && songs.length > 0) {
      const indices = Array.from({ length: songs.length }, (_, i) => i);
      // Fisher-Yates shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffleOrder(indices);
    }
  }, [playerState.isShuffle, songs.length]);

  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audioRef.current!.currentTime,
        duration: audioRef.current!.duration || 0,
      }));
    }
  }, []);

  const playSong = useCallback((song: Song, index: number) => {
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.volume = playerState.volume;
      setPlayerState(prev => ({ ...prev, currentSong: song, isPlaying: true }));
      setCurrentIndex(index);
      audioRef.current.play();
    }
  }, [playerState.volume]);

  const playPause = useCallback(() => {
    if (audioRef.current) {
      if (playerState.isPlaying) {
        audioRef.current.pause();
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
      } else {
        audioRef.current.play();
        setPlayerState(prev => ({ ...prev, isPlaying: true }));
      }
    }
  }, [playerState.isPlaying]);

  const nextSong = useCallback(() => {
    if (songs.length === 0) return;

    let nextIndex: number;
    
    if (playerState.isShuffle) {
      const currentShuffleIndex = shuffleOrder.indexOf(currentIndex);
      nextIndex = currentShuffleIndex < shuffleOrder.length - 1 
        ? shuffleOrder[currentShuffleIndex + 1] 
        : shuffleOrder[0];
    } else {
      nextIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
    }

    playSong(songs[nextIndex], nextIndex);
  }, [songs, currentIndex, playerState.isShuffle, shuffleOrder, playSong]);

  const prevSong = useCallback(() => {
    if (songs.length === 0) return;

    let prevIndex: number;
    
    if (playerState.isShuffle) {
      const currentShuffleIndex = shuffleOrder.indexOf(currentIndex);
      prevIndex = currentShuffleIndex > 0 
        ? shuffleOrder[currentShuffleIndex - 1] 
        : shuffleOrder[shuffleOrder.length - 1];
    } else {
      prevIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
    }

    playSong(songs[prevIndex], prevIndex);
  }, [songs, currentIndex, playerState.isShuffle, shuffleOrder, playSong]);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
    setPlayerState(prev => ({ ...prev, volume: clampedVolume }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isRepeat: !prev.isRepeat }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isShuffle: !prev.isShuffle }));
  }, []);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setPlayerState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const handleSongEnd = useCallback(() => {
    if (playerState.isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      nextSong();
    }
  }, [playerState.isRepeat, nextSong]);

  return {
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
  };
};