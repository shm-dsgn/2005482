import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const MainPage = () => {
  const [trains, setTrains] = useState([]);

  const [tokenInfo, setTokenInfo] = useState([]);

  useEffect(() => {
    fetch("http://20.244.56.144/train/auth", {
      method: "POST",
      body: JSON.stringify({
        companyName: "Train Central",
        clientID: "709ff457-f884-4030-b056-d6f8937f4f4d",
        clientSecret: "EWmaNvhHLITWJcJK",
        ownerName: "Soham",
        ownerEmail: "sohamdutta2001@gmail.com",
        rollNo: "2005482",
      }),
    })
      .then((res) => res.json())
      .then((data) => setTokenInfo(data));
  }, []);

  useEffect(() => {
    fetch("http://20.244.56.144/train/trains", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenInfo.access_token,
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
              const delayedBy = train.delayedBy;
              const departureMinutes =
                departureTime.Hours * 60 + departureTime.Minutes + delayedBy;
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
  }, [tokenInfo]);

  console.log(tokenInfo)
  console.log(trains)

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">
        Train Central by Soham Dutta 2005482
      </h1>
      {trains != null && (
        <table className="table-auto w-3/4">
          <thead>
            <tr>
              <th className="border p-3">Train Name</th>
              <th className="border p-3">Train Number</th>
              <th className="border p-3">Departure Time</th>
              <th className="border p-3">Delayed By (minutes)</th>
              <th className="border p-3">AC Seats</th>
              <th className="border p-3">AC Price</th>
              <th className="border p-3">Sleeper Seats</th>
              <th className="border p-3">Sleeper Price</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train) => (
              <tr key={train.trainNumber}>
                <td className="border p-3 underline">
                  <Link to={`/${train.trainNumber}`}>{train.trainName}</Link>
                </td>
                <td className="border p-3">{train.trainNumber}</td>
                <td className="border p-3">{`${train.departureTime.Hours}:${train.departureTime.Minutes}:${train.departureTime.Seconds}`}</td>
                <td className="border p-3">{train.delayedBy}</td>
                <td className="border p-3">{train.seatsAvailable.AC}</td>
                <td className="border p-3">{train.price.AC}</td>
                <td className="border p-3">{train.seatsAvailable.sleeper}</td>
                <td className="border p-3">{train.price.sleeper}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MainPage;
