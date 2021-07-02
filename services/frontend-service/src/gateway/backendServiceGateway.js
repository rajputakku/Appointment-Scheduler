import axios from "axios";

const APPOINTMENT_API_URI = "http://localhost:3000/api/appointment";

const backendServiceGateway = {
  fetchAppointments: async () => {
    try {
      const res = await axios.get(APPOINTMENT_API_URI);
      return res.data.appointments;
    } catch (err) {
      console.error("Error fetching appointments: ", err);
    }
    return null;
  },

  createAppointment: async (name, email, phone, start_time, end_time) => {
    try {
      const data = {
        name,
        email,
        phone,
        start_time,
        end_time,
      };
      const res = await axios.post(APPOINTMENT_API_URI, data);
      return res.data;
    } catch (err) {
      if (err.response.status === 406) {
        return err.response.data;
      } else {
        console.error("Error creating appointment: ", err);
      }
    }
    return null;
  },
};

export default backendServiceGateway;
