import LoginButton from "../../../../components/common/LoginButton";

const ToLogin = () => {
  return (
    <div className="text-xs flex justify-center items-center">
      Have an account?
      <div className="pl-2">
        <LoginButton />
      </div>
    </div>
  );
};

export default ToLogin;
