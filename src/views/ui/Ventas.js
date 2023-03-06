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
  CardHeader,
} from "reactstrap";
import integrado from "../../assets/images/users/integrado.jpg";

const Ventas = () => {
  const [Ventas, setVentas] = useState([]);
  const [searchVentas, setSearchVentas] = useState([]);

  const [estado, setEstado] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState(false);
  const [buscar, setBuscar] = useState();
  const [modaldetalles, setModalDetalles] = useState(false);
  const [infoVenta, setInfoVenta] = useState();
  const [dolarhoy, setDolarhoy] = useState();
  const [fecha, setfecha] = useState();
  console.log(estado);
  const getFecha = () => {
    var today = new Date();

    setfecha(today.toLocaleString());
  };
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();

  console.log(dolarhoy);

  useEffect(() => {
    const precio = localStorage.getItem("dolarhoy");
    setDolarhoy(precio);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
  const toggleDetalles = (
    codigo,
    precio,
    cantidad,
    metodo_pago,
    fecha,
    cliente,
    vendedor,
    total,
    totalbs,
    estado,
    descripcion
  ) => {
    setModalDetalles(!modaldetalles);
    if (modaldetalles === false) {
      setInfoVenta({
        codigo,
        precio,
        cantidad,
        metodo_pago,
        fecha,
        cliente,
        vendedor,
        total,
        totalbs,
        estado,
        descripcion,
      });
    }
  };

  const getVentas = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/ventas`);

    setVentas(response.data);
  };
  const getEstado = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/estado`);

    setEstado(response.data);
  };
  const deleteVenta = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/ventas/${id}`
    );
    console.log(response);
    getVentas();
  };

  const getUsuarios = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/usuarios`
    );

    setUsuarios(response.data);
  };

  const valorInicial = {
    codigo: "",
    precio: "",
    cantidad: "",
    metodo_pago: "Transferencia",
    fecha: `${day}/${month}/${year}`,
    cliente: "Anonimo",
    vendedor: "Mariemilys Herrera",
    total: "",
    totalbs: "",
    estado: "Retirado",
    descripcion: "Sin descripción",
  };

  const [Venta, setVenta] = useState(valorInicial);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setVenta({
      ...Venta,
      [name]: value,
    });
    console.log(Venta);
  };
  const onChangeSearch = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBuscar({
      [name]: value,
    });
  };

  const guardarDatos = async (e) => {
    //Crear la logica para la peticion post
    const newVenta = {
      codigo: Venta.codigo.toLocaleLowerCase(),
      precio: Venta.precio,
      cantidad: Venta.cantidad,
      metodo_pago: Venta.metodo_pago,
      fecha: `${day}/${month}/${year}`,
      cliente: Venta.cliente,
      vendedor: Venta.vendedor,
      total: Venta.precio * Venta.cantidad,
      totalbs: Venta.precio * Venta.cantidad * dolarhoy,
      estado: Venta.estado,
      descripcion: Venta.descripcion,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/ventas`,
        newVenta
      );
      console.log(response);
      toggle();
    } catch (error) {
      console.log(error);
    }

    setVenta(valorInicial);
  };

  useEffect(() => {
    const arrayFilter = Ventas.filter(
      (h) => h.codigo === buscar.buscar.trim().toLocaleLowerCase()
    );
    console.log(arrayFilter);
    setSearchVentas(arrayFilter);
  }, [Ventas]);

  const modalDetalles = () => {
    return (
      <Modal isOpen={modaldetalles} toggle={toggleDetalles}>
        <ModalHeader toggle={toggleDetalles} className="center">
          INFORMACIÓN DE LA VENTA
        </ModalHeader>
        <ModalBody>
          <Row className="mt-3">
            <Col xs="12" sm="12">
              <h4>Codigo:</h4>
              <h6>{infoVenta?.codigo?.toLocaleUpperCase()}</h6>
            </Col>
            <Col xs="6" sm="6">
              <h4>Precio($):</h4>
              <h6>{infoVenta?.precio}</h6>
            </Col>
            <Col xs="6" sm="6">
              <h4>Cantidad:</h4>
              <h6>{infoVenta?.cantidad}</h6>
            </Col>
            <Col sm="6" className="descrip">
              <h4>Total en dolares:</h4>
              <h6>{infoVenta?.total?.toFixed(3)}</h6>
            </Col>
            <Col sm="6" className="descrip">
              <h4>Total bolivares:</h4>
              <h6>{infoVenta?.totalbs}</h6>
            </Col>
            <Col sm="6" className="descrip">
              <h4>Metodo de pago:</h4>
              <h6>{infoVenta?.metodo_pago}</h6>
            </Col>
            <Col sm="6" className="descrip">
              <h4>Fecha:</h4>
              <h6>{infoVenta?.fecha}</h6>
            </Col>
            <Col sm="6" className="descrip">
              <h4>Cliente:</h4>
              <h6>{infoVenta?.cliente}</h6>
            </Col>
            <Col sm="6" className="descrip">
              <h4>Vendedor:</h4>
              <h6>{infoVenta?.vendedor}</h6>
            </Col>

            <Col sm="6" className="descrip">
              <h4>Estado:</h4>
              <h6>{infoVenta?.estado}</h6>
            </Col>
            <Col sm="12" className="descrip">
              <h4>Descripción:</h4>
              <h6>{infoVenta?.descripcion?.toUpperCase()}</h6>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  };

  const modalNewVenta = () => {
    return (
      <Modal isOpen={modal} toggle={toggle} className="cont_modalventas">
        <ModalHeader toggle={toggle}>NUEVA VENTA</ModalHeader>
        <ModalBody>
          <Form onSubmit={guardarDatos}>
            <Row className="mt-3">
              <Col xs="6" sm="4">
                <FormGroup>
                  <Label for="codigo">Codigo</Label>
                  <Input
                    id="codigo"
                    name="codigo"
                    type="text"
                    value={Venta.codigo}
                    onChange={capturarDatos}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs="6" sm="4">
                <FormGroup>
                  <Label for="precio">Precio($)</Label>
                  <Input
                    id="precio"
                    name="precio"
                    type="number"
                    value={Venta.precio}
                    onChange={capturarDatos}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="cantidad">Cantidad</Label>
                  <Input
                    id="cantidad"
                    name="cantidad"
                    type="Number"
                    value={Venta.cantidad}
                    onChange={capturarDatos}
                    required
                  />
                </FormGroup>
              </Col>

              <Col sm="4">
                <FormGroup>
                  <Label for="Precio">Total($)</Label>
                  <Input
                    id="total"
                    name="total"
                    type="number"
                    value={(Venta.precio * Venta.cantidad).toFixed(2)}
                    onChange={capturarDatos}
                    required
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="Precio">Total(bs)</Label>
                  <Input
                    id="totalbs"
                    name="totalbs"
                    type="number"
                    value={(Venta.precio * Venta.cantidad * dolarhoy).toFixed(
                      2
                    )}
                    onChange={capturarDatos}
                    required
                    disabled
                  />
                </FormGroup>
              </Col>

              <Col sm="4">
                <FormGroup>
                  <Label for="metodo_pago">Metodo de pago</Label>
                  <Input
                    id="metodo_pago"
                    name="metodo_pago"
                    type="select"
                    onChange={capturarDatos}
                    required
                  >
                    <option value="Transferencia">Transferencia</option>
                    <option value="Efectivo">Efectivo</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="fecha">Fecha</Label>
                  <Input
                    id="fecha"
                    name="fecha"
                    type="text"
                    value={`${day}/${month}/${year}`}
                    onChange={capturarDatos}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="Precio">Cliente</Label>
                  <Input
                    id="cliente"
                    name="cliente"
                    type="text"
                    value={Venta.cliente}
                    onChange={capturarDatos}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="Precio">Vendedor</Label>
                  <Input
                    id="usuario"
                    name="usuario"
                    type="select"
                    onChange={capturarDatos}
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
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="estado">Estado</Label>
                  <Input
                    id="estado"
                    name="estado"
                    type="select"
                    onChange={capturarDatos}
                    required
                  >
                    <option value="Retirado">Retirado</option>
                    {/*estado.map((usua, index) => {
                      return (
                        <option value="Retirado" key={index}>
                          {usua.estado}
                        </option>
                      );
                    })*/}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="descripcion">Descripción</Label>
                  <Input
                    id="descripcion"
                    name="descripcion"
                    type="textarea"
                    onChange={capturarDatos}
                    value={Venta.descripcion}
                  />
                </FormGroup>
              </Col>
            </Row>

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
    getVentas();
    getEstado();
    getUsuarios();
  }, []);
  useEffect(() => {
    getFecha();
  }, []);
  return (
    <div>
      <h2 className="card-title">VENTAS REALIZADAS</h2>
      <p className="card-title">
        En el módulo VENTAS podrá realizar ventas de productos, ver codigo,
        precio, cantidad, total, metodo de pago, fecha, vendedor, estado y con
        sus opciones de ver detalle y eliminar.
      </p>
      <Card>
        <CardBody className="cont-">
          <Row className="mt-4">
            <Col>
              <div
                className={modal ? "active title-item" : "title-item"}
                onClick={toggle}
              >
                NUEVA VENTA
              </div>
            </Col>
            <Col>
              <div className={!modal ? "active title-item" : "title-item"}>
                LISTA DE VENTAS
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {modalDetalles()}
      {modalNewVenta()}

      <Card>
        <CardHeader>FECHA DE HOY= {fecha}</CardHeader>
        <Col>
          <FormGroup>
            <Input
              id="buscar"
              className="search"
              name="buscar"
              onChange={onChangeSearch}
              placeholder="Buscar venta"
              type="search"
            />
          </FormGroup>
        </Col>
        <CardBody>
          <CardTitle tag="h5">Lista de Ventas</CardTitle>

          {searchVentas.length === 0 && (
            <Table className="no-wrap align-middle" responsive borderless hover>
              {Ventas.reverse() && Ventas.length ? (
                <>
                  <thead>
                    <tr>
                      <th>Num</th>
                      <th>CODIGO</th>
                      <th>PRECIO($)</th>
                      <th>CANTIDAD</th>
                      <th>TOTAL</th>
                      <th>METODO PAGO</th>
                      <th>FECHA</th>

                      <th>VENDEDOR</th>

                      <th>ESTADO</th>
                      <th>OPCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Ventas.map((ven, index) => (
                      <tr key={index} className="border-top item">
                        <td className="num">{index + 1}</td>
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
                              <p className="mb-0 name_pro">
                                {ven.codigo?.toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>{ven.precio}</td>
                        <td>{ven.cantidad}</td>
                        <td>
                          {ven.total}$ ({ven.totalbs} Bs){" "}
                        </td>
                        <td>{ven.metodo_pago}</td>
                        <td>{ven.fecha}</td>

                        <td>{ven.vendedor}</td>

                        <td>{ven.estado}</td>
                        <td>
                          <i
                            class="bi bi-list menu_ventas"
                            onClick={() =>
                              toggleDetalles(
                                ven.codigo,
                                ven.precio,
                                ven.cantidad,
                                ven.metodo_pago,
                                ven.fecha,
                                ven.cliente,
                                ven.vendedor,
                                ven.total,
                                ven.totalbs,
                                ven.estado,
                                ven.descripcion
                              )
                            }
                          ></i>

                          <i
                            class="bi bi-trash icon_icono"
                            onClick={() => deleteVenta(ven._id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>{" "}
                </>
              ) : (
                <div className="sin-register">No hay registro de ventas</div>
              )}
            </Table>
          )}
          {searchVentas.length >= 1 && (
            <Table className="no-wrap align-middle" responsive borderless hover>
              {searchVentas.length ? (
                <>
                  <thead>
                    <tr>
                      <th>Nº</th>
                      <th>CODIGO</th>
                      <th>PRECIO($)</th>
                      <th>CANTIDAD</th>
                      <th>TOTAL</th>
                      <th>METODO PAGO</th>
                      <th>FECHA</th>

                      <th>VENDEDOR</th>

                      <th>ESTADO</th>
                      <th>OPCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchVentas.map((ven, index) => (
                      <tr key={index} className="border-top item">
                        <td className="num">{index + 1}</td>
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
                              <p className="mb-0 name_pro">
                                {ven.codigo?.toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>{ven.precio}</td>
                        <td>{ven.cantidad}</td>
                        <td>
                          {ven.total}$ ({ven.totalbs} Bs){" "}
                        </td>
                        <td>{ven.metodo_pago}</td>
                        <td>{ven.fecha}</td>

                        <td>{ven.vendedor}</td>

                        <td>{ven.estado}</td>
                        <td>
                          <i
                            class="bi bi-list menu_ventas"
                            onClick={() =>
                              toggleDetalles(
                                ven.codigo,
                                ven.precio,
                                ven.cantidad,
                                ven.metodo_pago,
                                ven.fecha,
                                ven.cliente,
                                ven.vendedor,
                                ven.total,
                                ven.totalbs,
                                ven.estado,
                                ven.descripcion
                              )
                            }
                          ></i>

                          <i
                            class="bi bi-trash icon_icono"
                            onClick={() => deleteVenta(ven._id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>{" "}
                </>
              ) : (
                <div className="sin-register">No hay registro de ventas</div>
              )}
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Ventas;
