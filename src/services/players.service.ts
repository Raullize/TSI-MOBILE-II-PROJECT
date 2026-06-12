import { Player } from '../types';
import { api } from './api';

export type CreatePlayerDto = {
  name: string;
  position: string;
  jerseyNumber: number;
  teamId: string;
};

export const playersService = {
  getAll: () => api.get<Player[]>('/players'),
  getById: (id: string) => api.get<Player>(`/players/${id}`),
  create: (dto: CreatePlayerDto) => api.post<Player>('/players', dto),
  update: (id: string, dto: Partial<CreatePlayerDto>) => api.put<Player>(`/players/${id}`, dto),
  remove: (id: string) => api.delete(`/players/${id}`),
};
