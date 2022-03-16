import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { GeneralCreditSalesInq } from './generalCreditSalesInq.model';

@Injectable()
export class GeneralCreditSalesInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/generalCreditSalesInq',null);
	}


	//복수 대상 조회
	public selectGeneralCreditSalesInqList(request: GeneralCreditSalesInq){
		return this.httpPost('/api/spf/selng/selectGeneralCreditSalesInqList',request);
	}
	//엑셀
	public excel(request: GeneralCreditSalesInq){
		return this.httpUrl('/api/spf/selng/generalCreditSalesInqExcel',request);
	}

}