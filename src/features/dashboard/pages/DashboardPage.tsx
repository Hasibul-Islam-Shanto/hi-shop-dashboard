import { Link } from "react-router-dom";
import {
  BarChart3, ShoppingCart, TrendingUp, ArrowUpRight,
  MoreHorizontal, Calendar, Download, Filter, Search,
  Plus, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/shared/components/PageHeading";
import { StatusBadge } from "@/shared/components/StatusBadge";

const recentOrders = [
  { customer: "Marcus Thorne", email: "marcus@example.com", orderId: "#ORD-9012", date: "Oct 18, 2024", amount: "$299.00", status: "Fulfilled" },
  { customer: "Lydia West", email: "l.west@kinetic.io", orderId: "#ORD-9013", date: "Oct 18, 2024", amount: "$1,240.50", status: "Processing" },
  { customer: "Soren K.", email: "soren@gallery.com", orderId: "#ORD-9014", date: "Oct 17, 2024", amount: "$89.00", status: "Pending" },
];

const orderStatusColors: Record<string, string> = {
  Fulfilled: "text-tertiary bg-tertiary/10",
  Processing: "text-primary bg-primary/10",
  Pending: "text-on-surface-variant bg-surface-container",
};

const revenueBars = [30, 45, 35, 55, 40, 65, 80];
const orderBars = [25, 40, 30, 50, 60, 45, 70];

const DashboardPage = () => {
  return (
    <div className="px-4 sm:px-6 py-6">
      <PageHeading label="Overview" title="Dashboard">
        <Button variant="outline" size="sm">
          <Calendar className="h-3.5 w-3.5 mr-1.5" /> Oct 12 – 19
        </Button>
        <Button variant="hero" size="sm">
          <Download className="h-3.5 w-3.5 mr-1.5" /> Export
        </Button>
      </PageHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl p-5 ghost-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-tertiary">
              <TrendingUp className="h-3 w-3" /> 12%
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mb-0.5">Total Revenue</p>
          <p className="text-2xl font-extrabold text-on-surface">$128,430</p>
          <div className="flex gap-1 mt-3 items-end h-8">
            {revenueBars.map((h, i) => (
              <div key={i} className="flex-1">
                <div
                  className={`w-full rounded-sm transition-all duration-300 ${i === 6 ? "bg-primary" : "bg-surface-container-high"}`}
                  style={{ height: `${h * 0.38}px` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-5 ghost-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-secondary" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-tertiary">
              <TrendingUp className="h-3 w-3" /> 8.4%
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mb-0.5">Active Orders</p>
          <p className="text-2xl font-extrabold text-on-surface">1,240</p>
          <div className="flex gap-1 mt-3 items-end h-8">
            {orderBars.map((h, i) => (
              <div key={i} className="flex-1">
                <div
                  className={`w-full rounded-sm transition-all duration-300 ${i === 6 ? "bg-secondary" : "bg-surface-container-high"}`}
                  style={{ height: `${h * 0.38}px` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-5 ghost-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-on-surface">Inventory</h3>
            <span className="text-[10px] text-tertiary font-semibold">Real-time</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="label-text text-[10px] mb-0.5">In Stock</p>
              <p className="text-2xl font-extrabold text-on-surface">4,802</p>
            </div>
            <div>
              <p className="label-text text-[10px] mb-0.5">Low Stock</p>
              <p className="text-2xl font-extrabold text-tertiary">24</p>
            </div>
          </div>
          <Button variant="outline" className="w-full" size="sm" asChild>
            <Link to="/admin/inventory">View Inventory</Link>
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-on-surface">Recent Orders</h2>
            <p className="text-xs text-on-surface-variant">Last 50 transactions</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Filter className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-xl overflow-hidden ghost-border shadow-[var(--shadow-sm)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="text-left border-b border-outline-variant/10">
                  <th className="label-text text-[10px] px-5 py-3">Customer</th>
                  <th className="label-text text-[10px] px-3 py-3">Order ID</th>
                  <th className="label-text text-[10px] px-3 py-3 hidden sm:table-cell">Date</th>
                  <th className="label-text text-[10px] px-3 py-3">Amount</th>
                  <th className="label-text text-[10px] px-3 py-3">Status</th>
                  <th className="label-text text-[10px] px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="hover:bg-surface-container-low/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {order.customer.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-on-surface truncate">{order.customer}</p>
                          <p className="text-xs text-on-surface-variant truncate">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-on-surface-variant font-mono whitespace-nowrap">
                      {order.orderId}
                    </td>
                    <td className="px-3 py-3 text-sm text-on-surface-variant whitespace-nowrap hidden sm:table-cell">
                      {order.date}
                    </td>
                    <td className="px-3 py-3 text-sm font-semibold text-on-surface whitespace-nowrap">
                      {order.amount}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={order.status} colorMap={orderStatusColors} />
                    </td>
                    <td className="px-3 py-3">
                      <button className="text-on-surface-variant hover:text-on-surface transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-5 py-3 border-t border-outline-variant/10">
            <p className="text-xs text-on-surface-variant">1–10 of 2,401</p>
            <div className="flex items-center gap-1">
              <button className="h-7 w-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                    page === 1
                      ? "bg-primary text-primary-foreground"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="h-7 w-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl p-6 ghost-border shadow-[var(--shadow-sm)]">
          <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-3">
            New Insight
          </span>
          <h3 className="text-lg font-extrabold text-on-surface mb-2 leading-tight">
            Holiday traffic is 40% higher than baseline.
          </h3>
          <p className="text-sm text-on-surface-variant mb-4">
            Consider increasing stock for the 'Editorial' collection.
          </p>
          <Link
            to="/admin/analytics"
            className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline w-fit"
          >
            Explore <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="bg-card rounded-xl p-6 ghost-border shadow-[var(--shadow-sm)]">
          <h3 className="text-lg font-extrabold text-on-surface mb-4">System Health</h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-tertiary shrink-0" />
              <span className="label-text text-[10px]">Main Node: Online</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-tertiary shrink-0" />
              <span className="label-text text-[10px]">Edge: 12ms</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
              <span className="label-text text-[10px]">API Gateway: 99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-[0_4px_14px_hsl(var(--primary)/0.3)] hover:scale-105 hover:shadow-[0_6px_20px_hsl(var(--primary)/0.4)] transition-all duration-200 z-10">
        <Plus className="h-5 w-5 text-primary-foreground" />
      </button>
    </div>
  );
};

export default DashboardPage;
