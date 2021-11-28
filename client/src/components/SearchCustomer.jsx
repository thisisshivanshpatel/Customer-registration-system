import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { getCustomerById, getCustomerRegistrationsByDate } from '../Axios/api';
import CustomLoadingAnimation from './CustomLoadingAnimation';

const SearchCustomer = () => {
    const history=useHistory();
    const [Loading,setLoading]=useState(false);
    const [customerId,setCustomerId]=useState("");
    const [customerData,setCustomerData]=useState(null);
    const [customerRecords,setCustomerRecords]=useState([]);
    const [date,setDate]=useState("");

    const getdata=async()=>{
        try {
            setLoading(true);
            const response=await getCustomerById(customerId);
            setCustomerData(response?.data?.resp); 
        } catch (error) {
            console.log(error);

            toast.error(error?.error.message, {
                position: "top-center",
                theme: "colored",
              });
        }
        finally
        {
            setLoading(false);
        }
    }

    const getdatabyDate=async()=>{
      try {
        setLoading(true);
        const response=await getCustomerRegistrationsByDate(date);
        setCustomerRecords(response?.data.resp); 
    } catch (error) {
        console.log(error);
        toast.error(error?.error?.message, {
            position: "top-center",
            theme: "colored",
          });
    }
    finally
    {
        setLoading(false);
    }
    }


    useEffect(()=>{
       getdatabyDate();
       setCustomerData(null);
    },[date])

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

        <div className="container d-flex justify-content-center my-5">
        <div className="col-6">
          <input
            type="search"
            name="search"
            id="customerId"
            onChange={(e)=>{setCustomerId(e.target.value)}}
            placeholder="Enter Customer Id ...."
            value={customerId}
            onKeyPress={(e) => {
              if (e.code === "Enter") {
                getdata();
                setCustomerData([]);
              }
            }}
            className="form-control mx-2"
          />
        </div>
        
        <div className="col-6 mx-3">
        <input
            type="date"
            name="date"
            id="createdAt"
            
            onChange={(e)=>{setDate(e.target.value)}}
            placeholder="yyyy-mm-dd"
            value={date}
            className="form-control"
          />
        </div>
        </div> 
        
        { customerData &&
        <div className="container title my-5">
           <h3 className="text-center">Name:-{customerData?.name}</h3>
           <h3 className="text-center">Customer Id:-{customerData?.uid}</h3>
           <h3 className="text-center">Email Id:-{customerData?.email}</h3>
           <h3 className="text-center">Phone Number:-{customerData?.mobile}</h3>
           <h3 className="text-center">Address:-{customerData?.address}</h3>
           <h3 className="text-center">Registered At:-{new Date(customerData?.createdAt).toLocaleDateString('en-In', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</h3>
        </div>
}

        {
          customerRecords.length>0&& customerRecords.map((ele,ind)=>{
             if(!customerData)
             {
              return (
                <div className="container title my-5" key={ind}>
                <h3 className="text-center">Name:-{ele?.name}</h3>
                <h3 className="text-center">Customer Id:-{ele?.uid}</h3>
                <h3 className="text-center">Email Id:-{ele?.email}</h3>
                <h3 className="text-center">Phone Number:-{ele?.mobile}</h3>
                <h3 className="text-center">Address:-{ele?.address}</h3>
                <h3 className="text-center">Registered At:-{new Date(ele?.createdAt).toLocaleDateString('en-In', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</h3>
             </div>
              )
             }
          })
        }
        <CustomLoadingAnimation isLoading={Loading}/>
        </>
    )
}

export default SearchCustomer
