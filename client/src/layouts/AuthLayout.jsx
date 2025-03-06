const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-row min-w-screen min-h-screen">
      <aside className='hidden md:flex text-white w-[40%] bg-red-600 flex-col justify-center items-center'>
        <div className='text-xl lg:text-2xl xl:text-3xl font-bold'>YOUR ONE STOP</div>
        <div className='text-xl lg:text-2xl xl:text-3xl font-bold mt-1'>TO RESTAURANT WEBSITE</div>
        <div className='text-xl lg:text-4xl xl:text-6xl font-black my-12 text-yellow'>QR MENU</div>
        <img src='/logo.svg' className='w-60'/>
      </aside>
      <main className="min-h-screen flex items-center justify-center bg-gray-100 md:w-[60%] w-[100%] flex-col">{children}</main>
    </div>
  );
};

export default AuthLayout;