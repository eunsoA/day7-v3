import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProfileCharacter } from "@/components/ProfileCharacter";
import { mockUser, mockChallenges } from "@/data/mockData";
import { Trophy, Calendar, Target, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const userChallenges = mockChallenges.filter(c => c.createdBy === mockUser.id || mockUser.currentChallenges.includes(c.id));

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 헤더 */}
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
        </div>

        {/* 프로필 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 캐릭터 카드 */}
          <div className="lg:col-span-1">
            <ProfileCharacter user={mockUser} variant="full" />
          </div>

          {/* 통계 카드들 */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-primary">{mockUser.completedChallenges}</div>
                <div className="text-sm text-muted-foreground">완주한 챌린지</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4">
                <Target className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold text-accent">{mockUser.badges.length}</div>
                <div className="text-sm text-muted-foreground">획득한 뱃지</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-success-green" />
                <div className="text-2xl font-bold" style={{ color: 'hsl(120 60% 50%)' }}>
                  {mockUser.currentChallenges.length}
                </div>
                <div className="text-sm text-muted-foreground">진행 중인 챌린지</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 뱃지 컬렉션 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              나의 뱃지 컬렉션
            </CardTitle>
            <CardDescription>
              완주한 챌린지들의 기록입니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockUser.badges.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockUser.badges.map((badge) => (
                  <Card key={badge.id} className="text-center p-4 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-2">{badge.imageUrl}</div>
                    <h4 className="font-semibold text-sm">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {badge.description}
                    </p>
                    <Badge 
                      variant={badge.type === 'success' ? 'default' : 'secondary'}
                      className="mt-2 text-xs"
                    >
                      {badge.earnedDate}
                    </Badge>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>아직 획득한 뱃지가 없습니다</p>
                <p className="text-sm">첫 번째 챌린지를 완주해보세요!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 참여한 챌린지 히스토리 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              챌린지 히스토리
            </CardTitle>
            <CardDescription>
              참여했던 모든 챌린지를 확인할 수 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userChallenges.map((challenge) => (
                <div key={challenge.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{challenge.title}</h4>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    <div className="flex gap-2 mt-2">
                      {challenge.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <Badge 
                      className={
                        challenge.status === 'completed' ? 'bg-primary' :
                        challenge.status === 'in-progress' ? 'bg-accent' :
                        'bg-secondary'
                      }
                    >
                      {challenge.status === 'completed' ? '완료' :
                       challenge.status === 'in-progress' ? '진행중' :
                       '모집중'}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {challenge.startDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyPage;