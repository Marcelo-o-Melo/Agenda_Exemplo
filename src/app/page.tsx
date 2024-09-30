import Calendar from "./components/calendar";
import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className='flex items-center justify-center mx-auto'>
        <Calendar />
      </div>
    </div>
  );
}