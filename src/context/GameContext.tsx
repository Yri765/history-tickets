import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { Ticket, AnswerRecord } from '../types';
import { parseTickets } from '../utils/parser';
import { RAW_DATA } from '../assets/data';

export type GameView = 'MENU' | 'HISTORY' | 'GAME';

export interface GameState {
    tickets: Ticket[];
    history: Record<number, AnswerRecord>;
    activeTicketId: number | null;
    view: GameView;
}

export type Action =
    | { type: 'INIT_DATA'; payload: Ticket[] }
    | { type: 'LOAD_HISTORY'; payload: Record<number, AnswerRecord> }
    | { type: 'START_TICKET'; payload: number }
    | { type: 'SAVE_ANSWER'; payload: AnswerRecord }
    | { type: 'EXIT_TICKET' }
    | { type: 'SET_VIEW'; payload: GameView };

const initialState: GameState = {
    tickets: [],
    history: {},
    activeTicketId: null,
    view: 'MENU',
};

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'INIT_DATA':
            return { ...state, tickets: action.payload };
        case 'LOAD_HISTORY':
            return { ...state, history: action.payload };
        case 'START_TICKET':
            return { ...state, activeTicketId: action.payload, view: 'GAME' };
        case 'SAVE_ANSWER': {
            const newHistory = {
                ...state.history,
                [action.payload.ticketId]: action.payload,
            };
            // Persist to localStorage
            try {
                localStorage.setItem('history_answers', JSON.stringify(newHistory));
            } catch (e) {
                console.error("Failed to save history", e);
            }
            return { ...state, history: newHistory, activeTicketId: null, view: 'MENU' };
        }
        case 'EXIT_TICKET':
            return { ...state, activeTicketId: null, view: 'MENU' };
        case 'SET_VIEW':
            return { ...state, view: action.payload };
        default:
            return state;
    }
};

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<Action>;
} | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        // 1. Parse Data
        const parsed = parseTickets(RAW_DATA);
        dispatch({ type: 'INIT_DATA', payload: parsed });

        // 2. Load History
        const saved = localStorage.getItem('history_answers');
        if (saved) {
            try {
                dispatch({ type: 'LOAD_HISTORY', payload: JSON.parse(saved) });
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGame must be used within GameProvider");
    return context;
};
