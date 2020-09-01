import { Client as IClient } from '@Generated/graphql';
import Swal from 'sweetalert2';
import { DeleteButton, EditButton } from '@Atoms/button';
import { useDeleteClientMutation } from '@Generated/graphql';

type ClientProps = {
  client: Partial<IClient>;
};

const Client: React.FC<ClientProps> = ({ client }) => {
  const [, deleteClient] = useDeleteClientMutation();

  const confirmDeleteClient = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (confirm.value) {
      if (client.id) await deleteClient({ id: client.id });
      Swal.fire('Deleted!', 'Your client has been deleted.', 'success');
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {client.name} {client.lastName}
      </td>
      <td className="border px-4 py-2">{client.company}</td>
      <td className="border px-4 py-2">{client.email}</td>
      <td className="border px-4 py-2">
        <DeleteButton onClick={confirmDeleteClient} />
      </td>
      <td className="border px-4 py-2">
        <EditButton href="/edit-client/[id]" as={`/edit-client/${client.id}`} />
      </td>
    </tr>
  );
};

export default Client;
