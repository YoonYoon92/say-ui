import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { SearchReceipt } from './searchReceipt.model';

@Injectable()
export class SearchReceiptService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/searchReceipt',null);
	}

	//단일 대상 조회
	public selectSearchReceipt(request: SearchReceipt){
		return this.httpPost('/api/searchReceipt/selectSearchReceipt',request);
	}

	//복수 대상 조회
	public selectSearchReceiptList(request: SearchReceipt){
		return this.httpPost('/api/receiptInfoInq/selectReceiptInfoInqList2',request);
	}

	//수정
	public updateSearchReceipt(request: SearchReceipt){
		return this.httpPost('/api/searchReceipt/updateSearchReceipt',request);
	}

	//등록
	public insertSearchReceipt(request: SearchReceipt){
		return this.httpPost('/api/searchReceipt/insertSearchReceipt',request);
	}

	//수정+등록
	public saveSearchReceipt(request: SearchReceipt){
		return this.httpPost('/api/searchReceipt/saveSearchReceipt',request);
	}

	//삭제
	public deleteSearchReceipt(request: SearchReceipt){
		return this.httpPost('/api/searchReceipt/deleteSearchReceipt',request);
	}

	//엑셀
	public excelSearchReceipt(request: SearchReceipt){
		return this.httpPost('/api/searchReceipt/deleteSearchReceipt',request);
	}

	//레포트
	public reportSearchReceipt(request: SearchReceipt){
		return this.httpPost('/api/searchReceipt/reportSearchReceipt',request);
	}

	//도움말
	public helpSearchReceipt(request: SearchReceipt){
		return this.httpPost('/api/searchReceipt/deleteSearchReceipt',request);
	}

}