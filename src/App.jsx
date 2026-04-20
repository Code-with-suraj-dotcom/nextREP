import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import Login from './pages/Login';
import MyLibrary from './pages/MyLibrary';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="relative w-full max-w-[1600px] m-auto bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={<MyLibrary />} />
      </Routes>
    </div>
  );
}

export default App;
