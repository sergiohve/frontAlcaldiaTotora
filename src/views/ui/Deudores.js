import axios from "axios";
import { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";
import integrado from "../../assets/images/users/integrado.jpg";

const Deudores = () => {
  const [deudores, setdeudores] = useState([]);
  const [deudor, setdeudor] = useState([]);
  const [modal, setModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  console.log(`${day}/${month}/${year}`);
  const toggle = () => {
    setModal(!modal);
  };
  const getDeudores = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/deudores`);
    console.log(response.data);
    setdeudores(response.data);
  };
  const deleteDeudor = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/deudores/${id}`
    );
    getDeudores();
  };
  const getUsuarios = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/usuarios`);

    setUsuarios(response.data);
  };
  const valorInicial = {
    fecha: `${day}/${month}/${year}`,
    nombre_deudor: "",
    deuda: "",
    usuario: "",
    descripcion: "",
  };

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setdeudor({
      ...deudor,
      [name]: value,
    });
  };

  const guardarDatos = async (e) => {
    //Crear la logica para la peticion post
    const newdeudor = {
      fecha: `${day}/${month}/${year}`,
      nombre_deudor: deudor.nombre_deudor,
      deuda: deudor.deuda,
      usuario: deudor.usuario,
      descripcion: deudor.descripcion,
    };

    try {
      const response = await axios.post(
        "https://backinvent.onrender.com/api/deudores",
        newdeudor
      );
      console.log(response);
      toggle();
    } catch (error) {
      console.log(error);
    }

    setdeudor(valorInicial);
  };

  const modalNewdeudor = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>NUEVA DEUDA</ModalHeader>
        <ModalBody>
          <Form onSubmit={guardarDatos}>
            <FormGroup>
              <Label for="fecha">Fecha deuda</Label>
              <Input
                id="fecha"
                name="fecha"
                type="text"
                value={`${day}/${month}/${year}`}
                onChange={capturarDatos}
                required
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="nombre">Nombre del deudor</Label>
              <Input
                id="nombre_deudor"
                name="nombre_deudor"
                type="text"
                value={deudor.nombre_deudor}
                onChange={capturarDatos}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="deuda">Deuda</Label>
              <Input
                id="deuda"
                name="deuda"
                type="text"
                value={deudor.deuda}
                onChange={capturarDatos}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="descripcion">Descripción</Label>
              <Input
                id="descripcion"
                name="descripcion"
                type="text"
                value={deudor.descripcion?.toUpperCase()}
                onChange={capturarDatos}
                required
              />
            </FormGroup>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Guardar
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    );
  };

  useEffect(() => {
    getDeudores();
    getUsuarios();
  }, []);
  return (
    <div>
      <Card>
        <CardBody className="cont-">
          <Row className="mt-4">
            <Col>
              <div
                className={modal ? "active title-item" : "title-item"}
                onClick={toggle}
              >
                NUEVO DEUDOR
              </div>
            </Col>
            <Col>
              <div className={!modal ? "active title-item" : "title-item"}>
                LISTA DE DEUDORES
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {modalNewdeudor()}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Lista de deudores</CardTitle>

          <Table className="no-wrap align-middle" responsive borderless>
            {deudores.length ? (
              <>
                <thead>
                  <tr>
                    <th>Fecha de la deuda</th>
                    <th>Nombre del deudor</th>
                    <th>Deuda</th>

                    <th>Descripcion de la deuda</th>
                    <th className="cont_delete">Eliminar la deuda</th>
                  </tr>
                </thead>
                <tbody>
                  {deudores.map((deu, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <div className="d-flex align-items-center p-2">
                          <div className="ms-3">
                            <h6 className="mb-0 name_pro">{deu.fecha}</h6>
                          </div>
                        </div>
                      </td>
                      <td>{deu.nombre_deudor}</td>
                      <td>{deu.deuda}</td>

                      <td>{deu.descripcion}</td>
                      <td className="cont_delete">
                        <i
                          class="bi bi-trash icon_icono"
                          onClick={() => deleteDeudor(deu._id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>{" "}
              </>
            ) : (
              <div className="sin-register">No hay registro de deudores</div>
            )}
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Deudores;
