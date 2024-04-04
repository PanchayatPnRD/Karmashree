import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./App.css";
import { sideBarList } from "./components/Sidebar";
import Home from "./views/Home";
import Login from "./views/Login";
import Contact from "./views/Contact";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register/Register";

function App() {
  return (
    <>
      <div className="">
        <Routes>
          <Route
            path=""
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />
<<<<<<< Updated upstream
          <Route
            path="/dashboard"
            element={<Dashboard text={"Dashboard Body"}></Dashboard>}
          />
          {sideBarList.map((e) => {
            return (
              <Route
                key={e.text}
                path={e.route}
                element={
                  <>
                    <Dashboard text={e.text}></Dashboard>
                  </>
                }
              />
            );
          })}
=======
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
>>>>>>> Stashed changes
        </Routes>
      </div>
    </>
  );
}

export default App;
