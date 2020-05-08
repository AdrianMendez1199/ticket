import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import CheckIsAdmin from "../Helpers/isAdmin";

const TICKECT_QUERY = gql`
  query getTickets {
    getTickets {
      id
      nombre
      mail
      ticket_pedido
    }
  }
`;

const Admin = () => {
  const {
    loading: loadingTicket,
    error: errorTicket,
    data: dataTicket
  } = useQuery(TICKECT_QUERY);

  if (CheckIsAdmin() === false) {
    return <Redirect to="/tickets" />;
  }

  if (loadingTicket) {
    return (
      <Loader type="BallTriangle" color="#00BFFF" height={100} width={100} />
    );
  }

  return (
    <div>
      <h3 className="text-center mt-3">Tickets Asignados</h3>
      <div className="container mt-3">
        <table className="table mt-2">
          <thead className="thead-light">
            <tr>
              <th scope="col">Id Ticket</th>
              <th scope="col">Nombre Usuario</th>
              <th scope="col">Mail</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {dataTicket.getTickets.map(value => (
              <tr>
                <th scope="row">{value.id}</th>
                <th scope="row">{value.nombre}</th>
                <th scope="row">{value.mail}</th>
                <th scope="row">
                  {value.ticket_pedido ? value.ticket_pedido : "N/A"}{" "}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
