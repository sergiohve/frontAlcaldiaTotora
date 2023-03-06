import { Col, Row } from "reactstrap";
import axios from "axios";
import ProjectTables from "../components/dashboard/ProjectTable";
import { useEffect, useState } from "react";

const Starter = () => {
  const [modulos, setModulos] = useState([]);

  const getModulos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/modulos`);
    console.log(response.data);
    setModulos(response.data);
  };

  useEffect(() => {
    getModulos();
  }, []);

  return (
    <div>
      <Row>
        <Col lg="12">
          <ProjectTables modulos={modulos} />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
