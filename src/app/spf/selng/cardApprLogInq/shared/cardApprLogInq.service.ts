import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CardApprLogInq } from './cardApprLogInq.model';

@Injectable()
export class CardApprLogInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/cardApprLogInq',null);
	}


	//복수 대상 조회
	public selectCardApprLogInqList(request: CardApprLogInq){
		return this.httpPost('/api/spf/selng/selectCardApprLogInqList',request);
	}

}