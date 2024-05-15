const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img {...props} className="h-auto max-w-full my-4 rounded-lg shadow-md" />
  );
};

export default Image;
