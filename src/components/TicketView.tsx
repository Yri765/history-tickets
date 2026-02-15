import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Save, ArrowLeft } from 'lucide-react';

export const TicketView: React.FC = () => {
    const { state, dispatch } = useGame();
    const ticket = state.tickets.find(t => t.id === state.activeTicketId);

    // Local state for answers
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        // Load existing answers if available
        if (state.activeTicketId && state.history[state.activeTicketId]) {
            setAnswers(state.history[state.activeTicketId].answers);
        } else {
            setAnswers({});
        }
    }, [state.activeTicketId, state.history]);

    if (!ticket) return <div>Loading...</div>;

    const handleSave = () => {
        dispatch({
            type: 'SAVE_ANSWER',
            payload: {
                ticketId: ticket.id,
                answers,
                timestamp: Date.now()
            }
        });
    };

    const handleBack = () => {
        dispatch({ type: 'EXIT_TICKET' });
    };

    return (
        <div className="ticket-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={handleBack}
                style={{
                    border: 'none',
                    background: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    marginBottom: '1rem',
                    color: 'var(--c-ink-light)'
                }}
            >
                <ArrowLeft size={16} /> Back to Menu
            </button>

            <div className="ticket-header" style={{
                borderBottom: 'var(--border-gold)',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{ticket.title}</h2>
                <div style={{ fontStyle: 'italic', color: 'var(--c-ink-light)' }}>
                    History Exam Ticket
                </div>
            </div>

            <div className="questions">
                {ticket.questions.map((q, idx) => (
                    <div key={q.id} className="question-block" style={{ marginBottom: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                            <span style={{
                                display: 'inline-block',
                                width: '1.5rem',
                                height: '1.5rem',
                                backgroundColor: 'var(--c-gold)',
                                color: 'white',
                                borderRadius: '50%',
                                textAlign: 'center',
                                lineHeight: '1.5rem',
                                marginRight: '0.5rem',
                                fontSize: '0.9rem'
                            }}>{idx + 1}</span>
                            {q.text}
                        </h3>
                        <textarea
                            value={answers[idx] || ''}
                            onChange={(e) => setAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                            placeholder="Write your answer here..."
                            style={{
                                width: '100%',
                                minHeight: '100px',
                                padding: '1rem',
                                fontSize: '1rem',
                                lineHeight: '1.6',
                                fontFamily: 'var(--font-serif)',
                                backgroundColor: 'rgba(255,255,255,0.4)',
                                border: '1px solid #ccc',
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderBottom: '2px solid var(--c-ink-light)',
                                borderRadius: '0',
                                resize: 'vertical',
                                outline: 'none'
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="actions" style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '4rem' }}>
                <button
                    onClick={handleSave}
                    style={{
                        padding: '1rem 3rem',
                        fontSize: '1.5rem',
                        backgroundColor: 'var(--c-red-seal)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50% 50% 50% 0', // Seal shape-ish
                        width: '120px',
                        height: '120px',
                        boxShadow: 'var(--shadow-deep)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        transform: 'rotate(-5deg)'
                    }}
                >
                    <Save size={32} style={{ marginBottom: '0.5rem' }} />
                    Save
                </button>
            </div>
        </div>
    );
};
