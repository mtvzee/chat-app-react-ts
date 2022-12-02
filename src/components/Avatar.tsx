type Props = {
  width?: number;
  height?: number;
};

const Avatar = ({ width = 50, height = 50 }: Props) => {
  return (
    <img
      className="rounded-full"
      style={{ width, height }}
      src="https://source.unsplash.com/random"
      alt="avatar"
    />
  );
};

export default Avatar;
