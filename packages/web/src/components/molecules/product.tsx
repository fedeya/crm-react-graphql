import Swal from 'sweetalert2';

import {
  Product as IProduct,
  useDeleteProductMutation
} from '@Generated/graphql';
import { EditButton, DeleteButton } from '@Atoms/button';

import { useAuthMutation } from '../../hooks/auth';

type ProductProps = {
  product: Partial<IProduct>;
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const [, deleteProduct] = useAuthMutation(useDeleteProductMutation);

  const confirmDeleteProduct = async () => {
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
      if (product.id) await deleteProduct({ id: product.id });
      await Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{product.name}</td>
      <td className="border px-4 py-2">{product.quantity}</td>
      <td className="border px-4 py-2">${product.price}</td>
      <td className="border px-4 py-2">
        <DeleteButton onClick={confirmDeleteProduct} />
      </td>
      <td className="border px-4 py-2">
        <EditButton
          href="/edit-product/[id]"
          as={`/edit-product/${product.id}`}
        />
      </td>
    </tr>
  );
};

export default Product;
