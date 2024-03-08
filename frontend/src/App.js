import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Post from './components/Post';
import Home from './components/Home';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }


  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  const ProtectedRoute = ({ element, ...props }) => {
    return isAuthenticated() ? (
      element
    ) : (
      <Navigate to="/signin" replace />
    );
  };

  return (
    <Router>
      <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert} />} />
        <Route path="/signin" element={<Signin showAlert={showAlert} />} />
        <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        {/* Protected route for posts */}
        <Route
          path="/posts"
          element={<ProtectedRoute element={<Post showAlert={showAlert} />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
