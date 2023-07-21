import LoginButton from "../../common/LoginButton";
import LogoutButton from "../../common/LogoutButton";
import RegisterButton from "../../common/RegisterButton";

const LoggedInButtons = () => {
  return (
    <div className="mt-auto flex">
        <LogoutButton />
      </div>
  )
}

const LoggedOutButtons = () => {
  return (
    <div className="mt-auto flex">
        <LoginButton />
        <div className="h-14 w-2 bg-white rounded-full mx-4"></div>
        <RegisterButton />
      </div>
  )
}

const AuthButtons = () => {
  return (
    <div className="mt-auto flex">
        <LoginButton />
        <div className="h-14 w-2 bg-white rounded-full mx-4"></div>
        <RegisterButton />
      </div>
  )
}

export default AuthButtons