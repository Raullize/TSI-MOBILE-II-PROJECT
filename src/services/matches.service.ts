import { Match, MatchStatus } from '../types';
import { api } from './api';

export type CreateMatchDto = {
  date: string;
  location: string;
  status: MatchStatus;
  homeTeamId: string;
  homeTeamScore?: number;
  awayTeamId: string;
  awayTeamScore?: number;
};

export const matchesService = {
  getAll: () => api.get<Match[]>('/matches'),
  getById: (id: string) => api.get<Match>(`/matches/${id}`),
  create: (dto: CreateMatchDto) => api.post<Match>('/matches', dto),
  update: (id: string, dto: Partial<CreateMatchDto>) => api.patch<Match>(`/matches/${id}`, dto),
  remove: (id: string) => api.delete(`/matches/${id}`),
};
