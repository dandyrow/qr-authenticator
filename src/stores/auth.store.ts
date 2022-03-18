import { useSettings } from './settings.store';
import jwt_decode from 'jwt-decode';
import { AccessTokenPayload } from '@/types/stateTypes';
import { defineStore } from 'pinia';

interface State {
  accessToken?: string;
  userId?: number;
  username?: string;
  expiry?: number;
}

export const useAuth = defineStore('auth', {
  state: (): State => ({}),

  actions: {
    async setAccessToken(accessToken: string) {
      this.accessToken = accessToken;

      const payload = jwt_decode<AccessTokenPayload>(accessToken);
      this.userId = payload.userId;
      this.username = payload.username;
      this.expiry = payload.exp * 1000;

      const settingsStore = useSettings();
    },

    tokenValid() {
      return this.expiry ? this.expiry > Date.now() : false;
    },

    clearAccessToken() {
      this.accessToken = undefined;
      this.userId = undefined;
      this.username = undefined;
      this.expiry = undefined;
    },
  },
});
