import RegisterButton from "../../../components/common/RegisterButton";

const RegistrationContainer = () => {
  return (
    <div>
      Not Registered?
      <span className="text-orange"> Meow's </span>the Time!
      <div className="flex justify-center mt-3 mb-16">
        <RegisterButton />
      </div>
    </div>
  );
};

export default RegistrationContainer;
