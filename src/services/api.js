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
 * Search games by query string with pagination
 */
export const searchGames = async (query, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${query}&page=${page}&page_size=20`);
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

/**
 * Get games by Tag ID
 */
export const getGamesByTag = async (tagId, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&tags=${tagId}&page=${page}&page_size=20`);
        if (!response.ok) throw new Error('Error fetching games by tag');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Get games by Genre ID
 */
export const getGamesByGenre = async (genreId, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&genres=${genreId}&page=${page}&page_size=20`);
        if (!response.ok) throw new Error('Error fetching games by genre');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Get Publisher Details
 */
export const getPublisherDetails = async (publisherId) => {
    try {
        const response = await fetch(`${BASE_URL}/publishers/${publisherId}?key=${API_KEY}`);
        if (!response.ok) throw new Error('Error fetching publisher details');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Get games by Publisher ID
 */
export const getGamesByPublisher = async (publisherId, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&publishers=${publisherId}&page=${page}&page_size=20`);
        if (!response.ok) throw new Error('Error fetching games by publisher');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Search Publishers
 */
export const searchPublishers = async (query, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&search=${query}&page=${page}&page_size=20`);
        if (!response.ok) throw new Error('Error searching publishers');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
