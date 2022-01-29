import { Store } from 'vuex';

export interface IntroState {
  seenIntro: boolean;
}

export interface AuthData {
  token: string;
  refreshToken: string;
  tokenExp: string;
  userId: string;
  userEmail: string;
}

export interface AuthState {
  authData: AuthData;
  authenticated: boolean;
}

export interface RootState {
  intro: IntroState;
  auth: AuthState;
}

export type StoreRestored = Store<RootState> & { restored: Promise<boolean> };