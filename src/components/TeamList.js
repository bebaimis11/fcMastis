import React from "react"
import {useEffect, useState} from "react";
import teamService from "../services/team.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
   teamService
      .getAll()
      .then((response) => {
        console.log("Printing Teams data", response.data);
        setTeams(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    teamService
      .remove(id)
      .then((response) => {
        console.log("Team deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  return (
    <div className="container">
      <h3>Komandų sąrašas</h3>
      <hr />
      <div>
        <Link to = "/teams/add" className="btn btn-outline-primary btn-block btn-lg mb-2">Pridėti komandą</Link>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Komandos pavadinimas</th>
              <th>Treneris</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                <td>{team.teamName}</td>
                <td>{team.coachId.name+ " " + team.coachId.surname}</td>
                <td>
                <Link to={`/teams/teampreview/${team.id}`} className="btn btn-outline-info mr-2">
                    Komandos Peržiūra
                  </Link>

    

                  <Link to={`/teams/edit/${team.id}`} className="btn btn-outline-success">
                    Atnaujinti
                  </Link>
                  <button 
                    className="btn btn-outline-danger ml-2"
                    onClick={(e) => {
                      handleDelete(team.id);
                    }}
                  >
                    Ištrinti
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamList;
