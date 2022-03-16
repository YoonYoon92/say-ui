import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { WeekTimeSaleNews } from './weekTimeSaleNews.model';

@Injectable()
export class WeekTimeSaleNewsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/weekTimeSaleNews',null);
	}

	//단일 대상 조회
	public selectWeekTimeSaleNewsDate(request: WeekTimeSaleNews){
		return this.httpPost('/api/weekTimeSaleNews/selectWeekTimeSaleNewsDate',request);
	}

	//복수 대상 조회
	public selectWeekTimeSaleNewsList(request: WeekTimeSaleNews){
		return this.httpPost('/api/weekTimeSaleNews/selectWeekTimeSaleNewsList',request);
	}

	//복수 대상 조회
	public selectWeekTimeSaleNewsOrgList(request: WeekTimeSaleNews){
		return this.httpPost('/api/weekTimeSaleNews/selectWeekTimeSaleNewsOrgList',request);
	}

}