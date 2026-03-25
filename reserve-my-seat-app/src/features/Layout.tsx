import Navbar from "./Navbar";
import { ToastContainer } from "./toast/ToastContainer";

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="p-4">{children}</div>
    </>
  );
}
