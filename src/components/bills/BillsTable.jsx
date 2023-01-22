import React from "react";
const head = [
  { id: 1, name: "Descripción" },
  { id: 2, name: "Tipo" },
  { id: 3, name: "Cantidad" },
  { id: 4, name: "Primer pago" },
  { id: 5, name: "Pago final" },
  { id: 6, name: "Último pago" },
  { id: 7, name: "Próximo pago" },
  { id: 8, name: "Estado" },
  { id: 9, name: "" },
];
const content = [
  {
    id: 1,
    description: "Descripción...",
    type: "Mensual",
    amount: "$100",
    firstPayment: "05-01-2023",
    finalPayment: "05-01-2023",
    lastPayment: "05-01-2023",
    nextPayment: "05-01-2023",
    state: "Atrasado",
  },
  {
    id: 2,
    description: "Descripción...",
    type: "Mensual",
    amount: "$100",
    firstPayment: "05-01-2023",
    finalPayment: "05-01-2023",
    lastPayment: "05-01-2023",
    nextPayment: "05-01-2023",
    state: "Atrasado",
  },
  {
    id: 2,
    description: "Descripción...",
    type: "Mensual",
    amount: "$100",
    firstPayment: "05-01-2023",
    finalPayment: "05-01-2023",
    lastPayment: "05-01-2023",
    nextPayment: "05-01-2023",
    state: "Atrasado",
  },
];
function BillsTable() {
  return (
    <>
      <table>
        <thead>
          <tr>
            {head.map((item) => {
              return <th key={item.id}>{item.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {content.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>{item.type}</td>
                <td>{item.amount}</td>
                <td>{item.firstPayment}</td>
                <td>{item.finalPayment}</td>
                <td>{item.lastPayment}</td>
                <td>{item.nextPayment}</td>
                <td>{item.state}</td>
                <td>
                  <div className="cellBtnDiv">
                    <button>Pagar</button>
                    <button>Editar</button>
                    <button>Eliminar</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default BillsTable;
