
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileCharacter } from "@/components/ProfileCharacter";
import { mockUser, philosophyQuote } from "@/data/mockData";
import { Plus, Sparkles, Users, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

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
          </div>
        </div>

        {/* 사용자 프로필 */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <ProfileCharacter user={mockUser} showGreeting={true} />
          </div>
        </div>

        {/* 메인 네비게이션 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 현재 참여 중인 챌린지 */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10"
            onClick={() => navigate("/current-challenges")}
          >
            <CardHeader className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-primary">현재 참여 중인 챌린지</CardTitle>
              <CardDescription>
                진행 중인 챌린지를 확인하고 인증해보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>자세히 보기</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>

          {/* 챌린지 둘러보기 */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-accent/5 to-accent/10"
            onClick={() => navigate("/browse-challenges")}
          >
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-primary">챌린지 둘러보기</CardTitle>
              <CardDescription>
                새로운 챌린지를 찾아 참여해보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>둘러보기</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>

          {/* 챌린지 만들기 */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-secondary/5 to-secondary/10"
            onClick={() => navigate("/create-challenge")}
          >
            <CardHeader className="text-center">
              <Plus className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-primary">나만의 챌린지 만들기</CardTitle>
              <CardDescription>
                직접 챌린지를 만들어 팀원들과 함께해보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>만들기</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 챌린지 시작하기 버튼 */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/create-challenge")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            챌린지 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
