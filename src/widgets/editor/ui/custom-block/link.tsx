// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} className="text-lg border-b-primary" target="_blank">
      {props.children}
    </a>
  );
};

export default Link;
