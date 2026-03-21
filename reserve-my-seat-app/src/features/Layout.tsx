import Navbar from "./Navbar";

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <div className="p-4">{children}</div>
    </>
  );
}
