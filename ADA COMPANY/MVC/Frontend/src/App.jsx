import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";
import SignIn from "./components/sign-in/SignIn"
import SignUpClient from "./components/sign-up-client/SignUpClient"


function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero/>} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/signupclient" element={<SignUpClient />} />
        </Routes>
        <Contact/>
      </div>
    </Router>
  );
}

export default App;
