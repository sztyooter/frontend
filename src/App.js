import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/landing/Landing.js';
import MatchUps from './components/matchups/MatchUps';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/matchups' element={<MatchUps />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;