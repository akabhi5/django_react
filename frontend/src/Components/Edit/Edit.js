import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const { state } = useLocation();
  const { id } = state;
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
    dateOfApproval: "",
    modifiedDate: "",
    reviewerId: "",
    reviewerName: "",
    reviewerComment: "",
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
      status: formData.status,
      modified_date:
        formData.modifiedDate === "" ? null : formData.modifiedDate,
      date_of_approval:
        formData.dateOfApproval === "" ? null : formData.dateOfApproval,
      reviewer_id: formData.reviewerId === "" ? null : formData.reviewerId,
      reviewer_name:
        formData.reviewerName === "" ? null : formData.reviewerName,
      reviewer_comments:
        formData.reviewerComment === "" ? null : formData.reviewerComment,
    };
    const res = await axios.patch(`/connection/${id}/`, postData);
    if (res.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/connection/${id}/`);
      setFormData({
        applicantName: res.data.applicant_name,
        gender: res.data.gender,
        district: res.data.district,
        state: res.data.state,
        pincode: res.data.pincode,
        ownership: res.data.ownership,
        govIdType: res.data.gov_id_type,
        idNumber: res.data.id_number,
        category: res.data.category,
        loadApplied: res.data.load_applied,
        dateOfApproval:
          res.data.date_of_approval === null ? "" : res.data.date_of_approval,
        modifiedDate:
          res.data.modified_date === null ? "" : res.data.modified_date,
        reviewerId: res.data.reviewer_id === null ? "" : res.data.reviewer_id,
        reviewerName:
          res.data.reviewer_name === null ? "" : res.data.reviewer_name,
        reviewerComment:
          res.data.reviewer_comments === null ? "" : res.data.reviewer_comments,
      });
    };
    getData();
  }, [id]);

  return (
    <div className="m-5">
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
        <Form.Group className="mb-3">
          <Form.Label>Date of Approval</Form.Label>
          <Form.Control
            placeholder="Date of Approval"
            type="date"
            value={formData.dateOfApproval}
            name="dateOfApproval"
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Modified data</Form.Label>
          <Form.Control
            placeholder="Modified data"
            type="date"
            value={formData.modifiedDate}
            name="modifiedDate"
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Reviewer ID</Form.Label>
          <Form.Control
            placeholder="Reviewer ID"
            value={formData.reviewerId}
            name="reviewerId"
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Reviewer Name</Form.Label>
          <Form.Control
            placeholder="Reviewer Name"
            value={formData.reviewerName}
            name="reviewerName"
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Reviewer Comment</Form.Label>
          <Form.Control
            placeholder="Reviewer Comment"
            value={formData.reviewerComment}
            name="reviewerComment"
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
    </div>
  );
};

export default Edit;
