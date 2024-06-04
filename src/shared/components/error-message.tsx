import { ErrorMessage as ErrorMessageContainer } from "@hookform/error-message";
import { MdErrorOutline } from "react-icons/md";

const ErrorMessage = (
  props: React.ComponentProps<typeof ErrorMessageContainer>
) => {
  return (
    <ErrorMessageContainer
      {...props}
      render={({ message }) => (
        <p className="text-sm text-error flex items-center my-1">
          <MdErrorOutline className="mr-1" />
          {message}
        </p>
      )}
    />
  );
};

export default ErrorMessage;
