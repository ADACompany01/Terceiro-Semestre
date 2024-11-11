import { HashRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import { About } from "./components/Servicos/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";
import SignIn from "./components/sign-in/SignIn";
import SignUpClient from "./components/sign-up-client/SignUpClient";
import SignUpFuncionario from "./components/sign-up-funcionario/SignUpFuncionario";
import ListClient from "./components/list-client/ListClient";
import SignUpServico from "./components/sign-up-servico/SignUpServico"
import SignUpOrcamento from "./components/sign-up-orcamento/SignUpOrcamento"
import { AcessoCliente } from "./components/client-access/client-access";
import { AcessoAdmin } from "./components/admin-access/admin-access";

function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Projects/>
      <Experience/>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Navbar />
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signupclient" element={<SignUpClient />} />
          <Route path="/signupfuncionario" element={<SignUpFuncionario />} />
          <Route path="/listclient" element={<ListClient />} />
          <Route path="/signupservico" element={<SignUpServico />} />
          <Route path="/signuporcamento" element={<SignUpOrcamento />} />
          <Route path="/client" element={<AcessoCliente />} />   
          <Route path="/admin" element={<AcessoAdmin />} />          
        </Routes>
        <Contact />
      </div>
    </Router>
  );
}

export default App;
