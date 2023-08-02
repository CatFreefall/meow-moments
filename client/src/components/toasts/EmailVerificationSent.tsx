const EmailVerificationSent = () => {
  return (
    <section className={`w-screen bg-green flex p-2 text-sm mt-14`} id="toast">
      <div className="text-4xl self-center mr-3">ⓘ</div>
      Email Verification sent! Please check your email and verify your account.
      <button
        className="ml-auto p-0 place-self-start text-lg hover:opacity-90 pl-5"
        onClick={() => document.getElementById("toast")?.remove()}
      >
        X
      </button>
    </section>
  );
};

export default EmailVerificationSent;
