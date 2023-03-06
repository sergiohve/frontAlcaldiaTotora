import { Link } from "react-router-dom";

import { Card, CardBody, Table } from "reactstrap";

const ProjectTables = ({ modulos }) => {
  return (
    <div>
      <h2 className="card-title">
        Dashboard
        <h4>
          ¡Bienvenido Administrador Principal! Este es el panel principal del
          sistema acá podrá encontrar atajos para acceder a los distintos
          listados de cada módulo del sistema.
        </h4>
      </h2>

      <div className="container-modules">
        {modulos.map((module, index) => (
          <Card className="card ms-3 card-hover" key={index}>
            <Link to={module.link ? module.link : ""} className="tittle-module">
              <CardBody className="card-dash">
                <Table className=" align-middle modul" responsive>
                  <thead>
                    <h4 className="tittle-module">{module.nombre}</h4>
                  </thead>
                  <tbody className="">
                    <h6 align="center" className="dib-module">
                      <i class={module.dibujo}></i>
                    </h6>
                  </tbody>
                </Table>
              </CardBody>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectTables;
