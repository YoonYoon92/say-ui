import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { EventHistoryInq } from './eventHistoryInq.model';

@Injectable()
export class EventHistoryInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/eventHistoryInq',null);
	}



	//복수 대상 조회
	public selectEventHistoryInqList(request: EventHistoryInq){
		return this.httpPost('/api/eventHistoryInq/selectEventHistoryInqList',request);
	}

	



	//엑셀
	public excelEventHistoryInq(request: EventHistoryInq){
		return this.httpPost('/api/eventHistoryInq/deleteEventHistoryInq',request);
	}

	//레포트
	public reportEventHistoryInq(request: EventHistoryInq){
		return this.httpPost('/api/eventHistoryInq/reportEventHistoryInq',request);
	}

	//도움말
	public helpEventHistoryInq(request: EventHistoryInq){
		return this.httpPost('/api/eventHistoryInq/deleteEventHistoryInq',request);
	}

}