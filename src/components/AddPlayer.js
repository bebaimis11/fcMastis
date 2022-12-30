
import { Link, useNavigate, useParams } from "react-router-dom";
import playerService from "../services/player.service";
import React from "react"
import {useEffect, useState} from "react";

const AddPlayer = () => {
  const [name, setFirstName] = useState('');
    const [surname, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [position, setPosition] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();


    const player = {name, surname, age, position, number, price, id};
    const savePlayer = (e) => {
        e.preventDefault();
        console.log(player);
        
        if (id) {
            // update record
            playerService.update(player)
                .then(response => {
                    console.log('Player data updated successfully', response.data);
                    navigate('/players'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        } else {
            // create new record
            playerService.create(player)
            .then(response => {
                console.log('Player added successfully',  response.data);
                navigate('/players');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }

    useEffect(() => {
        console.log(player)
        if (id) {
            playerService.get(id)
                .then(player => {
                    setFirstName(player.data.name);
                    setLastName(player.data.surname);
                    setAge(player.data.age);
                    setPosition(player.data.position);
                    setNumber(player.data.number);
                    setPrice(player.data.price);
                   
                    
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])

    return(
        <div className="container">
            <h3>Pridėti  </h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="name"
                        value={name}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Įveskite vardą"
                     />

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="surname"
                       value={surname}
                       onChange={(e) => setLastName(e.target.value)}
                       placeholder="Įveskite pavardę"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="age"
                       value={age}
                       onChange={(e) => setAge(e.target.value)}
                       placeholder="įveskite amžių"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="position"
                       value={position}
                       onChange={(e) => setPosition(e.target.value)}
                       placeholder="įveskite poziciją"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="number"
                       value={number}
                       onChange={(e) => setNumber(e.target.value)}
                       placeholder="įveskite numerį"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="price"
                       value={price}
                       onChange={(e) => setPrice(e.target.value)}
                       placeholder="įveskite kainą"
                    /> 

                </div>
                
                <div>
                    <button onClick={(e) => savePlayer(e)}
                    className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/players">Atgal į sąrašą</Link>
        </div>
    )
};

export default AddPlayer;