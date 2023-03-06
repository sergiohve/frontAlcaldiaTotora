import axios from "axios";
import { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  Table,
  Button,
} from "reactstrap";


const Cajasregistradas = () => {
  const [proveedor, setProveedor] = useState([]);

  const getProveedor = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/proveedores`);
    console.log(response.data);
    setProveedor(response.data);
  };
  const deleteProveedor = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/proveedores/${id}`
    );
    console.log(response)
    getProveedor();
  };

  useEffect(() => {
    getProveedor();
  }, []);
  return (
    <div>
      <h2 className="card-title">
        LISTA DE PROVEEDORES
        <h4>
          En el módulo PROVEEDORES usted podrá registrar los proveedores de
          productos a los cuales usted les compra productos o mercancía. Además,
          podrá actualizar los datos de los proveedores, ver todos los
          proveedores registrados en el sistema, buscar proveedores en el
          sistema o eliminarlos si así lo desea.
        </h4>
      </h2>
      <Card>
        <CardBody>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>

                <th>Email</th>
                <th>ESTADO</th>
                <th>ACTUALIZAR</th>
                <th>ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              {proveedor.map((pro, index) => (
                <tr key={index} className="border-top">
                  <td>{pro.nombre}</td>
                  <td>{pro.telefono}</td>
                  <td>{pro.email}</td>
                  <td>{pro.estado}</td>
                  <td>
                    <Button className="btn" color="success">
                      <i class="bi bi-arrow-repeat"></i>
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="btn"
                      color="danger"
                      onClick={() => deleteProveedor(pro._id)}
                    >
                      <i class="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cajasregistradas;
