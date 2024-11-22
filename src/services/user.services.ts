import { UserLogged, LoginInfo, Users } from '../interfaces/interfaces';
import { getLocalStorageToken } from '../utils/localStorage';

const BASE_URL = import.meta.env.VITE_API_URL;
const userLoggedInfo = getLocalStorageToken();

const login = async (loginInfo: LoginInfo): Promise<UserLogged> => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginInfo),
  });
  return response.json();
};


const getUsers = async (): Promise<Users> => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Beare ${userLoggedInfo}`  },
  });
  return response.json();
};


export const userService = { login, getUsers };
