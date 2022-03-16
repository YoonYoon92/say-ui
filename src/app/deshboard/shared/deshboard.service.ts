import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../shared/api-http.service';
import { Deshboard } from './deshboard.model';

@Injectable()
export class DeshboardService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/dashboard',null);
	}

	//당일 달월 당년 온라인
	public achiv(request: Deshboard){
		return this.httpPost('/api/dashboard/achiv',request);
	}

	//시간대별 매출(당일 전주 전년)
	public timeZone(request: Deshboard){
		return this.httpPost('/api/dashboard/timeZone',request);
	}

	//행사매출 조회
	public eventSale(request: Deshboard){
		return this.httpPost('/api/dashboard/eventSale',request);
	}

	//공지사항 조회
	public notice(request: Deshboard){
		return this.httpPost('/api/dashboard/notice',request);
	}

	//컴플레인 조회
	public complain(request: Deshboard){
		return this.httpPost('/api/dashboard/complain',request);
	}

	//공지 읽음 처리
	public noticeRead(request: Deshboard){
		return this.httpPost('/api/dashboard/noticeRead',request);
	}

	//고객의소리 읽음 처리
	public compainRead(request: Deshboard){
		return this.httpPost('/api/dashboard/compainRead',request);
	}
}
