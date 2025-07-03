
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Users, TrendingUp, CheckCircle, Clock, X } from "lucide-react";
import { mockChallenges, allUsers, mockVerifications, mockUser } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const challenge = mockChallenges.find(c => c.id === challengeId);
  
  if (!challenge) {
    return <div>챌린지를 찾을 수 없습니다.</div>;
  }

  const participants = allUsers.filter(user => challenge.participants.includes(user.id));
  const progressPercentage = challenge.currentDay ? (challenge.currentDay / challenge.totalDays) * 100 : 0;
  const currentDay = challenge.currentDay || 1;
  
  const getVerificationStatus = (userId: string, day: number) => {
    const verification = mockVerifications.find(v => 
      v.userId === userId && v.challengeId === challengeId && v.day === day
    );
    
    if (!verification) return 'pending';
    
    // 팀원 중 절반 이상이 인증해야 성공
    const requiredVerifications = Math.ceil(participants.length / 2);
    if (verification.verifiedBy.length >= requiredVerifications && verification.status === 'completed') {
      return 'completed';
    } else if (verification.status === 'failed') {
      return 'failed';
    }
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'failed': return '❌';
      case 'pending': return '⏳';
      default: return '⏳';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '인증 완료';
      case 'failed': return '인증 실패';
      case 'pending': return '미인증';
      default: return '미인증';
    }
  };

  const handleVerification = () => {
    toast({
      title: "인증 완료! 🎉",
      description: "오늘의 미션을 성공적으로 완료했습니다.",
    });
  };

  const canVerifyToday = (userId: string) => {
    const verification = mockVerifications.find(v => 
      v.userId === userId && v.challengeId === challengeId && v.day === currentDay
    );
    return !verification || verification.status === 'pending';
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
              onClick={() => navigate("/current-challenges")}
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
        <Card className="border-l-4 border-l-primary">
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
              <Badge className="bg-primary text-primary-foreground">
                진행중
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
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>팀 인증률: {challenge.verificationRate}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">진행 상황</span>
                <span className="font-medium text-primary">
                  {currentDay}/{challenge.totalDays}일
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* 7일 인증 현황 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              7일 인증 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div key={day} className="border rounded-lg p-4 bg-muted/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        day <= currentDay ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {day}
                      </span>
                      {day}일차
                      {day === currentDay && (
                        <Badge variant="secondary" className="ml-2">오늘</Badge>
                      )}
                    </h3>
                    {day <= currentDay && (
                      <div className="text-sm text-muted-foreground">
                        {new Date(new Date(challenge.startDate).getTime() + (day - 1) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {participants.map((user) => {
                      const status = getVerificationStatus(user.id, day);
                      const verification = mockVerifications.find(v => 
                        v.userId === user.id && v.challengeId === challengeId && v.day === day
                      );
                      
                      return (
                        <div key={`${day}-${user.id}`} className="flex items-start space-x-3 p-3 rounded-lg border bg-background">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="text-lg">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{user.name}</span>
                              <span className="text-lg">{getStatusIcon(status)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {getStatusText(status)}
                            </p>
                            {verification && verification.message && (
                              <div className="space-y-1">
                                <p className="text-xs bg-muted p-2 rounded">
                                  {verification.photo} {verification.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  인증자: {verification.verifiedBy.length}명
                                </p>
                              </div>
                            )}
                            {day === currentDay && user.id === mockUser.id && canVerifyToday(user.id) && (
                              <Button 
                                size="sm" 
                                className="w-full mt-2"
                                onClick={handleVerification}
                              >
                                인증하기
                              </Button>
                            )}
                            {day === currentDay && user.id === mockUser.id && !canVerifyToday(user.id) && (
                              <Button 
                                size="sm" 
                                variant="secondary"
                                className="w-full mt-2"
                                disabled
                              >
                                인증 완료
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
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

export default ChallengeDetail;
