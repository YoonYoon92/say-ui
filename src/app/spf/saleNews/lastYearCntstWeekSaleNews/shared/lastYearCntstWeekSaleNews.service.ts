import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { LastYearCntstWeekSaleNews } from './lastYearCntstWeekSaleNews.model';

@Injectable()
export class LastYearCntstWeekSaleNewsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/lastYearCntstWeekSaleNews',null);
	}

	//단일 대상 조회
	public selectLastYearCntstWeekSaleNews(request: LastYearCntstWeekSaleNews){
		return this.httpPost('/api/lastYearCntstWeekSaleNews/selectLastYearCntstWeekSaleNews',request);
	}

	//복수 대상 조회
	public selectLastYearCntstWeekSaleNewsList(request: LastYearCntstWeekSaleNews){
		return this.httpPost('/api/lastYearCntstWeekSaleNews/selectLastYearCntstWeekSaleNewsList',request);
	}


}