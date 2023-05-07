import "./TableListClients.styles.css";
import { formatCpf } from "../../../utils/formatters";
export default function TableListClients({ clients }) {
  return (
    <table className="table-list-clients">
      <thead>
        <tr className="tr-thead-clients">
          <th>Clientes</th>
          <th>Id. cliente</th>
          <th>CPF</th>
        </tr>
      </thead>
      <tbody className="">
        {clients.slice(0,4)?.map((client) => (
          <tr className="tr-tbody-clients" key={Math.random() * 1000}>
            <td className="td-name-clients">{client.name}</td>
            <td className="td-id-clients">{client.id}</td>
            <td className="td-value-clients">{formatCpf(client.cpf)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
