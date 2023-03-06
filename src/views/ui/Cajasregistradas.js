import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Table,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Label,
} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Cajasregistradas = () => {
  const navigate= useNavigate();
  const [modal, setModal] = useState(false);
  const [cajas, setCajas] = useState([]);

  const toggle = (id, numero_caja, codigo, efectivo, estado) => {
    setModal(!modal)
    setCaja({id, numero_caja, codigo, efectivo, estado})
  };

  const getCaja = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/cajas`);
    console.log(response.data);
    setCajas(response.data);
  };
  const deleteCaja = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/cajas/${id}`
    );
    console.log(response)
    getCaja();
  };

  const valorInicial = {
    numero_caja: "",
    codigo: "",
    efectivo: "",
    estado: "Habilitada",
  };

  const [caja, setCaja] = useState(valorInicial);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setCaja({
      ...caja,
      [name]: value,
    });
  };

  const guardarDatos = async (e) => {
    //Crear la logica para la peticion post
    const newCaja = {
      numero_caja: caja.numero_caja,
      codigo: caja.codigo,
      efectivo: caja.efectivo,
      estado: caja.estado,
    };
   
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/cajas`,
        newCaja
      );
      console.log(response);
      toggle();
    } catch (error) {
      console.log(error);
    }

    setCaja(valorInicial);
  };



  const modalNewCaja = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>NUEVA CAJA</ModalHeader>
        <ModalBody>
          <Form onSubmit={guardarDatos}>
            <FormGroup>
              <Label for="numcaja">Numero de caja</Label>
              <Input
                id="numcaja"
                name="numero_caja"
                type="number"
                value={caja.numero_caja}
                onChange={capturarDatos}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="codigo">Nombre / codigo</Label>
              <Input
                id="codigo"
                name="codigo"
                type="text"
                value={caja.codigo}
                onChange={capturarDatos}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="estado">Estado de la caja</Label>
              <Input
                id="estado"
                name="estado"
                type="select"
                onChange={capturarDatos}
                required
              >
                <option value="Habilitada">Habilitada</option>
                <option value="Deshabilitada">Deshabilitada</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="efectivo">Efectivo en caja</Label>
              <Input
                id="efectivo"
                name="efectivo"
                type="number"
                value={caja.efectivo}
                onChange={capturarDatos}
                required
              />
            </FormGroup>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
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
    getCaja();
  }, []);

  const updateDatos = async (id, numero_caja, codigo, estado) => {
    //Crear la logica para la peticion post
    navigate(`/dashboard/cajas/updatecaja/${id}`);
  };
  return (
    <div>
      <h2 className="card-title">
        LISTA DE CAJAS
        <h4>
          En el módulo CAJA usted podrá registrar cajas de ventas en el sistema
          para poder realizar ventas, además podrá actualizar los datos de las
          cajas de venta, realizar búsquedas de cajas o eliminarlas si lo desea.
        </h4>
      </h2>
      <div>{modalNewCaja()}</div>
      <Card>
        <CardBody className="cont-">
          <Row className="mt-4">
            <Col>
              <div className="title-item" onClick={toggle}>
                NUEVA CAJA
              </div>
            </Col>
            <Col>
              <div className="title-item">LISTA DE CAJAS</div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            {cajas.length ? (
              <>
                <thead>
                  <tr>
                    <th>NUMERO DE CAJA</th>
                    <th>NOMBRE / CODIGO</th>

                    <th>EFECTIVO</th>
                    <th>ESTADO</th>
                    <th>ACTUALIZAR</th>
                    <th>ELIMINAR</th>
                  </tr>
                </thead>
                <tbody>
                  {cajas.map((caja, index) => (
                  <tr key={index} className="border-top">
                    <td>{caja.numero_caja}</td>
                    <td>{caja.codigo}</td>
                    <td>{caja.efectivo}</td>
                    <td>{caja.estado}</td>
                    <td>
                      <Button className="btn" color="success" onClick={()=>updateDatos(caja._id, caja.numero_caja, caja.codigo, caja.estado, caja.efectivo)}>
                        <i className="bi bi-arrow-repeat"></i>
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn"
                        color="danger"
                        onClick={() => deleteCaja(caja._id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <div className="sin-register">No hay registro de cajas</div>
            )}
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cajasregistradas;
