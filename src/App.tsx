import './App.css';

import { Button } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
// pages
//import TodoPage from './pages/todo';
import Dashboard from './pages/dashboard';
import GroupPage from './pages/group';
import TrainPage from './pages/train';

function App() {

  return (
    //<div className="App">
  
    <Routes>
        <Route path="/group" element={<GroupPage />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/" element={<Dashboard />} />
    </Routes>
    //</div>
  );
}

export default App;
