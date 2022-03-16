import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { NewBrandSaleInq } from './newBrandSaleInq.model';

@Injectable()
export class NewBrandSaleInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/newBrandSaleInq',null);
	}


	//복수 대상 조회
	public selectNewBrandSaleInqList(request: NewBrandSaleInq){
		return this.httpPost('/api/newBrandSaleInq/selectNewBrandSaleInqList',request);
	}


}