export interface Song {
  id: number;
  name: string;
  url: string;
  category: string;
}

export interface SongsResponse {
  songs: Song[];
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isRepeat: boolean;
  isShuffle: boolean;
}