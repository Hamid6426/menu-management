const CustomerLayout = ({ children }) => {
  return (
    <div className="flex flex-row min-w-screen min-h-screen">
        <main className="min-h-screen flex bg-gray-100">{children}</main>
    </div>
  );
};

export default CustomerLayout;