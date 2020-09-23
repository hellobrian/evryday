export function Header({ login, logout, user, loggedIn }) {
  return (
    <>
      <header className="root">
        <h1>Evryday</h1>
        {loggedIn ? (
          <span className="logged-in">
            {user && (
              <span>Welcome {user.user_metadata.full_name}!</span>
            )}
            <button type="button" onClick={logout}>
              Log out here.
            </button>
          </span>
        ) : (
          <span className="logged-out">
            <button type="button" onClick={login}>
              Log in here.
            </button>
          </span>
        )}
      </header>
      <style jsx>
        {`
          header {
            display: grid;
            grid-template-columns: 1fr auto;
            padding: 0 1rem;
            background: green;
            align-items: center;
          }

          .logged-in {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 8px;
            align-items: center;
          }
        `}
      </style>
    </>
  );
}
