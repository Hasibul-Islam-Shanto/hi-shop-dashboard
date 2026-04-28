import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/shared/components/StatusBadge";

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Fulfilled" | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  amount: string;
  items: number;
  status: OrderStatus;
}

const ALL_STATUSES: OrderStatus[] = ["Pending", "Processing", "Shipped", "Fulfilled", "Cancelled"];

export const orderStatusColors: Record<string, string> = {
  Pending: "text-on-surface-variant bg-surface-container",
  Processing: "text-primary bg-primary/10",
  Shipped: "text-secondary bg-secondary/10",
  Fulfilled: "text-tertiary bg-tertiary/10",
  Cancelled: "text-destructive bg-destructive/10",
};

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderDetailModal = ({ order, onClose, onUpdateStatus }: OrderDetailModalProps) => {
  return (
    <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-5 w-full max-w-lg ghost-border shadow-[var(--shadow-xl)] animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-on-surface">Order {order.id}</h2>
            <p className="text-xs text-on-surface-variant mt-0.5">{order.date}</p>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5 p-4 bg-surface-container-low rounded-xl">
          <div>
            <p className="label-text text-[10px] mb-0.5">Customer</p>
            <p className="text-sm font-semibold text-on-surface">{order.customer}</p>
          </div>
          <div>
            <p className="label-text text-[10px] mb-0.5">Email</p>
            <p className="text-sm text-on-surface-variant truncate">{order.email}</p>
          </div>
          <div>
            <p className="label-text text-[10px] mb-0.5">Amount</p>
            <p className="text-sm font-semibold text-on-surface">{order.amount}</p>
          </div>
          <div>
            <p className="label-text text-[10px] mb-0.5">Items</p>
            <p className="text-sm text-on-surface">{order.items}</p>
          </div>
          <div>
            <p className="label-text text-[10px] mb-0.5">Status</p>
            <StatusBadge status={order.status} colorMap={orderStatusColors} />
          </div>
        </div>

        {/* Update Status */}
        <p className="label-text text-[10px] mb-2">Update Status</p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_STATUSES.map((s) => (
            <Button
              key={s}
              variant={order.status === s ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdateStatus(order.id, s)}
              className="text-xs"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
