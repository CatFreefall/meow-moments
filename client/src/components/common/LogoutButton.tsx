// this button logs the user out and refreshes the page. it does not 
// have the same functionality as components like LoginButton and RegisterButton
const LogoutButton = () => {
  const logout = async () => {
    try {
      await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={async () => {
        await logout();
        window.location.reload();
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
