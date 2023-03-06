import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, FormGroup, Form, Input, Label, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";

const Updatecaja = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  const valorInicial = {
    numero_caja: "",
    codigo: "",
    efectivo: "",
    estado: "Habilitada",
  };

  const [caja, setCaja] = useState(valorInicial);

  const updateDatos = async (e) => {
    //Crear la logica para la peticion post
    e.preventDefault();

    const updateCaja = {
      ...caja,
      numero_caja: caja.numero_caja,
      codigo: caja.codigo,
      efectivo: caja.efectivo,
      estado: caja.estado,
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/cajas/${id}`,
        updateCaja
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setCaja({
      ...caja,
      [name]: value,
    });
  };

  return (
    <div>
      <h2 className="card-title">
        ACTUALIZAR CAJA
        <h4>En el módulo podrá actualizar los datos de las cajas de venta.</h4>
      </h2>
      <Card>
        <CardBody>
          <Form onSubmit={updateDatos}>
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
            <Button
              color="secondary"
              onClick={() => navigate("/dashboard/cajas/cajasregistradas")}
            >
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Guardar
            </Button>

            </ModalFooter>
           
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Updatecaja;
