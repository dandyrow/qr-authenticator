import { defineStore } from 'pinia';

interface State {
    seenIntro: boolean,
    loggedIn: boolean,
    pin: number,
}

export const useSettings = defineStore('settings', {
    state: (): State => ({
        seenIntro: false,
        loggedIn: false,
        pin: 0,
    }),

    persist: {
        enabled: true,
        strategies: [{
            storage: localStorage,
        }],
    },
});