export const mockTeams = [
  { id: '1', name: 'Charqueadas Bulls', city: 'Charqueadas', color: '#F97316', abbreviation: 'CB', playerCount: 8 },
  { id: '2', name: 'Porto Alegre Hawks', city: 'Porto Alegre', color: '#3B82F6', abbreviation: 'PH', playerCount: 8 },
  { id: '3', name: 'Canoas Lions', city: 'Canoas', color: '#EAB308', abbreviation: 'CL', playerCount: 8 },
  { id: '4', name: 'Novo Hamburgo Tigers', city: 'Novo Hamburgo', color: '#A855F7', abbreviation: 'NT', playerCount: 8 },
];

export const mockPlayers = [
  { id: '1', name: 'Carlos Silva', position: 'PG', number: 10, teamId: '1' },
  { id: '2', name: 'João Santos', position: 'SG', number: 23, teamId: '2' },
  { id: '3', name: 'Rafael Costa', position: 'SF', number: 7, teamId: '3' },
  { id: '4', name: 'Pedro Oliveira', position: 'PF', number: 32, teamId: '4' },
  { id: '5', name: 'Lucas Fernandes', position: 'C', number: 15, teamId: '1' },
];

export const mockMatches = [
  { 
    id: '1', 
    date: 'May 20, 2026', 
    time: '7:00 PM', 
    location: 'Sports Arena',
    status: 'Finished', 
    homeTeamId: '1', 
    homeScore: 98, 
    awayTeamId: '2', 
    awayScore: 94 
  },
  { 
    id: '2', 
    date: 'May 21, 2026', 
    time: '8:30 PM', 
    location: 'Central Court',
    status: 'Finished', 
    homeTeamId: '3', 
    homeScore: 102, 
    awayTeamId: '4', 
    awayScore: 87 
  },
  { 
    id: '3', 
    date: 'May 28, 2026', 
    time: '7:00 PM', 
    location: 'Sports Arena',
    status: 'Scheduled', 
    homeTeamId: '1', 
    homeScore: 0, 
    awayTeamId: '3', 
    awayScore: 0 
  },
  { 
    id: '4', 
    date: 'May 29, 2026', 
    time: '8:30 PM', 
    location: 'Central Court',
    status: 'Scheduled', 
    homeTeamId: '2', 
    homeScore: 0, 
    awayTeamId: '4', 
    awayScore: 0 
  },
];
