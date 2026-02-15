import React from 'react';
import { useGame } from '../context/GameContext';
import { Scroll, Play } from 'lucide-react';

export const MainMenu: React.FC = () => {
    const { state, dispatch } = useGame();

    const totalTickets = state.tickets.length;
    const answeredCount = Object.keys(state.history).length;
    const progress = totalTickets > 0 ? Math.round((answeredCount / totalTickets) * 100) : 0;

    const handleStart = () => {
        // Find first unanswered ticket
        const unanswered = state.tickets.find(t => !state.history[t.id]);
        if (unanswered) {
            dispatch({ type: 'START_TICKET', payload: unanswered.id });
        } else {
            // All answered, maybe reset or just go to history?
            // For now, let's just go to history if all done
            dispatch({ type: 'SET_VIEW', payload: 'HISTORY' });
        }
    };

    return (
        <div className="menu-container" style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', margin: '2rem 0', color: 'var(--c-ink)' }}>History Tickets</h1>

            <div className="stats-panel" style={{
                border: 'var(--border-gold)',
                padding: '2rem',
                marginBottom: '3rem',
                backgroundColor: 'var(--c-parchment-light)',
                boxShadow: 'var(--shadow-paper)'
            }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Progress</div>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--c-gold-dark)' }}>
                    {answeredCount} <span style={{ fontSize: '2rem', color: 'var(--c-ink-light)' }}>/ {totalTickets}</span>
                </div>
                <div style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                    "{progress}% Complete"
                </div>
            </div>

            <div className="actions" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <button
                    onClick={handleStart}
                    style={{
                        padding: '1rem 3rem',
                        fontSize: '1.5rem',
                        backgroundColor: 'var(--c-gold)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        boxShadow: 'var(--shadow-paper)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <Play size={24} />
                    {answeredCount === 0 ? "Start Journey" : "Continue"}
                </button>

                <button
                    onClick={() => dispatch({ type: 'SET_VIEW', payload: 'HISTORY' })}
                    style={{
                        padding: '0.8rem 2rem',
                        fontSize: '1.2rem',
                        backgroundColor: 'transparent',
                        color: 'var(--c-ink)',
                        border: 'var(--border-ink)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <Scroll size={20} />
                    View History
                </button>
            </div>
        </div>
    );
};
