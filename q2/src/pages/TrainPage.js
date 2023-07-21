import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TrainPage = () => {
  const { trainNumber } = useParams();
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

  const [train, setTrain] = useState([]);

  useEffect(() => {
    if (tokenInfo && trainNumber) {
      fetch(`http://20.244.56.144/train/trains/${trainNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenInfo.access_token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTrain(data);
        });
    }
  }, [tokenInfo, trainNumber]);

  return (
    <div>
      {train ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Train Central by Soham Dutta 2005482
          </h1>
          <h2 className="text-xl mb-4">Train Number: {train.trainNumber}</h2>
          <h2 className="text-xl mb-4">Train Name: {train.trainName}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TrainPage;
