import { getBasePath } from "./helpers.js";

const basePath = getBasePath();

export const Router ={
  // BASE
  base: () => {
    window.location.assign(`${basePath}/index.html`);
  },
// ADMIN
  adminLogin : () => {
    window.location.assign(`${basePath}/admin/login/index.html`);
  },
  adminViewAllUsers : () => {
    window.location.assign(`${basePath}/admin/view-user-all/index.html`);
  },
  adminChangeUser : (id) => {
    window.location.assign(`${basePath}/admin/change-user/index.html?id=${id}`);
  },
  adminAddUser: () => {
    window.location.assign(`${basePath}/admin/add-user/index.html`);
  },
  adminViewSelectedUser: (id) => {
    window.location.assign(`${basePath}/admin/view-user-all/mobile-view/index.html?id=${id}`);
  },

  adminViewAllArticles: () => {
    window.location.assign(`${basePath}/admin/view-articles-all/index.html`);
  },
  adminAddArticle: () => {
    window.location.assign(`${basePath}/admin/add-article/index.html`);
  },
  adminChangeArticle: (id) => {
    window.location.assign(`${basePath}/admin/change-article/index.html?id=${id}`);
  },

  // WORKER
  workerLogin: (id) => {
    window.location.assign(`${basePath}/worker/login/index.html?id=${id}`);
  },
  workerAdd: (id) => {
    window.location.assign(`${basePath}/worker/add-order/index.html?id=${id}`);
  },
  workerCharge: (id) => {
    window.location.assign(`${basePath}/worker/charge-order/index.html?id=${id}`);
  },
  workerChoose: (id) => {
    window.location.assign(`${basePath}/worker/choose/index.html?id=${id}`);
  },

  // USER
  userView: (id) => {
    window.location.assign(`${basePath}/user/index.html?id=${id}`);
  }
}
