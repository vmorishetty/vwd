import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Get the base API URL based on environment
const getApiBaseUrl = () => {
  // Check if we're in production (Netlify)
  if (import.meta.env.PROD) {
    return '/.netlify/functions/api';
  }
  // Otherwise we're in development
  return '';
};

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Add the base API URL for production if needed
  const baseUrl = getApiBaseUrl();
  const fullUrl = url.startsWith('/api') ? `${baseUrl}${url}` : url;
  
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Get the path from the query key
    const path = queryKey[0] as string;
    
    // Add the base API URL for production if needed
    const baseUrl = getApiBaseUrl();
    const fullUrl = path.startsWith('/api') ? `${baseUrl}${path}` : path;
    
    const res = await fetch(fullUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
