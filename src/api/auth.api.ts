import router from '@/router';
import { useAuth } from '@/stores/auth.store';

const authUrl = 'https://auth.daniellowry.co.uk';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function login(
  username: string,
  password: string,
): Promise<Response> {
  console.log(`Username: ${username} and password: ${password}`);
  return fetch(`${authUrl}/user/login`, {
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
    const res = await fetch(`${authUrl}/user/refresh`, {
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
    return await fetch(`${authUrl}/user/logout`);
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
    console.log(authPayload);
    return fetch(`${authUrl}/auth`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: authPayload,
    });
  }
}
