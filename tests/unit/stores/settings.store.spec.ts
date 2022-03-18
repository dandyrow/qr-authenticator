import { useSettings } from './../../../src/stores/settings.store';
import { createPinia, setActivePinia } from "pinia";

describe('settings store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('checks store values default to false', () => {
        const settings = useSettings();

        expect(settings.loggedIn).toBeFalsy();
        expect(settings.seenIntro).toBeFalsy();
    })
});