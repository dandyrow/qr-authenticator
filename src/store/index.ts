import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import introModule from './modules/introModule';
import AuthModule from './modules/authModule';
import { RootState } from '@/types/stateTypes';
import VuexPersistence, { AsyncStorage } from 'vuex-persist';
import CapacitorStorage from '@/services/capacitorStorage';

const storage: AsyncStorage = new CapacitorStorage();

const vuexCapacitor = new VuexPersistence<RootState>({
    asyncStorage: true,
    storage: storage,
});

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store: Store<RootState> = createStore<RootState>({
    modules: {
        intro: introModule,
        auth: AuthModule,
    },

    plugins: [vuexCapacitor.plugin],
});

export function useStore(): Store<RootState> {
    return baseUseStore(key);
}