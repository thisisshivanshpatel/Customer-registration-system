import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'
import { customerList } from '../Axios/api';
import CustomLoadingAnimation from './CustomLoadingAnimation';
import BootstrapTable from "react-bootstrap-table-next";

const CustomerList = () => {
    const history=useHistory();
    const [Loading,SetLoading]=useState(false);
    const [customerRecords,setCustomerRecords]=useState([]);

const getData=async()=>{
   try {
      SetLoading(true);
      const resp=await customerList();

    setCustomerRecords(resp?.data.resp);
   } catch (error) {
       console.log(error);
   }
   finally
   {
      SetLoading(false);
   }
}

useEffect(()=>{
  getData();
},[])

const DateFormatter=(cell)=>{
        if (cell) {
          return new Date(cell).toLocaleDateString('en-In', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        } else {
          return `N/A`;
        }
}

const columns = [
    {
      dataField: "name",
      text: "Name",
      style: {
        textAlign: "center",
      },
    },
    {
      dataField: "email",
      text: "Email Id",
      style: {
        textAlign: "center",
      },
    },
    {
      dataField: "mobile",
      text: "Phone",
      style: {
        textAlign: "center",
      },
    },
    {
      dataField: "uid",
      text: "Customer Id",
    },
    {
      dataField: "address",
      text: "Address",
    },
    {
      dataField: "createdAt",
      text: "Registration Date",
      style: {
        textAlign: "center",
      },
      formatter:DateFormatter
    },
    // {
    //   dataField: "status",
    //   text: "Status",
    //   style: {
    //     textAlign: "center",
    //   },
    // },
    // {
    //   dataField: "_id",
    //   text: "Actions",
    //   formatter: Action,
    // },
  ];

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

        <div className="my-5">
        {customerRecords.length > 0 ? (
        <BootstrapTable
          classes="mt-5 bg-light"
          keyField="_id"
          data={customerRecords}
          columns={columns}
        />
      ) : (
        <h1 className="text-center display-3 my-5">Sorry Not Found ......</h1>
      )}
        </div>
       

        <CustomLoadingAnimation isLoading={Loading}/>
        </>
    )
}

export default CustomerList
