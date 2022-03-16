import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { LargeShopSaleInq } from './largeShopSaleInq.model';

@Injectable()
export class LargeShopSaleInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/largeShopSaleInq',null);
	}

	
	//복수 대상 조회
	public selectLargeShopSaleInqList(request: LargeShopSaleInq){
		return this.httpPost('/api/largeShopSaleInq/selectLargeShopSaleInqList',request);
	}



	//엑셀
	public excelLargeShopSaleInq(request: LargeShopSaleInq){
		return this.httpPost('/api/largeShopSaleInq/deleteLargeShopSaleInq',request);
	}

	//레포트
	public reportLargeShopSaleInq(request: LargeShopSaleInq){
		return this.httpPost('/api/largeShopSaleInq/reportLargeShopSaleInq',request);
	}

	//도움말
	public helpLargeShopSaleInq(request: LargeShopSaleInq){
		return this.httpPost('/api/largeShopSaleInq/deleteLargeShopSaleInq',request);
	}

}