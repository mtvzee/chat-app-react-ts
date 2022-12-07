type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FriendDeleteModal = ({ setIsOpen }: Props) => {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white text-black rounded-md w-[400px] h-[280px] flex flex-col items-center justify-center space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg">友達を削除しますか？</h2>
        <p className="text-lg">takuya</p>
        <div className="space-x-4">
          <button
            className="w-40 border border-black rounded-md py-2 hover:scale-105 transition"
            onClick={() => setIsOpen(false)}
          >
            キャンセル
          </button>
          <button className="w-40 rounded-md py-2.5 bg-red-500 text-white hover:scale-105 transition">
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendDeleteModal;
