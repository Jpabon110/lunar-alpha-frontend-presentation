import { AlertRequest, PaginationRequest } from '../interfaces/interfaces';
import { getLocalStorageToken } from '../utils/localStorage';

const BASE_URL = import.meta.env.VITE_API_URL;
const userLoggedInfo = getLocalStorageToken();

const getEvents = async ({ page = 1, limit = 10 }: PaginationRequest): Promise<AlertRequest> => {
  const response = await fetch(`${BASE_URL}/events?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Beare ${userLoggedInfo}` },
  });
  return response.json();
};

export const eventService = { getEvents };
