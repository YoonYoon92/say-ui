import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ReceiptInfoInq } from './receiptInfoInq.model';

@Injectable()
export class ReceiptInfoInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/receiptInfoInq',null);
	}

	//단일 대상 조회
	public selectReceiptInfoInq(request: ReceiptInfoInq){
		return this.httpPost('/api/receiptInfoInq/selectReceiptInfoInq',request);
	}

	//복수 대상 조회
	public selectReceiptInfoInqList(request: ReceiptInfoInq){
		return this.httpPost('/api/receiptInfoInq/selectReceiptInfoInqList',request);
	}
	public selectReceiptInfoInqList3(request: ReceiptInfoInq){
		return this.httpPost('/api/receiptInfoInq/selectReceiptInfoInqList3',request);
	}


	//수정
	public updateReceiptInfoInq(request: ReceiptInfoInq){
		return this.httpPost('/api/receiptInfoInq/updateReceiptInfoInq',request);
	}

	//등록
	public insertReceiptInfoInq(request: ReceiptInfoInq){
		return this.httpPost('/api/receiptInfoInq/insertReceiptInfoInq',request);
	}

	//수정+등록
	public saveReceiptInfoInq(request: ReceiptInfoInq){
		return this.httpPost('/api/receiptInfoInq/saveReceiptInfoInq',request);
	}

	//삭제
	public deleteReceiptInfoInq(request: ReceiptInfoInq){
		return this.httpPost('/api/receiptInfoInq/deleteReceiptInfoInq',request);
	}

	//엑셀
	public excelReceiptInfoInq(request: ReceiptInfoInq){
		return this.httpPost('/api/receiptInfoInq/deleteReceiptInfoInq',request);
	}

	//레포트
	public reportReceiptInfoInq(request: ReceiptInfoInq){
		return this.httpPost('/api/receiptInfoInq/reportReceiptInfoInq',request);
	}

	//도움말
	public helpReceiptInfoInq(request: ReceiptInfoInq){
		return this.httpPost('/api/receiptInfoInq/deleteReceiptInfoInq',request);
	}

}