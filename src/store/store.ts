import Vue from 'vue';
import Vuex from 'vuex';
import SidebarStore from './modules/sidebar';
import TdStore from './modules/td';
import MashupStore from './modules/mashup';
import ModalStore from './modules/modal';
import TextStore from './modules/texts';
import PersistedState from 'vuex-electron-store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    SidebarStore,
    TdStore,
    MashupStore,
    ModalStore,
    TextStore,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    PersistedState.create(),
  ],
});
