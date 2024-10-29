import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Projects } from "./components/Projects/Projects";
import SignIn from "./components/sign-in/SignIn"
import SignUpClient from "./components/sign-up-client/SignUpClient"
import SignUpServico from "./components/sign-up-servico/SignUpServico"; 
function AppRoutes() {
  return (
    <Router>
      <Route path="/" element={<Hero/>} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/signupclient" element={<SignUpClient />} />
          <Route path="/signupservico" element={<SignUpServico />} />
    </Router>
  );
}

export default AppRoutes;