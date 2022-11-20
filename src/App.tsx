import './App.css';

import { Button } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
// pages
//import TodoPage from './pages/todo';
import Dashboard from './pages/dashboard';
import GroupPage from './pages/group';
import TrainPage from './pages/train';
import SettingPage from './pages/setting';

function App() {

  return (
    //<div className="App">
  
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/settings" element={<SettingPage />} />
    </Routes>
    //</div>
  );
}

export default App;
