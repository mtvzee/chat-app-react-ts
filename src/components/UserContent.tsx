import { useState } from 'react';
import DeleteContentModal from './DeleteContentModal';

const UserContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-end self-end space-x-1 w-2/3 text-justify group">
      <div className="self-end text-sm">
        <button
          className="group-hover:block hidden ml-auto"
          onClick={() => setIsOpen(true)}
        >
          削除
        </button>
        <span>12:00</span>
      </div>
      <p className="bg-[#93ed53] p-2 rounded-lg rounded-tr-none text-lg ">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque,
        corrupti! Totam esse illum officia. Voluptate quo, nesciunt, repellendus
        possimus, totam aliquam minus expedita doloremque tempore blanditiis ea
        culpa accusamus inventore!
      </p>
      {isOpen && <DeleteContentModal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default UserContent;
