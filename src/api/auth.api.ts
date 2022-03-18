import { useAuth } from '@/stores/auth.store';

const authUrl = 'http://localhost:8080/user/login';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function fetchTokens(
  username: string,
  password: string,
): Promise<Response> {
  console.log(`Username: ${username}, Password: ${password}`);
  const res = await fetch(authUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return res;
}

function _getTokenHeader(): string {
  const store = useAuth();
  return store.accessToken ?? '';
}

export async function postAuthSuccess(authPayload: any) {
  const res = await fetch('http://localhost:8080/auth', {
    method: 'POST',
    // headers: {
    //   'Authorization': `Bearer ${_getTokenHeader()}`,
    // },
    body: JSON.stringify(authPayload),
  });

  return res;
}
