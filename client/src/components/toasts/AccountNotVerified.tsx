const AccountNotVerified = () => {
  return (
    <div className={` bg-orange flex p-2 text-sm w-screen`} id="toast">
      <div className="text-4xl self-center mr-3">ⓘ</div>
      Account Unverified! Please visit your settings to verify your account.
      <button
        className="ml-auto p-0 place-self-start text-lg hover:opacity-90 pl-5"
        onClick={() => document.getElementById("toast")?.remove()}
      >
        X
      </button>
    </div>
  );
};

export default AccountNotVerified;
