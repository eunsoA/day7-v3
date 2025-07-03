import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Users, TrendingUp, CheckCircle, Clock, Camera } from "lucide-react";
import { mockChallenges, allUsers, mockVerifications, mockUser } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationPhoto, setVerificationPhoto] = useState("https://placehold.co/400x300?text=Click+to+Upload");
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  const challenge = mockChallenges.find(c => c.id === challengeId);
  
  if (!challenge) {
    return <div>챌린지를 찾을 수 없습니다.</div>;
  }

  const participants = allUsers.filter(user => challenge.participants.includes(user.id));
  const progressPercentage = challenge.currentDay ? (challenge.currentDay / challenge.totalDays) * 100 : 0;
  const currentDay = challenge.currentDay || 1;
  
  // 나의 인증률 계산
  const myVerifications = mockVerifications.filter(v => 
    v.userId === mockUser.id && v.challengeId === challengeId
  );
  const myCompletedVerifications = myVerifications.filter(v => {
    const requiredVerifications = Math.ceil(participants.length / 2);
    return v.verifiedBy.length >= requiredVerifications && v.status === 'completed';
  });
  const myVerificationRate = myVerifications.length > 0 ? Math.round((myCompletedVerifications.length / myVerifications.length) * 100) : 0;

  // 팀 전체 인증률 계산
  const allVerifications = mockVerifications.filter(v => v.challengeId === challengeId);
  const totalPossibleVerifications = participants.length * currentDay;
  const completedVerifications = allVerifications.filter(v => {
    const requiredVerifications = Math.ceil(participants.length / 2);
    return v.verifiedBy.length >= requiredVerifications && v.status === 'completed';
  });
  const teamVerificationRate = totalPossibleVerifications > 0 ? Math.round((completedVerifications.length / totalPossibleVerifications) * 100) : 0;

  // 오늘 나의 인증 상태 확인
  const myTodayVerification = mockVerifications.find(v => 
    v.userId === mockUser.id && v.challengeId === challengeId && v.day === currentDay
  );
  const myTodayStatus = myTodayVerification ? 
    (myTodayVerification.verifiedBy.length >= Math.ceil(participants.length / 2) && myTodayVerification.status === 'completed' ? 'completed' : 'pending') 
    : 'not_verified';

  const getVerificationStatus = (userId: string, day: number) => {
    const verification = mockVerifications.find(v => 
      v.userId === userId && v.challengeId === challengeId && v.day === day
    );
    
    if (!verification) return 'pending';
    
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

  const handleVerification = () => {
    if (!verificationMessage.trim()) {
      toast({
        title: "메시지를 입력해주세요",
        description: "인증 메시지를 작성해주세요.",
        variant: "destructive",
      });
      return;
    }

    // Create new verification record
    const newVerification = {
      userId: mockUser.id,
      challengeId: challengeId!,
      day: currentDay,
      status: 'pending' as const,
      photo: verificationPhoto,
      message: verificationMessage,
      verifiedBy: [],
      createdAt: new Date().toISOString(),
    };

    // In a real app, this would be sent to the backend
    mockVerifications.push(newVerification);

    setIsVerificationModalOpen(false);
    setVerificationMessage("");
    setVerificationPhoto("https://placehold.co/400x300?text=Click+to+Upload");

    toast({
      title: "인증 완료! 🎉",
      description: "팀원들의 인증 확인을 기다리고 있어요.",
    });

    // Force re-render by updating the page
    window.location.reload();
  };

  const handleVerifyOther = (userId: string, day: number) => {
    toast({
      title: "인증 확인 완료! ✨",
      description: "팀원의 인증을 확인했습니다.",
    });
  };

  const getDayVerifications = (day: number) => {
    return participants.map(user => {
      const verification = mockVerifications.find(v => 
        v.userId === user.id && v.challengeId === challengeId && v.day === day
      );
      return {
        user,
        verification,
        status: getVerificationStatus(user.id, day)
      };
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVerificationPhoto(e.target?.result as string || "https://placehold.co/400x300?text=Uploaded+Image");
      };
      reader.readAsDataURL(file);
    }
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>시작일: {challenge.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>참여자: {challenge.participants.length}명</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>나의 인증률: {myVerificationRate}%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>팀 인증률: {teamVerificationRate}%</span>
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

        {/* 오늘의 인증 상태 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              오늘의 인증 ({currentDay}일차)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {myTodayStatus === 'not_verified' ? (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-primary mb-1">아직 인증하지 않았어요!</h3>
                    <p className="text-sm text-muted-foreground">오늘의 미션을 완료하고 인증해보세요.</p>
                  </div>
                  <Dialog open={isVerificationModalOpen} onOpenChange={setIsVerificationModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="ml-4">
                        인증하기
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Camera className="w-5 h-5" />
                          인증하기
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">인증 사진</label>
                          <div className="relative">
                            <img 
                              src={verificationPhoto} 
                              alt="인증 사진" 
                              className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-primary transition-colors"
                              onClick={() => document.getElementById('photo-upload')?.click()}
                            />
                            <input
                              id="photo-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">인증 메시지</label>
                          <Textarea
                            placeholder="오늘의 인증 메시지를 작성해주세요..."
                            value={verificationMessage}
                            onChange={(e) => setVerificationMessage(e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                        <Button 
                          onClick={handleVerification}
                          className="w-full"
                          disabled={!verificationMessage.trim()}
                        >
                          등록하기
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ) : myTodayStatus === 'completed' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-semibold text-green-800">오늘 인증 완료!</h3>
                    <p className="text-sm text-green-600">팀원들이 인증을 확인해주었어요.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <h3 className="font-semibold text-yellow-800">인증 확인 대기 중</h3>
                    <p className="text-sm text-yellow-600">팀원들의 인증 확인을 기다리고 있어요.</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 7일 인증 현황 (클릭 가능한 카드들) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              7일 인증 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const dayVerifications = getDayVerifications(day);
                const completedCount = dayVerifications.filter(dv => dv.status === 'completed').length;
                const failedCount = dayVerifications.filter(dv => dv.status === 'failed').length;
                const pendingCount = dayVerifications.filter(dv => dv.status === 'pending').length;
                
                return (
                  <Dialog key={day}>
                    <DialogTrigger asChild>
                      <Card className={`cursor-pointer hover:shadow-md transition-shadow ${
                        day <= currentDay ? 'bg-background' : 'bg-muted/50'
                      } ${day === currentDay ? 'ring-2 ring-primary' : ''}`}>
                        <CardContent className="p-4 text-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2 ${
                            day <= currentDay ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          }`}>
                            {day}
                          </div>
                          <p className="text-sm font-medium mb-2">
                            {day}일차
                            {day === currentDay && (
                              <Badge variant="secondary" className="ml-1 text-xs">오늘</Badge>
                            )}
                          </p>
                          {day <= currentDay && (
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center justify-center gap-1">
                                <span>✅ {completedCount}</span>
                                <span>⏳ {pendingCount}</span>
                                <span>❌ {failedCount}</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {day}
                          </span>
                          {day}일차 인증 현황
                          {day === currentDay && (
                            <Badge variant="secondary">오늘</Badge>
                          )}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {dayVerifications.map(({ user, verification, status }) => (
                          <div key={user.id} className="border rounded-lg p-4 bg-background">
                            <div className="flex items-start space-x-3">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="text-lg">
                                  {user.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium">{user.name}</span>
                                  <span className="text-xl">{getStatusIcon(status)}</span>
                                  {user.id === mockUser.id && (
                                    <Badge variant="outline" className="text-xs">나</Badge>
                                  )}
                                </div>
                                {verification && verification.message && (
                                  <div className="space-y-2">
                                    <div className="bg-muted p-3 rounded-lg">
                                      <div className="flex items-center gap-2 mb-2">
                                        {verification.photo && (
                                          <img 
                                            src={verification.photo} 
                                            alt="인증 사진" 
                                            className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                                          />
                                        )}
                                        <div className="flex-1">
                                          <span className="text-sm text-muted-foreground">
                                            {new Date(verification.createdAt).toLocaleString()}
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-sm">{verification.message}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <p className="text-xs text-muted-foreground">
                                        인증 확인: {verification.verifiedBy.length}명 / {Math.ceil(participants.length / 2)}명 필요
                                      </p>
                                      {user.id !== mockUser.id && day <= currentDay && verification.message && (
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleVerifyOther(user.id, day)}
                                          disabled={verification.verifiedBy.includes(mockUser.id)}
                                        >
                                          {verification.verifiedBy.includes(mockUser.id) ? '확인 완료' : '인증 확인'}
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )}
                                {!verification?.message && day <= currentDay && (
                                  <p className="text-sm text-muted-foreground">아직 인증하지 않았습니다.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChallengeDetail;
