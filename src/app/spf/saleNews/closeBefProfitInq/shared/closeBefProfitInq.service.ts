import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CloseBefProfitInq } from './closeBefProfitInq.model';

@Injectable()
export class CloseBefProfitInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/closeBefProfitInq',null);
	}

	//단일 대상 조회
	public selectCloseBefProfitInq(request: CloseBefProfitInq){
		return this.httpPost('/api/closeBefProfitInq/selectCloseBefProfitInq',request);
	}

	//복수 대상 조회
	public selectCloseBefProfitInqList(request: CloseBefProfitInq){
		return this.httpPost('/api/closeBefProfitInq/selectCloseBefProfitInqList',request);
	}

	//수정
	public updateCloseBefProfitInq(request: CloseBefProfitInq){
		return this.httpPost('/api/closeBefProfitInq/updateCloseBefProfitInq',request);
	}

	//등록
	public insertCloseBefProfitInq(request: CloseBefProfitInq){
		return this.httpPost('/api/closeBefProfitInq/insertCloseBefProfitInq',request);
	}

	//수정+등록
	public saveCloseBefProfitInq(request: CloseBefProfitInq){
		return this.httpPost('/api/closeBefProfitInq/saveCloseBefProfitInq',request);
	}

	//삭제
	public deleteCloseBefProfitInq(request: CloseBefProfitInq){
		return this.httpPost('/api/closeBefProfitInq/deleteCloseBefProfitInq',request);
	}

	//엑셀
	public excelCloseBefProfitInq(request: CloseBefProfitInq){
		return this.httpPost('/api/closeBefProfitInq/deleteCloseBefProfitInq',request);
	}

	//레포트
	public reportCloseBefProfitInq(request: CloseBefProfitInq){
		return this.httpPost('/api/closeBefProfitInq/reportCloseBefProfitInq',request);
	}

	//도움말
	public helpCloseBefProfitInq(request: CloseBefProfitInq){
		return this.httpPost('/api/closeBefProfitInq/deleteCloseBefProfitInq',request);
	}

}