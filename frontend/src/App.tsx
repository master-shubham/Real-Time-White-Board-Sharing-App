import { Route, Routes } from 'react-router-dom';
import './App.css'
import Forms from './components/Form';
import RoomPage from './pages/RoomPage';

function App() {


  return (
    <div className="container mx-auto">
      <Routes>
        <Route path='/' element={<Forms />} />
        <Route path='/:roomId' element={<RoomPage/>} />
      </Routes>

    </div>
  );
}

export default App
