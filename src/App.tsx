import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AppProvider, NotificationProvider } from "@/providers";
import { config } from "@/config";
import AppRouter from "@/components/AppRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.ui.refreshInterval,
      refetchOnWindowFocus: false,
      retry: config.api.retries,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <NotificationProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </NotificationProvider>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
