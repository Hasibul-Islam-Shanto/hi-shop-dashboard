import { useState, useEffect, useCallback } from "react";
import type { Order, PaginationMeta } from "../schemas/types";
import { getOrders } from "../services/orderServices";

const useGetOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getOrders();
      setOrders(response.data);
      setMeta(response.meta);
    } catch {
      setError("Failed to load orders.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { orders, setOrders, meta, isLoading, error, reload: load };
};

export default useGetOrders;
