import { Injectable } from '@angular/core';

// 2017년 7월 10일에 발표된 Angular v.4.3.0 버전에 HttpClientModule이 추가되었습니다.
// Angular에는 원래 @angular/http 패키지로 제공하던 HttpModule이 있었지만, 
// HttpClientModule은 좀 더 편한 방식으로 HTTP 요청을 보낼 수 있습니다.
// HTTP 요청에 인터셉터를 적용할 수도 있다.
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class ApiHttpService {
   //개발시에 사용    
        private url = 'localhost';
        private port = '8000';
    // 서버적용할때 사용    
    // private url = '128.131.0.100';
    // private port = '8080';
   private API_SERVER_URL = 'http://' + this.url + ':' + this.port + '';
   constructor(private http: HttpClient) {}
   //private API_SERVER_URL = 'https://' + this.url + ':' + this.port + '';


    //JAR 배포시에 사용
    // private API_SERVER_URL = '';
    // constructor(private http: HttpClient) {
    //     // API 서버와 APP 서버가 동일하게 설정된 경우
    //     var baseUrl = document.getElementsByTagName('base')[0].href;  // EX) 'http://localhost:4200/'
    //     this.API_SERVER_URL = baseUrl.substr(0, baseUrl.length-1);    //  '/' 제거    
    // }

    public httpGetOutside(url){
        return this.http.get(url);
    }

    public httpUrl(api, request) {
        return `${this.API_SERVER_URL}${api}?param=${JSON.stringify(request)}`;
        //return `${this.API_SERVER_URL}${api}`;
    }

    public httpGet(api, request) {
        return this.http.get(`${this.API_SERVER_URL}${api}`, request);
    }

    public httpPost(api, request) {
        return this.http.post(`${this.API_SERVER_URL}${api}`, request);
    }

    public httpPut(api, request) {
        return this.http.put(`${this.API_SERVER_URL}${api}`, request);
    }

    public httpPatch(api, request) {
        return this.http.patch(`${this.API_SERVER_URL}${api}`, request);
    }

    public httpDelete(api, request) {
        return this.http.delete(`${this.API_SERVER_URL}${api}`, request);
    }

}