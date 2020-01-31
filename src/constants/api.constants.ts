import dotenv from 'dotenv';

dotenv.config()

export const PORT = process.env.PORT || 5000;
export const API_PATH_BASE = '/api/v1';
