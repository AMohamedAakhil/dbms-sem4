import React from 'react'
import ProductTable from './product-view-table/task-view-table'
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';

const Products = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
        <ProductTable />
    </div>
  )
}

export default Products