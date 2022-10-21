import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import BASE_URL from "../constants/baseURL"
import { httpRes } from "../types/httpRes"
import Token from "../utils/token"
const { getToken } = Token
class WRequest {
  private instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000
    })
  }
  request<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return new Promise<any>((resolve, reject) => {
      this.instance.interceptors.request.use(
        (config) => {
          const token = getToken();
          if (token) config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        (err) => {
          console.error(err);
          return err;
        }
      );
      this.instance.request(config)
        .then((res: AxiosResponse<httpRes<T>>) => {
          if (res.data && res.data.status) {
            if (res.data.status !== 200) {
              alert(res.data.msg);
              resolve({ ...res.data, data: null });
            } else {
              resolve(res.data);
            }
          } else {
            console.log("# request then", { res });
            throw new Error("bad request");
          }
        })
        .catch((err: AxiosError) => {
          console.error(err)
          resolve({
            data: null,
            status: 400,
            msg: "出错",
            success: false
          })
        })
        .finally(() => {
          console.log(`end of request`)
        })
    })
  }
  get<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return this.request({ ...config, method: 'POST' })
  }
  patch<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return this.request({ ...config, method: 'PATCH' })
  }
  delete<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return this.request({ ...config, method: 'DELETE' })
  }
}
const wRequest = new WRequest()
export default wRequest;
