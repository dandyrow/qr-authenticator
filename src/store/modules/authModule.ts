import { ActionTree, Commit, MutationTree } from "vuex";
import { AuthData, AuthState, AuthStatus, UserCreds } from "@/types/stateTypes";
import { requestTokens } from "@/api/auth.api";
import { renderSlot } from "vue";

const state: AuthState = {
  authData: {
    accessToken: "",
    refreshToken: "",
    tokenExp: new Date(),
    userId: "",
    userName: "",
  },
  authStatus: {
    authenticated: false,
    code: 0,
  },
};

const getters = {};

const mutations: MutationTree<AuthState> = {
  saveAuthStatus(state: AuthState, res: Response) {
    state.authStatus = {
      authenticated: res.ok ? true : false,
      code: res.status,
    };
  },

  
};

const actions: ActionTree<AuthState, any> = {
  async login({ commit }, userCreds: UserCreds) {
    const res = await requestTokens(userCreds);
    commit('saveAuthStatus', res);
  },
};

const saveResponse = (res: Response) => {
  const status: AuthStatus = {
    authenticated: res.ok ? true : false,
    code: res.status,
  };
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
