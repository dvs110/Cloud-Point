import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import './form.css'

const FormSec = () => {
        const navigate = useNavigate()
        const [credentials, setCredentials] = useState({
                city: undefined,
        })

        const handleChange = (e) => {
                setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
        }

        const handleClick = async (e) => {
                e.preventDefault()

                console.log(credentials);
                const result = await axios.post("/form", credentials);
                console.log(result);
                console.log(result.data.n);
                navigate("/out", { state: { name: result.data.n, temp: result.data.t, currDate: result.data.c } })



        }

        return (
                <><div className='out'>

                        <div className="outer-div">
                                <div id="weathericon1">
                                        <i className="fas fa-sun" style={{ color: "#eccc68" }}></i>
                                        <h1>Weather App</h1>
                                </div>

                                <div className="input-section">
                                        <input type="text" placeholder="city" id="city" onChange={handleChange} className="city" required />



                                        <button className="btn" onClick={handleClick}>SEARCH CITY</button>
                                </div>

                        </div>
                </div>


                </>
        )
}

export default FormSec;