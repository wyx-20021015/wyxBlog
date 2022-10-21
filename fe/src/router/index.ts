import { createRouter, createWebHistory, RouteLocationRaw, RouteRecordRaw } from "vue-router";

import { Component, defineAsyncComponent } from "@vue/runtime-core";

import Loading from "../pages/Loading.vue"

import setTitle from "../utils/setTitle";

const AboutMe = defineAsyncComponent({
  loader: () => import("../pages/AboutMe.vue"),
  loadingComponent: Loading,
});
const Article = defineAsyncComponent({
  loader: () => import("../pages/Article.vue"),
  loadingComponent: Loading,
})
const Message = defineAsyncComponent({
  loader: () => import("../pages/Message.vue"),
  loadingComponent: Loading,
})
const Login = defineAsyncComponent({
  loader: () => import("../pages/Login.vue"),
  loadingComponent: Loading
})
const AdminArticles = defineAsyncComponent({
  loader: () => import("../pages/admin/article.admin.vue"),
  loadingComponent: Loading
})
const NotFound = defineAsyncComponent({
  loader: () => import("../pages/notfound.vue"),
  loadingComponent: Loading
})
const Log = defineAsyncComponent({
  loader: () => import("../pages/admin/log.admin.vue"),
  loadingComponent: Loading
})
const MessageAdmin = defineAsyncComponent({
  loader: () => import("../pages/admin/message.admin.vue"),
  loadingComponent: Loading
})
const Todo = defineAsyncComponent({
  loader: () => import("../pages/admin/todo.admin.vue"),
  loadingComponent: Loading
})
const ArticleDetail = defineAsyncComponent({
  loader: () => import("../pages/ArticleDetail.vue"),
  loadingComponent: Loading
})
import verifyAuth from "../utils/verifyAuth"

let routes: RouteRecordRaw[] = [
  {
    path: "/loading",
    name: "loading",
    component: Loading
  },
  {
    path: "/article/:id",
    name: "article-detail",
    props: (route) => ({
      id: route.params.id,
    }),
    beforeEnter: (to) => {
      if (!to.params.id) return { name: "notfound" };
    },
    meta: {
      title: "文章详情"
    },
    component: ArticleDetail
  },
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页",
    },
    redirect: "/article?offset=1",
  },
  {
    path: "/article",

    name: "article",
    meta: {
      title: "文章"
    },
    props: (route) => ({
      tag: route.query.tag,
      offset: route.query.offset
    }),
    beforeEnter: (to) => {
      if (!to.query.offset) return { name: `notfound` }
    },
    component: Article
  },
  {
    path: "/aboutMe",
    name: "aboutMe",
    meta: {
      title: "关于我",
    },
    component: AboutMe
  },
  {
    path: "/message",
    name: "message",
    meta: {
      title: "留言"
    },
    component: Message
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      none: true
    },
    component: Login
  },
  {
    path: "/admin",
    name: "admin",
    meta: {
      title: "管理后台",
      admin: true
    },
    redirect: "/admin/article"
  },
  {
    path: "/admin/article",
    name: "admin-article",
    meta: { admin: true, title: "文章管理" },
    beforeEnter: (to, from, next) => { verifyAuth(to, from, next) },
    component: AdminArticles,
  },
  {
    path: "/notfound",
    name: "notfound",
    meta: { none: true, title: "啥都没有" },
    component: NotFound
  },
  {
    path: "/admin/log",
    name: "log",
    component: Log,
    meta: { admin: true, title: "日志管理" },
  },
  {
    path: "/admin/todo",
    name: "todo",
    component: Todo,
    meta: { admin: true, title: "任务清单" },
  },
  {
    path: "/admin/message",
    name: "MessageAdmin",
    component: MessageAdmin,
    meta: { admin: true, title: "管理留言" },
  },
  {
    path: "/:path(.*)",
    redirect: {
      name: "notfound",
    },
  },

]
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from) => {
  setTitle((to.meta.title as string) || "嘿嘿嘿");
});
export default router
export * from "./navigateTo"