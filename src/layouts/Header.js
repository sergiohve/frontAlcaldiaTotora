import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
  FormGroup,
  Input,
  Modal,
  Label,
  ModalFooter,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import user1 from "../assets/images/users/user1.jpg";
import Emiser from "../assets/images/emiser.png";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [ventacierre, setVentacierre] = useState([]);
  const [modalcierreventa, setModalCierreventa] = useState(false);
  const [precio, setprecio] = useState()
  var today = new Date();
  var now = today.toLocaleTimeString("en-US");
  console.log(now);
  const toggleCierreventa = () => {
    setModalCierreventa(!modalcierreventa);
  };
  
  const capturarDatosCierre = (e) => {
    const { name, value } = e.target;
    setVentacierre({
      ...ventacierre,
      [name]: value,
    });
  };
  const guardarDatosCierre = async (e) => {
    localStorage.setItem("dolarhoy", ventacierre.dolarhoy);
  };
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const Logout = () => {
    navigate("/");
  };
  useEffect(() => {
    const precio = localStorage.getItem("dolarhoy");
    setprecio(precio)
  }, [])
  const modalNewCierreventa = () => {
    return (
      <Modal isOpen={modalcierreventa} toggle={toggleCierreventa}>
        <ModalHeader toggle={toggleCierreventa}>
          {" "}
          <p className="dolar-tittle">
            Para vender tiene que actualizar el precio del dolar a las 9am y
            1pm.
          </p>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={guardarDatosCierre}>
            <Row className="mt-3">
              <Col xs="12" sm="12">
                <FormGroup>
                  <Label for="dolarhoy">PRECIO DEL DOLAR</Label>
                  <Input
                    id="dolarhoy"
                    name="dolarhoy"
                    type="text"
                    value={ventacierre.dolarhoy}
                    onChange={capturarDatosCierre}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <ModalFooter>
              <Button color="secondary" onClick={toggleCierreventa}>Cancelar</Button>
              <Button color="primary" type="submit" className="btn_dolar">
                Actualizar dolar
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    );
  };
  return (
    <Navbar color="primary" light expand="md" className="fix-header" style={{background: "#005DA9"}}>
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <img src={Emiser} alt="Emiser" className="logo" />
        </div>
        {modalNewCierreventa()}
       

        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list menu_mobile"></i>
        </Button>
      </div>
      <div
        className="hstack gap-2"
        style={{ marginLeft: "auto", right: 0, justifyContent: "right" }}
      >
       
        <div className="pre-dolar">$={precio}</div>
       
        <Button color="success" className="precio_dolar" onClick={toggleCierreventa}>Actualizar precio del dolar</Button>
      </div>
      <div>
        <Collapse navbar isOpen={isOpen}>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              color="transparent"
              className="nav-right"
              style={{ marginLeft: "auto", right: 0 }}
            >
              <img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
              ></img>
            </DropdownToggle>
            <DropdownMenu hidden>
              <DropdownItem header>Info</DropdownItem>
              <DropdownItem>My Account</DropdownItem>
              <DropdownItem>Edit Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>My Balance</DropdownItem>
              <DropdownItem>Inbox</DropdownItem>
              <DropdownItem onClick={() => Logout()}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
