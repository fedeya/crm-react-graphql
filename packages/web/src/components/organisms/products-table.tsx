import { useProductsQuery } from '@Generated/graphql';
import Product from '@Molecules/product';
import { useAuthQuery } from '../../hooks/auth';

const ProductsTable: React.FC = () => {
  const [{ data, fetching }] = useAuthQuery(useProductsQuery);

  if (fetching) return <p>Loading...</p>;

  return (
    <div className="overflow-x-scroll">
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-indigo-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Name</th>
            <th className="w-1/5 py-2">Quantity</th>
            <th className="w-1/5 py-2">Price</th>
            <th className="w-1/5 py-2">Delete</th>
            <th className="w-1/5 py-2">Edit</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data &&
            data.products.map(product => (
              <Product product={product} key={product.id} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
