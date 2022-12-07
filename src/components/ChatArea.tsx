import Avatar from './Avatar';
import FriendContent from './FriendContent';
import UserContent from './UserContent';

const ChatArea = () => {
  return (
    <div className="flex-auto overflow-y-scroll">
      <div className="w-[90%] mx-auto flex flex-col space-y-3 py-4 ">
        {/* TODO:ユーザーによってコンテンツの表示を分岐する */}
        <FriendContent />
        <UserContent />
      </div>
    </div>
  );
};

export default ChatArea;
