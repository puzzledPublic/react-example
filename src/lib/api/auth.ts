import client from './client';
import { AuthBaseInput } from '../../modules/auth';

export const login = ({ username, password }: AuthBaseInput) =>
  client.post('/api/auth/login', { username, password });

export const register = ({ username, password }: AuthBaseInput) =>
  client.post('/api/auth/register', { username, password });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');