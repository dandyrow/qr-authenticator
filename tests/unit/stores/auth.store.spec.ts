import { useAuth } from '../../../src/stores/auth.store';
import { setActivePinia, createPinia } from 'pinia';

const testToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZGFuaWVsIiwiaWF0Ijo5NTI5MDU2MDAsImV4cCI6OTUyOTkxOTk5fQ.2bl3wtdtJk34YdPM_nxx42zDtrN91l3jI8M_WS-tWlc';

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('checks accessToken is undefined by default & invalid', () => {
    const auth = useAuth();

    expect(auth.accessToken).toBeUndefined();
    expect(auth.userId).toBeUndefined();
    expect(auth.username).toBeUndefined();
    expect(auth.expiry).toBeUndefined();
    expect(auth.tokenValid()).toBeFalsy();
  });

  it('sets access token', () => {
    const auth = useAuth();
    const testDate = new Date('2000-03-13T23:59:59Z');

    auth.setAccessToken(testToken);

    expect(auth.accessToken).toEqual(testToken);
    expect(auth.userId).toEqual(1);
    expect(auth.username).toEqual('daniel');
    expect(auth.expiry).toEqual(testDate.getTime());
  });

  it('checks invalid token returns false', () => {
    const auth = useAuth();

    auth.expiry = Date.now() - 1800000;

    expect(auth.tokenValid()).toBeFalsy();
  });

  it('checks valid token returns true', () => {
    const auth = useAuth();

    auth.expiry = Date.now() + 1800000;

    expect(auth.tokenValid()).toBeTruthy();
  });

  it('clears access token', () => {
    const auth = useAuth();

    auth.setAccessToken(testToken);
    auth.clearAccessToken();

    expect(auth.accessToken).toBeUndefined();
    expect(auth.userId).toBeUndefined();
    expect(auth.username).toBeUndefined();
    expect(auth.expiry).toBeUndefined();
    expect(auth.tokenValid()).toBeFalsy();
  });
});
