export interface Question {
  id: number;
  text: string;
}

export interface Ticket {
  id: number;
  title: string; // e.g. "Билет №1"
  questions: Question[];
}

export interface AnswerRecord {
  ticketId: number;
  // Map question index (0, 1, 2) to answer string
  answers: { [key: number]: string };
  timestamp: number;
}

export interface AppState {
  tickets: Ticket[];
  history: { [ticketId: number]: AnswerRecord };
  currentTicketId: number | null;
}
