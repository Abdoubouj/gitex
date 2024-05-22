import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import dynIt from "../assets/dynIT.webp";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoGiftOutline } from "react-icons/io5";
import { getProfileGifts } from "../Helpers/helper";
const RegisterForm = () => {
  const [error, setError] = useState(null);
  const [isLoading , setIsLoading] = useState(true);
  const [isValidCode, setIsValidCode] = useState({
    success:false,
    message:""
  });
  const [gifts, setGifts] = useState([]);
  const [success, setSuccess] = useState({
    isSuccess: false,
    message: null,
  });
  const form = useForm();
  const { register, formState, handleSubmit, getValues, watch } = form;
  const { errors, isDirty, isValid } = formState;
  const onSubmit = async () => {
    const userData = getValues();
    try {
      const response = await axios.post(
        "https://nextgreydart87.conveyor.cloud/api/Users",
        userData
      );
      if (response.status === 200) {
        setSuccess({ ...success, isSuccess: true, message: response.data });
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setError(err?.response?.data);
      }
    }
  };

  const checkPromoCode = async () => {
    try {
      const response = await axios.post(
        `https://nextgreydart87.conveyor.cloud/api/Users/check-promocode/${watch(
          "promoCode"
        )}`
      );
      if (response.status === 200) {
        setIsValidCode({
          success:true,
          message:response?.data
        });
      }
    } catch (err) {
      setIsValidCode({
        success:false,
        message:err?.response?.data
      });
    }
  };

  const profile = watch("profile");
  useEffect(() => {
    const getGifts = async () => {
      const response = await axios.post(
        `https://nextgreydart87.conveyor.cloud/api/Users/gifts-by-type/${profile}`
      );
      setGifts(response?.data);
      setIsLoading(false);
    };
    getGifts();
  }, [profile]);
  console.log(success);
  console.log(error);

  return (
    <>
      {success?.isSuccess ? (
        <p className="alert alert-success">{success?.message}</p>
      ) : (
        <div className="form_container d-flex">
          <div className="left_box p-5">
            <img src={dynIt} alt="" />
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
                    <Form.Label>Coupon Code</Form.Label>
                    <div className="d-flex gap-3">
                      <Form.Control
                        className={`${errors?.promoCode && "error"}`}
                        name="promoCode"
                        type="text"
                        placeholder="Ex:A8E9R55"
                        {...register("promoCode", {
                          required: "the coupon code is required",
                          validate: () => {
                            setError(null);
                          },
                        })}
                      />
                      <Button className="checkBtn" onClick={checkPromoCode}>
                        <FaRegCheckCircle /> check code
                      </Button>
                    </div>
                    <p className="text-danger mt-1">
                      {errors && errors["promoCode"]?.message}
                    </p>
                    <p className={`${isValidCode?.success ? 'text-success' : 'text-danger'} mt-1 `}>{isValidCode?.message}</p>
                    <p className="text-danger mt-1">{error && error}</p>
                  </Form.Group>
                </div>
                <div className="row mb-4">
                  <Form.Group className="col mb-3" controlId="formBasicEmail">
                    <Form.Label>first name</Form.Label>
                    <Form.Control
                      className={`${errors?.firstName && "error"}`}
                      type="text"
                      placeholder="Enter first name "
                      name="firstName"
                      {...register("firstName", {
                        required: "the firstName is required",
                      })}
                    />
                    <p className="text-danger mt-1">
                      {errors && errors["firstName"]?.message}
                    </p>
                  </Form.Group>
                  <Form.Group className="col mb-3" controlId="formBasicEmail">
                    <Form.Label>last Name</Form.Label>
                    <Form.Control
                      className={`${errors?.lastName && "error"}`}
                      type="text"
                      placeholder="Enter last name "
                      name="lastName"
                      {...register("lastName", {
                        required: "the last name is required",
                      })}
                    />
                    <p className="text-danger mt-1">
                      {errors && errors["lastName"]?.message}
                    </p>
                  </Form.Group>
                </div>
                <div className="row mb-4">
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
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "invalid email",
                        },
                      })}
                    />
                    <p className="text-danger">
                      {errors && errors["email"]?.message}
                    </p>
                  </Form.Group>
                  <Form.Group className="col mb-3" controlId="formBasicEmail">
                    <Form.Label>profile</Form.Label>
                    <Form.Select
                      className={`${errors?.profile && "error"}`}
                      type="text"
                      // placeholder="Enter phoneNumber"
                      name="profile"
                      {...register("profile", {
                        required: "the profile is required",
                        validate: (field) => {
                          return (
                            field !== "SELECT YOUR PROFILE" ||
                            "profile field is required !"
                          );
                        },
                      })}
                    >
                      <option value="SELECT YOUR PROFILE" disabled selected>
                        SELECT YOUR PROFILE
                      </option>
                      <option value="Corporate">Corporate</option>
                      <option value="Public Institution">
                        Public Institution
                      </option>
                      <option value="Student">Student</option>
                    </Form.Select>
                    <p className="text-danger mt-1">
                      {errors && errors["profile"]?.message}
                    </p>
                  </Form.Group>
                  
                </div>
                <div className="row mb-4">
                  <Form.Group className="col mb-3" controlId="formBasicEmail">
                    <Form.Label>organization Name</Form.Label>
                    <Form.Control
                      className={`${errors?.organizationName && "error"}`}
                      type="text"
                      placeholder="Enter organization Name"
                      name="organizationName"
                      {...register("organizationName", {
                        required: "the organization Name is required",
                      })}
                    />
                    <p className="text-danger mt-1">
                      {errors && errors["organizationName"]?.message}
                    </p>
                  </Form.Group>
                  {!isLoading &&
                  <Form.Group className="col mb-3" controlId="formBasicEmail">
                    <Form.Label>gifts</Form.Label>
                    <Form.Select
                      className={`${errors?.giftId && "error"}`}
                      type="text"
                      // placeholder="Enter giftId"
                      name="giftId"
                      {...register("giftId", {
                        required: "the gift is required",
                        validate: (field) => {
                          return (
                            field !== "SELECT YOUR GIFT" ||
                            "the gift field is required !"
                          );
                        },
                      })}
                    >
                      <option value="SELECT YOUR GIFT" selected disabled>
                        SELECT YOUR GIFT
                      </option>
                      {gifts?.map((gift) => (
                        <option value={gift?.id}>{gift?.giftName}</option>
                      ))}
                    </Form.Select>
                    <p className="text-danger mt-1">
                      {errors && errors["gifts"]?.message}
                    </p>
                  </Form.Group>
                  }
                </div>
                <div className="row mb-4">
                  <Form.Check // prettier-ignore
                    type='checkbox'
                    id='inline-checkbox'
                    inline
                    label='By checking this box, I confirm that I agree to share the data I have entered in the form with DYN IT Maroc as part of the Gitex Africa event.'
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  disabled={Object.keys(errors).length > 0 ? true : false}
                  variant="primary"
                  className="submitbtn"
                  type="submit"
                >
                  <IoGiftOutline />
                  Claim your gift
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
