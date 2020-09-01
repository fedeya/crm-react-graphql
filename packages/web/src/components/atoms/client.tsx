import { Client as IClient } from '@Generated/graphql';
import Swal from 'sweetalert2';
import Link from 'next/link';
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
    <tr key={client.id}>
      <td className="border px-4 py-2">
        {client.name} {client.lastName}
      </td>
      <td className="border px-4 py-2">{client.company}</td>
      <td className="border px-4 py-2">{client.email}</td>
      <td className="border px-4 py-2">
        <button
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={confirmDeleteClient}
        >
          Delete
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 ml-2"
            data-darkreader-inline-fill=""
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <Link href="/edit-client/[id]" as={`/edit-client/${client.id}`}>
          <a className="flex justify-center items-center bg-green-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold">
            Edit
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 ml-2"
              data-darkreader-inline-fill=""
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </a>
        </Link>
      </td>
    </tr>
  );
};

export default Client;
