import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { OnHandTimeSaleNews } from './onHandTimeSaleNews.model';

@Injectable()
export class OnHandTimeSaleNewsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/onHandTimeSaleNews',null);
	}

	//단일 대상 조회
	public selectOnHandTimeSaleNews(request: OnHandTimeSaleNews){
		return this.httpPost('/api/onHandTimeSaleNews/selectOnHandTimeSaleNews',request);
	}

	//복수 대상 조회
	public selectOnHandTimeSaleNewsList(request: OnHandTimeSaleNews){
		return this.httpPost('/api/onHandTimeSaleNews/selectOnHandTimeSaleNewsList',request);
	}

}