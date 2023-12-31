import { lazy } from "react";
import UserDetails from "../pages/UserDetails";
// use lazy for better code splitting, a.k.a. load faster

const Dashboard = lazy(() => import("../pages/Dashboard"));
const { User } = lazy(() => import("../pages/Users"));
const UsersAction = lazy(() => import("../pages/UsersActions"));
const Users = lazy(() => import("../pages/Users"));
const Forms = lazy(() => import("../pages/Forms"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
// const Edit =lazy(()=>import("../Edit"))
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const adminRoutes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/users", // the url
    component: Users, // view rendered
  },
  { path: "/users-action", component: UsersAction },

  // {
  //   path: "/forms",
  //   component: Forms,
  // },
  // {
  //   path: "/cards",
  //   component: Cards,
  // },
  // {
  //   path: "/charts",
  //   component: Charts,
  // },
  // {
  //   path: "/buttons",
  //   component: Buttons,
  // },
  // {
  //   path: "/modals",
  //   component: Modals,
  // },
  // {
  //   path: "/tables",
  //   component: Tables,
  // },
  {
    path: "/404",
    component: Page404,
  },
  // {
  //   path: "/blank",
  //   component: Blank,
  // },
];

const normalRoutes = [
  {
    path: "/details",
    component: UserDetails,
  },
  // {
  //   path: "/Edit", // the url
  //   component: Edit, // view rendered
  // },
];

const routes = {
  admin: adminRoutes,
  normal: normalRoutes,
};

export default routes;
