import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const NewCon = () => {
  const [formData, setFormData] = useState({
    applicantName: "",
    gender: "",
    district: "",
    state: "",
    pincode: "",
    ownership: "",
    govIdType: "",
    idNumber: "",
    category: "",
    loadApplied: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async () => {
    const postData = {
      applicant_name: formData.applicantName,
      gender: formData.gender,
      district: formData.district,
      state: formData.state,
      pincode: formData.pincode,
      ownership: formData.ownership,
      gov_id_type: formData.govIdType,
      id_number: formData.idNumber,
      category: formData.category,
      load_applied: formData.loadApplied,
      status: "PE",
    };

    const res = await axios.post("/connection/", postData);
    if (res.status === 201) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

  return (
    <div className="m-5">
      <Form.Group className="mb-3">
        <Form.Label>Applicant Name</Form.Label>
        <Form.Control
          placeholder="Name"
          name="applicantName"
          value={formData.applicantName}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          name="gender"
          value={formData.gender}
          onChange={changeHandler}
        >
          <option value="0">--</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>District</Form.Label>
        <Form.Control
          placeholder="District"
          name="district"
          value={formData.district}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control
          placeholder="State"
          name="state"
          value={formData.state}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pincode</Form.Label>
        <Form.Control
          placeholder="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ownership</Form.Label>
        <Form.Select
          name="ownership"
          value={formData.ownership}
          onChange={changeHandler}
        >
          <option value="0">--</option>
          <option value="JO">Joint</option>
          <option value="IN">Individual</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Government ID Type</Form.Label>
        <Form.Select
          name="govIdType"
          value={formData.govIdType}
          onChange={changeHandler}
        >
          <option value="0">--</option>
          <option value="AA">Aadhar</option>
          <option value="VO">Voter</option>
          <option value="PAN">PAN</option>
          <option value="PASS">Passport</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>ID number</Form.Label>
        <Form.Control
          placeholder="ID number"
          name="idNumber"
          value={formData.idNumber}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="category"
          value={formData.category}
          onChange={changeHandler}
        >
          <option value="0">--</option>
          <option value="1">Residential</option>
          <option value="2">Commercial</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Load applied</Form.Label>
        <Form.Control
          placeholder="Load applied"
          name="loadApplied"
          value={formData.loadApplied}
          onChange={changeHandler}
        />
      </Form.Group>
      <div>
        {success && (
          <strong>
            <i>Form successfully submitted. Redirecting to home page...</i>
          </strong>
        )}
      </div>
      <Button variant="primary" onClick={submitHandler}>
        Submit
      </Button>
    </div>
  );
};

export default NewCon;
