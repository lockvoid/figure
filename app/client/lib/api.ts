import { FetchError } from './errors/fetch_error';

export const DEFAULT_HEADERS: { [key: string]: string } = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

export class Api {
  protected _headers: { [key: string]: string };

  static createToken(email: string, password: string) {
    const body = Api.stringify({ email, password });

    return fetch('/api/tokens', { method: 'POST', headers: DEFAULT_HEADERS, body }).then(Api.checkStatus).then(Api.parseResponse);
  }

  static createUser(email: string, password: string, name: string) {
    const body = Api.stringify({ email, password, name });

    return fetch('/api/users', { method: 'POST', headers: DEFAULT_HEADERS, body }).then(Api.checkStatus).then(Api.parseResponse);
  }

  static isEmailUniqueness(email: string, id: number = 0) {
    return fetch(`/api/users/email/${email}/uniqueness?id=${id}`).then(Api.checkStatus).then(Api.parseResponse);
  }

  createForm(payload): Promise<any> {
    return fetch('/api/forms', { method: 'POST', headers: this._headers, body: Api.stringify(payload) }).then(Api.checkStatus).then(Api.parseResponse);
  }

  updateForm(id, payload): Promise<any> {
    return fetch(`/api/forms/${id}`, { method: 'PATCH', headers: this._headers, body: Api.stringify(payload) }).then(Api.checkStatus).then(Api.parseResponse);
  }

  deleteForm(id): Promise<any> {
    return fetch(`/api/forms/${id}`, { method: 'DELETE', headers: this._headers }).then(Api.checkStatus).then(Api.parseResponse);
  }

  deleteSubmission(id): Promise<any> {
    return fetch(`/api/submissions/${id}`, { method: 'DELETE', headers: this._headers }).then(Api.checkStatus).then(Api.parseResponse);
  }

  static async checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }

    try {
      var { reason } = await Api.parseResponse(res);
    } catch (error) {
      var reason = res.statusText;
    }

    throw new FetchError(res.status, reason);
  }

  static parseResponse(res) {
    return res.json();
  }

  static stringify(body) {
    return JSON.stringify(body);
  }

  constructor(protected _token: string) {
    this._headers = Object.assign({}, DEFAULT_HEADERS, { 'X-JWT-Token': this._token });
  }
}
