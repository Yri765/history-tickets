import { GameProvider, useGame } from './context/GameContext';
import './history-theme.css';
import { MainMenu } from './components/MainMenu';
import { TicketView } from './components/TicketView';
import { HistoryView } from './components/HistoryView';

const GameContent = () => {
  const { state } = useGame();

  return (
    <div className="app-container">
      {state.view === 'MENU' && <MainMenu />}
      {state.view === 'GAME' && <TicketView />}
      {state.view === 'HISTORY' && <HistoryView />}
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
