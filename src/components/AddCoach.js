import React from "react"
import {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import coachService from "../services/coach.service";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCoach= () => {
  const [name, setFirstName] = useState('');
    const [surname, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [mobNumber, setMobNumber] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const saveCoach = (e) => {
        e.preventDefault();

        const coach= {name, surname, age, mobNumber, email,  id};
        if (id) {
            // update record
            coachService.update(coach)
                .then(response => {
                    console.log('Coach data updated successfully', response.data);
                    navigate('/coaches'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        } else {
            // create new record
            coachService.create(coach)
            .then(response => {
                console.log('Coach added successfully',  response.data);
                navigate('/coaches');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }

    useEffect(() => {
        if (id) {
            coachService.get(id)
                .then(coach => {
                    setFirstName(coach.data.name);
                    setLastName(coach.data.surname);
                    setAge(coach.data.age);
                    setMobNumber(coach.data.mobNumber);
                    setEmail(coach.data.email);

                   
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])

    return(
        <div className="container">
            <h3>Pridėti trenerį</h3>
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
                       id="mobNumber"
                       value={mobNumber}
                       onChange={(e) => setMobNumber(e.target.value)}
                       placeholder="įveskite mob. numerį"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="įveskite el.paštą"
                    /> 

                </div>
                <br />
                <div>
                    <button onClick={(e) => saveCoach(e)}
                    className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/coaches">Atgal į sąrašą</Link>
        </div>
    )
};

export default AddCoach;