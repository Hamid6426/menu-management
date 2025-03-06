import CuisineNavbar from "../components/Navbars/CuisineNavbar";

const CuisineLayout = ({ children }) => {
  return (
    <div className="flex flex-row min-w-screen min-h-screen">
      <CookSidebar/>
        <main className="min-h-screen flex bg-gray-100">{children}</main>
    </div>
  );
};

export default CuisineLayout;