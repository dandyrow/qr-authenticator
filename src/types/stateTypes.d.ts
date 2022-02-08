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
  code: number;
}

export interface AuthState {
  authData: AuthData;
  authStatus: AuthStatus;
}

export interface RootState {
  intro: IntroState;
  auth: AuthState;
}

export interface UserCreds {
  username: string,
  password: string,
}

export type StoreRestored = Store<RootState> & { restored: Promise<boolean> };