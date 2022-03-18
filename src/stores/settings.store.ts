import { defineStore } from 'pinia';

interface State {
    seenIntro: boolean,
    loggedIn: boolean,
}

export const useSettings = defineStore('settings', {
    state: (): State => ({
        seenIntro: false,
        loggedIn: false,
    }),

    persist: {
        enabled: true,
        strategies: [{
            storage: localStorage,
        }],
    },
});