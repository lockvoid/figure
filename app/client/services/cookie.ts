export function createCookie(name: string, value: any, expiresAt: number) {
  let expires: string;

  if (expiresAt) {
    expires = `; expires=${new Date(expiresAt).toUTCString()}`;
  } else {
    expires = ''
  }

  document.cookie = `${name}=${value}${expires}; path=/`;
}

export function clearCookie(name: string) {
  createCookie(name, '', -1);
}
