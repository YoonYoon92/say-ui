import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CreditCardApprInq } from './creditCardApprInq.model';

@Injectable()
export class CreditCardApprInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/creditCardApprInq',null);
	}

	//단일 대상 조회
	public selectCreditCardApprInq(request: CreditCardApprInq){
		return this.httpPost('/api/creditCardApprInq/selectCreditCardApprInq',request);
	}

	//복수 대상 조회
	public selectCreditCardApprInqList(request: CreditCardApprInq){
		return this.httpPost('/api/creditCardApprInq/selectCreditCardApprInqList',request);
	}

	//수정
	public updateCreditCardApprInq(request: CreditCardApprInq){
		return this.httpPost('/api/creditCardApprInq/updateCreditCardApprInq',request);
	}

	//등록
	public insertCreditCardApprInq(request: CreditCardApprInq){
		return this.httpPost('/api/creditCardApprInq/insertCreditCardApprInq',request);
	}

	//수정+등록
	public saveCreditCardApprInq(request: CreditCardApprInq){
		return this.httpPost('/api/creditCardApprInq/saveCreditCardApprInq',request);
	}

	//삭제
	public deleteCreditCardApprInq(request: CreditCardApprInq){
		return this.httpPost('/api/creditCardApprInq/deleteCreditCardApprInq',request);
	}

	//엑셀
	public excelCreditCardApprInq(request: CreditCardApprInq){
		return this.httpUrl('/api/creditCardApprInq/downloadExcel',request);
	}

	//레포트
	public reportCreditCardApprInq(request: CreditCardApprInq){
		return this.httpUrl('/api/creditCardApprInq/reportCreditCardApprInq',request);
	}

	//도움말
	public helpCreditCardApprInq(request: CreditCardApprInq){
		return this.httpPost('/api/creditCardApprInq/deleteCreditCardApprInq',request);
	}

}