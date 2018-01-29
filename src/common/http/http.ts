import axios from 'axios';
axios.defaults.baseURL = 'https://cnodejs.org/api/v1';
// axios.defaults.headers.post['Content-Type'] =
// 'application/x-www-form-urlencoded';
export interface GetParam {
    // tslint:disable-next-line:no-any
    [key: string]: any;
}
export interface BaseResponse {
    success: boolean;
}
class HttpService {

    public get < T extends BaseResponse > (api: string, param?: GetParam): Promise<T> {
        let paramStr = '';
        if (param) {
            paramStr = Object
            .keys(param)
            .reduce((prev, next) => {
                return `${prev}${next}=${param[next]}&`;
            },      '?');
            paramStr = paramStr.substring(0, paramStr.length - 1);
        }
        
        return axios
            .get(api + paramStr).then(res => res.data as T);
    }
    // public post () { }
}

export const Http = new HttpService();