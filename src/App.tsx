import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreateChallenge from "./pages/CreateChallenge";
import MyPage from "./pages/MyPage";
import CurrentChallenges from "./pages/CurrentChallenges";
import BrowseChallenges from "./pages/BrowseChallenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import RecruitingChallengeDetail from "./pages/RecruitingChallengeDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/current-challenges" element={<CurrentChallenges />} />
          <Route path="/current-challenges/:challengeId" element={<ChallengeDetail />} />
          <Route path="/browse-challenges" element={<BrowseChallenges />} />
          <Route path="/browse-challenges/:challengeId" element={<RecruitingChallengeDetail />} />
          <Route path="/create-challenge" element={<CreateChallenge />} />
          <Route path="/my-page" element={<MyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
