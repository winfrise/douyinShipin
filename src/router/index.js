// index.js
import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/short-video',
    name: 'ShortVideo',
    component: () => import('@/views/short-video/layout.vue'),
    children: [
      {
        path: 'list',
        name: 'ShortVideoList',
        component: () => import('@/views/short-video/list.vue')
      },
      {
        path: "my",
        name: 'My',
        component: () => import('@/views/short-video/my.vue'),
        // 路由独享守卫 进入当前路由时触发
        beforeEnter: (to, from, next) => {
          if (to.path === "/my") {
            // 判断是否登录
            if (localStorage.getItem("Qy") === null) {
              // 未登录的话跳转到首页
              next("/");
            } else {
              // 已登录允许路由导航通过
              next();
            }
          }
        },
      },
      {
        path: "authorHome",
        name: "AuthorHome",
        component: () => import("@/views/short-video/author/authorHome.vue"),
      },
      {
        path: "authorWork",
        name: "AuthorWork",
        component: () => import("@/views/short-video/author/authorWork.vue"),
      },
      {
        path: 'scan-dir',
        name: 'DouyinScanDir',
        component: () => import('@/views/short-video/scan-dir.vue')
      },
      {
        path: 'file-tree',
        name: 'DouyinFileTree',
        component: () => import('@/views/short-video/file-tree.vue')
      }
    ]
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
