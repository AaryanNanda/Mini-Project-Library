// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignUp from "./signUp/App";
// import AddProject from "./addProject/App";
// // import App3 from "./signUp/App3";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<SignUp />} />
//         <Route path="/addProject" element={<AddProject/>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from "react";
import SignUp from "./signUp/App";
import AddProject from "./addProject/App";

function App() {
  const [page, setPage] = useState("signup");

  return (
    <div>
      {page === "signup" && <SignUp setPage={setPage} />}
      {page === "addProject" && <AddProject setPage={setPage} />}
    </div>
  );
}

export default App;