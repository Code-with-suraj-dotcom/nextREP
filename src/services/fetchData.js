import axios from 'axios';

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

export const exerciseDbBaseUrl = 'https://exercisedb.p.rapidapi.com';
export const youtubeSearchBaseUrl = 'https://youtube-search-and-download.p.rapidapi.com';

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': rapidApiKey,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': rapidApiKey,
  },
};

export const fetchData = async (url, options) => {
  if (!rapidApiKey) {
    console.error('Missing VITE_RAPID_API_KEY in environment variables.');
    return [];
  }

  try {
    const response = await axios.get(url, {
      ...options,
      timeout: 15000,
    });
    console.log('fetchData response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
