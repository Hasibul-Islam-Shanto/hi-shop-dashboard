import axios from "axios";

const ACCESS_TOKEN_KEY = "hi-shop-access-token";
const REFRESH_TOKEN_KEY = "hi-shop-refresh-token";
const AUTH_KEY = "hi-shop-auth";

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);

export const setTokens = (access: string, refresh: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  localStorage.setItem(AUTH_KEY, "true");
};

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTH_KEY);
};

let refreshPromise: Promise<string | null> | null = null;

export const memoizedRefreshToken = (): Promise<string | null> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) return null;

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-tokens`,
        { refreshToken },
      );

      const newAccess: string | undefined = data?.data?.access?.token;
      const newRefresh: string | undefined = data?.data?.refresh?.token;

      if (!newAccess) return null;

      setTokens(newAccess, newRefresh ?? refreshToken);
      return newAccess;
    } catch {
      clearTokens();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
