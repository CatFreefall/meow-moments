const EmailVerificationSent = () => {
  return (
    <div className={`w-screen bg-green flex p-3 text-2xl fixed`} id="toast">
      <div className="text-6xl self-center ml-2 mr-6">ⓘ</div>
      Email Verification sent! Please check your email and verify your account.
      <button
        className="ml-auto p-0 place-self-start text-3xl hover:opacity-90 pl-7 pr-2"
        onClick={() => document.getElementById("toast")?.remove()}
      >
        X
      </button>
    </div>
  );
};

export default EmailVerificationSent;
