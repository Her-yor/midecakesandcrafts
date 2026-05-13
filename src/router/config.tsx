import React, { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Home = lazy(() => import("../pages/home/page"));
const About = lazy(() => import("../pages/about/page"));
const Products = lazy(() => import("../pages/products/page"));
const Pricing = lazy(() => import("../pages/pricing/page"));
const Gallery = lazy(() => import("../pages/gallery/page"));
const Contact = lazy(() => import("../pages/contact/page"));
const Order = lazy(() => import("../pages/order/page"));
const FAQ = lazy(() => import("../pages/faq/page"));
const Blog = lazy(() => import("../pages/blog/page"));
const PostDetail = lazy(() => import("../pages/blog/PostDetail"));
const Consultation = lazy(() => import("../pages/consultation/page"));
const NotFound = lazy(() => import("../pages/NotFound"));

const Loader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
    <div style={{ width: 40, height: 40, border: "3px solid #f9a8c9", borderTop: "3px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const wrap = (el: React.ReactNode) => <Suspense fallback={<Loader />}>{el}</Suspense>;

const routes: RouteObject[] = [
  { path: "/", element: wrap(<Home />) },
  { path: "/about", element: wrap(<About />) },
  { path: "/products", element: wrap(<Products />) },
  { path: "/pricing", element: wrap(<Pricing />) },
  { path: "/gallery", element: wrap(<Gallery />) },
  { path: "/contact", element: wrap(<Contact />) },
  { path: "/order", element: wrap(<Order />) },
  { path: "/faq", element: wrap(<FAQ />) },
  { path: "/blog", element: wrap(<Blog />) },
  { path: "/blog/:slug", element: wrap(<PostDetail />) },
  { path: "/consultation", element: wrap(<Consultation />) },
  { path: "*", element: wrap(<NotFound />) },
];

export default routes;
