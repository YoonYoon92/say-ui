import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ConerHistoryInq } from './conerHistoryInq.model';

@Injectable()
export class ConerHistoryInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/conerHistoryInq',null);
	}

	//단일 대상 조회
	public selectConerHistoryInq(request: ConerHistoryInq){
		return this.httpPost('/api/conerHistoryInq/selectConerHistoryInq',request);
	}

	//복수 대상 조회
	public selectConerHistoryInqList(request: ConerHistoryInq){
		return this.httpPost('/api/conerHistoryInq/selectConerHistoryInqList',request);
	}

	//수정
	public updateConerHistoryInq(request: ConerHistoryInq){
		return this.httpPost('/api/conerHistoryInq/updateConerHistoryInq',request);
	}

	//등록
	public insertConerHistoryInq(request: ConerHistoryInq){
		return this.httpPost('/api/conerHistoryInq/insertConerHistoryInq',request);
	}

	//수정+등록
	public saveConerHistoryInq(request: ConerHistoryInq){
		return this.httpPost('/api/conerHistoryInq/saveConerHistoryInq',request);
	}

	//삭제
	public deleteConerHistoryInq(request: ConerHistoryInq){
		return this.httpPost('/api/conerHistoryInq/deleteConerHistoryInq',request);
	}

	//엑셀
	public excelConerHistoryInq(request: ConerHistoryInq){
		return this.httpPost('/api/conerHistoryInq/deleteConerHistoryInq',request);
	}

	//레포트
	public reportConerHistoryInq(request: ConerHistoryInq){
		return this.httpPost('/api/conerHistoryInq/reportConerHistoryInq',request);
	}

	//도움말
	public helpConerHistoryInq(request: ConerHistoryInq){
		return this.httpPost('/api/conerHistoryInq/deleteConerHistoryInq',request);
	}

}