import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing';
import Wishes from './pages/Wishes';
import Memories from './pages/Memories';
import Letter from './pages/Letter';
import Cake from './pages/Cake';

const App: React.FC = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/wishes" element={<Wishes />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/cake" element={<Cake />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
