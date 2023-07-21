import { useEffect, useState } from "react";

const useGetToken = () => {
  const [token, setToken] = useState("");

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
      .then((data) => setToken(data.access_token));
  }, []);
    return token;
};

export default useGetToken;
