import { AuthData, AuthState } from "@/types/stateTypes";
import { ActionTree, Commit, MutationTree } from "vuex";

const state: AuthState = {
    authData: {
        token: '',
        refreshToken: '',
        tokenExp: '',
        userId: '',
        userEmail: '',
    },
    authenticated: false,
};

const getters = {};

const mutations: MutationTree<AuthState> = {
    saveAuthToken(state: AuthState, token: string) {
        //TODO: Decode JWT payload
        const newAuthData: AuthData = {
            token: '',
            refreshToken: '',
            tokenExp: '',
            userId: '',
            userEmail: '',
        };
        state.authData = newAuthData;
    },

    saveAuthenticatedStatus(state: AuthState, status: boolean) {
        state.authenticated = status;
    },
};

const actions: ActionTree<AuthState, any> = {
    login({ commit }: { commit: Commit }, userDetails: { email: string, password: string }) {
        if (userDetails.email === 'dandyrow' && userDetails.password === 'manbob') {
            commit('saveAuthenticatedStatus', true);
        } else {
            commit('saveAuthenticatedStatus', false);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};