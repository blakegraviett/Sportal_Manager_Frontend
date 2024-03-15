export class ViewAllEvents {
  id: number;
  name: string;
  description: string;
  period: string[];
  sport: string;
  teams: string[];

  constructor(id: number, name: string, description: string, period: string[], sport: string, teams: string[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.period = period;
    this.sport = sport;
    this.teams = teams;
  }
}
