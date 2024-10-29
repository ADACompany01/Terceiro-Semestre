import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Projects } from "./components/Projects/Projects";
import SignIn from "./components/sign-in/SignIn"
import SignUpClient from "./components/sign-up-client/SignUpClient"

function AppRoutes() {
  return (
    <Router>
      <Route path="/" element={<Hero/>} />
      <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signupclient" element={<SignUpClient />} />

    </Router>
  );
}

export default AppRoutes;