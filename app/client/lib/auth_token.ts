import * as decode from 'jwt-decode';

export class AuthToken {
  protected _decoded;

  constructor(protected _token: string) {
    this._decoded = decode(this._token);
  }

  get token(): string {
    return this._token;
  }

  get usedId(): number {
    return this._decoded.userId;
  }

  get expiresIn(): number {
    return this._decoded.exp * 1000 - Date.now();
  }

  toString(): string {
    return this.token;
  }
}
