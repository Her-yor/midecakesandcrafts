import React from "react";
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import About from "../pages/about/page";
import Products from "../pages/products/page";
import Pricing from "../pages/pricing/page";
import Gallery from "../pages/gallery/page";
import Contact from "../pages/contact/page";
import Order from "../pages/order/page";
import FAQ from "../pages/faq/page";
import Blog from "../pages/blog/page";
import PostDetail from "../pages/blog/PostDetail";
import Consultation from "../pages/consultation/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/:slug",
    element: <PostDetail />,
  },
  {
    path: "/consultation",
    element: <Consultation />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
