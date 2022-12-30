import { Link, useParams } from "react-router-dom";
import teamService from "../services/team.service";
import React, { useEffect, useState, useRef } from "react";
import "../styles/team.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import codeAcademy from "../images/codeacademy.png";
//import AuthService from "../services/auth.service";


const TeamPreview = () => {
    const [team, setTeam] = useState([]);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const { id } = useParams();
    const [coachId, setCoachId] = useState([]);
    //const user = AuthService.getCurrentUser();
  
    const componentRef = useRef();
  
  
    useEffect(() => {
      if (id) {
        teamService
          .get(id)
          .then((response) => {
            console.log("Printing Teams data", response.data); ///////////////////////////
            setTeamPlayers(response.data.teamPlayers);
            setCoachId(response.data.coachId);
            setTeam(response.data);
          })
          .catch((error) => {
            console.log("Something went wrong", error);
          });
      }
    }, []);
  
    return (
      <div className="komandos-sablonas">
        <div style={{ textAlign: "center" }}>
        </div>
        <div className="bendras" ref={componentRef}>
          <table className="komandos informacija">
            <tbody>
              <tr>
                <td>
                  <span>Komandos pavadinimas: </span>
                  {team.teamName}
                </td>
                <td></td>
              </tr>
  
              <tr>
                <td>
                  <span>Treneris: </span>
                  {coachId.name} {coachId.surname}
                </td>
                <td></td>
              </tr>

              <tr>
                <td>
                  <span>Trenerio el.paštas: </span>
                  {coachId.email}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
  
          <table className="line-players-container">
            <thead>
              <tr>
                <th className="heading-description">Žaidėjo Nr.</th>
                <th className="heading-description">Vardas ir pavardė</th>
                <th className="heading-description">Pozicija</th>
              </tr>
            </thead>
            <tbody className="player">
              {teamPlayers.map((player, id) => (
                <tr key={id}>
                  <td> {teamPlayers[id].player.number} </td>
                  <td> {teamPlayers[id].player.name} {teamPlayers[id].player.surname} </td>
                  <td> {teamPlayers[id].player.position} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <Link to="/teams">Atgal į sąrašą</Link>
        </div>
      </div>
    );
  };
  
  export default TeamPreview;