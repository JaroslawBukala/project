import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _613a7d2c = () => interopDefault(import('..\\pages\\Auth\\profile.vue' /* webpackChunkName: "pages/Auth/profile" */))
const _8bbb72e2 = () => interopDefault(import('..\\pages\\Auth\\Signin.vue' /* webpackChunkName: "pages/Auth/Signin" */))
const _628ec5f6 = () => interopDefault(import('..\\pages\\Auth\\Signup.vue' /* webpackChunkName: "pages/Auth/Signup" */))
const _76dbcb53 = () => interopDefault(import('..\\pages\\Posts\\addPost.vue' /* webpackChunkName: "pages/Posts/addPost" */))
const _5a630076 = () => interopDefault(import('..\\pages\\Posts\\posts.vue' /* webpackChunkName: "pages/Posts/posts" */))
const _21870874 = () => interopDefault(import('..\\pages\\Posts\\postsPage.vue' /* webpackChunkName: "pages/Posts/postsPage" */))
const _1ddc82e1 = () => interopDefault(import('..\\pages\\albums\\_id.vue' /* webpackChunkName: "pages/albums/_id" */))
const _a9ff30d6 = () => interopDefault(import('..\\pages\\books\\_id.vue' /* webpackChunkName: "pages/books/_id" */))
const _132fc0ec = () => interopDefault(import('..\\pages\\Posts\\_postId.vue' /* webpackChunkName: "pages/Posts/_postId" */))
const _ba1fa9c6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Auth/profile",
    component: _613a7d2c,
    name: "Auth-profile"
  }, {
    path: "/Auth/Signin",
    component: _8bbb72e2,
    name: "Auth-Signin"
  }, {
    path: "/Auth/Signup",
    component: _628ec5f6,
    name: "Auth-Signup"
  }, {
    path: "/Posts/addPost",
    component: _76dbcb53,
    name: "Posts-addPost"
  }, {
    path: "/Posts/posts",
    component: _5a630076,
    name: "Posts-posts"
  }, {
    path: "/Posts/postsPage",
    component: _21870874,
    name: "Posts-postsPage"
  }, {
    path: "/albums/:id?",
    component: _1ddc82e1,
    name: "albums-id"
  }, {
    path: "/books/:id?",
    component: _a9ff30d6,
    name: "books-id"
  }, {
    path: "/Posts/:postId?",
    component: _132fc0ec,
    name: "Posts-postId"
  }, {
    path: "/",
    component: _ba1fa9c6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
