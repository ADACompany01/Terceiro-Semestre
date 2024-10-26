import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Hero } from "./components/Hero/Hero";
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;