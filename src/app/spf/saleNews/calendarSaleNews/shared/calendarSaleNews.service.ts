import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CalendarSaleNews } from './calendarSaleNews.model';

@Injectable()
export class CalendarSaleNewsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/calendarSaleNews',null);
	}

		//복수 대상 조회
	public selectCalendarSaleNewsList(request: CalendarSaleNews){
		return this.httpPost('/api/calendarSaleNews/selectCalendarSaleNewsList',request);
	}

}