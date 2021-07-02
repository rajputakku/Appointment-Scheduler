import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import backendServiceGateway from "./../gateway/backendServiceGateway";
import AppointmentRow from "./appointmentRow";

export default class Appointment extends React.Component {
  constructor() {
    super();
    this.state = {
      appointments: [],
      email: "",
      name: "",
      phone: "",
      show: false,
      selected_interval: null,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal = (selected_interval) => {
    this.setState({ show: true, selected_interval: selected_interval });
  };

  hideModal = () => {
    this.setState({ show: false });
    this.fetchAppointments();
  };

  handleSubmit = async (event) => {
    const { email, name, phone, selected_interval } = this.state;
    event.preventDefault();
    const res = await backendServiceGateway.createAppointment(
      name,
      email,
      phone,
      selected_interval.start_time,
      selected_interval.end_time
    );
    if (res) {
      alert(res);
    } else {
      alert(
        "Some error occurred while creating appointment. Please try again later !"
      );
    }
    this.setState({ name: "", email: "", phone: "" });
    this.hideModal();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  fetchAppointments = async () => {
    const appointment = await backendServiceGateway.fetchAppointments();
    if (appointment) {
      this.setState({ appointments: appointment.intervals });
    } else {
      alert(
        "Some error occurred while fetching appointments. Please try again later !"
      );
    }
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.fetchAppointments();
  }

  render() {
    console.log(this.state.appointments);
    const appointmentsArr = this.state.appointments.length
      ? this.state.appointments
      : [];
    console.log(appointmentsArr);
    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Time</TableCell>
                <TableCell align="center">Available Slots</TableCell>
                <TableCell align="center">Book Your Slot</TableCell>
                <TableCell align="center">Show/Hide</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentsArr.map((appointment) => (
                <AppointmentRow
                  appointment={appointment}
                  modalVisible={this.state.show}
                  showModal={this.showModal}
                  hideModal={this.hideModal}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  email={this.state.email}
                  name={this.state.name}
                  phone={this.state.phone}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
