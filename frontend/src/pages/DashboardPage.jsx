import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import MessageArea from '@/components/MessageArea';

const DashBoard = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1">
        <SideBar />
        <MessageArea />
      </main>
    </div>
  );
};

export default DashBoard;
