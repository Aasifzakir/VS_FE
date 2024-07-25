import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register';
import Header from './Components/Header';
import ProtectedRoute from './Utils/ProtedtedRoute';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {
  return (
    <div className="">
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "",
          duration: 2000,
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
