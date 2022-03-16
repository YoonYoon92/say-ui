import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { TimeWeek } from './timeWeek.model';

@Injectable()
export class TimeWeekService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/timeWeek',null);
	}

	//단일 대상 조회
	public selectTimeWeek(request: TimeWeek){
		return this.httpPost('/api/weekTimeSaleNews/selectWeekTimeSaleNewsDate',request);
	}

	//복수 대상 조회
	public selectTimeWeekList(request: TimeWeek){
		return this.httpPost('/api/weekTimeSaleNews/selectWeekTimeSaleNewsList',request);
	}

	//수정
	public updateTimeWeek(request: TimeWeek){
		return this.httpPost('/api/timeWeek/updateTimeWeek',request);
	}

	//등록
	public insertTimeWeek(request: TimeWeek){
		return this.httpPost('/api/timeWeek/insertTimeWeek',request);
	}

	//수정+등록
	public saveTimeWeek(request: TimeWeek){
		return this.httpPost('/api/timeWeek/saveTimeWeek',request);
	}

	//삭제
	public deleteTimeWeek(request: TimeWeek){
		return this.httpPost('/api/timeWeek/deleteTimeWeek',request);
	}

	//엑셀
	public excelTimeWeek(request: TimeWeek){
		return this.httpPost('/api/timeWeek/deleteTimeWeek',request);
	}

	//레포트
	public reportTimeWeek(request: TimeWeek){
		return this.httpPost('/api/timeWeek/reportTimeWeek',request);
	}

	//도움말
	public helpTimeWeek(request: TimeWeek){
		return this.httpPost('/api/timeWeek/deleteTimeWeek',request);
	}

}