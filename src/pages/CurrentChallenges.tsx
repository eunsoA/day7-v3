import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChallengeCard } from "@/components/ChallengeCard";
import { mockUser, mockChallenges } from "@/data/mockData";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CurrentChallenges = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentChallenges = mockChallenges.filter(c => c.status === 'in-progress' && mockUser.currentChallenges.includes(c.id));

  const handleViewChallenge = (challengeId: string) => {
    navigate(`/challenge/${challengeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* 헤더 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              홈으로
            </Button>
            <h1 className="text-xl font-bold text-primary">현재 참여 중인 챌린지</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentChallenges.length > 0 ? (
          <section className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                현재 참여 중인 챌린지
              </h2>
              <p className="text-muted-foreground">함께 완주해보세요!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  variant="current"
                  onView={() => handleViewChallenge(challenge.id)}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-primary">참여 중인 챌린지가 없습니다</CardTitle>
                <CardDescription>
                  새로운 챌린지에 참여하거나 직접 만들어보세요!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate("/browse-challenges")} 
                  className="w-full"
                >
                  챌린지 둘러보기
                </Button>
                <Button 
                  onClick={() => navigate("/create-challenge")} 
                  variant="outline"
                  className="w-full"
                >
                  챌린지 만들기
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentChallenges;
