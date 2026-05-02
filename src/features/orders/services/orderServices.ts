import axiosInstance from "@/axios/axios.config";
import type { Order, OrderStatus, PaginationMeta } from "../schemas/types";

export interface OrdersResponse {
  data: Order[];
  meta: PaginationMeta;
}

export const getOrders = async (): Promise<OrdersResponse> => {
  const response = await axiosInstance.get("/orders");
  return response.data;
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
): Promise<Order> => {
  const response = await axiosInstance.patch(`/orders/${orderId}/status`, {
    status,
  });
  return response.data;
};
