import axios from 'axios';
axios.defaults.baseURL = 'https://cnodejs.org/api/v1';
// axios.defaults.headers.post['Content-Type'] =
// 'application/x-www-form-urlencoded';
export interface GetParam {
    [key: string]: any;
}
export interface BaseResponse {
    success: boolean;
}
class HttpService {

    public get < T extends BaseResponse > (api: string, param: GetParam): Promise<T> {
        let paramStr = Object
            .keys(param)
            .reduce((prev, next) => {
                const newStr = `${prev}${next}=${param[next]}&`;
                return newStr;
            },      '?');
        paramStr = paramStr.substring(0, paramStr.length - 1);
        return axios
            .get(api + paramStr).then(res => res.data as T);
    }
    // public post () { }
}

export const Http = new HttpService();