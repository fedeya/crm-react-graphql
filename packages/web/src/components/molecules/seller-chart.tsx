import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  ResponsiveContainer
} from 'recharts';
import { useTopSellersQuery } from '@Generated/graphql';

import { useAuthQuery } from '../../hooks/auth';

const SellerChart = () => {
  const [{ data, fetching }] = useAuthQuery(() =>
    useTopSellersQuery({
      pollInterval: 1000,
      requestPolicy: 'network-only'
    })
  );

  if (fetching) return <p>Loading...</p>;

  return (
    <ResponsiveContainer width="99%" height={550}>
      <BarChart
        className="mt-10"
        width={600}
        height={500}
        data={data?.topSellers}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={data => data.seller.name} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SellerChart;
