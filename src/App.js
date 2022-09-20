import React from "react";
import axios from 'axios';
import urlFor from './helpers/urlFor';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Input,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
 
const data =  [];
class App extends React.Component {
  state = {
    categories: [],
    notes: [],
    note: {},
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      idcategory: "",
      title: "",
      description: "",
    },
  };

  getNote = () => {
    axios.get(urlFor('api/note/all'))
    .then((res) => this.setState({notes: res.data}) )
    .catch((err) => console.log(err.response.data) );
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    axios.get(urlFor('api/category/all'))
    .then((res) => this.setState({categories: res.data}) )
    .catch((err) => console.log(err.response.data) );
    
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    console.log(dato);
    axios.post(urlFor('api/note/save'), dato)
      .then((res) => console.log(res.data) )
      .catch((err) => console.log(err.response.data) );
      this.setState({ modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion === true) {
      console.log(dato);
      axios.post(urlFor('api/note/delete/'+dato))
      .then((res) => console.log(res.data) )
      .catch((err) => console.log(err.response.data) );
      this.setState({ modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    console.log(valorNuevo);
    axios.post(urlFor('api/note/save'), valorNuevo)
    .then((res) => console.log(res.data) )
    .catch((err) => console.log(err.response.data) );
    this.setState({
      modalInsertar: false,
    });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };


  render() {
    this.getNote();
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <Button color="information">Login</Button>
          <br />
          <hr />
          <br />
          
          {this.state.notes.map((dato) => (
            <Card key={dato.id}
            style={{
              width: '18rem'
            }}
            >
            <CardBody>
              <CardTitle tag="h5">
                {dato.title}
              </CardTitle>
              <CardText>
              {dato.description}
              </CardText>
              <Button
                color="primary"
                onClick={() => this.mostrarModalActualizar(dato)}
              >
                Editar
              </Button>{" "}
              <Button color="danger" onClick={()=> this.eliminar(dato.id)}>Eliminar</Button>
            </CardBody>
            </Card>
          ))}
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody> 
            <FormGroup>
              <label>
                title: 
              </label>
              <input
                className="form-control"
                name="title"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.title}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                description: 
              </label>
              <textarea
                className="form-control"
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.description}
              />
            </FormGroup>

            <FormGroup>
              <label>
               Category:
              </label>
              <Input
                className = "form-control"
                id="idcategory"
                name="idcategory"
                type="select"
              >
                <option value={1} key={1}>
                  Low
                </option>
                <option value={2} key={2}>
                  Medium
                </option>
                <option value={3} key={3}>
                  High
                </option>
              </Input>
            </FormGroup>
          </ModalBody>
          
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Crear Nota</h3></div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label>
                title: 
              </label>
              <input
                className="form-control"
                name="title"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                description: 
              </label>
              <textarea 
                className="form-control"
                name="description"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Category:
              </label>
              <Input
                className = "form-control"
                id="idcategory"
                name="idcategory"
                type="select"
                onChange={this.handleChange}
              >
                {this.state.categories.map((dato) => (
                  <option value={dato.id} key={dato.id}>
                    {dato.description}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
