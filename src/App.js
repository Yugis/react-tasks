import './index.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateTask from './CreateTask';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path='/create' element={<CreateTask />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
