type Props = {
  children: React.ReactNode;
};

const Blockquote = ({ children }: Props) => {
  return (
    <blockquote className="p-4 my-4 bg-blue-100 border-l-4 border-solid border-primary">
      <p className="leading-relaxed text-black">{children}</p>
    </blockquote>
  );
};

export default Blockquote;
