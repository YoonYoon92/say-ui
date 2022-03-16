import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { RtnReqFormInq } from './rtnReqFormInq.model';

@Injectable()
export class RtnReqFormInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/rtnReqFormInq',null);
	}

	//복수 대상 조회
	public selectRtnReqFormInqList(request: RtnReqFormInq){
		return this.httpPost('/api/rtnReqFormInq/selectRtnReqFormInqList',request);
	}

	//상세조회
	public selectDetailList(request: RtnReqFormInq){
		return this.httpPost('/api/rtnReqFormInq/selectDetailList',request);
	}

	
}