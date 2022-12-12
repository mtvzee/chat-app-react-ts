import { BsChatDots } from 'react-icons/bs';

const DefaultChatArea = () => {
  return (
    <div className="flex-auto flex flex-col items-center justify-center space-y-8 text-gray-600">
      <BsChatDots className="w-36 h-36" />
      <p className="text-2xl">チャットをはじめよう</p>
    </div>
  );
};

export default DefaultChatArea;
