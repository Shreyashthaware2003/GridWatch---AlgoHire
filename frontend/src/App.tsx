import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

type Alert = {
  id: string;
  sensor_id: string;
  status: string;
  severity: string;
};

function App() {

  const API_URL = import.meta.env.VITE_API_URL;
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const fetchAlerts = async () => {
    const res = await axios.get(`${API_URL}/alerts`);
    setAlerts(res.data);
  };

  useEffect(() => {
    fetchAlerts();

    const socket = io(API_URL);

    socket.on("new-alert", () => {
      fetchAlerts();
    });

    socket.on("alert-updated", () => {
      fetchAlerts();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const updateStatus = async (id: string) => {
    await axios.patch(`${API_URL}/alerts/${id}`, {
      status: "acknowledged",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>⚡ GridWatch Alerts Dashboard</h1>

      {alerts.map((alert) => (
        <div
          key={alert.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p><b>Sensor:</b> {alert.sensor_id}</p>
          <p><b>Status:</b> {alert.status}</p>
          <p><b>Severity:</b> {alert.severity}</p>

          <button onClick={() => updateStatus(alert.id)}>
            Acknowledge
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;