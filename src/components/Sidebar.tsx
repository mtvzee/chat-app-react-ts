import AddFriend from './AddFriend';
import FriendList from './FriendList';
import SidebarHeader from './SidebarHeader';

const Sidebar = () => {
  return (
    <div className="flex-[0_0_350px] bg-primary text-white">
      <div className="px-4">
        <SidebarHeader />

        <AddFriend />

        <FriendList />
      </div>
    </div>
  );
};

export default Sidebar;
