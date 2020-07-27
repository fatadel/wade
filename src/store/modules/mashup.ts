export default {
  namespaced: true,
  state: {
    mashupTabbar: [
      {
        tabId: "editor",
        tabTitle: "Editor",
        tabStyle: "tab-container-in-tabbar",
        tabLink: "/editor",
        tabIsActive: false
      },
      {
        tabId: "deployment",
        tabTitle: "Deployment",
        tabStyle: "tab-container-in-tabbar",
        tabLink: "/deployment",
        tabIsActive: false
      },
      {
        tabId: "performance",
        tabTitle: "Performance",
        tabStyle: "tab-container-in-tabbar",
        tabLink: "/performance",
        tabIsActive: false
      }
    ]
  },
  getters: {
    getMashupTabbar(state: any) {
      return state.mashupTabbar;
    }
  },
  mutations: {
    setTabs(state: any, payload: any) {
      state.mashupTabbar = payload;
    }
  }
};
