import { store } from '@/store';
import { StoreRestored } from '@/types/stateTypes';
import { NavigationGuard, RouteLocationNormalized } from 'vue-router';
import paths from '../routePaths';

const introGuard: NavigationGuard = async (to: RouteLocationNormalized) => {
    //Wait for store to be restored
    await (store as StoreRestored).restored;
    const seenIntro: boolean = store.getters['intro/hasSeenIntro'];
    if (!seenIntro && to.fullPath !== paths.INTRO) {
        return paths.INTRO;
    }
};

export default introGuard;