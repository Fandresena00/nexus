import Navbar from "@/src/components/layout/navbar";
import Sidebar from "@/src/components/layout/sidebar/sidebar";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  );
}
