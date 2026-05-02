import { useState } from "react";
import { updateOrderStatus } from "../services/orderServices";
import { OrderStatus } from "../schemas/types";

const useUpdateStatus = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response = await updateOrderStatus(orderId, status);
      return { success: true, data: response };
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Failed to update product.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsUpdating(false);
    }
  };
  return { updateStatus, isUpdating, error };
};

export default useUpdateStatus;
