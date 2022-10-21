import TOKEN_KEY from "../constants/token"

class Token {
  getToken(): string | null {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    else return token;
  }
  setToken(token: string | null): void {
    if (!isString(token)) return
    window.localStorage.setItem(TOKEN_KEY, token)
  }
  removeToken(): void {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}
function isString(a: any): a is String {
  return typeof a === 'string'
}
export default new Token();