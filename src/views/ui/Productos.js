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

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const getProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/productos`);
    console.log(response.data);
    setProductos(response.data);
  };

  const valorInicial = {
    nombre: "",
    precio: "",
    cantidad: "",
  };

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const guardarDatos = async (e) => {
    //Crear la logica para la peticion post
    const newProducto = {
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/productos`,
        newProducto
      );
      console.log(response);
      toggle();
    } catch (error) {
      console.log(error);
    }

    setProducto(valorInicial);
  };

  const modalNewProducto = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>NUEVA PIEZA</ModalHeader>
        <ModalBody>
          <Form onSubmit={guardarDatos}>
            <FormGroup>
              <Label for="nombre">Nombre de la pieza</Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                value={producto.nombre}
                onChange={capturarDatos}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="Precio">Precio($)</Label>
              <Input
                id="precio"
                name="precio"
                type="number"
                value={producto.precio}
                onChange={capturarDatos}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="Precio">Cantidad(Unidad)</Label>
              <Input
                id="cantidad"
                name="cantidad"
                type="number"
                value={producto.cantidad}
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
    getProducts();
  }, []);
  return (
    <div>
      <h2 className="card-title">PRODUCTOS EN ALMACEN</h2>
      <p className="card-title">
        En el módulo PRODUCTOS podrá agregar nuevos productos al sistema,
        actualizar datos de los productos, eliminar o actualizar la imagen de
        los productos, imprimir códigos de barras o SKU de cada producto, buscar
        productos en el sistema, ver todos los productos en almacén, ver los
        productos más vendido y filtrar productos por categoría.
      </p>
      <Card>
        <CardBody className="cont-">
          <Row className="mt-4">
            <Col>
              <div className={modal ? "active title-item" : "title-item"} onClick={toggle}>
                NUEVO PRODUCTO
              </div>
            </Col>
            <Col>
              <div className={!modal ? "active title-item" : "title-item"}>LISTA DE PRODUCTOS</div>
            </Col>

          </Row>
        </CardBody>
      </Card>
      {modalNewProducto()}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Lista de productos</CardTitle>

          <Table className="no-wrap align-middle" responsive borderless>
            {productos.length ? (
              <>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio($)</th>

                    <th>Cantidad(UNIDADES)</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((pieza, index) => (
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
                            <h6 className="mb-0 name_pro">{pieza.nombre}</h6>
                          </div>
                        </div>
                      </td>
                      <td>{pieza.precio}</td>
                      <td>{pieza.cantidad}</td>
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

export default Productos;
