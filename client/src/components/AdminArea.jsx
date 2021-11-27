import React from 'react'
import { useHistory } from 'react-router';
import search from "../Assets/search.png"
import list from "../Assets/list.png"
import { FaArrowLeft } from 'react-icons/fa';


const AdminArea = () => {
const history=useHistory();

    return (
        <>
         <div className="container mt-3">
        <span
        style={{ cursor: "pointer" }}
        className="fw-bold title font-monospace text-secondary my-2"
        onClick={() => history.goBack()}
        >
        <FaArrowLeft /> Go Back
        </span>
        </div>

        <div className="container d-flex justify-content-evenly flex-wrap mt-5">
        <div className="card my-3" style={{ width: "18rem",borderRadius:"17px" }}>
          <img src={search} className="card-img-top" alt="..." style={{borderRadius:"17px"}} />
          <div className="card-body">
            <h5 className="card-title title">Search Customer</h5>
            <p className="card-text mb-3 title">
              Search Customer by Customer Id
            </p>
            <div className="container d-flex justify-content-center">
              <button
                className="btn btn-primary"
                onClick={() => {
                  history.push("/adminArea/searchCustomer");
                }}
              >
                Search Customer
              </button>
            </div>
          </div>
        </div>

        <div className="card my-3" style={{ width: "18rem",borderRadius:"17px" }}>
          <img src={list} className="card-img-top" alt="Test status" style={{borderRadius:"17px"}} />
          <div className="card-body">
            <h5 className="card-title title">See List</h5>
            <p className="card-text mb-3 title">
              See the list of Customers
            </p>
            <div className="container d-flex justify-content-center">
              <button
                className="btn btn-primary"
                onClick={() => {
                  history.push("/adminArea/customerList");
                }}
              >
                See list
              </button>
            </div>
          </div>
        </div>
      </div>    
        </>
    )
}

export default AdminArea
