export interface User {
  id: number;
  username: string;
  role: "USER" | "ADMIN";
}

export interface Choice {
  id: number;
  label: string;
  eventId: number;
}

export interface Event {
  id: number;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  createdAt: string;
  createdBy: number;
  choices: Choice[];
}

export interface Vote {
  voteId: number;
  eventId: number;
  eventTitle: string;
  choiceId: number;
  choiceLabel: string;
  votedAt: string;
}

export interface EventTrends {
  eventId: number;
  trends: {
    time: string;
    choices: Record<string, number>;
  }[];
}

export interface EventBody {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  choices: string[];
}
