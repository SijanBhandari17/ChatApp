import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import MessageArea from '@/components/MessageArea';
import { useEffect } from 'react';
import { closeConnection, getSocket, initConnection } from '@/sockets/socketConn';
import useAuth from '@/stores/authStore';

const DashBoard = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      initConnection();
    }
    setInterval(() => {
      const socket = getSocket();
      socket.emit('heartbeat');
    }, 30 * 1000);
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
