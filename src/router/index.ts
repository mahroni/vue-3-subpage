import { createRouter as createVueRouter, createWebHistory } from "vue-router";
import type { Router, RouteRecordRaw } from "vue-router";
import Home from "../views/ChannelPage.vue";

export function createRouter(appId?: string | number): Router {
  const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/whatsapp",
      name: "whatsapp",
      beforeEnter: () => {
        window.location.href = `/integration?channel=whatsapp`;
        return false;
      },
    },
    {
      path: "/instagram",
      name: "instagram",
      beforeEnter: () => {
        window.location.href = `/integration?channel=instagram`;
        return false;
      },
    },
    {
      path: "/tiktok",
      name: "tiktok",
      beforeEnter: () => {
        window.location.href = `/integration?channel=tiktok`;
        return false;
      },
    },
    {
      path: "/facebook",
      name: "facebook",
      beforeEnter: () => {
        window.location.href = `/integration?channel=facebook",`;
        return false;
      },
    },
    {
      path: "/line",
      name: "line",
      beforeEnter: () => {
        window.location.href = `/integration?channel=line",`;
        return false;
      },
    },
    {
      path: "/telegram",
      name: "telegram",
      beforeEnter: () => {
        window.location.href = `/integration?channel=telegram",`;
        return false;
      },
    },
    {
      path: "/qiscus",
      name: "qiscus",
      component: () => import("../views/QiscusChannelView.vue"),
    },
    {
      path: "/custom_channel",
      name: "custom_channel",
      beforeEnter: () => {
        window.location.href = `/integration?channel=custom_channel`;
        return false;
      },
    },
    {
      path: "/bot_integration",
      name: "bot_integration",
      beforeEnter: () => {
        window.location.href = `/integration?channel=bot_integration`;
        return false;
      },
    },
    {
      path: "/auto-responder",
      name: "auto-responder",
      component: () => import("../views/AutoResponder.vue"),
    },
    {
      path: "/widget",
      name: "widget",
      component: () => import("../pages/integration/widget/WidgetLayout.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/About.vue"),
    },
  ];

  // Use the provided appId or fall back to window.vueAppBaseId
  let dynamicAppId = "";

  if (appId) {
    dynamicAppId = String(appId);
  } else if (
    typeof window !== "undefined" &&
    "vueAppBaseId" in window &&
    window.vueAppBaseId
  ) {
    dynamicAppId = String(window.vueAppBaseId);
  }

  console.log("ROUTER DEBUG: Using appId:", dynamicAppId);

  const VUE_ROUTER_BASE_PATH = dynamicAppId
    ? `/web/${dynamicAppId}/new-integration/`
    : "/";

  const router = createVueRouter({
    history: createWebHistory(VUE_ROUTER_BASE_PATH),
    routes: routes as RouteRecordRaw[],
  });

  router.beforeEach((to, from, next) => {
    console.log(
      "ROUTER DEBUG (4): Navigating from:",
      from.fullPath,
      "to:",
      to.fullPath
    );
    next();
  });

  router.afterEach((to) => {
    console.log("ROUTER DEBUG (5): Successfully navigated to:", to.fullPath);
  });

  return router;
}

// Declare global window property
declare global {
  interface Window {
    vueAppBaseId?: string | number;
  }
}
