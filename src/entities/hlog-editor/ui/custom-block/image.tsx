import useEditorStore from "../../../article-write/model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Image = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { block, className, theme = {}, ...otherProps } = props;

  // leveraging destructuring to omit certain properties from props
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blockProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customStyleMap,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customStyleFn,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decorator,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    forceSelection,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    offsetKey,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selection,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tree,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    contentState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blockStyleFn,
    ...elementProps
  } = otherProps;

  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();

  const { setDetailTarget, setOpen } = useEditorStore();

  const handleClickImage = () => {
    setOpen("isImageDetailOverlayOpen", true);
    setDetailTarget(src);
  };

  return (
    <>
      <img
        {...elementProps}
        src={src}
        role="presentation"
        className={
          className +
          "h-auto max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 mx-auto mb-4 cursor-pointer"
        }
        onClick={handleClickImage}
      />
    </>
  );
};

export default Image;
