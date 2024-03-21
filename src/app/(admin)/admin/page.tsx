import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Admin = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div>Admin</div>
  )
}

export default Admin