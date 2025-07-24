import Signup from "./Pages/Signup";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Income from "./Pages/Income";
import Expenses from "./Pages/Expenses";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
     
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/income" element={<Income />}/>
      <Route path ="/expenses" element={<Expenses/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
