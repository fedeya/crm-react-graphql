import Link from 'next/link';

import Layout from '@Organisms/layout';
import ProductsTable from '@Organisms/products-table';

const Products: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 mb-3">Products</h1>
      <Link href="/new-product">
        <a className="my-3 form-button">New Product</a>
      </Link>
      <ProductsTable />
    </Layout>
  );
};

export default Products;
