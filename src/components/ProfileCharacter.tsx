import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/data/mockData";

interface ProfileCharacterProps {
  user: User;
  showGreeting?: boolean;
  variant?: 'compact' | 'full';
}

export const ProfileCharacter = ({ user, showGreeting = true, variant = 'compact' }: ProfileCharacterProps) => {
  return (
    <Card className="bg-gradient-to-br from-accent/20 to-primary/10 border-accent/30">
      <CardContent className="p-4">
        <div className={`flex ${variant === 'full' ? 'flex-col items-center space-y-4' : 'items-center space-x-4'}`}>
          {/* 3D 캐릭터 영역 */}
          <div className="relative">
            <div className={`${variant === 'full' ? 'w-32 h-32' : 'w-16 h-16'} bg-gradient-to-br from-primary/20 to-accent/30 rounded-full flex items-center justify-center text-4xl border-4 border-primary/20`}>
              {user.avatar}
            </div>
            
            {/* 뱃지 장착 영역 */}
            {user.badges.length > 0 && (
              <div className="absolute -top-2 -right-2 flex space-x-1">
                {user.badges.slice(0, 2).map((badge, index) => (
                  <div 
                    key={badge.id}
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs shadow-sm border-2 border-primary/30"
                    title={badge.name}
                  >
                    {badge.imageUrl}
                  </div>
                ))}
                {user.badges.length > 2 && (
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    +{user.badges.length - 2}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 사용자 정보 */}
          <div className={`${variant === 'full' ? 'text-center' : 'flex-1'}`}>
            <h3 className="font-semibold text-foreground text-lg">
              {user.name}님
            </h3>
            <p className="text-sm text-muted-foreground">
              {user.age}세 • 완주 {user.completedChallenges}회
            </p>
            
            {showGreeting && (
              <div className="mt-2 p-3 bg-white/50 rounded-lg border border-primary/20">
                <p className="text-sm text-foreground italic">
                  "{user.greetingMessage}"
                </p>
              </div>
            )}

            {variant === 'full' && (
              <div className="mt-4 space-y-2">
                <div className="flex flex-wrap gap-1 justify-center">
                  {user.badges.map((badge) => (
                    <Badge 
                      key={badge.id} 
                      variant={badge.type === 'success' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {badge.imageUrl} {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};