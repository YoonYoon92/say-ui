import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { SalesByTypeInq } from './salesByTypeInq.model';

@Injectable()
export class SalesByTypeInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/salesByTypeInq',null);
	}


	//복수 대상 조회
	public selectSalesByTypeInqList(request: SalesByTypeInq){
		return this.httpPost('/api/spf/selng/selectSalesByTypeInqList',request);
	}

	//복수 대상 조회
	public selectSalesByTypeInqDetail(request: SalesByTypeInq){
		return this.httpPost('/api/spf/selng/selectSalesByTypeInqDetail',request);
	}


}