import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  const navigate = useNavigate();

  const getAllData = async (url = "") => {
    let res;
    if (url === "") {
      res = await axios.get("/connection/");
    } else {
      url = url.split("/");
      url = url.slice(3);
      url = "/" + url.join("/");
      res = await axios.get(url);
    }
    setData(res.data.results);
    setNext(res.data.next);
    setPrev(res.data.previous);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const searchAppId = async () => {
    if (searchId === "") {
      const res = await axios.get(`/connection/`);
      setData(res.data.results);
    } else {
      const res = await axios.get(`/connection/?id=${searchId}`);
      setData(res.data.results);
      setNext(null);
      setPrev(null);
    }
  };

  const paginate = (arg) => {
    let url = "";
    if (arg === "prev") url = prev;
    else url = next;
    getAllData(url);
  };

  return (
    <div className="m-5">
      <div className="row">
        <Form.Group className="col-auto mb-3">
          <Form.Control
            placeholder="Application id"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="col-auto">
          <Button onClick={searchAppId}>Search</Button>
        </Form.Group>
      </div>

      <span className="mx-4">
        <Link to="/graph">Graph</Link>
      </span>
      <span>
        <Link to="/new">New</Link>
      </span>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Application id</th>
              <th>Applicant Name</th>
              <th>Ownership</th>
              <th>ID Type</th>
              <th>Category</th>
              <th>Load Applied</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr
                onClick={() =>
                  navigate(`/edit/${d.id}`, { state: { id: d.id } })
                }
                key={d.id}
                style={{ cursor: "pointer" }}
              >
                <td>{d.id}</td>
                <td>{d.applicant_name}</td>
                <td>{d.ownership}</td>
                <td>{d.gov_id_type}</td>
                <td>{d.category.type}</td>
                <td>{d.load_applied}</td>
                <td>{d.gender}</td>
                <td>{d.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          variant="primary"
          className="mx-1"
          disabled={prev === null}
          onClick={() => paginate("prev")}
        >
          Prev
        </Button>
        <Button
          variant="primary"
          className="mx-1"
          disabled={next === null}
          onClick={() => paginate("next")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Home;
