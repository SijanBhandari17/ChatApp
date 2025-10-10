import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import MessageArea from '@/components/MessageArea';
import { useEffect } from 'react';
import { closeConnection, initConnection } from '@/sockets/socketConn';

const DashBoard = () => {
  useEffect(() => {
    initConnection();
    return () => {
      closeConnection();
    };
  }, []);

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
