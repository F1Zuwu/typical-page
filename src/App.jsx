import { useState, useEffect } from "react";
import MainHeader from "./components/MainHeader/MainHeader";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import AuthContext from "./store/auth-context";

function App() {
  const [loggedin, setLoggedIn] = useState(() => {
    if (JSON.parse(localStorage.getItem("isLoggedUser")) !== null) {
      return JSON.parse(localStorage.getItem("isLoggedUser")).isLogged;
    } else {
      return false;
    }
  });

  console.log(loggedin);

  useEffect(() => {
    const storedLoggedUserData = JSON.parse(
      localStorage.getItem("isLoggedUser")
    );
    if (storedLoggedUserData !== null) {
      if (storedLoggedUserData.isLogged === true) {
        setLoggedIn(true);
      }
    }
  }, []);

  const loginHandler = (user) => {
    localStorage.setItem("isLoggedUser", JSON.stringify({ username: user, isLogged: true }));
    setLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedUser')
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{loggedIn: loggedin, onLogout: logoutHandler}}>
      <MainHeader onLogout={logoutHandler}/>
      <main>
        {!loggedin && <Login onLogin={loginHandler} />}
        {loggedin && <Home/>}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
