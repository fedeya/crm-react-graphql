import { Client as IClient } from '@Generated/graphql';

type ClientProps = {
  client: Partial<IClient>;
};

const Client: React.FC<ClientProps> = ({ client }) => {
  return (
    <tr key={client.id}>
      <td className="border px-4 py-2">
        {client.name} {client.lastName}
      </td>
      <td className="border px-4 py-2">{client.company}</td>
      <td className="border px-4 py-2">{client.email}</td>
    </tr>
  );
};

export default Client;
