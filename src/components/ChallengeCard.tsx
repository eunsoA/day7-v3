import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Challenge } from "@/data/mockData";
import { Calendar, Users, Clock, TrendingUp } from "lucide-react";

interface ChallengeCardProps {
  challenge: Challenge;
  variant?: 'recruiting' | 'current' | 'completed';
  onJoin?: () => void;
  onView?: () => void;
}

export const ChallengeCard = ({ challenge, variant = 'recruiting', onJoin, onView }: ChallengeCardProps) => {
  const getStatusColor = () => {
    switch (challenge.status) {
      case 'recruiting': return 'bg-accent text-accent-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = () => {
    switch (challenge.status) {
      case 'recruiting': return '모집중';
      case 'in-progress': return '진행중';
      case 'completed': return '완료';
      default: return '';
    }
  };

  const progressPercentage = challenge.currentDay ? (challenge.currentDay / challenge.totalDays) * 100 : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground mb-2">
              {challenge.title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {challenge.description}
            </CardDescription>
          </div>
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 진행 상황 (현재 참여중인 챌린지만) */}
        {variant === 'current' && challenge.currentDay && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">진행 상황</span>
              <span className="font-medium text-primary">
                {challenge.currentDay}/{challenge.totalDays}일
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            {challenge.verificationRate && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>팀 인증률: {challenge.verificationRate}%</span>
              </div>
            )}
          </div>
        )}

        {/* 기본 정보 */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{challenge.startDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{challenge.participants}/{challenge.maxParticipants}명</span>
          </div>
          {challenge.timeLeft && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-accent-foreground font-medium">{challenge.timeLeft}</span>
            </div>
          )}
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1">
          {challenge.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-2 pt-2">
          {variant === 'recruiting' && (
            <>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={onJoin}
              >
                참여하기
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={onView}
              >
                자세히
              </Button>
            </>
          )}
          {variant === 'current' && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={onView}
            >
              인증하기
            </Button>
          )}
          {variant === 'completed' && (
            <Button 
              size="sm" 
              variant="secondary"
              className="flex-1"
              onClick={onView}
            >
              결과 보기
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};