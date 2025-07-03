
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockChallenges, mockUsers, mockDailyVerifications } from "@/data/mockData";
import { ArrowLeft, Calendar, Users, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ChallengeDetail = () => {
  const navigate = useNavigate();
  const { challengeId } = useParams();
  
  const challenge = mockChallenges.find(c => c.id === challengeId);
  const participants = mockUsers.filter(user => user.currentChallenges.includes(challengeId || ''));
  
  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">챌린지를 찾을 수 없습니다</h2>
          <Button onClick={() => navigate("/current-challenges")}>
            돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const getVerificationStatus = (userId: string, day: number) => {
    const verification = mockDailyVerifications.find(
      v => v.userId === userId && v.challengeId === challengeId && v.day === day
    );
    return verification?.verified || false;
  };

  const getVerificationMessage = (userId: string, day: number) => {
    const verification = mockDailyVerifications.find(
      v => v.userId === userId && v.challengeId === challengeId && v.day === day
    );
    return verification?.message || '';
  };

  const getDayVerificationRate = (day: number) => {
    const dayVerifications = mockDailyVerifications.filter(
      v => v.challengeId === challengeId && v.day === day
    );
    const verified = dayVerifications.filter(v => v.verified).length;
    return Math.round((verified / participants.length) * 100);
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
              목록으로
            </Button>
            <h1 className="text-xl font-bold text-primary">챌린지 상세</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 챌린지 정보 */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-primary mb-2">{challenge.title}</CardTitle>
                <CardDescription className="text-lg">{challenge.description}</CardDescription>
              </div>
              <Badge className="bg-primary text-primary-foreground">
                진행중
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">시작일</p>
                  <p className="font-medium">{challenge.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">참여자</p>
                  <p className="font-medium">{challenge.participants}/{challenge.maxParticipants}명</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">진행 상황</p>
                  <p className="font-medium">{challenge.currentDay}/{challenge.totalDays}일</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 일별 인증 현황 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              일별 인증 현황
            </CardTitle>
            <CardDescription>
              참여자들의 7일간 인증 기록을 확인할 수 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">참여자</TableHead>
                    {Array.from({ length: 7 }, (_, i) => (
                      <TableHead key={i + 1} className="text-center min-w-[80px]">
                        {i + 1}일차
                        {i < (challenge.currentDay || 0) && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {getDayVerificationRate(i + 1)}%
                          </div>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.age}세</p>
                          </div>
                        </div>
                      </TableCell>
                      {Array.from({ length: 7 }, (_, i) => {
                        const day = i + 1;
                        const isVerified = getVerificationStatus(user.id, day);
                        const message = getVerificationMessage(user.id, day);
                        const isPastDay = day <= (challenge.currentDay || 0);
                        
                        return (
                          <TableCell key={day} className="text-center">
                            {isPastDay ? (
                              <div className="flex flex-col items-center gap-1">
                                {isVerified ? (
                                  <CheckCircle className="w-6 h-6 text-green-500" />
                                ) : (
                                  <XCircle className="w-6 h-6 text-red-500" />
                                )}
                                {message && (
                                  <div className="text-xs text-muted-foreground max-w-[80px] truncate" title={message}>
                                    {message}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-muted mx-auto" />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 태그 */}
        <div className="mt-6 flex flex-wrap gap-2">
          {challenge.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
