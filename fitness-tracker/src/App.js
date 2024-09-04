import logo from './logo.svg';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import List from './Pages/List';
import Navbar from './Components/Navbar';

function App() {
  return (
   <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Registration/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/list' element={<List/>}/>
    </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
