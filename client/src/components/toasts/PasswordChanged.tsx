const PasswordChanged = () => {
  return (
    <section className={`w-screen bg-orange flex p-3 text-2xl`} id="toast">
      <div className="text-6xl self-center ml-2 mr-6">ⓘ</div>
      Password changed successfully! You may now log in with your new password.
      <button
        className="ml-auto p-0 place-self-start text-3xl hover:opacity-90 pl-7 pr-2"
        onClick={() => document.getElementById("toast")?.remove()}
      >
        X
      </button>
    </section>
  );
};

export default PasswordChanged;
