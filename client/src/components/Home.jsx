import React from 'react'
import { useHistory } from 'react-router-dom'


const Home = () => {
    const history=useHistory();

    return (
        <>
        <div className="container my-5 d-flex justify-content-center">
            <div className="my-5">
          <button className="btn btn-lg btn-success mx-5" onClick={()=>{history.push("/customerRegistration")}}>Customer Registration</button>
          <button className="btn btn-lg btn-primary text-white" onClick={()=>{history.push("/adminArea")}}>Admin Area</button>
           </div>
        </div>
        </>
    )
}

export default Home
