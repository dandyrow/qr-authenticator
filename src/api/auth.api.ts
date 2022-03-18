import router from '@/router';
import { useAuth } from '@/stores/auth.store';

const authUrl = 'http://localhost:8080/user/login';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function login(
  username: string,
  password: string,
): Promise<Response> {
  return fetch(authUrl, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
}

export async function refreshAccessToken(redirectPath?: string): Promise<void> {
  try {
    console.log('Refreshing access token');

    const auth = useAuth();
    const res = await fetch('http://localhost:8080/user/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res || !res.ok) {
      throw Error('Token Refresh Response: error or unauthorised');
    }

    const { accessToken } = await res.json();
    auth.setAccessToken(accessToken);
  } catch (err) {
    console.error(
      `Error refreshing access token: ${err}. Redirecting to login...`,
    );
    //TODO: create toast informing the user they have been logged out
    router.replace(`/login?redirect=${redirectPath}`);
  }
}

export async function clearRefreshToken(): Promise<Response | undefined> {
  try {
    return await fetch('http://localhost:8080/user/logout');
  } catch (err) {
    console.error('Error connecting to server. Unable to logout');
  }
}

export async function postAuthSuccess(
  authPayload: any,
): Promise<Response | undefined> {
  const auth = useAuth();

  if (!auth.tokenValid()) {
    await refreshAccessToken();
  }

  if (auth.accessToken) {
    return fetch('http://localhost:8080/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authPayload),
    });
  }
}
