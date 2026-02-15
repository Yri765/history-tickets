import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

export const HistoryView: React.FC = () => {
    const { state, dispatch } = useGame();

    // Local state for expanded items
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    const toggleExpand = (id: number) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const answeredTicketIds = Object.keys(state.history).map(Number).sort((a, b) => a - b);

    return (
        <div className="history-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => dispatch({ type: 'SET_VIEW', payload: 'MENU' })}
                style={{
                    border: 'none',
                    background: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    marginBottom: '2rem',
                    color: 'var(--c-ink-light)'
                }}
            >
                <ArrowLeft size={16} /> Back to Menu
            </button>

            <h2 style={{
                textAlign: 'center',
                fontSize: '2.5rem',
                borderBottom: 'var(--border-gold)',
                paddingBottom: '1rem',
                marginBottom: '2rem'
            }}>
                Your Chronicles
            </h2>

            {answeredTicketIds.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--c-ink-light)', fontStyle: 'italic', marginTop: '4rem' }}>
                    No tickets answered yet. The pages are empty.
                </div>
            ) : (
                <div className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {answeredTicketIds.map(id => {
                        const ticket = state.tickets.find(t => t.id === id);
                        const answerRecord = state.history[id];
                        const isExpanded = expanded[id];

                        if (!ticket) return null;

                        return (
                            <div key={id} style={{
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                border: '1px solid rgba(44,36,27,0.1)',
                                borderRadius: '4px'
                            }}>
                                <div
                                    onClick={() => toggleExpand(id)}
                                    style={{
                                        padding: '1.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: isExpanded ? 'rgba(197, 160, 89, 0.1)' : 'transparent'
                                    }}
                                >
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{ticket.title}</h3>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--c-ink-light)', marginTop: '0.3rem' }}>
                                            Answered on {new Date(answerRecord.timestamp).toLocaleDateString()}
                                        </div>
                                    </div>
                                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>

                                {isExpanded && (
                                    <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid rgba(44,36,27,0.1)' }}>
                                        {ticket.questions.map((q, idx) => (
                                            <div key={q.id} style={{ marginTop: '1.5rem' }}>
                                                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                                    {idx + 1}. {q.text}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'var(--font-serif)',
                                                    padding: '0.8rem',
                                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                                    borderRadius: '4px',
                                                    borderLeft: '3px solid var(--c-gold)',
                                                    fontStyle: 'italic'
                                                }}>
                                                    {answerRecord.answers[idx] || "No answer recorded."}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
