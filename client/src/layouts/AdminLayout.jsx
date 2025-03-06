import AdminNavbar from "../components/Navbars/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-w-screen min-h-screen">
      <div className='h-full fixed'>
        <AdminNavbar />
      </div>
      <main className="ml-20 w-full flex justify-center bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;