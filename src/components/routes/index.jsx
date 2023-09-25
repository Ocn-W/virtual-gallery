import { createBrowserRouter } from "react-router-dom";
import Home from "../home";
import VirtualGallery from "../virtual-gallery";
import Checkout from "../checkout";
import Navigation from "../navigation";

export const router = createBrowserRouter([
  { path: "/", Component: Navigation, children: [
  { path: "/", Component: Home, index: true },
  { path: "/gallery", Component: VirtualGallery },
  { path: "/checkout", Component: Checkout }], 
  },
  ]);