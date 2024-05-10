import React, { useState, useEffect } from "react";
import axios from "axios";

const TablaFintoc = () => {
  const [movements, setMovements] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(
    "acc_8QDl85TVMnYy24J3"
  ); // Set the desired account ID here
  const [sinceDate, setSinceDate] = useState("2023-01-01");
  const [untilDate, setUntilDate] = useState("2023-04-30");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          `https://appify-black-side.vercel.app/conciliacion/conciliaciones/super-user-8dbd6694-9d79-4fa8-8ca1-f240528613d2`
        );
        setAccounts(response.data.payload);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const fetchAndPostMovements = async () => {
    try {
      const response = await axios.get(
        `https://api.fintoc.com/v1/accounts/${selectedAccountId}/movements`,
        {
          params: {
            link_token: `link_8YNXV5iZP3DeLORQ_token_emGAjvhj4jz3skM4keX5sBo9`,
            since: sinceDate,
            until: untilDate,
          },
          headers: {
            Authorization: `Bearer sk_live_EyV2bQgc5awWQeKXCQtQuTX4tsx-mAeL`,
            Accept: "application/json",
          },
        },
        { withCredentials: true }
      );

      const modifiedMovements = response.data.map((movement) => ({
        ...movement,
        account_id: selectedAccountId,
      }));
      setMovements(modifiedMovements);

      await axios.post(
        "https://appify-black-side.vercel.app/conciliacion/createMov/",
        modifiedMovements
      );
    } catch (error) {
      console.error("Error fetching or posting movements:", error);
    }
  };

  const fetchStoredMovements = async () => {
    try {
      const response = await axios.get(
        `https://appify-black-side.vercel.app/conciliacion/movimientos/${selectedAccountId}`
      );
      setMovements(response.data.payload);
    } catch (error) {
      console.error("Error fetching stored movements:", error);
    }
  };

  const renderMovementsTable = () => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Post Date</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {movements.map((movement) => (
          <tr key={movement.id}>
            <td>{movement.id}</td>
            <td>{movement.description}</td>
            <td>{movement.amount}</td>
            <td>{movement.post_date}</td>
            <td>{movement.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Financial Transactions</h2>

      <label>
        Since:
        <input
          type="date"
          value={sinceDate}
          onChange={(e) => setSinceDate(e.target.value)}
        />
      </label>

      <label>
        Until:
        <input
          type="date"
          value={untilDate}
          onChange={(e) => setUntilDate(e.target.value)}
        />
      </label>

      <button onClick={fetchAndPostMovements}>Fetch and Post Movements</button>
      <button onClick={fetchStoredMovements}>Fetch Stored Movements</button>

      {movements.length > 0 && renderMovementsTable()}
    </div>
  );
};

export default TablaFintoc;
