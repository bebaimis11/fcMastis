import CoachList from "./components/CoachList";
import PlayersList from "./components/PlayersList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import AddPlayer from "./components/AddPlayer";
import AddCoach from "./components/AddCoach";
import Layout from "./pages/Layout";
import Home from "./pages/Home"
import TeamList from "./components/TeamList";
import AddTeam from "./components/AddTeam";

const App = () => {
  return (
    <>
      <Layout />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/coaches/" element={<CoachList />}></Route>
        <Route path="/coaches/add" element={<AddCoach />}></Route>
        <Route path="/coaches/edit/:id" element={<AddCoach />}></Route>
        <Route path="/players/" element={<PlayersList />}></Route>
        <Route path="/players/add/" element={<AddPlayer />}></Route>
        <Route path="/players/edit/:id" element={<AddPlayer />}></Route>
        <Route path="/teams" element={<TeamList />}></Route>
        <Route path="/teams/add/" element={<AddTeam />}></Route>
        <Route path="/teams/edit/:id" element={<AddTeam />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
//komentarass
export default App;
