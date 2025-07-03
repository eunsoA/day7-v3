import { Button } from "@/components/ui/button";
import { ChallengeCard } from "@/components/ChallengeCard";
import { mockChallenges } from "@/data/mockData";
import { Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BrowseChallenges = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const recruitingChallenges = mockChallenges.filter(c => c.status === 'recruiting');

  const handleJoinChallenge = (challengeId: string) => {
    toast({
      title: "챌린지 참여 신청 완료! 🎉",
      description: "곧 챌린지가 시작됩니다. 팀원들과 함께 7일을 완주해보세요!",
    });
  };

  const handleViewChallenge = (challengeId: string) => {
    navigate(`/browse-challenges/${challengeId}`);
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
            <h1 className="text-xl font-bold text-primary">챌린지 둘러보기</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              모집 중인 챌린지
            </h2>
            <p className="text-muted-foreground">지금 참여할 수 있는 챌린지를 찾아보세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recruitingChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                variant="recruiting"
                onJoin={() => handleJoinChallenge(challenge.id)}
                onView={() => handleViewChallenge(challenge.id)}
              />
            ))}
          </div>

          {recruitingChallenges.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">현재 모집 중인 챌린지가 없습니다.</p>
              <Button onClick={() => navigate("/create-challenge")}>
                새 챌린지 만들기
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BrowseChallenges;
