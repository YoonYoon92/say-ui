import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { SalePriceChgReqFormInq } from './salePriceChgReqFormInq.model';

@Injectable()
export class SalePriceChgReqFormInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/salePriceChgReqFormInq',null);
	}


	//복수 대상 조회
	public selectSalePriceChgReqFormInqList(request: SalePriceChgReqFormInq){
		return this.httpPost('/api/salePriceChgReqFormInq/selectSalePriceChgReqFormInqList',request);
	}
		//복수 대상 조회
		public selectDetailList(request: SalePriceChgReqFormInq){
			return this.httpPost('/api/salePriceChgReqFormInq/selectDetailList',request);
		}
	
	
	//엑셀
	public excelSalePriceChgReqFormInq(request: SalePriceChgReqFormInq){
		return this.httpPost('/api/salePriceChgReqFormInq/deleteSalePriceChgReqFormInq',request);
	}

	//레포트
	public reportSalePriceChgReqFormInq(request: SalePriceChgReqFormInq){
		return this.httpPost('/api/salePriceChgReqFormInq/reportSalePriceChgReqFormInq',request);
	}

	//도움말
	public helpSalePriceChgReqFormInq(request: SalePriceChgReqFormInq){
		return this.httpPost('/api/salePriceChgReqFormInq/deleteSalePriceChgReqFormInq',request);
	}

}