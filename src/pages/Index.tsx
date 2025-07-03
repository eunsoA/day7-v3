import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChallengeCard } from "@/components/ChallengeCard";
import { ProfileCharacter } from "@/components/ProfileCharacter";
import { mockUser, mockChallenges, philosophyQuote } from "@/data/mockData";
import { Plus, Sparkles, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentChallenges = mockChallenges.filter(c => c.status === 'in-progress' && mockUser.currentChallenges.includes(c.id));
  const recruitingChallenges = mockChallenges.filter(c => c.status === 'recruiting').slice(0, 3);

  const handleJoinChallenge = (challengeId: string) => {
    toast({
      title: "챌린지 참여 신청 완료! 🎉",
      description: "곧 챌린지가 시작됩니다. 팀원들과 함께 7일을 완주해보세요!",
    });
  };

  const handleStartChallenge = () => {
    navigate("/create-challenge");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* 헤더 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary">Day7</h1>
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/my-page")}
              className="text-primary hover:bg-primary/10"
            >
              마이페이지
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* 히어로 섹션 */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <blockquote className="text-lg md:text-xl italic text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              "{philosophyQuote.text}"
            </blockquote>
            <cite className="text-muted-foreground">— {philosophyQuote.author}</cite>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              7일만 하면 습관이 됩니다
            </h2>
            <Button 
              size="lg" 
              onClick={handleStartChallenge}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              챌린지 시작하기
            </Button>
          </div>
        </div>

        {/* 사용자 프로필 */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <ProfileCharacter user={mockUser} showGreeting={true} />
          </div>
        </div>

        {/* 현재 참여 중인 챌린지 */}
        {currentChallenges.length > 0 && (
          <section className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                현재 참여 중인 챌린지
              </h3>
              <p className="text-muted-foreground">함께 완주해보세요!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  variant="current"
                  onView={() => toast({
                    title: "인증 기능",
                    description: "인증 기능은 추후 구현 예정입니다.",
                  })}
                />
              ))}
            </div>
          </section>
        )}

        {/* 챌린지 둘러보기 */}
        <section className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              챌린지 둘러보기
            </h3>
            <p className="text-muted-foreground">지금 모집 중인 챌린지에 참여해보세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recruitingChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                variant="recruiting"
                onJoin={() => handleJoinChallenge(challenge.id)}
                onView={() => toast({
                  title: "챌린지 상세",
                  description: "상세 정보 기능은 추후 구현 예정입니다.",
                })}
              />
            ))}
          </div>
        </section>

        {/* 챌린지 생성 섹션 */}
        <section className="text-center space-y-6">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-primary flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                나만의 챌린지 만들기
              </CardTitle>
              <CardDescription>
                직접 챌린지를 만들어 다른 사람들과 함께 목표를 달성해보세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleStartChallenge}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Plus className="w-5 h-5 mr-2" />
                챌린지 생성하기
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
