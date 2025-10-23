import Sidebar from '@/app/(admin)/admin/components/Sidebar';
import { redirect } from 'next/navigation';

export default function AdminLayout({ children }) {
  const isAdmin = true; 
  if (!isAdmin) {
    redirect('/');
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto lg:ml-64"> 
        {children}
      </div>
    </div>
  );
}