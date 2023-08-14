type ErrorMessageProps = {
  errorMessage: string;
};

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center h-2 text-xs text-rose-400">
      {errorMessage}
    </div>
  );
};

export default ErrorMessage;
