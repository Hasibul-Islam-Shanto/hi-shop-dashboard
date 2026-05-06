import axiosInstance from "@/axios/axios.config";
import type { Order, OrderStatus, PaginationMeta } from "../schemas/types";

export interface OrdersResponse {
  data: Order[];
  meta: PaginationMeta;
}

export interface GetOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatus | "All";
}

export const getOrders = async (params?: GetOrdersParams): Promise<OrdersResponse> => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.status && params.status !== "All") query.set("status", params.status);

  const response = await axiosInstance.get(`/orders?${query.toString()}`);
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
