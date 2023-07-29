import LoginButton from "../components/common/LoginButton";
import RegisterButton from "../components/common/RegisterButton";

function NoPage() {
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="mx-5 text-center text-4xl font-header tracking-widest leading-tight">
        <span className="text-orange">Un-furr-tunately,</span> this page is
        empty! Head back with these!
      </div>
      <div className="flex flex-wrap space-y-4 space-x-2 self-center">
        <div />
        <LoginButton />
        <RegisterButton />
        <div />
      </div>
    </div>
  );
}

export default NoPage;
