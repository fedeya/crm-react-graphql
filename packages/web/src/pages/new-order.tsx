import Layout from '@Organisms/layout';
import OrderForm from '@Organisms/order-form';

const NewOrder: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">New Client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <OrderForm />
        </div>
      </div>
    </Layout>
  );
};

export default NewOrder;
