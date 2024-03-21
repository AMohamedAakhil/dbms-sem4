import { DataTable } from './data-table';
import { ProductColumns } from './columns';
import { api } from '@/trpc/server';

const ProductTable = async () => {
  const data = await api.product.getAll();
  return (
    <div className="">
      <DataTable columns={ProductColumns} data={data} />
    </div>
  );
};

export default ProductTable;
