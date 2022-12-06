import Avatar from './Avatar';

const ChatArea = () => {
  return (
    <div className="flex-auto overflow-y-scroll">
      <div className="w-[90%] mx-auto flex flex-col space-y-3 py-4 ">
        {/* 相手のメッセージ */}
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

        {/* 自分のメッセージ */}
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
  );
};

export default ChatArea;
