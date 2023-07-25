const PasswordChangeEmailSent = () => {
  return (
    <div className={`w-screen bg-green flex p-2 text-xs mt-15`} id="toast">
      <div className="text-4xl self-center mr-3">ⓘ</div>
      If a user with that username/email address exists, an password reset email will be sent to them!
      <button
        className="ml-auto p-0 place-self-start text-lg hover:opacity-90 pl-5"
        onClick={() => document.getElementById("toast")?.remove()}
      >
        X
      </button>
    </div>
  );
};

export default PasswordChangeEmailSent;