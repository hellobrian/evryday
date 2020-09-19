import { useAuth } from '@app/utils/useAuth';
import { Layout } from '@app/components/layout';

export default function Home() {
  const { login, logout, user, loggedIn } = useAuth();

  return (
    <Layout>
      <h1>Evryday</h1>
      <div>
        {loggedIn ? (
          <>
            <div>You are logged in!</div>
            {user && <>Welcome {user.user_metadata.full_name}!</>}
            <button type="button" onClick={logout}>
              Log out here.
            </button>
          </>
        ) : (
          <button type="button" onClick={login}>
            Log in here.
          </button>
        )}
      </div>
    </Layout>
  );
}
