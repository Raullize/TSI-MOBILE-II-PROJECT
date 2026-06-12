export type Team = {
  id: string;
  name: string;
  city: string;
  uniformColor: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type Player = {
  id: string;
  name: string;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  jerseyNumber: number;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

export type MatchStatus = 'SCHEDULED' | 'FINISHED';

export type Match = {
  id: string;
  date: string;
  location: string;
  status: MatchStatus;
  homeTeamId: string;
  homeTeamScore: number;
  awayTeamId: string;
  awayTeamScore: number;
  createdAt: string;
  updatedAt: string;
};
