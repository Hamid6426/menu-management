import ManagerNavbar from "../components/Navbars/ManagerNavbar";

const ManagerLayout = ({ children }) => {
  return (
    <div className="flex min-w-screen min-h-screen">
      <div className='h-full w-16 fixed'>
        <ManagerNavbar />
      </div>
      <main className="w-full min-h-screen flex bg-gray-100 pl-16">{children}</main>
    </div>
  );
};

export default ManagerLayout;