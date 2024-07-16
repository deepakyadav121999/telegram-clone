import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import ChatDetails from './ChatDetails';
import Home from './Home';

function App() {
  return (
    <ThemeProvider>
      <div className="bg-gray-900">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:userId" element={<ChatDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
