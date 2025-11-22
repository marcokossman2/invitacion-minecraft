export interface Guest {
  id: string;
  fullName: string;
  address: string;
  whatsapp: string;
  confirmedAt: string;
}

export type ViewState = 'invitation' | 'rsvp' | 'game' | 'admin-login' | 'admin-panel' | 'super-admin-panel';

export interface GameScore {
  diamonds: number;
  creepers: number;
}

export interface AppConfig {
  coverImage: string;
  bgMusic: string;
  typingSound: string;
  buttonSound: string;
  winSound: string;
  loseSound: string;
  submitSound: string;
}