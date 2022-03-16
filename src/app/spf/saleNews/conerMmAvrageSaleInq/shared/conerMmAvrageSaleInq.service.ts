import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ConerMmAvrageSaleInq } from './conerMmAvrageSaleInq.model';

@Injectable()
export class ConerMmAvrageSaleInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/conerMmAvrageSaleInq',null);
	}

	//단일 대상 조회
	public selectConerMmAvrageSaleInq(request: ConerMmAvrageSaleInq){
		return this.httpPost('/api/conerMmAvrageSaleInq/selectConerMmAvrageSaleInq',request);
	}

	//복수 대상 조회
	public selectConerMmAvrageSaleInqList(request: ConerMmAvrageSaleInq){
		return this.httpPost('/api/conerMmAvrageSaleInq/selectConerMmAvrageSaleInqList',request);
	}

	//수정
	public updateConerMmAvrageSaleInq(request: ConerMmAvrageSaleInq){
		return this.httpPost('/api/conerMmAvrageSaleInq/updateConerMmAvrageSaleInq',request);
	}

	//등록
	public insertConerMmAvrageSaleInq(request: ConerMmAvrageSaleInq){
		return this.httpPost('/api/conerMmAvrageSaleInq/insertConerMmAvrageSaleInq',request);
	}

	//수정+등록
	public saveConerMmAvrageSaleInq(request: ConerMmAvrageSaleInq){
		return this.httpPost('/api/conerMmAvrageSaleInq/saveConerMmAvrageSaleInq',request);
	}

	//삭제
	public deleteConerMmAvrageSaleInq(request: ConerMmAvrageSaleInq){
		return this.httpPost('/api/conerMmAvrageSaleInq/deleteConerMmAvrageSaleInq',request);
	}

	//엑셀
	public excelConerMmAvrageSaleInq(request: ConerMmAvrageSaleInq){
		return this.httpPost('/api/conerMmAvrageSaleInq/deleteConerMmAvrageSaleInq',request);
	}

	//레포트
	public reportConerMmAvrageSaleInq(request: ConerMmAvrageSaleInq){
		return this.httpPost('/api/conerMmAvrageSaleInq/reportConerMmAvrageSaleInq',request);
	}

	//도움말
	public helpConerMmAvrageSaleInq(request: ConerMmAvrageSaleInq){
		return this.httpPost('/api/conerMmAvrageSaleInq/deleteConerMmAvrageSaleInq',request);
	}

}