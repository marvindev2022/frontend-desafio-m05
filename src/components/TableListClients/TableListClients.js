


import "./TableListClients.styles.css";

export default function TableListClients({ transactions }) {
  return (
    <table className="table-list-clients">
      <thead>
        <tr className="tr-thead-clients">
          <th>Clientes</th>
          <th>Data de venc.</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody className="">
        {transactions.slice(0, 5).map((transacao) => (
        <tr className="tr-tbody-clients" key={Math.random()*1000}>
          <td className="td-name-clients">{transacao.name}</td>
          <td className="td-id-clients">{transacao.date}</td>
          <td className="td-value-clients">{transacao.value}</td>
        </tr>
        ))}
      </tbody>
    </table>
  );
}
