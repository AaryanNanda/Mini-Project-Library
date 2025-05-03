import React, { useState } from "react";
import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import HomePage from "./HomePage";

const SignUp = () => {
  const [page, setPage] = useState("signup");
  const [user, setUser] = useState(null);

  return (
    <div>
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} setUser={setUser} />}
      {page === "home" && user && <HomePage user={user} />}
    </div>
  );
};

export default SignUp;
