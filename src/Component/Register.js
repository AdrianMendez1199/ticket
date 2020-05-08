import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const SET_SIGNUP = gql`
  mutation singUp($mail: String!, $nombre: String!, $password: String!) {
    singUp(data: { mail: $mail, nombre: $nombre, password: $password }) {
      nombre
    }
  }
`;

function Register() {
  const [mutate] = useMutation(SET_SIGNUP);

  const [userData, setData] = useState({
    nombre: "",
    mail: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const handlerChange = e => {
    const { name, value } = e.target;

    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = await mutate({
        variables: {
          mail: userData.mail,
          nombre: userData.nombre,
          password: userData.password
        }
      });

      setMessage(
        `Registro Completado Correctamente, ${data.data.singUp.nombre} ya puede iniciar sesión`
      );
    } catch (e) {
      console.log(e.code)
      setMessage(e.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Registrarse</h5>
              <form className="form-signin" onSubmit={handleSubmit}>
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputName"
                    className="form-control"
                    placeholder="Email address"
                    required
                    value={userData.nombre}
                    name="nombre"
                    onChange={handlerChange}
                  />
                  <label htmlFor="inputName">Nombre</label>
                </div>
                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required
                    value={userData.mail}
                    name="mail"
                    onChange={handlerChange}
                  />
                  <label htmlFor="inputEmail">Correo Electronico</label>
                </div>
                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                    name="password"
                    value={userData.password}
                    onChange={handlerChange}
                  />
                  <label htmlFor="inputPassword">Contraseña</label>
                </div>

                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Registrarse
                </button>
                <hr className="my-4" />

                <Link
                  to="/login"
                  className="btn btn-lg btn-info btn-block text-uppercase"
                >
                  Iniciar Sesión
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      {!message ? (
        ""
      ) : (
        <div className="container col-sm-6">
          <Alert variant="info" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Información</Alert.Heading>
            {message}
          </Alert>
        </div>
      )}
    </div>
  );
}
export default Register;
