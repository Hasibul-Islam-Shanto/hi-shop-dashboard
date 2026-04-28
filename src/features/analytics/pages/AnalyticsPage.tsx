import {
  TrendingUp, DollarSign, ShoppingCart, Users, Package,
} from "lucide-react";
import { PageHeading } from "@/shared/components/PageHeading";

const metrics = [
  { label: "Total Revenue", value: "$128,430", change: "+12%", icon: DollarSign, color: "text-primary bg-primary/10" },
  { label: "Total Orders", value: "2,401", change: "+8.4%", icon: ShoppingCart, color: "text-secondary bg-secondary/10" },
  { label: "Active Users", value: "14,230", change: "+22%", icon: Users, color: "text-tertiary bg-tertiary/10" },
  { label: "Products Sold", value: "3,842", change: "+15%", icon: Package, color: "text-primary bg-primary/10" },
];

const topProducts = [
  { name: "Aris Sculpture Coat", sales: 142, revenue: "$127,090" },
  { name: "Orbital Frame Bag", sales: 98, revenue: "$122,500" },
  { name: "Cloud Cashmere Rollneck", sales: 87, revenue: "$38,715" },
  { name: "Studio Audio One", sales: 76, revenue: "$26,600" },
  { name: "Flux Terrain Runner", sales: 65, revenue: "$20,800" },
];

const monthlyData = [
  { month: "May", revenue: 68000 },
  { month: "Jun", revenue: 82000 },
  { month: "Jul", revenue: 75000 },
  { month: "Aug", revenue: 91000 },
  { month: "Sep", revenue: 105000 },
  { month: "Oct", revenue: 128430 },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

const AnalyticsPage = () => {
  return (
    <div className="px-4 sm:px-6 py-6">
      <PageHeading label="Insights" title="Analytics" />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-card rounded-xl p-4 ghost-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${m.color}`}>
                <m.icon className="h-4 w-4" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-tertiary">
                <TrendingUp className="h-3 w-3" /> {m.change}
              </span>
            </div>
            <p className="text-[10px] text-on-surface-variant mb-0.5">{m.label}</p>
            <p className="text-xl font-extrabold text-on-surface">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Trend + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl p-5 ghost-border shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-on-surface">Revenue Trend</h3>
            <span className="label-text text-[10px]">May – Oct 2024</span>
          </div>
          <div className="flex items-end gap-2 h-44">
            {monthlyData.map((d) => {
              const isMax = d.revenue === maxRevenue;
              const heightPct = (d.revenue / maxRevenue) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-on-surface-variant">
                    ${(d.revenue / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full rounded-t-md relative overflow-hidden group cursor-default transition-all duration-300"
                    style={{ height: `${heightPct}%` }}
                  >
                    <div
                      className={`absolute inset-0 rounded-t-md transition-opacity duration-300 ${
                        isMax ? "bg-primary opacity-100" : "bg-primary opacity-40 group-hover:opacity-60"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-on-surface-variant">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card rounded-xl p-5 ghost-border shadow-[var(--shadow-sm)]">
          <h3 className="text-sm font-bold text-on-surface mb-4">Top Products</h3>
          <div className="space-y-3.5">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-on-surface-variant w-4 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-on-surface truncate">{p.name}</p>
                  <p className="text-xs text-on-surface-variant">{p.sales} sales</p>
                </div>
                <span className="text-sm font-bold text-primary whitespace-nowrap">{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-5 ghost-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-sm font-bold text-on-surface mb-1">Conversion Rate</h3>
          <p className="text-2xl font-extrabold text-primary">3.8%</p>
          <p className="text-xs text-on-surface-variant mt-0.5">Up 0.4% from last month</p>
        </div>
        <div className="bg-card rounded-xl p-5 ghost-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-sm font-bold text-on-surface mb-1">Avg. Order Value</h3>
          <p className="text-2xl font-extrabold text-secondary">$534</p>
          <p className="text-xs text-on-surface-variant mt-0.5">Up $42 from last month</p>
        </div>
        <div className="bg-card rounded-xl p-5 ghost-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-sm font-bold text-on-surface mb-1">Return Rate</h3>
          <p className="text-2xl font-extrabold text-tertiary">2.1%</p>
          <p className="text-xs text-on-surface-variant mt-0.5">Down 0.3% from last month</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
