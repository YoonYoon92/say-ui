import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { MarginExchangeInq } from './marginExchangeInq.model';

@Injectable()
export class MarginExchangeInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/marginExchangeInq',null);
	}
	//코너조회
	public selectConerList(request: MarginExchangeInq){
		return this.httpPost('/api/marginExchangeInq/selectConerList',request);
	}
	//단일 대상 조회
	public selectMarginExchangeInq(request: MarginExchangeInq){
		return this.httpPost('/api/marginExchangeInq/selectMarginExchangeInq',request);
	}

	//복수 대상 조회
	public selectMarginExchangeInqList(request: MarginExchangeInq){
		return this.httpPost('/api/marginExchangeInq/selectMarginExchangeInqList',request);
	}

	//수정
	public updateMarginExchangeInq(request: MarginExchangeInq){
		return this.httpPost('/api/marginExchangeInq/updateMarginExchangeInq',request);
	}

	//등록
	public insertMarginExchangeInq(request: MarginExchangeInq){
		return this.httpPost('/api/marginExchangeInq/insertMarginExchangeInq',request);
	}

	//수정+등록
	public saveMarginExchangeInq(request: MarginExchangeInq){
		return this.httpPost('/api/marginExchangeInq/saveMarginExchangeInq',request);
	}

	//삭제
	public deleteMarginExchangeInq(request: MarginExchangeInq){
		return this.httpPost('/api/marginExchangeInq/deleteMarginExchangeInq',request);
	}

	//엑셀
	public excelMarginExchangeInq(request: MarginExchangeInq){
		return this.httpPost('/api/marginExchangeInq/deleteMarginExchangeInq',request);
	}

	//레포트
	public reportMarginExchangeInq(request: MarginExchangeInq){
		return this.httpPost('/api/marginExchangeInq/reportMarginExchangeInq',request);
	}

	//도움말
	public helpMarginExchangeInq(request: MarginExchangeInq){
		return this.httpPost('/api/marginExchangeInq/deleteMarginExchangeInq',request);
	}

}