import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { BuyReqFormInq } from './buyReqFormInq.model';

@Injectable()
export class BuyReqFormInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/buyReqFormInq',null);
	}


	//복수 대상 조회
	public selectBuyReqFormInqList(request: BuyReqFormInq){
		return this.httpPost('/api/buyReqFormInq/selectBuyReqFormInqList',request);
	}

	//복수 대상 조회
	public selectDetailList(request: BuyReqFormInq){
		return this.httpPost('/api/buyReqFormInq/selectDetailList',request);
	}

}