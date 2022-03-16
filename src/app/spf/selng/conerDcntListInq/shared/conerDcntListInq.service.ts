import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ConerDcntListInq } from './conerDcntListInq.model';

@Injectable()
export class ConerDcntListInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/conerDcntListInq',null);
	}



	//복수 대상 조회
	public selectConerDcntListInqList(request: ConerDcntListInq){
		return this.httpPost('/api/conerDcntListInq/selectConerDcntListInqList',request);
	}
	//클래스조회
	public selectConerList(request: ConerDcntListInq){
		return this.httpPost('/api/conerDcntListInq/selectConerList',request);
	}
	
	//엑셀
	public excelConerDcntListInq(request: ConerDcntListInq){
		return this.httpPost('/api/conerDcntListInq/deleteConerDcntListInq',request);
	}

	//레포트
	public reportConerDcntListInq(request: ConerDcntListInq){
		return this.httpPost('/api/conerDcntListInq/reportConerDcntListInq',request);
	}

	//도움말
	public helpConerDcntListInq(request: ConerDcntListInq){
		return this.httpPost('/api/conerDcntListInq/deleteConerDcntListInq',request);
	}

}