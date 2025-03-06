
export default function ManagerDashboard() {
  return (
    <div className="w-full pt-6 px-6">
      <div className="w-full bg-red-600 text-white font-black text-2xl py-4 pl-6 rounded-xl">
        Welcome Mian Hamid Ur Rehman
      </div>
      {/* RESTAURANT DETAILS */}
      <div className="w-full flex flex-row">
        <div className="w-5/12 flex justify-center items-center pt-12 pl-12">
          <img 
            src="/logo.svg" 
            alt="restaurant logo" 
            className="w-full h-full"
          />
        </div>
        <div className="w-7/12 flex flex-col pt-12 pl-12">
          <div className="w-ful bg-red-600 text-white font-black text-2xl py-4 px-6 rounded-xl">RESTAURANT NAME</div>
          <div className="mt-3 py-3 px-6 bg-white border-2 border-red-600 rounded-xl shadow-2xl drop-shadow-2xl">
            <div className="text-red-600 font-black text-xl">
              ADDRESS
            </div>
            <div className="text-lg">
              Street 1 Near Example building District Peshawar KPK Pakistan
            </div> 
          </div>
          <div className="mt-3 py-3 px-6 bg-white border-2 border-red-600 rounded-xl shadow-2xl drop-shadow-2xl">
            <div className="text-red-600 font-black text-xl">
              ADDRESS
            </div>
            <div className="text-lg">
              Street 1 Near Example building District Peshawar KPK Pakistan
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}
