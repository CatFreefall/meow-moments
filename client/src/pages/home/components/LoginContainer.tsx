import LoginButton from "../../../components/common/LoginButton";

const LoginContainer = () => {
  return (
    <section className="text-center">
      Already have an Account? Stop{" "}
      <span className="text-orange">Pro-cat-sinating</span> and Login!
      <div className="flex justify-center mt-3 mb-16">
        <LoginButton />
      </div>
    </section>
  );
};

export default LoginContainer;
