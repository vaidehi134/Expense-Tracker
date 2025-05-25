// import React, { useEffect, useState } from "react";

// function Dashboard() {
//   const [budgets, setBudgets] = useState([]);
//   const [totalSpent, setTotalSpent] = useState(0);

//   useEffect(() => {
//     fetch("http://localhost:4000/budget")
//       .then((res) => res.json())
//       .then((data) => {
//         setBudgets(data);
//         const total = data.reduce(
//           (sum, b) => sum + (b.amount - b.amount_remaining),
//           0
//         );
//         setTotalSpent(total);
//       })
//       .catch((err) => console.error("Error fetching budgets:", err));
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Budget Dashboard</h2>

//       <table className="table table-bordered table-striped">
//         <thead className="table-dark">
//           <tr>
//             <th>Category</th>
//             <th>Remaining (₹)</th>
//             <th>Spent (₹)</th>
//           </tr>
//         </thead>

//         <tbody>
//           {budgets.length ? (
//             budgets.map((b) => {
//               const spent = b.amount - b.amount_remaining;
//               return (
//                 <tr key={b._id}>
//                   <td>{b.category_name}</td>
//                   <td>{b.amount_remaining}</td>
//                   <td>{spent}</td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan="3" className="text-center">
//                 No budget data
//               </td>
//             </tr>
//           )}
//         </tbody>

//         <tfoot>
//           <tr className="table-secondary">
//             <th>Total Expense</th>
//             <th></th>
//             <th>₹{totalSpent}</th>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";

function Dashboard() {
  const [budgets, setBudgets] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not authenticated.");
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/budget", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch budget data");
        }

        const data = await res.json();
        setBudgets(data);
        const total = data.reduce(
          (sum, b) => sum + (b.amount - b.amount_remaining),
          0
        );
        setTotalSpent(total);
      } catch (err) {
        console.error("Error fetching budgets:", err.message);
        setError(err.message);
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Budget Dashboard</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Category</th>
            <th>Remaining (₹)</th>
            <th>Spent (₹)</th>
          </tr>
        </thead>

        <tbody>
          {budgets.length ? (
            budgets.map((b) => {
              const spent = b.amount - b.amount_remaining;
              return (
                <tr key={b._id}>
                  <td>{b.category_name}</td>
                  <td>{b.amount_remaining}</td>
                  <td>{spent}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No budget data
              </td>
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr className="table-secondary">
            <th>Total Expense</th>
            <th></th>
            <th>₹{totalSpent}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Dashboard;
