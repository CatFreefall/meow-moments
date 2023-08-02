import RegisterButton from "../../../components/common/RegisterButton";

const RegistrationContainer = () => {
  return (
    <section>
      Not Registered?
      <span className="text-orange"> Meow's </span>the Time!
      <div className="flex justify-center mt-3 mb-16">
        <RegisterButton />
      </div>
    </section>
  );
};

export default RegistrationContainer;
