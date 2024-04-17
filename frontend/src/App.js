import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './jsx/Login';
import Signup from './jsx/Signup';
import Dashboard from './jsx/Dashboard';
import Blog from './jsx/Blog';
import ReadBlog from './jsx/ReadBlog';
import NewBlog from './jsx/NewBlog';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/signup" element={<Signup />} /> 
       <Route path="/dashboard" element={<Dashboard />} /> 
       <Route path="/blog" element={<Blog />} /> 
       <Route path="/readblog/:_id" element={<ReadBlog/>}/>
       <Route path="/createblog" element={<NewBlog/>}/>


    </Routes>
  </Router>
  );
}

export default App;
