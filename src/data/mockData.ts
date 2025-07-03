
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

export interface DailyVerification {
  userId: string;
  challengeId: string;
  day: number;
  verified: boolean;
  photo?: string;
  message?: string;
  timestamp?: string;
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
      imageUrl: '📚',
    },
    {
      id: 'badge2',
      name: '감사마음',
      description: '감사 인사 챌린지 완주',
      type: 'success',
      earnedDate: '2024-06-20',
      challengeId: 'challenge2',
      imageUrl: '🙏',
    },
  ],
  currentChallenges: ['challenge3'],
  completedChallenges: 5,
  greetingMessage:
    '금소님의 작은 습관이 특별한 이야기가 되어가고 있어요! 멋진 도전을 이어가고 있는 당신을 응원합니다!',
};

export const mockUsers: User[] = [
  mockUser,
  {
    id: 'user2',
    name: '김민수',
    age: 25,
    avatar: '👨‍💻',
    badges: [
      {
        id: 'badge3',
        name: '운동마스터',
        description: '7일 운동 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-10',
        challengeId: 'challenge1',
        imageUrl: '💪',
      },
    ],
    currentChallenges: ['challenge3'],
    completedChallenges: 3,
    greetingMessage: '꾸준함이 만드는 변화를 믿어요! 오늘도 화이팅!',
  },
  {
    id: 'user3',
    name: '박지영',
    age: 22,
    avatar: '👩‍🎨',
    badges: [
      {
        id: 'badge4',
        name: '창작자',
        description: '7일 그림 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-05',
        challengeId: 'challenge2',
        imageUrl: '🎨',
      },
      {
        id: 'badge5',
        name: '성찰러',
        description: '7일 일기 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-25',
        challengeId: 'challenge4',
        imageUrl: '📝',
      },
    ],
    currentChallenges: ['challenge3'],
    completedChallenges: 4,
    greetingMessage: '매일의 작은 기록이 아름다운 추억이 되어가고 있어요!',
  },
  {
    id: 'user4',
    name: '이준호',
    age: 27,
    avatar: '👨‍🍳',
    badges: [
      {
        id: 'badge6',
        name: '건강지킴이',
        description: '7일 물마시기 챌린지 완주',
        type: 'success',
        earnedDate: '2024-05-30',
        challengeId: 'challenge5',
        imageUrl: '💧',
      },
    ],
    currentChallenges: ['challenge3'],
    completedChallenges: 2,
    greetingMessage: '건강한 습관으로 더 나은 내일을 만들어가요!',
  },
  {
    id: 'user5',
    name: '최서연',
    age: 24,
    avatar: '👩‍🌾',
    badges: [
      {
        id: 'badge7',
        name: '자연친구',
        description: '7일 산책 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-01',
        challengeId: 'challenge3',
        imageUrl: '🌿',
      },
      {
        id: 'badge8',
        name: '마음챙김',
        description: '7일 명상 챌린지 완주',
        type: 'success',
        earnedDate: '2024-05-15',
        challengeId: 'challenge6',
        imageUrl: '🧘‍♀️',
      },
    ],
    currentChallenges: ['challenge3'],
    completedChallenges: 6,
    greetingMessage: '자연과 함께하는 소중한 시간들이 마음을 편안하게 해줘요!',
  },
  {
    id: 'user6',
    name: '정태민',
    age: 26,
    avatar: '👨‍🎓',
    badges: [
      {
        id: 'badge9',
        name: '독서광',
        description: '7일 독서 챌린지 완주',
        type: 'success',
        earnedDate: '2024-05-20',
        challengeId: 'challenge1',
        imageUrl: '📖',
      },
    ],
    currentChallenges: ['challenge3'],
    completedChallenges: 3,
    greetingMessage: '책 속에서 찾는 지혜가 일상을 더욱 풍요롭게 만들어줘요!',
  },
];

export const mockDailyVerifications: DailyVerification[] = [
  // Day 1 verifications for challenge3
  { userId: 'user1', challengeId: 'challenge3', day: 1, verified: true, message: '오늘 아침 산책 완료! 상쾌해요', timestamp: '2024-07-01 07:30' },
  { userId: 'user2', challengeId: 'challenge3', day: 1, verified: true, message: '10분 산책으로 하루 시작!', timestamp: '2024-07-01 08:00' },
  { userId: 'user3', challengeId: 'challenge3', day: 1, verified: true, message: '동네 한바퀴, 기분 좋네요', timestamp: '2024-07-01 18:30' },
  { userId: 'user4', challengeId: 'challenge3', day: 1, verified: false },
  { userId: 'user5', challengeId: 'challenge3', day: 1, verified: true, message: '저녁 산책으로 마무리', timestamp: '2024-07-01 19:00' },
  { userId: 'user6', challengeId: 'challenge3', day: 1, verified: true, message: '캠퍼스 산책, 좋은 공기!', timestamp: '2024-07-01 16:00' },
  
  // Day 2 verifications for challenge3
  { userId: 'user1', challengeId: 'challenge3', day: 2, verified: true, message: '비 와도 우산 쓰고 산책!', timestamp: '2024-07-02 07:45' },
  { userId: 'user2', challengeId: 'challenge3', day: 2, verified: true, message: '실내 복도라도 걸었어요', timestamp: '2024-07-02 12:00' },
  { userId: 'user3', challengeId: 'challenge3', day: 2, verified: false },
  { userId: 'user4', challengeId: 'challenge3', day: 2, verified: true, message: '드디어 첫 산책! 늦어서 미안해요', timestamp: '2024-07-02 20:00' },
  { userId: 'user5', challengeId: 'challenge3', day: 2, verified: true, message: '공원에서 만난 고양이와 함께', timestamp: '2024-07-02 17:30' },
  { userId: 'user6', challengeId: 'challenge3', day: 2, verified: true, message: '도서관 주변 산책', timestamp: '2024-07-02 15:00' },
  
  // Day 3 verifications for challenge3
  { userId: 'user1', challengeId: 'challenge3', day: 3, verified: true, message: '오늘도 완주! 벌써 습관이 되는 것 같아요', timestamp: '2024-07-03 07:00' },
  { userId: 'user2', challengeId: 'challenge3', day: 3, verified: true, message: '점심시간 산책, 머리가 맑아져요', timestamp: '2024-07-03 13:00' },
  { userId: 'user3', challengeId: 'challenge3', day: 3, verified: true, message: '어제 못한 것까지 오늘 더 열심히!', timestamp: '2024-07-03 18:00' },
  { userId: 'user4', challengeId: 'challenge3', day: 3, verified: true, message: '꾸준히 하니까 좋네요', timestamp: '2024-07-03 19:30' },
  { userId: 'user5', challengeId: 'challenge3', day: 3, verified: false },
  { userId: 'user6', challengeId: 'challenge3', day: 3, verified: true, message: '친구와 함께 산책', timestamp: '2024-07-03 16:30' },
];

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
    createdBy: 'user2',
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
    createdBy: 'user3',
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
    createdBy: 'user1',
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
    timeLeft: '2일 후 시작',
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
    timeLeft: '3일 후 시작',
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
    timeLeft: '4일 후 시작',
  },
];

export const philosophyQuote = {
  text: '우리는 반복된 행동이 만든 존재다. 탁월함은 행동이 아니라 습관이다.',
  author: '아리스토텔레스',
};
