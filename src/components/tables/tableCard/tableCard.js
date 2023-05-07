import "./tableCard.styles.css";
import { formatToMoney } from "./../../../utils/formatters";
export default function TableListCard({invoice}) {
  

  return (
    <table className="table-list-card">
      <thead>
        <tr className="tr-thead-card">
          <th>Cliente</th>
          <th>ID da Cob.</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody className="">
          {invoice?.slice(0,5).map((transacao) => (
            <tr className="tr-tbody-card" key={transacao.id - Math.random()}>
              <td className="td-name-card">{transacao.client_name}</td>
              <td className="td-id-card">{transacao.id}</td>
              <td className="td-value-card">{formatToMoney(Number(transacao.invoice_value))}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
