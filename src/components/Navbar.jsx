export default function Navbar({ setActiveSection }) {
  const isAuth = localStorage.getItem("loggedIn");

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 text-white px-8 py-4 flex justify-between">
      <h1 className="font-bold text-xl">SmartPark</h1>

      <div className="flex gap-6 items-center">
        <button onClick={() => setActiveSection(null)}>Home</button>

        <button
          onClick={() =>
            isAuth ? setActiveSection("dashboard") : alert("Please login first")
          }
        >
          Dashboard
        </button>

        {!isAuth ? (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        ) : (
          <button
            className="bg-red-500 px-4 py-2 rounded"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
