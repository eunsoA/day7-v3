import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowLeft, Sparkles, Gift, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateChallenge = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: undefined as Date | undefined,
    maxParticipants: "5",
    rewardType: "badge" as "badge" | "money"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.startDate) {
      toast({
        title: "입력 확인",
        description: "모든 필수 항목을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "챌린지 생성 완료! 🎉",
      description: `"${formData.title}" 챌린지가 성공적으로 생성되었습니다.`,
    });
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>
        </div>

        {/* 메인 카드 */}
        <Card className="border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6" />
              새로운 챌린지 만들기
            </CardTitle>
            <CardDescription>
              7일 동안 함께할 의미있는 챌린지를 만들어보세요
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 챌린지 제목 */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  챌린지 제목 *
                </Label>
                <Input
                  id="title"
                  placeholder="예: 매일 10분 산책하기"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full"
                />
              </div>

              {/* 목표 설명 */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  목표 설명 *
                </Label>
                <Textarea
                  id="description"
                  placeholder="챌린지에 대한 상세한 설명을 작성해주세요. 어떤 목표를 위해, 어떻게 실천할지 알려주세요."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>

              {/* 시작일 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">시작일 *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "yyyy년 MM월 dd일") : "날짜를 선택해주세요"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* 참여 인원 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">참여 인원</Label>
                <Select
                  value={formData.maxParticipants}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, maxParticipants: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3명</SelectItem>
                    <SelectItem value="4">4명</SelectItem>
                    <SelectItem value="5">5명</SelectItem>
                    <SelectItem value="6">6명</SelectItem>
                    <SelectItem value="7">7명</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  3~7명까지 설정할 수 있습니다
                </p>
              </div>

              {/* 보상 방식 */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">보상 방식</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* 뱃지형 보상 */}
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all border-2",
                      formData.rewardType === "badge" 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setFormData(prev => ({ ...prev, rewardType: "badge" }))}
                  >
                    <CardContent className="p-4 text-center">
                      <Gift className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium">뱃지형 보상</h4>
                      <p className="text-sm text-muted-foreground">
                        성공 시 특별한 뱃지 획득
                      </p>
                    </CardContent>
                  </Card>

                  {/* 벌금형 보상 */}
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all border-2 opacity-50",
                      formData.rewardType === "money" 
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    )}
                  >
                    <CardContent className="p-4 text-center">
                      <CreditCard className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <h4 className="font-medium text-muted-foreground">벌금형 보상</h4>
                      <p className="text-sm text-muted-foreground">
                        추후 구현 예정
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 제출 버튼 */}
              <Button type="submit" className="w-full" size="lg">
                챌린지 생성하기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateChallenge;