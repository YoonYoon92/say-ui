import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { partnerSaleInq } from './partnerSaleInq.model';

@Injectable()
export class partnerSaleInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/partnerSaleInq',null);
	}

	// 협력업체조회
	public selectPartnerList(request: partnerSaleInq){
		return this.httpPost('/api/partnerSaleInq/selectPartnerList',request);
	}
	// 품목코드조회
	public selectGlsList(request: partnerSaleInq){
		return this.httpPost('/api/partnerSaleInq/selectGlsList',request);
	}
	// 클래스조회
	public selectClsList(request: partnerSaleInq){
		return this.httpPost('/api/partnerSaleInq/selectClsList',request);
	}

	//복수 대상 조회
	public selectpartnerSaleInqList(request: partnerSaleInq){
		return this.httpPost('/api/partnerSaleInq/selectPartnerSaleInqList',request);
	}

	
	//엑셀
	public excelpartnerSaleInq(request: partnerSaleInq){
		return this.httpPost('/api/partnerSaleInq/deletepartnerSaleInq',request);
	}

	//레포트
	public reportpartnerSaleInq(request: partnerSaleInq){
		return this.httpPost('/api/partnerSaleInq/reportpartnerSaleInq',request);
	}

	//도움말
	public helppartnerSaleInq(request: partnerSaleInq){
		return this.httpPost('/api/partnerSaleInq/deletepartnerSaleInq',request);
	}

}