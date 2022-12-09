type Props = {
  width?: number;
  height?: number;
  src: string;
};

const Avatar = ({ width = 50, height = 50, src }: Props) => {
  return (
    <img
      className="rounded-full"
      style={{ width, height }}
      src={src}
      alt="avatar"
    />
  );
};

export default Avatar;
