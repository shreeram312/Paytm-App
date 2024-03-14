import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";

export const DashBoard = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        // Process the response data here
        setBalance(formatBalance(response.data.balance));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [balance]);
  const formatBalance = (balance) => {
    if (balance >= 1000) {
      return (balance / 1000).toFixed(1) + "k"; // Convert to 'k' format if >= 1000
    }
    return balance.toFixed(2); // Otherwise, format to 2 decimal places
  };
  return (
    <div>
      <Appbar to={"/signup"} />

      <div style={{ backgroundColor: "#dcfce7" }} className="m-3 md:p-4 p-3">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};
