import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ClsInq } from './clsInq.model';

@Injectable()
export class ClsInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/clsInq',null);
	}

	//코너조회
	public selectConerList(request: ClsInq){
		return this.httpPost('/api/clsInq/selectConerList',request);
	}
	//클래스상세조회
	public selectDetailClsList(request: ClsInq){
		return this.httpPost('/api/clsInq/selectDetailClsList',request);
	}
	//클래스마진조회
	public selectDetailClsMargin(request: ClsInq){
		return this.httpPost('/api/clsInq/selectDetailClsMargin',request);
	}


	//복수 대상 조회
	public selectClsInqList(request: ClsInq){
		return this.httpPost('/api/clsInq/selectClsInqList',request);
	}

	
	//엑셀
	public excelClsInq(request: ClsInq){
		return this.httpPost('/api/clsInq/deleteClsInq',request);
	}

	//레포트
	public reportClsInq(request: ClsInq){
		return this.httpPost('/api/clsInq/reportClsInq',request);
	}

	//도움말
	public helpClsInq(request: ClsInq){
		return this.httpPost('/api/clsInq/deleteClsInq',request);
	}

}