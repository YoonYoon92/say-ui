import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CornerMarginChgSalesInq } from './cornerMarginChgSalesInq.model';

@Injectable()
export class CornerMarginChgSalesInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/cornerMarginChgSalesInq',null);
	}


	//복수 대상 조회
	public selectCornerMarginChgSalesInqList(request: CornerMarginChgSalesInq){
		return this.httpPost('/api/spf/selng/selectCornerMarginChgSalesInqList',request);
	}

}