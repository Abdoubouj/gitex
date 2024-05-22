import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import gitex from "../assets/gitex.png";
import { useForm } from "react-hook-form";
import axios from "axios";
const RegisterForm = () => {
  const [error , setError] = useState(null);
  const [success , setSuccess] = useState({
    isSuccess:false,
    message:null
  });
  const form = useForm();
  const { register, formState, handleSubmit, getValues } = form;
  const { errors, isDirty, isValid } = formState;
  const onSubmit = async () => {
    const userData = getValues();
    // console.log(data);
    // console.log(data);
    // console.log(userData);
    try {
      const response = await axios.post(
        "https://otherbluecard48.conveyor.cloud/api/Users",
        userData
      );
      if(response.status === 200){
        setSuccess({...success , isSuccess:true , message:response.data});
      }
    } catch (err) {
      // console.log(err?.response?.data);
      if(err?.response?.status === 400){
        setError(err?.response?.data);
      }
    }
  };
  console.log(error);
  // const {data} = response;
  // console.log(data);
  // }
  // console.log(isDirty);
  // console.log(isValid);
  return (
    <>
      {success?.isSuccess ? <p className="alert alert-success">{success?.message}</p> :
    <div className="form_container d-flex">
      <div className="left_box p-5">
        <img src={gitex} alt="" />
      </div>
      <div className="right_box p-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="form_title mb-3">let's talk!</h1>
          <p className="mb-5 text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="inputs_box">
            <div className="row mb-4">
              <Form.Group className="col mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  className={`${errors?.name && "error"}`}
                  type="text"
                  placeholder="Enter full name "
                  name="name"
                  {...register("name", {
                    required: "the fullname is required",
                  })}
                />
                <p className="text-danger mt-1">
                  {errors && errors["name"]?.message}
                </p>
              </Form.Group>
              <Form.Group className="col mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className={`${errors?.email && "error"}`}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  {...register("email", {
                    required: "the email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "invalid email",
                    },
                  })}
                />
                <p className="text-danger">
                  {errors && errors["email"]?.message}
                </p>
              </Form.Group>
            </div>
            <div className="row mb-4">
              <Form.Group className="col mb-3" controlId="formBasicEmail">
                <Form.Label>phoneNumber</Form.Label>
                <Form.Control
                  className={`${errors?.phoneNumber && "error"}`}
                  type="text"
                  placeholder="Enter phoneNumber"
                  name="phoneNumber"
                  {...register("phoneNumber", {
                    required: "the phoneNumber is required",
                  })}
                />
                <p className="text-danger mt-1">
                  {errors && errors["phoneNumber"]?.message}
                </p>
              </Form.Group>
              {/* <Form.Group className="col mb-3" controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" className={`${errors?.address && 'error'}`} placeholder="Enter address" name="address" {...register("address",{
                  required:"the address is required",
                })} />
              <p className="text-danger mt-1">{errors && errors['address']?.message}</p>

              </Form.Group> */}
            </div>
            <div className="row mb-4">
              {/* <div className="col mb-3">
              <Form.Label>Role</Form.Label>
                <Form.Select className={`${errors?.role && 'error'}`} name="role" {...register("role",{
                  required:"the role is required",
                  validate:(field)=>{
                    return (field !== "select one" || "invalid field")
                  }
                })}>
                  <option selected disabled>select one</option>
                  <option value="1">business</option>
                  <option value="2">Student</option>
                </Form.Select>
              <p className="text-danger mt-1">{errors && errors['role']?.message}</p>
              </div> */}
              <Form.Group className="col mb-3" controlId="formBasicEmail">
                <Form.Label>Coupon Code</Form.Label>
                <Form.Control
                  className={`${errors?.promoCode && "error"}`}
                  name="promoCode"
                  type="text"
                  placeholder="Ex:A8E9R55"
                  {...register("promoCode", {
                    required: "the coupon code is required",
                    validate: ()=>{
                      setError(null);
                    }
                  })}
                />
                <p className="text-danger mt-1">
                  {errors && errors["promoCode"]?.message}
                </p>
                <p className="text-danger mt-1">
                  {error && error}
                </p>
              </Form.Group>
            </div>
          </div>
          <Button
            disabled={Object.keys(errors).length > 0 ? true : false}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  }
  </>
  );
};

export default RegisterForm;
