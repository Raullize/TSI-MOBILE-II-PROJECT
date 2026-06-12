import { Team } from '../types';
import { api } from './api';

export type CreateTeamDto = {
  name: string;
  city: string;
  uniformColor: string;
};

export const teamsService = {
  getAll: () => api.get<Team[]>('/teams'),
  getById: (id: string) => api.get<Team>(`/teams/${id}`),
  create: (dto: CreateTeamDto) => api.post<Team>('/teams', dto),
  update: (id: string, dto: Partial<CreateTeamDto>) => api.put<Team>(`/teams/${id}`, dto),
  remove: (id: string) => api.delete(`/teams/${id}`),
};
