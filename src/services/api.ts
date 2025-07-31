import { SongsResponse } from '../types';

const API_BASE_URL = 'https://playground.4geeks.com/sound';

export const fetchSongs = async (): Promise<SongsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/songs`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};