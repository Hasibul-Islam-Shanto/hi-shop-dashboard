import { LayoutDashboard, PackageSearch, ShoppingCart, BarChart3 } from "lucide-react";

export const sidebarLinks = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Inventory", icon: PackageSearch, path: "/admin/inventory" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
];

export const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/inventory": "Inventory",
  "/admin/orders": "Orders",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
};
