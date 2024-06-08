const CodeBlock = (props: any) => {
  return (
    <pre className="p-4 text-white transition ease-in-out bg-black shadow-md rounded-xl">
      {props.children}
    </pre>
  );
};

export default CodeBlock;
