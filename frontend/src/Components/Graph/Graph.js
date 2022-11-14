import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Form from "react-bootstrap/Form";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { MONTHS } from "../../Utility/Months";
import { Status } from "../../Utility/Status";

const Graph = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("0");

  const prepareGraphData = (allData) => {
    const graphData = {};

    for (let data of allData) {
      let date = data["date_of_application"].split("-");
      const key = `${date[0]} ${MONTHS[date[1]]}`;

      if (key in graphData) {
        graphData[key] += 1;
      } else {
        graphData[key] = 1;
      }
    }

    const res = [];
    for (let k in graphData) {
      res.push({ name: k, connections: graphData[k] });
    }

    return res;
  };

  const onSubmit = () => {
    if (startDate === "" || endDate === "") return;
    const getGraphData = async () => {
      setIsLoading(true);
      let res;
      if (status === "0" || status === undefined) {
        res = await axios.get(
          `/connection/graph/?start_date=${startDate}&end_date=${endDate}`
        );
      } else {
        res = await axios.get(
          `/connection/graph/?start_date=${startDate}&end_date=${endDate}&status=${Status[status]}`
        );
      }
      const data = prepareGraphData(res.data);
      setData(data);
      setIsLoading(false);
    };
    getGraphData();

    setShowGraph(true);
  };

  return (
    <div className="m-5">
      <div className="col-md-6 offset-md-3 mb-5">
        <Form.Group className="mb-3">
          <Form.Label>Start date</Form.Label>
          <Form.Control
            placeholder="Start date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End date</Form.Label>
          <Form.Control
            placeholder="End date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select onChange={(e) => setStatus(e.target.value)}>
            <option value="0">--</option>
            <option value="1">Approved</option>
            <option value="2">Pending</option>
            <option value="2">Connection Released</option>
            <option value="3">Rejected</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex  justify-content-center">
          <Button onClick={onSubmit} variant="primary">
            Show
          </Button>
          {isLoading && (
            <Spinner className="mx-2" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center">
        {showGraph && (
          <div>
            <LineChart
              width={1080}
              height={250}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="connections" stroke="#8884d8" />
            </LineChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default Graph;
