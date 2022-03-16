import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { DmEventHisInq } from './dmEventHisInq.model';

@Injectable()
export class DmEventHisInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/dmEventHisInq',null);
	}


	//복수 대상 조회
	public selectDmEventHisInqList(request: DmEventHisInq){
		return this.httpPost('/api/scd/custmer/selectDmEventHisInqList',request);
	}

	//복수 대상 조회
	public selectDmEventHisInqDetail(request: DmEventHisInq){
		return this.httpPost('/api/scd/custmer/selectDmEventHisInqDetailList',request);
	}

	//복수 대상 조회
	public selectDmEventHisInqT04CrtPson(request: DmEventHisInq){
		return this.httpPost('/api/scd/custmer/selectDmEventHisInqT04List',request);
	}


}