import React from "react";
import Select from "react-select";
import {useEffect, useState} from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import teamService from "../services/team.service";
import playerService from "../services/player.service";
import coachService from "../services/coach.service";
import "bootstrap/dist/css/bootstrap.min.css";



const AddTeam = () => {
    const [teamName, setTeamName] = useState('');
    const [players, setPlayers] = useState([]);
    const [coach, setCoach] = useState([]);
    const [teamPlayers, setTeamPlayers] = useState([{ player: ""}]);
    const [coachId, setCoaches] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
   

const init = () => {
    coachService
        .getAll()
        .then((response) => {
            console.log("Printing Coach data", response.data);
            setCoach(response.data);
        })
        .catch((error) => {
            console.log("Ups", error);
        });

      
    playerService
        .getAll()
        .then((response) => {
            console.log("Printing Players data", response.data);
            setPlayers(response.data);
        })
        .catch((error) => {
            console.log("Ups", error);
        });  
  };
   
const saveTeam = (e) => {
        e.preventDefault();
        
        const team = {teamName, coachId, teamPlayers,  id };
        if (id) {
            // update record
            teamService.update(team, id)
                .then(response => {
                    console.log('Team data updated successfully', response.data);
                    navigate('/teams'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        } else {
            // create new record
            teamService.create(team, id)
            .then(response => {
                console.log('Team added successfully',  response.data);
                navigate('/teams');
            })
            .catch(error => {
                console.log('Something went wrong555', error);
            })
        }
    }

  
    useEffect(() => {
        
        init();
       
        if (id) {
          teamService.get(id)
            .then(team => {
                setTeamName(team.data.teamName);
                setCoaches(team.data.coachId);
                setTeamPlayers(team.data.teamPlayers);
                
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
        
    },[])
    let addFormFields = () => {  
        setTeamPlayers([...teamPlayers, { player: ""}])
      }
    
    let removeFormFields = (i) => {
        let newTeamPlayers = [...teamPlayers];
        newTeamPlayers.splice(i, 1);
        setTeamPlayers(newTeamPlayers)
    }

    let handleChange = (option, index, name) => {
        const value = option;
        const list = [...teamPlayers];
        list [index][name] = value;
        setTeamPlayers(list);
     }
    



   
    return(
        <div className="container">
            <h3>Pridėti komandą</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="teamName"
                       value={teamName}
                       onChange={(e) => setTeamName(e.target.value)}
                       placeholder="Įveskite komandos pavadinimą"
                    /> 
                </div>
                <div className="form-group">
                    <Select     
                        value={coachId}             
                        options={coach}
                        getOptionLabel = {a => a.name + " " + a.surname}
                        getOptionValue={a => a}  
                        className=" col-4"
                        id="coach"
                        onChange={(e) => setCoaches(e)} 
                        > 
                    </Select>
                </div>
                
                <div className="form-block"> 
                    {teamPlayers.map((element, index) => { 
                        return(
                            <div className="form-inline" key={index}>
                                <Select
                                    className="col-4"
                                    name="player"
                                    options={players}
                                    getOptionLabel = {a => a.name + " " + a.surname}
                                    getOptionValue = {a => a}
                                    value={element.player}
                                    onChange={e => handleChange(e, index, "player")}
                                />
                              
                                {teamPlayers.length > 1 &&(
                                    <button type="button"  className="btn btn-success" onClick={() => removeFormFields(index)}>Remove</button> 
                                )}
                            </div>
                        )})
                    }
                
                    <button 
                        className="btn btn-danger" 
                        type="button" 
                        onClick={() => addFormFields()}>Add
                    </button>
                </div>
                
                <br />
                <div>
                    <button onClick={(e) => saveTeam(e)}
                    className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/teams">Atgal į sąrašą</Link>
        </div>
    )
};

export default AddTeam;
