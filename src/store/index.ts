import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import VuexPersistence, { AsyncStorage } from 'vuex-persist';

import introModule from './modules/introModule';
import authModule from './modules/authModule';
import { RootState } from '@/types/stateTypes';
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
        auth: authModule,
    },

    plugins: [vuexCapacitor.plugin],
});

/***
 * Avoids having to import InjectionKey when using the store.
 * Instead this useStore() method should be used over the default one.
 */
export function useStore(): Store<RootState> {
    return baseUseStore(key);
}