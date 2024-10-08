import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home'; 
/* import Registration from './Pages/Registration'; 
import Login from './Pages/Login'; */
import Profile from './Pages/Profile';
import Set_Nutrition from './Pages/Set_Nutrition';
import Nutrition from './Pages/Nutrition';
import FoodList from './Pages/FoodList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
       {/*  <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/set_nutriton" element={<Set_Nutrition />} />
        <Route path="/foodlist" element={<FoodList />} />
      </Routes>
    </Router>
  );
}

export default App;
