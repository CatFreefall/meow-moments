import AuthWrapper from "./AuthWrapper";

const LogoutButtonComponents = () => {

  const logout = async () => {
    await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <button
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  );
};

const LogoutButton = () => {
  return <div>{AuthWrapper(LogoutButtonComponents)}</div>;
};

export default LogoutButton;
