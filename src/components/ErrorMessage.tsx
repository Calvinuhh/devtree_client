const ErrorMessage = ({ children }: { children: string | undefined }) => {
  return (
    <p className="bg-red-50 text-red-600 p-3 rounded-md uppercase text-sm font-bold text-center">
      {children}
    </p>
  );
};

export default ErrorMessage;
