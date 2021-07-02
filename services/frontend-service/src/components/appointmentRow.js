import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { FormModal } from "./form";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

const MAX_SLOTS_IN_INTERVAL = 3;

export default function AppointmentRow(props) {
  const {
    appointment,
    modalVisible,
    showModal,
    hideModal,
    handleSubmit,
    handleChange,
    email,
    name,
    phone,
  } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={appointment.start_time}>
        <TableCell align="center">{appointment.start_time}</TableCell>
        <TableCell align="center">{appointment.end_time}</TableCell>
        <TableCell align="center">
          {MAX_SLOTS_IN_INTERVAL - appointment.slots.length}
        </TableCell>
        <FormModal show={modalVisible} handleClose={hideModal}>
          <h2>Book Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email: </label>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name: </label>
              <Input
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number: </label>
              <Input
                name="phone"
                type="tel"
                placeholder="Phone No"
                value={phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Button variant="contained" color="primary" type="submit">
                Book
              </Button>
            </div>
          </form>
        </FormModal>
        <TableCell align="center">
          <Button variant="contained" onClick={() => showModal(appointment)}>
            Book
          </Button>
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, alignn: "center" }}
          colSpan={5}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <React.Fragment>
              {appointment.slots.map((slot) => (
                <Card
                  style={{
                    border: "2px solid black",
                    display: "inline-block",
                    margin: "10px",
                    padding: "5px",
                    align: "center",
                  }}
                >
                  <CardContent>
                    <h3>Name: {slot.name}</h3>
                    <h3>Email: {slot.email}</h3>
                    <h3>Phone: {slot.phone}</h3>
                  </CardContent>
                </Card>
              ))}
            </React.Fragment>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
