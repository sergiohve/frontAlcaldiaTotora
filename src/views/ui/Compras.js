import axios from "axios";
import { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  CardTitle,
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

const Compras = () => {
  const [compras, setCompras] = useState([]);

  const [proveedores, setProveedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState(false);
  const [modaldetalles, setModalDetalles] = useState(false);
  const [infoCompra, setInfoCompra] = useState();
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  console.log(`${day}/${month}/${year}`);

  const toggle = () => {
    setModal(!modal);
  };
  const toggleDetalles = (fecha, total, proveedor, usuario, descripcion) => {
    setModalDetalles(!modaldetalles);
    if (modaldetalles === false) {
      setInfoCompra({ fecha, total, proveedor, usuario, descripcion });
    }
  };

  const getCompras = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/compras`
    );

    setCompras(response.data);
  };
  const deleteCompra = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/compras/${id}`
    );
    console.log(response);
    getCompras();
  };
  const getProveedores = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/proveedores`
    );

    setProveedores(response.data);
  };
  const getUsuarios = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/usuarios`
    );

    setUsuarios(response.data);
  };

  const valorInicial = {
    fecha: `${day}/${month}/${year}`,
    total: "",
    proveedor: "Juan villegas",
    usuario: "Astrid Roseline",
    descripcion: "",
  };
  const [compra, setCompra] = useState(valorInicial);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setCompra({
      ...compra,
      [name]: value,
    });
  };

  const guardarDatos = async (e) => {
    //Crear la logica para la peticion post
    const newCompra = {
      fecha: `${day}/${month}/${year}`,
      total: compra.total,
      proveedor: compra.proveedor,
      usuario: compra.usuario,
      descripcion: compra.descripcion,
    };

    try {
      const response = await axios.post(
        "https://backinvent.onrender.com/api/compras",
        newCompra
      );
      console.log(response);
      toggle();
    } catch (error) {
      console.log(error);
    }

    setCompra(valorInicial);
  };
  const modalDetalles = () => {
    return (
      <Modal isOpen={modaldetalles} toggle={toggleDetalles}>
        <ModalHeader toggle={toggleDetalles} className="center">
          INFORMACIÓN DE PEDIDO
        </ModalHeader>
        <ModalBody>
          <Row className="mt-3">
            <Col xs="6" sm="6">
              <h4>Fecha:</h4>
              <h6>{infoCompra?.fecha}</h6>
            </Col>
            <Col xs="6" sm="6">
              <h4>Total($):</h4>
              <h6>{infoCompra?.total}</h6>
            </Col>
            <Col sm="6" className="descrip">
              <h4>Proveedor</h4>
              <h6>{infoCompra?.proveedor}</h6>
            </Col>
            <Col sm="6" className="descrip">
              <h4>Usuario</h4>
              <h6>{infoCompra?.usuario}</h6>
            </Col>
            <Col sm="12" className="descrip">
              <h4>Descripción</h4>
              <h6>{infoCompra?.descripcion?.toUpperCase()}</h6>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  };

  const modalNewCompra = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>NUEVA COMPRA</ModalHeader>
        <ModalBody>
          <Form onSubmit={guardarDatos}>
            <FormGroup>
              <Label for="nombre">Fecha</Label>
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
              <Label for="Precio">Total($)</Label>
              <Input
                id="total"
                name="total"
                type="number"
                value={compra.total}
                onChange={capturarDatos}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="estado">Proveedor</Label>
              <Input
                id="proveedor"
                name="proveedor"
                type="select"
                onChange={capturarDatos}
                required
              >
                {proveedores.map((pro) => {
                  return <option value={pro.nombre}>{pro.nombre}</option>;
                })}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="estado">Usuario</Label>
              <Input
                id="usuario"
                name="usuario"
                type="select"
                onChange={capturarDatos}
                required
              >
                {usuarios.map((usua) => {
                  return (
                    <option value={usua.nombre}>
                      {usua.nombre} {usua.apellido}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="descripcion">Descripción</Label>
              <Input
                id="descripcion"
                name="descripcion"
                type="textarea"
                onChange={capturarDatos}
                required
                value={compra.descripcion}
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
    getCompras();
    getProveedores();
    getUsuarios();
  }, []);
  return (
    <div>
      <h2 className="card-title">COMPRAS REALIZADAS</h2>
      <p className="card-title">
        En el módulo COMPRAS usted podrá registrar compras de productos ya sea
        nuevos o ya registrados en sistema. También puede ver la lista de todas
        las compras realizadas, buscar compras y ver información más detallada
        de cada compra.
      </p>
      <Card>
        <CardBody className="cont-">
          <Row className="mt-4">
            <Col>
              <div
                onClick={toggle}
                className={modal ? "active title-item" : "title-item"}
              >
                NUEVA COMPRA
              </div>
            </Col>
            <Col>
              <div className={!modal ? "active title-item" : "title-item"}>
                LISTA DE COMPRAS
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {modalDetalles()}
      {modalNewCompra()}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Lista de compras</CardTitle>

          <Table className="no-wrap align-middle" responsive borderless>
            {compras.length ? (
              <>
                <thead>
                  <tr>
                    <th>FECHA</th>
                    <th>TOTAL($)</th>

                    <th>PROVEEDOR</th>
                    <th>USUARIO</th>
                    <th>DETALLES</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.map((com, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <div className="d-flex align-items-center p-2">
                          <img
                            src={integrado}
                            className="rounded-circle"
                            alt={integrado}
                            width="45"
                            height="45"
                          />
                          <div className="ms-3">
                            <h6 className="mb-0 name_pro">{com.fecha}</h6>
                          </div>
                        </div>
                      </td>
                      <td>{com.total}</td>
                      <td>{com.proveedor}</td>
                      <td>{com.usuario}</td>
                      <td
                        onClick={() =>
                          toggleDetalles(
                            com.fecha,
                            com.total,
                            com.proveedor,
                            com.usuario,
                            com.descripcion
                          )
                        }
                      >
                        <i class="bi bi-list"></i>
                      </td>
                      <td>
                        {" "}
                        <i
                          class="bi bi-trash icon_icono"
                          onClick={() => deleteCompra(com._id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>{" "}
              </>
            ) : (
              <div className="sin-register">No hay registro de productos</div>
            )}
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Compras;
