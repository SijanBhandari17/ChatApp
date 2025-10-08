import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import MessageArea from '@/components/MessageArea';

const DashBoard = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header className="flex-shrink-0" />
      <main className="flex flex-1 overflow-hidden">
        <SideBar />
        <MessageArea />
      </main>
    </div>
  );
};

export default DashBoard;
