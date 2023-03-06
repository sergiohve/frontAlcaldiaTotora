import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Label,
} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Devoluciones = () => {
  const navigate = useNavigate();
  const [devolucion, setDevolucion] = useState([]);
  const params = useParams();
  const { id } = params;

  const getDevoluciones = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/devoluciones`);
    console.log(response.data);
    setDevolucion(response.data);
  };
  const deleteCaja = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/devoluciones/${id}`
    );
    getDevoluciones();
  };

  useEffect(() => {
    getDevoluciones();
  }, []);

  const updateDatos = async (id, numero_caja, codigo, estado) => {
    navigate(`/dashboard/cajas/updatecaja/${id}`);
  };
  return (
    <div>
      <h2 className="card-title">DEVOLUCIONES REALIZADAS</h2>
      <p className="card-title">
        En el módulo DEVOLUCIONES podrá ver el listado de todas las devoluciones
        de compras y ventas realizadas. Además, podrá buscar devoluciones por
        fecha.
      </p>

      <Card>
        <CardBody className="cont-">
          <Row className="mt-4">
            <Col>
              <div className="title-item">DEVOLUCIONES REALIZADAS</div>
            </Col>
            <Col>
              <div className="title-item">BUSCAR DEVOLUCIONES</div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            {devolucion.length ? (
              <>
                <thead>
                  <tr>
                    <th>FECHA</th>
                    <th>TIPO</th>

                    <th>PRODUCTO</th>
                    <th>CANTIDAD</th>
                    <th>PRECIO</th>
                    <th>TOTAL</th>
                    <th>VENDEDOR</th>
                    <th>DETALLES</th>
                  </tr>
                </thead>
                <tbody>
                  {devolucion.map((devolucion, index) => (
                    <tr key={index} className="border-top">
                      <td>{devolucion.fecha}</td>
                      <td>{devolucion.tipo}</td>
                      <td>{devolucion.producto}</td>
                      <td>{devolucion.cantidad}</td>
                      <td>{devolucion.precio}</td>
                      <td>{devolucion.total}</td>
                      <td>{devolucion.vendedor}</td>
                      <td>
                        <i className="bi bi-cart-check-fill"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <div className="sin-register">
                No hay registro de devoluciones
              </div>
            )}
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Devoluciones;
