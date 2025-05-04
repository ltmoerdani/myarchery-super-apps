import { TournamentFormData } from './model';

export class TournamentService {
  static async createTournament(data: TournamentFormData): Promise<string> {
    // TODO: Implement actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('mock-tournament-id');
      }, 1000);
    });
  }
}