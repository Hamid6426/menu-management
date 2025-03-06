import Navbar from "../components/navbars/Navbar";

export default function Layout({children}) {
  return (
    <div>
      <Navbar/>
      <div>{children}</div>
    </div>
  )
}
