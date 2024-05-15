const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <figure className="max-w-lg">
      <img {...props} className="h-auto max-w-full rounded-lg" />
    </figure>
  );
};

export default Image;
