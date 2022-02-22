const authUrl = 'http://localhost:8080/login';

interface Tokens {
  accessToken: string,
  refreshToken: string,
}

export async function fetchTokens(username: string, password: string): Promise<Tokens> {
  const res = await fetch('authUrl', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  return res.json();
}