export interface Challenge {
  id: string;
  title: string;
  description: string;
  status: 'recruiting' | 'in-progress' | 'completed';
  startDate: string;
  participants: number;
  maxParticipants: number;
  currentDay?: number;
  totalDays: number;
  verificationRate?: number;
  rewardType: 'badge' | 'money';
  tags: string[];
  createdBy: string;
  timeLeft?: string;
}

export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string;
  badges: Badge[];
  currentChallenges: string[];
  completedChallenges: number;
  greetingMessage: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  type: 'success' | 'failure';
  earnedDate: string;
  challengeId: string;
  imageUrl: string;
}

export const mockUser: User = {
  id: 'user1',
  name: '안금소',
  age: 23,
  avatar: '👩‍🎓',
  badges: [
    {
      id: 'badge1',
      name: '독서왕',
      description: '7일 독서 챌린지 완주',
      type: 'success',
      earnedDate: '2024-06-15',
      challengeId: 'challenge1',
      imageUrl: '📚'
    },
    {
      id: 'badge2',
      name: '감사마음',
      description: '감사 인사 챌린지 완주',
      type: 'success',
      earnedDate: '2024-06-20',
      challengeId: 'challenge2',
      imageUrl: '🙏'
    }
  ],
  currentChallenges: ['challenge3'],
  completedChallenges: 5,
  greetingMessage: '오늘도 작은 변화를 만들어가는 금소입니다! ✨'
};

export const mockChallenges: Challenge[] = [
  {
    id: 'challenge1',
    title: '매일 책 한 페이지 읽기',
    description: '하루에 한 페이지씩 읽으며 독서 습관 만들기',
    status: 'completed',
    startDate: '2024-06-10',
    participants: 5,
    maxParticipants: 7,
    totalDays: 7,
    rewardType: 'badge',
    tags: ['독서', '자기계발', '습관'],
    createdBy: 'user2'
  },
  {
    id: 'challenge2',
    title: '감사 인사하기',
    description: '매일 가족이나 친구에게 감사 인사 전하기',
    status: 'completed',
    startDate: '2024-06-15',
    participants: 4,
    maxParticipants: 6,
    totalDays: 7,
    rewardType: 'badge',
    tags: ['감사', '인간관계', '소통'],
    createdBy: 'user3'
  },
  {
    id: 'challenge3',
    title: '10분 산책하기',
    description: '매일 10분씩 동네 한 바퀴 돌며 산책하기',
    status: 'in-progress',
    startDate: '2024-07-01',
    participants: 6,
    maxParticipants: 7,
    currentDay: 3,
    totalDays: 7,
    verificationRate: 85,
    rewardType: 'badge',
    tags: ['건강', '운동', '야외활동'],
    createdBy: 'user1'
  },
  {
    id: 'challenge4',
    title: '하루 한 줄 일기쓰기',
    description: '간단하게 오늘 하루를 돌아보며 한 줄 일기 쓰기',
    status: 'recruiting',
    startDate: '2024-07-05',
    participants: 2,
    maxParticipants: 5,
    totalDays: 7,
    rewardType: 'badge',
    tags: ['일기', '성찰', '글쓰기'],
    createdBy: 'user4',
    timeLeft: '2일 후 시작'
  },
  {
    id: 'challenge5',
    title: '물 8잔 마시기',
    description: '건강한 수분 섭취를 위해 하루 8잔의 물 마시기',
    status: 'recruiting',
    startDate: '2024-07-06',
    participants: 3,
    maxParticipants: 6,
    totalDays: 7,
    rewardType: 'badge',
    tags: ['건강', '수분', '습관'],
    createdBy: 'user5',
    timeLeft: '3일 후 시작'
  },
  {
    id: 'challenge6',
    title: '스마트폰 없는 시간',
    description: '매일 30분씩 스마트폰 없이 나만의 시간 갖기',
    status: 'recruiting',
    startDate: '2024-07-07',
    participants: 1,
    maxParticipants: 4,
    totalDays: 7,
    rewardType: 'badge',
    tags: ['디지털디톡스', '명상', '휴식'],
    createdBy: 'user6',
    timeLeft: '4일 후 시작'
  }
];

export const philosophyQuote = {
  text: "우리는 반복된 행동이 만든 존재다. 탁월함은 행동이 아니라 습관이다.",
  author: "아리스토텔레스"
};