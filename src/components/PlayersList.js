
import {useEffect, useState} from "react";
import React from "react"
import playerService from "../services/player.service";
import { Link } from "react-router-dom";


const PlayersList = () => {
    const [players, setCoachingStaff] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        playerService
            .getAll()
            .then((response) => {
                console.log("Printing Player data", response.data);
                setCoachingStaff(response.data);
            })
            .catch((error) => {
                console.log("Ups", error);
            });
    };

    const handleDelete = (id) => {
        playerService
            .remove(id)
            .then((response) => {
                console.log("Player deleted");
                init();
            })
            .catch((error) => {
                console.log("Ups", error);
            });
    };

    return (
        <div className="container">
            <h3>Žaidėjų sąrašas</h3>
            <hr />
            <div>
                <Link to="/players/add" className="btn btn-outline-primary btn-block btn-lg mb-2">Pridėti žaidėją</Link>
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
                            <th>Position</th>
                            <th>Number</th>
                            <th>Price</th>
                            <th>Veiksmai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.surname}</td>
                                <td>{player.age}</td>
                                <td>{player.position}</td>
                                <td>{player.number}</td>
                                <td>{player.price}</td>
                                <td>
                                    <Link
                                        to={`/players/edit/${player.id}`}
                                        className="btn btn-outline-success"
                                    >
                                        Atnaujinti
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger mt-2"
                                        onClick={(e) => {
                                            handleDelete(player.id);
                                        } }
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
}

export default PlayersList;
