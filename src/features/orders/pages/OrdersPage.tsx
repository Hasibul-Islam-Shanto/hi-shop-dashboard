import { useState } from "react";
import { Search, ChevronDown, Eye } from "lucide-react";
import { PageHeading } from "@/shared/components/PageHeading";
import { StatusBadge } from "@/shared/components/StatusBadge";
import OrderDetailModal, {
  Order,
  OrderStatus,
  orderStatusColors,
} from "@/features/orders/components/OrderDetailModal";

const initialOrders: Order[] = [
  { id: "#ORD-9012", customer: "Marcus Thorne", email: "marcus@example.com", date: "Oct 18, 2024", amount: "$299.00", items: 2, status: "Fulfilled" },
  { id: "#ORD-9013", customer: "Lydia West", email: "l.west@kinetic.io", date: "Oct 18, 2024", amount: "$1,240.50", items: 3, status: "Processing" },
  { id: "#ORD-9014", customer: "Soren K.", email: "soren@gallery.com", date: "Oct 17, 2024", amount: "$89.00", items: 1, status: "Pending" },
  { id: "#ORD-9015", customer: "Mina Chen", email: "mina@designco.com", date: "Oct 17, 2024", amount: "$675.00", items: 2, status: "Shipped" },
  { id: "#ORD-9016", customer: "Kai Andersson", email: "kai@studio.se", date: "Oct 16, 2024", amount: "$445.00", items: 1, status: "Cancelled" },
  { id: "#ORD-9017", customer: "Priya Sharma", email: "priya@craft.in", date: "Oct 16, 2024", amount: "$1,570.00", items: 4, status: "Fulfilled" },
];

const STATUS_OPTIONS = ["All", "Pending", "Processing", "Shipped", "Fulfilled", "Cancelled"];

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="px-4 sm:px-6 py-6">
      <PageHeading label="Manage" title="Orders">
        {/* Search */}
        <div className="hidden sm:flex items-center bg-surface-container rounded-lg px-3 py-1.5 ghost-border w-52">
          <Search className="h-3.5 w-3.5 text-on-surface-variant mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-surface-container text-sm text-on-surface rounded-lg px-3 py-1.5 pr-7 ghost-border focus:outline-none cursor-pointer"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="h-3.5 w-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
        </div>
      </PageHeading>

      {/* Mobile search */}
      <div className="sm:hidden flex items-center bg-surface-container rounded-lg px-3 py-1.5 ghost-border mb-4">
        <Search className="h-3.5 w-3.5 text-on-surface-variant mr-2 shrink-0" />
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
        />
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateStatus}
        />
      )}

      {/* Orders table */}
      <div className="bg-card rounded-xl overflow-hidden ghost-border shadow-[var(--shadow-sm)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-outline-variant/10">
                <th className="label-text text-[10px] px-5 py-3">Customer</th>
                <th className="label-text text-[10px] px-3 py-3">Order ID</th>
                <th className="label-text text-[10px] px-3 py-3 hidden sm:table-cell">Date</th>
                <th className="label-text text-[10px] px-3 py-3 hidden sm:table-cell">Items</th>
                <th className="label-text text-[10px] px-3 py-3">Amount</th>
                <th className="label-text text-[10px] px-3 py-3">Status</th>
                <th className="label-text text-[10px] px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-on-surface-variant">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr
                    key={order.id}
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
                      {order.id}
                    </td>
                    <td className="px-3 py-3 text-sm text-on-surface-variant whitespace-nowrap hidden sm:table-cell">
                      {order.date}
                    </td>
                    <td className="px-3 py-3 text-sm text-on-surface hidden sm:table-cell">
                      {order.items}
                    </td>
                    <td className="px-3 py-3 text-sm font-semibold text-on-surface whitespace-nowrap">
                      {order.amount}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={order.status} colorMap={orderStatusColors} />
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-on-surface-variant hover:text-primary transition-colors p-1"
                        aria-label="View order"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-outline-variant/10">
          <p className="text-xs text-on-surface-variant">
            {filtered.length} of {orders.length} orders
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
