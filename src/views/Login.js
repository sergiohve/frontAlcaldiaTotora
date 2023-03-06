import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggedin, setLoggedin] = React.useState(false);
  const [back, setBack] = React.useState(false)
  const [mensaje, setmensaje] = React.useState("");
  localStorage.setItem("login", "No_logueado");
  const loginHandler = (ev) => {
    ev.preventDefault();
    if (!username || !password) {
      return;
    }
    localStorage.setItem("login", "Logueado");
    if (username == "mariemilys6@gmail.com" && password == "pablito") {
      return setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
    setmensaje("El usuario o contraseña son incorrectos");

   
    /*try {
      fetch("${process.env.REACT_APP_API}/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("RESPONSE from login success ", data);
          setLoggedin(true);
        });
    } catch (error) {
      console.log(error);
    }*/
  };
  const getStyle=()=>{
    setBack(true)
  }

  useEffect(() => {
    getStyle()
  }, [])
 

  return (
    <Container className="container">
      <Row>
        <Col>
          <Card>
            <h2 className="center">Iniciar sesión</h2>
            <CardBody>
              <Form onSubmit={loginHandler}>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="correo" className="mr-sm-2">
                    Correo
                  </Label>
                  <Input
                    type="text"
                    name="correo"
                    id="correo"
                    onChange={(ev) => setUsername(ev.currentTarget.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="examplePassword" className="mr-sm-2">
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    onChange={(ev) => setPassword(ev.currentTarget.value)}
                  />
                </FormGroup>
                <div className="msg-alerta">{mensaje}</div>
                <Button type="submit" color="primary" className="login">
                  Ingresar
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
