import './App.css';

import { Button } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
// pages
//import TodoPage from './pages/todo';
import GroupPage from './pages/group';


function App() {

  return (
    //<div className="App">
      <Routes>
        <Route path="/" element={<GroupPage />} />
      </Routes>      
    //</div>
  );
}

export default App;
