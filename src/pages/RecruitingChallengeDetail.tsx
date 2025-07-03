
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Clock, Award, User } from "lucide-react";
import { mockChallenges, allUsers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const RecruitingChallengeDetail = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const challenge = mockChallenges.find(c => c.id === challengeId);
  
  if (!challenge) {
    return <div>챌린지를 찾을 수 없습니다.</div>;
  }

  const creator = allUsers.find(user => user.id === challenge.createdBy);
  const participants = allUsers.filter(user => challenge.participants.includes(user.id));

  const handleJoinChallenge = () => {
    toast({
      title: "챌린지 참여 신청 완료! 🎉",
      description: "곧 챌린지가 시작됩니다. 팀원들과 함께 7일을 완주해보세요!",
    });
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
              onClick={() => navigate("/browse-challenges")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로가기
            </Button>
            <h1 className="text-xl font-bold text-primary">챌린지 상세</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* 챌린지 기본 정보 */}
        <Card className="border-l-4 border-l-accent">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {challenge.title}
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground mb-4">
                  {challenge.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Badge className="bg-accent text-accent-foreground">
                모집중
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>시작일: {challenge.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>참여자: {challenge.participants.length}/{challenge.maxParticipants}명</span>
              </div>
              {challenge.timeLeft && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-accent-foreground font-medium">{challenge.timeLeft}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-primary" />
              <span>보상: {challenge.rewardType === 'badge' ? '뱃지 획득' : '벌금형'}</span>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleJoinChallenge} 
                className="w-full md:w-auto"
                size="lg"
              >
                챌린지 참여하기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 챌린지 생성자 정보 */}
        {creator && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                챌린지 생성자
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="text-2xl">
                    {creator.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{creator.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {creator.age}세 • 완주 {creator.completedChallenges}회
                  </p>
                  <p className="text-sm bg-white/50 p-3 rounded border italic">
                    "{creator.greetingMessage}"
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {creator.badges.map((badge) => (
                      <Badge key={badge.id} variant="secondary" className="text-xs">
                        {badge.imageUrl} {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 현재 참여 신청자 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              현재 참여 신청자 ({participants.length}명)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participants.map((user) => (
                <div key={user.id} className="flex items-start space-x-3 p-4 rounded-lg border bg-background hover:bg-muted/20 transition-colors">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="text-lg">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{user.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {user.age}세 • 참여 중 {user.currentChallenges.length}개
                    </p>
                    <p className="text-xs bg-muted/50 p-2 rounded italic line-clamp-2">
                      "{user.greetingMessage}"
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {user.badges.slice(0, 2).map((badge) => (
                        <Badge key={badge.id} variant="outline" className="text-xs">
                          {badge.imageUrl}
                        </Badge>
                      ))}
                      {user.badges.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.badges.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {participants.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">아직 참여 신청자가 없습니다.</p>
                <p className="text-sm text-muted-foreground mt-1">첫 번째 참여자가 되어보세요!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruitingChallengeDetail;
