import { IntroState } from "@/types/stateTypes";
import { GetterTree, MutationTree } from "vuex";

const state: IntroState = {
  seenIntro: false,
};

const getters: GetterTree<IntroState, any> = {
  hasSeenIntro(state: IntroState) {
    return state.seenIntro;
  },
};

const mutations: MutationTree<IntroState> = {
  setSeenIntro(state: IntroState, value: boolean) {
    state.seenIntro = value;
  },
};

export default {
  state,
  getters,
  mutations,
};
