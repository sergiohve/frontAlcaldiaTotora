import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {
  console.log(props)
  return (
    <Card>
      
      <CardBody className="p-4">
        <CardTitle tag="h5">{props.apellido}</CardTitle>
        <CardSubtitle>{props.edad}</CardSubtitle>
        <CardText className="mt-3">{props.telefono}</CardText>
        <Button color={props.correo}>Read More</Button>
      </CardBody>
    </Card>
  );
};

export default Blog;
