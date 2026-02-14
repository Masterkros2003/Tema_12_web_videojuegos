import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import GameDetailPage from './pages/GameDetailPage';
import TagGamesPage from './pages/TagGamesPage';
import PublishersPage from './pages/PublishersPage';
import PublisherDetailPage from './pages/PublisherDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/game/:id" element={<GameDetailPage />} />
      <Route path="/tag/:id/:slug" element={<TagGamesPage />} />
      <Route path="/genre/:id/:slug" element={<TagGamesPage />} />
      <Route path="/publishers" element={<PublishersPage />} />
      <Route path="/publisher/:id" element={<PublisherDetailPage />} />
    </Routes>
  );
}

export default App;
