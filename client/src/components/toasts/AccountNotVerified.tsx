const AccountNotVerified = () => {
  return (
    <div className="w-full bg-orange flex p-3 text-2xl" id="toast">
      Account Unverified! Please visit your settings to verify your account.
      <button
        className="ml-auto p-0 place-self-start text-3xl hover:opacity-90 pl-7 pr-2"
        onClick={() => document.getElementById("toast")?.remove()}
      >
        X
      </button>
    </div>
  );
};

export default AccountNotVerified;
