import { Store } from 'vuex';

export interface IntroState {
  seenIntro: boolean;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  tokenExp: Date;
  userId: string;
  userName: string;
}

export interface AuthStatus {
  authenticated: boolean;
  authStatusCode: number;
}

export interface AuthState {
  authData: AuthData;
  authStatus: AuthStatus;
}

export interface RootState {
  intro: IntroState;
  auth: AuthState;
}

export type StoreRestored = Store<RootState> & { restored: Promise<boolean> };