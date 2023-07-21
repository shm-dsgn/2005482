import "./App.css";
import { useEffect, useState } from "react";
import useGetToken from "./components/useGetToken";

function App() {
  const token = useGetToken();
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetch("http://20.244.56.144/train/trains", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const now = new Date();
          const currentTime = now.getHours() * 60 + now.getMinutes();

          const filteredTrains = data
            .filter((train) => {
              const departureTime = train.departureTime;
              const departureMinutes =
                departureTime.Hours * 60 + departureTime.Minutes;
              const timeDifference = departureMinutes - currentTime;
              return timeDifference > 0 && timeDifference >= 30;
            })
            .sort(
              (a, b) =>
                a.price.sleeper - b.price.sleeper ||
                b.trainName.localeCompare(a.trainName) ||
                b.departureTime.Hours * 60 +
                  b.departureTime.Minutes -
                  (a.departureTime.Hours * 60 + a.departureTime.Minutes)
            );

          setTrains(filteredTrains);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4">Train Central by Soham Dutta 2005482</h1>
      <h2 className="text-xl font-bold mb-2">Trains</h2>
      {trains && (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Train Name</th>
              <th className="px-4 py-2">Train Number</th>
              <th className="px-4 py-2">Departure Time</th>
              <th className="px-4 py-2">Delayed By (minutes)</th>
              <th className="px-4 py-2">AC Seats</th>
              <th className="px-4 py-2">AC Price</th>
              <th className="px-4 py-2">Sleeper Seats</th>
              <th className="px-4 py-2">Sleeper Price</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train) => (
              <tr key={train.trainNumber}>
                <td className="border px-4 py-2">{train.trainName}</td>
                <td className="border px-4 py-2">{train.trainNumber}</td>
                <td className="border px-4 py-2">{`${train.departureTime.Hours}:${train.departureTime.Minutes}:${train.departureTime.Seconds}`}</td>
                <td className="border px-4 py-2">{train.delayedBy}</td>
                <td className="border px-4 py-2">{train.seatsAvailable.AC}</td>
                <td className="border px-4 py-2">{train.price.AC}</td>
                <td className="border px-4 py-2">
                  {train.seatsAvailable.sleeper}
                </td>
                <td className="border px-4 py-2">{train.price.sleeper}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
