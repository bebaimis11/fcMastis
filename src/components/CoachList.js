import React from "react";
import {useEffect, useState} from "react"
import coachService from "../services/coach.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



const CoachesList = () => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    coachService
      .getAll()
      .then((response) => {
        console.log("Printing Coaches data", response.data);
        setCoaches(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    coachService
      .remove(id)
      .then((response) => {
        console.log("Coach deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  return (
    <div className="container">
      <h3>Trenerių sąrašas</h3>
      <hr />
      <div>
        <Link to = "/coaches/add" className="btn btn-outline-primary btn-block btn-lg mb-2">Pridėti trenerį</Link>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>MobNumber</th>
              <th>Email</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach)=> (
              <tr key={coach.id}>
                <td>{coach.name}</td>
                <td>{coach.surname}</td>
                <td>{coach.age}</td>
                <td>{coach.mobNumber}</td>
                <td>{coach.email}</td>
                <td>
                
        
                  <Link to={`/coaches/edit/${coach.id}`} className="btn btn-outline-success">
                    Atnaujinti
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(coach.id);
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

export default CoachesList;