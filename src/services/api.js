const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

/**
 * Fetch popular games (ordered by popularity/added count)
 */
export const getPopularGames = async () => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&ordering=-added&page_size=10`);
        if (!response.ok) {
            throw new Error('Error fetching popular games');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Search games by query string
 */
export const searchGames = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${query}&page_size=20`);
        if (!response.ok) {
            throw new Error('Error searching games');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Get details for a specific game by ID
 */
export const getGameDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Error fetching game details');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Get a list of all games (with pagination support)
 */
export const getAllGames = async (page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=20`);
        if (!response.ok) {
            throw new Error('Error fetching games');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
