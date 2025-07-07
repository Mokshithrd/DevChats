import Conversation from "./Conversation";
import useGetConversation from "../Hooks/useGetConversation";
import { getRandomEmoji } from "../utils/emojis";

const MessageCon = ({ setSwitch, Switch, unreadCounts = {} }) => {
  const { Loading, conversation } = useGetConversation();

  return (
    <div className="py-2 px-1 flex flex-col overflow-auto">
      {conversation.map((user, idx) => (
        <Conversation
          key={user._id}
          Switch={Switch}
          setSwitch={setSwitch}
          fullname={user.fullname}
          profilePic={user.profilePic}
          emoji={getRandomEmoji()}
          lastidx={idx === conversation.length - 1}
          convertation={user}
          unreadCount={unreadCounts[user._id] || 0} // 👈 pass unread count
        />
      ))}

      {Loading && (
        <center>
          <span className="loading loading-spinner" />
        </center>
      )}
    </div>
  );
};

export default MessageCon;
