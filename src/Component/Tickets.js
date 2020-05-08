import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import CheckIsAdmin from "../Helpers/isAdmin";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

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

const SET_PEDIDO_TICKET = gql`
  mutation setTypeTicket($ticketId: ID!, $ticket_pedido: String!) {
    setTypeTicket(ticketId: $ticketId, ticket_pedido: $ticket_pedido) {
      id
      ticket_pedido
    }
  }
`;

const Tickets = () => {
  const [show, setShow] = useState(false);
  const [MutationTicket, { dataMutation }] = useMutation(SET_PEDIDO_TICKET);
  const [responseTicket, setReponseTicket] = useState("");
  const [userData, setData] = useState({
    tipo_ticket: "",
    id_ticket: ""
  });

  const handleClose = () => setShow(false);

  const handleShow = e => {
    const { name } = e.target;

    e.preventDefault();

    setData(prevState => ({
      ...prevState,
      id_ticket: name
    }));

    setShow(true);
  };

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTicket = async e => {
    e.preventDefault();
    try {
      const response = await MutationTicket({
        variables: {
          ticketId: userData.id_ticket,
          ticket_pedido: userData.tipo_ticket
        }
      });

      setShow(false);
      setReponseTicket(response.data.setTypeTicket.ticket_pedido);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    loading: loadingTicket,
    error: errorTicket,
    data: dataTicket
  } = useQuery(TICKECT_QUERY);

  if (CheckIsAdmin()) {
    return <Redirect to="/admin" />;
  }

  if (!dataTicket) return <h1>Usted No tiene Tickets Asignados</h1>;

  return (
    <div>
      {responseTicket ? (
        <div className="container col-sm-6">
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Información</Alert.Heading>
            El pedido a sido seteado
          </Alert>
        </div>
      ) : (
        ""
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Información del Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Ingrese el ticket"
            name="tipo_ticket"
            value={userData.tipo_ticket}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleTicket}>
            Pedir Ticket
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container mt-3">
        <table className="table mt-2">
          <thead className="thead-light">
            <tr>
              <th scope="col">Id Ticket</th>
              <th scope="col">ticket pedido</th>
            </tr>
          </thead>
          <tbody>
            {dataTicket.getTickets.map(value => (
              <tr key={value.id}>
                <th scope="row">{value.id}</th>

                <th scope="row">
                  {value.ticket_pedido ? (
                    value.ticket_pedido
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      name={value.id}
                    >
                      Ticket Pedido
                    </Button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Tickets;
