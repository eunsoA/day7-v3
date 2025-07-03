
export interface Challenge {
  id: string;
  title: string;
  description: string;
  status: 'recruiting' | 'in-progress' | 'completed';
  startDate: string;
  participants: string[]; // 유저 ID 배열로 변경
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
  status: 'completed' | 'pending' | 'failed';
  photo?: string;
  message?: string;
  verifiedBy: string[]; // 인증해준 유저 ID들
  createdAt: string;
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

export const additionalUsers: User[] = [
  {
    id: 'user2',
    name: '김민준',
    age: 25,
    avatar: '👨‍💻',
    badges: [
      {
        id: 'badge3',
        name: '꾸준함',
        description: '일기쓰기 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-10',
        challengeId: 'challenge4',
        imageUrl: '✍️',
      },
    ],
    currentChallenges: ['challenge3', 'challenge4'],
    completedChallenges: 3,
    greetingMessage: '작은 변화가 큰 성장으로 이어진다고 믿어요! 함께 해보아요.',
  },
  {
    id: 'user3',
    name: '박서연',
    age: 22,
    avatar: '👩‍🎨',
    badges: [
      {
        id: 'badge4',
        name: '창의력',
        description: '그림 그리기 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-18',
        challengeId: 'challenge5',
        imageUrl: '🎨',
      },
      {
        id: 'badge5',
        name: '건강러버',
        description: '물마시기 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-25',
        challengeId: 'challenge6',
        imageUrl: '💧',
      },
    ],
    currentChallenges: ['challenge3'],
    completedChallenges: 4,
    greetingMessage: '매일 조금씩, 꾸준히! 서로 응원하며 성장해요 🌱',
  },
  {
    id: 'user4',
    name: '이도현',
    age: 24,
    avatar: '👨‍🎓',
    badges: [
      {
        id: 'badge6',
        name: '운동왕',
        description: '산책 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-22',
        challengeId: 'challenge3',
        imageUrl: '🚶‍♂️',
      },
    ],
    currentChallenges: ['challenge3', 'challenge5'],
    completedChallenges: 2,
    greetingMessage: '건강한 마음, 건강한 몸! 함께 걸어가요.',
  },
  {
    id: 'user5',
    name: '최지우',
    age: 21,
    avatar: '👩‍🌾',
    badges: [
      {
        id: 'badge7',
        name: '자연친화',
        description: '식물 기르기 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-12',
        challengeId: 'challenge7',
        imageUrl: '🌿',
      },
      {
        id: 'badge8',
        name: '명상가',
        description: '명상 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-28',
        challengeId: 'challenge8',
        imageUrl: '🧘‍♀️',
      },
    ],
    currentChallenges: ['challenge3'],
    completedChallenges: 6,
    greetingMessage: '자연과 함께하는 소소한 일상의 기쁨을 나누고 싶어요 🍃',
  },
  {
    id: 'user6',
    name: '정태민',
    age: 26,
    avatar: '👨‍🍳',
    badges: [
      {
        id: 'badge9',
        name: '요리사',
        description: '홈쿠킹 챌린지 완주',
        type: 'success',
        earnedDate: '2024-06-08',
        challengeId: 'challenge9',
        imageUrl: '👨‍🍳',
      },
    ],
    currentChallenges: ['challenge3'],
    completedChallenges: 1,
    greetingMessage: '맛있는 음식으로 하루하루 행복을 만들어가요!',
  },
];

export const allUsers = [mockUser, ...additionalUsers];

export const mockChallenges: Challenge[] = [
  {
    id: 'challenge1',
    title: '매일 책 한 페이지 읽기',
    description: '하루에 한 페이지씩 읽으며 독서 습관 만들기',
    status: 'completed',
    startDate: '2024-06-10',
    participants: ['user1', 'user2', 'user3', 'user4', 'user5'],
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
    participants: ['user1', 'user3', 'user5', 'user6'],
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
    participants: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
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
    participants: ['user2', 'user4'],
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
    participants: ['user3', 'user4', 'user5'],
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
    participants: ['user6'],
    maxParticipants: 4,
    totalDays: 7,
    rewardType: 'badge',
    tags: ['디지털디톡스', '명상', '휴식'],
    createdBy: 'user6',
    timeLeft: '4일 후 시작',
  },
];

// 일일 인증 목데이터
export const mockVerifications: DailyVerification[] = [
  // user1 (안금소) 인증 기록
  {
    userId: 'user1',
    challengeId: 'challenge3',
    day: 1,
    status: 'completed',
    photo: '🚶‍♀️',
    message: '오늘 아침 동네 한 바퀴 돌았어요! 상쾌한 하루의 시작이에요.',
    verifiedBy: ['user2', 'user3', 'user4'],
    createdAt: '2024-07-01T07:30:00Z',
  },
  {
    userId: 'user1',
    challengeId: 'challenge3',
    day: 2,
    status: 'completed',
    photo: '🌳',
    message: '공원에서 산책하며 새소리를 들었어요. 힐링되는 시간!',
    verifiedBy: ['user2', 'user3', 'user5'],
    createdAt: '2024-07-02T08:15:00Z',
  },
  {
    userId: 'user1',
    challengeId: 'challenge3',
    day: 3,
    status: 'completed',
    photo: '☀️',
    message: '햇살 좋은 오후, 가벼운 산책으로 기분 전환!',
    verifiedBy: ['user2', 'user4', 'user6'],
    createdAt: '2024-07-03T14:20:00Z',
  },
  // user2 인증 기록
  {
    userId: 'user2',
    challengeId: 'challenge3',
    day: 1,
    status: 'completed',
    photo: '👟',
    message: '운동화 끈 단단히 매고 출발! 건강한 습관 만들기 시작.',
    verifiedBy: ['user1', 'user3', 'user4'],
    createdAt: '2024-07-01T09:00:00Z',
  },
  {
    userId: 'user2',
    challengeId: 'challenge3',
    day: 2,
    status: 'completed',
    photo: '🏃‍♂️',
    message: '어제보다 조금 더 빠르게 걸어봤어요. 체력이 늘고 있는 것 같아요!',
    verifiedBy: ['user1', 'user3', 'user5'],
    createdAt: '2024-07-02T07:45:00Z',
  },
  {
    userId: 'user2',
    challengeId: 'challenge3',
    day: 3,
    status: 'pending',
    photo: '',
    message: '',
    verifiedBy: [],
    createdAt: '2024-07-03T00:00:00Z',
  },
  // user3 인증 기록
  {
    userId: 'user3',
    challengeId: 'challenge3',
    day: 1,
    status: 'completed',
    photo: '🌸',
    message: '길가에 핀 예쁜 꽃들을 보며 산책했어요. 봄의 향기가 가득!',
    verifiedBy: ['user1', 'user2', 'user4'],
    createdAt: '2024-07-01T10:30:00Z',
  },
  {
    userId: 'user3',
    challengeId: 'challenge3',
    day: 2,
    status: 'completed',
    photo: '🐕',
    message: '강아지들과 함께 산책하는 사람들을 보니 마음이 따뜻해졌어요.',
    verifiedBy: ['user1', 'user2', 'user5'],
    createdAt: '2024-07-02T16:00:00Z',
  },
  {
    userId: 'user3',
    challengeId: 'challenge3',
    day: 3,
    status: 'completed',
    photo: '🍃',
    message: '바람이 시원한 오후, 나무 그늘 아래를 걸으며 힐링했어요.',
    verifiedBy: ['user1', 'user4', 'user6'],
    createdAt: '2024-07-03T15:45:00Z',
  },
  // user4 인증 기록
  {
    userId: 'user4',
    challengeId: 'challenge3',
    day: 1,
    status: 'completed',
    photo: '💪',
    message: '운동 전 가벼운 산책으로 몸풀기! 오늘도 화이팅!',
    verifiedBy: ['user1', 'user2', 'user3'],
    createdAt: '2024-07-01T06:30:00Z',
  },
  {
    userId: 'user4',
    challengeId: 'challenge3',
    day: 2,
    status: 'failed',
    photo: '',
    message: '',
    verifiedBy: [],
    createdAt: '2024-07-02T00:00:00Z',
  },
  {
    userId: 'user4',
    challengeId: 'challenge3',
    day: 3,
    status: 'completed',
    photo: '🌅',
    message: '어제 못한 만큼 오늘은 더욱 열심히! 일찍 일어나서 새벽 산책.',
    verifiedBy: ['user1', 'user3', 'user5'],
    createdAt: '2024-07-03T06:00:00Z',
  },
  // user5 인증 기록
  {
    userId: 'user5',
    challengeId: 'challenge3',
    day: 1,
    status: 'completed',
    photo: '🌺',
    message: '화분에 물 주고 나서 동네 한 바퀴. 식물들도 함께 산책하는 기분!',
    verifiedBy: ['user2', 'user3', 'user4'],
    createdAt: '2024-07-01T11:00:00Z',
  },
  {
    userId: 'user5',
    challengeId: 'challenge3',
    day: 2,
    status: 'completed',
    photo: '🦋',
    message: '나비를 따라 걷다 보니 평소보다 더 많이 걸었네요. 자연의 인도!',
    verifiedBy: ['user1', 'user2', 'user6'],
    createdAt: '2024-07-02T13:30:00Z',
  },
  {
    userId: 'user5',
    challengeId: 'challenge3',
    day: 3,
    status: 'completed',
    photo: '🌿',
    message: '푸른 나뭇잎들을 보며 걷는 시간. 마음이 평온해져요.',
    verifiedBy: ['user1', 'user3', 'user4'],
    createdAt: '2024-07-03T12:15:00Z',
  },
  // user6 인증 기록
  {
    userId: 'user6',
    challengeId: 'challenge3',
    day: 1,
    status: 'completed',
    photo: '🍞',
    message: '빵집에 들러서 향긋한 냄새 맡으며 산책. 오감이 깨어나는 시간!',
    verifiedBy: ['user1', 'user3', 'user5'],
    createdAt: '2024-07-01T12:00:00Z',
  },
  {
    userId: 'user6',
    challengeId: 'challenge3',
    day: 2,
    status: 'completed',
    photo: '☕',
    message: '카페 앞을 지나며 커피향에 취해 걸었어요. 여유로운 하루!',
    verifiedBy: ['user2', 'user4', 'user5'],
    createdAt: '2024-07-02T10:45:00Z',
  },
  {
    userId: 'user6',
    challengeId: 'challenge3',
    day: 3,
    status: 'pending',
    photo: '',
    message: '',
    verifiedBy: [],
    createdAt: '2024-07-03T00:00:00Z',
  },
];

export const philosophyQuote = {
  text: '우리는 반복된 행동이 만든 존재다. 탁월함은 행동이 아니라 습관이다.',
  author: '아리스토텔레스',
};
