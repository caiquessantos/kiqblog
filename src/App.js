import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/auth/useAuthentication";

// pages
import Home from "./pages/home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/Forms/Login/LoginForm";
import RegisterForm from "./components/Forms/Register/RegisterForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import Search from "./pages/search/Search";
import DashboardSearch from "./pages/Dashboard/DashboardSearch";

//context
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/Notifications/Notification";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <NotificationProvider>
          <BrowserRouter>
            <NavBar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/search" element={<Search />}></Route>
                <Route
                  path="/dashboard"
                  element={user ? <Dashboard /> : <Navigate to="/login" />}
                ></Route>
                <Route
                  path="/dashboard/search"
                  element={
                    user ? <DashboardSearch /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/createpost"
                  element={user ? <CreatePost /> : <Navigate to="/login" />}
                ></Route>
                <Route
                  path="/login"
                  element={!user ? <LoginForm /> : <Navigate to="/" />}
                ></Route>
                <Route
                  path="/register"
                  element={!user ? <RegisterForm /> : <Navigate to="/" />}
                ></Route>
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
