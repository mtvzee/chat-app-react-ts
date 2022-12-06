import { AiOutlineSend } from 'react-icons/ai';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import Avatar from './Avatar';

const Chat = () => {
  return (
    <div className="flex-auto flex flex-col">
      <header className="flex-none bg-[#f3f3f3] flex  items-center space-x-2 h-20 border-b">
        <button className="hover:scale-110 transition">
          <MdOutlineArrowBackIosNew className="w-8 h-8" />
        </button>
        <h1 className="text-2xl">takuya</h1>
      </header>

      <div className="flex-auto overflow-y-scroll">
        <div className="w-[90%] mx-auto flex flex-col space-y-3 py-4 ">
          {/* チャット相手のテキスト欄 */}
          <div className="flex items-start space-x-1 w-2/3 group">
            <Avatar width={40} height={40} />
            <p className="bg-[#f3f3f3] p-2 rounded-lg rounded-tl-none text-lg">
              こんにちは、私の名前は田中太郎です。よろしくお願いします。
              こんにちは、私の名前は田中太郎です。よろしくお願いします。
              こんにちは、私の名前は田中太郎です。よろしくお願いします。
            </p>
            <div className="self-end text-sm">
              <button className="group-hover:block hidden">削除</button>
              <span>12:00</span>
            </div>
          </div>

          {/* 自分のテキスト欄 */}
          <div className="flex items-end self-end space-x-1 w-2/3 text-justify group">
            <div className="self-end text-sm">
              <button className="group-hover:block hidden ml-auto">削除</button>
              <span>12:00</span>
            </div>
            <p className="bg-[#93ed53] p-2 rounded-lg rounded-tr-none text-lg ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              corrupti! Totam esse illum officia. Voluptate quo, nesciunt,
              repellendus possimus, totam aliquam minus expedita doloremque
              tempore blanditiis ea culpa accusamus inventore!
            </p>
          </div>
        </div>
      </div>

      <form className="flex-none bg-[#f3f3f3] h-20 flex items-center justify-center space-x-4">
        <input
          className="w-2/3 py-4 px-8 rounded-full outline-none"
          type="text"
          placeholder="メッセージを入力..."
        />
        <button className="hover:scale-110 transition">
          <AiOutlineSend className="w-8 h-8" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
