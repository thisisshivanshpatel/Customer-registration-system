import React, { useState } from 'react'
import {Formik,Field,ErrorMessage, Form} from 'formik'
import {FaArrowLeft } from "react-icons/fa";
import {Modal} from "react-bootstrap";
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';
import CustomLoadingAnimation from "./CustomLoadingAnimation";
import {registerCustomer} from "../Axios/api"
import { toast } from 'react-toastify';

const CustomerRegistration = () => {
    const history=useHistory();
    const [show,setShow]=useState(false);
    const [Loading,setLoading]=useState(false);
    const [values,setValues]=useState({});
   // const [selectFile,setSelectedFile]=useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const defaultDetails={
        name:"",
        email:"",
        address:"",
        mobile:"",
    }

    const RegistrationSchema=Yup.object().shape({
        name: Yup
        .string()
        .min(3, "Minimum 3 characters are required for name")
        .max(30, "Maximum 30 characters are allowed for name")
        .required(),
      address: Yup
        .string()
        .min(2, "Minimum 2 characters are required for address")
        .max(50, "Maximum 50 character are only allowed")
        .required(),
      mobile: Yup
        .string()
        .min(10, "mobile number should contain 10 digits")
        .max(10, "mobile number should only contain 10 digits")
        .required(),
      email: Yup.string().email("email Id must be valid").required(),
    })

    
    const RegisterCustomer=async()=>{
        try {
           setLoading(true);

        let request={
          // file:selectFile,
           name:values.name,
           email:values.email,
           mobile:values.mobile,
           address:values.address,
        }
        
        // if (!request.file) {
        //     toast.warning("Please upload image", {
        //         position: "top-center",
        //         theme: "colored",
        //       });
        // }

        // if (request.file) {
        //   const formData=new FormData();
        //   formData.append('photo',selectFile);
        //   request={...request,file:formData};

        //   console.log(request);
        // }


        const resp=await registerCustomer(request);
         
        toast.success(resp?.data.message, {
            position: "top-center",
            theme: "colored",
          });
         
        } catch (error) {
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

    // const fileSelectHandler=(e)=>{
    //      console.log(e.target.files[0]);
    //      setSelectedFile(e.target.files[0]);
    //     // fileUploadHandler();
    // }

    // const fileUploadHandler=()=>{
    //     console.log(selectFile);
    // }

    return (
        <>
        <div className="container">
        <span
        style={{ cursor: "pointer" }}
        className="fw-bold title font-monospace text-secondary my-2"
        onClick={() => history.goBack()}
        >
        <FaArrowLeft /> Go Back
        </span>
        </div>
      
        <h1 className="text-center my-2 title text-white display-4">Customer Registration</h1>

        {/* <div className="container mt-5 mb-3">
        <label className="form-label fw-bold title">Image</label>
        <input id="file" name="file" type="file" onChange={fileSelectHandler} className="form-control" />
        </div> */}

         <Formik
        initialValues={defaultDetails}
        validationSchema={RegistrationSchema}

        onSubmit={(values, { resetForm }) => {
            setValues(values);
            handleShow();
            resetForm();
          }}
      >

        <Form className="container d-flex flex-column">
          <div className="mb-3">
            <label className="form-label fw-bold title">Name</label>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage
              name="name"
              render={(msg) => <div className="text-danger">{msg}</div>}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold title">Email</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage
              name="email"
              render={(msg) => <div className="text-danger">{msg}</div>}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold title">Phone Number</label>
            <Field name="mobile" type="tel" className="form-control" />
            <ErrorMessage
              name="mobile"
              render={(msg) => <div className="text-danger">{msg}</div>}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold title">Address</label>
            <Field name="address" as="textarea" className="form-control" />
            <ErrorMessage
              name="address"
              render={(msg) => <div className="text-danger">{msg}</div>}
            />
          </div>

          <button type="submit" className="btn btn-success my-5">
            Submit
          </button>
        </Form>
      </Formik>



      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Submit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Submit this Form</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              RegisterCustomer();
              handleClose();
            }}
          >
           Submit
          </button>
        </Modal.Footer>
      </Modal>

      <CustomLoadingAnimation isLoading={Loading}/>
        </>
    )
}

export default CustomerRegistration
