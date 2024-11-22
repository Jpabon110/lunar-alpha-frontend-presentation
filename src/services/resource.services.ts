import { Resource } from '../interfaces/interfaces';
import { getLocalStorageToken } from '../utils/localStorage';

const BASE_URL = import.meta.env.VITE_API_URL;
const userLoggedInfo = getLocalStorageToken();

const getResources = async (): Promise<Resource[]> => {
  const response = await fetch(`${BASE_URL}/resources`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Beare ${userLoggedInfo}`  },
  });
  return response.json();
};


export const resourceService = { getResources };
