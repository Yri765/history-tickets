import type { Ticket } from '../types';

export const parseTickets = (text: string): Ticket[] => {
    const tickets: Ticket[] = [];
    const lines = text.split('\n');

    let currentTicket: Ticket | null = null;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Match "Билет №X"
        const headerMatch = trimmed.match(/^Билет\s+№(\d+)/i);
        if (headerMatch) {
            if (currentTicket) {
                tickets.push(currentTicket);
            }
            currentTicket = {
                id: parseInt(headerMatch[1], 10),
                title: trimmed,
                questions: []
            };
            continue;
        }

        // Match question like "1. Question text..."
        const questionMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (questionMatch && currentTicket) {
            currentTicket.questions.push({
                id: parseInt(questionMatch[1], 10),
                text: questionMatch[2]
            });
        }
    }

    if (currentTicket) {
        tickets.push(currentTicket);
    }

    return tickets;
};
