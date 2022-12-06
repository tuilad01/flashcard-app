import './App.css';

import { Button } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
// pages
//import TodoPage from './pages/todo';
import Dashboard from './pages/dashboard';
import GroupPage from './pages/group';
import TrainPage from './pages/train';
import SettingPage from './pages/setting';
import DailyTranslationPage from './pages/daily-translation-page';
import TestPage from './pages/test-page';
import ImportPage from './pages/import-page';
import UploadPage from './pages/upload-page';

function App() {

  return (
    //<div className="App">
  
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/daily-translation" element={<DailyTranslationPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/upload" element={<UploadPage />} />
    </Routes>
    //</div>
  );
}

export default App;

