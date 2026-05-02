import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/shared/components/StatusBadge";
import type { Order, OrderStatus } from "../schemas/types";
import useUpdateStatus from "../hooks/useUpdateStatus";

export type { Order, OrderStatus };

const ALL_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
];

export const orderStatusColors: Record<OrderStatus, string> = {
  PENDING: "text-on-surface-variant bg-surface-container",
  CONFIRMED: "text-primary bg-primary/10",
  PROCESSING: "text-secondary bg-secondary/10",
  SHIPPED: "text-tertiary bg-tertiary/10",
  DELIVERED: "text-green-600 bg-green-500/10",
  CANCELLED: "text-destructive bg-destructive/10",
  REFUNDED: "text-orange-600 bg-orange-500/10",
};

const formatDate = (value: string | null | undefined): string => {
  if (!value || typeof value !== "string") return "—";
  const d = new Date(value);
  return isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
};

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderDetailModal = ({
  order,
  onClose,
  onUpdateStatus,
}: OrderDetailModalProps) => {
  const { updateStatus, isUpdating } = useUpdateStatus();
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const customerName = `${order.user.firstName} ${order.user.lastName}`;

  const handleUpdateStatus = async (status: OrderStatus) => {
    if (status === order.status || isUpdating) return;
    setUpdateError(null);
    setPendingStatus(status);
    const result = await updateStatus(order.id, status);
    setPendingStatus(null);
    if (result.success) {
      onUpdateStatus(order.id, status);
    } else {
      setUpdateError(result.error ?? "Failed to update status.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card rounded-2xl p-5 w-full max-w-lg ghost-border shadow-(--shadow-xl) animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-on-surface">
              Order{" "}
              <span className="font-mono text-sm">{order.id.slice(0, 8)}…</span>
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5 p-4 bg-surface-container-low rounded-xl">
          <div>
            <p className="label-text text-[10px] mb-0.5">Customer</p>
            <p className="text-sm font-semibold text-on-surface">
              {customerName}
            </p>
          </div>
          <div>
            <p className="label-text text-[10px] mb-0.5">Email</p>
            <p className="text-sm text-on-surface-variant truncate">
              {order.user.email}
            </p>
          </div>
          <div>
            <p className="label-text text-[10px] mb-0.5">Amount</p>
            <p className="text-sm font-semibold text-on-surface">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="label-text text-[10px] mb-0.5">Items</p>
            <p className="text-sm text-on-surface">{order.items.length}</p>
          </div>
          <div>
            <p className="label-text text-[10px] mb-0.5">Status</p>
            <StatusBadge status={order.status} colorMap={orderStatusColors} />
          </div>
          {order.notes && (
            <div className="col-span-2">
              <p className="label-text text-[10px] mb-0.5">Notes</p>
              <p className="text-sm text-on-surface-variant">{order.notes}</p>
            </div>
          )}
        </div>

        {order.items.length > 0 && (
          <div className="mb-5">
            <p className="label-text text-[10px] mb-2">Order Items</p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-on-surface truncate">
                      {item.productVariant.sku}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {item.productVariant.color} · {item.productVariant.size} ·
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-on-surface shrink-0 ml-4">
                    ${item.subtotal.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="label-text text-[10px] mb-2">Update Status</p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_STATUSES.map((s) => {
            const isActive = order.status === s;
            const isThisUpdating = pendingStatus === s;
            return (
              <Button
                key={s}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handleUpdateStatus(s)}
                disabled={isUpdating || isActive}
                className="text-xs min-w-[90px]"
              >
                {isThisUpdating ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  s.charAt(0) + s.slice(1).toLowerCase()
                )}
              </Button>
            );
          })}
        </div>

        {updateError && (
          <p className="mt-3 text-xs text-destructive">{updateError}</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetailModal;
