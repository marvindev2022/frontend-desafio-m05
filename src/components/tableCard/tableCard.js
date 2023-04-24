import "./tableCard.styles.css";

export default function TableListCard({invoice}) {
  

  return (
    <table className="table-list-card">
      <thead>
        <tr className="tr-thead">
          <th>Cliente</th>
          <th>ID da Cob.</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody className="">
          {invoice?.slice(0,5).map((transacao) => (
            <tr className="tr-tbody" key={transacao.id - Math.random()}>
              <td className="td-name">{transacao.client_name}</td>
              <td className="td-id">{transacao.id}</td>
              <td className="td-value">{transacao.invoice_value}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
