import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import CheckIsAdmin from "../Helpers/isAdmin";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const LIST_USERS = gql`
  query getUser {
    getUser {
      id
      nombre
      mail
    }
  }
`;

const CREATED_TICKET = gql`
  mutation assignTicket($userId: ID!) {
    assignTicket(userId: $userId) {
      nombre
    }
  }
`;

const Users = () => {
  const [errorGeneral, setGeneralError] = useState("");
  const [dataSuccess, setDataSuccess] = useState("");
  const { loading, error, data } = useQuery(LIST_USERS);
  const [createTicket, { dataTicket, error: TicketError }] = useMutation(
    CREATED_TICKET
  );

  if (CheckIsAdmin() === false) {
    return <Redirect to="/tickets" />;
  }

  if (error) return <p> Ocurrio un error</p>;

  if (loading) return <p>Cargando ... </p>;

  const assignTicket = async e => {
    e.preventDefault();

    try {
      const response = await createTicket({
        variables: { userId: e.target.name }
      });

      setDataSuccess(`Ticket Asignado a ${response.data.assignTicket.nombre}`);
    } catch (e) {
      return <h2>Ocurrio un error</h2>;
    }
  };

  return (
    <div className="container mt-3">
      {dataSuccess ? <h1 className="text-center mt-3 alert alert-success"> {dataSuccess} </h1> : ""}

      <table className="table mt-2">
        <thead className="thead-light">
          <tr>
            <th scope="col">Nombre Usuario</th>
            <th scope="col">Mail</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.getUser.map(value => (
            <tr key={value.id}>
              <th scope="row">{value.nombre}</th>
              <th scope="row">{value.mail}</th>
              <th>
                <button
                  className="btn btn-warning btn-sm"
                  name={value.id}
                  onClick={assignTicket}
                >
                  Asignar Ticket
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
