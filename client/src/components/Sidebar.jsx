import Search from "./Search";
import MessageCon from "./MessageCon";
import LogOut from "./LogOut";
import NotificationIcon from "./NotificationIcon";
import useUnreadCounts from "../Hooks/useUnreadCounts";
import { useAuthContext } from "../context/AuthContext"; 

const Sidebar = ({ Switch, SetSwitch }) => {
  const unreadCounts = useUnreadCounts();
  const { authUser } = useAuthContext();

  return (
    <div
      className={`max-sm:min-h-[90vh] max-sm:min-w-[358px] flex flex-col border-slate-500 border-r p-4 ${
        Switch ? "max-sm:hidden" : ""
      }`}
    >
      
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-xl font-bold text-sky-400">DevChats</h1>
        <NotificationIcon />
      </div>

     
      {authUser?.fullname && (
        <p className="text-gray-300 text-sm mb-3 ml-1">Hi, {authUser.fullname}</p>
      )}

      <Search />
      <div className="divider p-3" />

      <MessageCon Switch={Switch} setSwitch={SetSwitch} unreadCounts={unreadCounts} />
      <LogOut />
    </div>
  );
};

export default Sidebar;
