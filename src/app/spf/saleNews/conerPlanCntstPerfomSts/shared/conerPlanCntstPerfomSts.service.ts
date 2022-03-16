import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ConerPlanCntstPerfomSts } from './conerPlanCntstPerfomSts.model';

@Injectable()
export class ConerPlanCntstPerfomStsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/conerPlanCntstPerfomSts',null);
	}

	//단일 대상 조회
	public selectConerPlanCntstPerfomSts(request: ConerPlanCntstPerfomSts){
		return this.httpPost('/api/conerPlanCntstPerfomSts/selectConerPlanCntstPerfomSts',request);
	}

	//복수 대상 조회
	public selectConerPlanCntstPerfomStsList(request: ConerPlanCntstPerfomSts){
		return this.httpPost('/api/conerPlanCntstPerfomSts/selectConerPlanCntstPerfomStsList',request);
	}
	//PC리스트 조회
	public selectPcListStoreList(request: ConerPlanCntstPerfomSts){
		return this.httpPost('/api/conerPlanCntstPerfomSts/PcList',request);
	}
	
	//수정
	public updateConerPlanCntstPerfomSts(request: ConerPlanCntstPerfomSts){
		return this.httpPost('/api/conerPlanCntstPerfomSts/updateConerPlanCntstPerfomSts',request);
	}

	//등록
	public insertConerPlanCntstPerfomSts(request: ConerPlanCntstPerfomSts){
		return this.httpPost('/api/conerPlanCntstPerfomSts/insertConerPlanCntstPerfomSts',request);
	}

	//수정+등록
	public saveConerPlanCntstPerfomSts(request: ConerPlanCntstPerfomSts){
		return this.httpPost('/api/conerPlanCntstPerfomSts/saveConerPlanCntstPerfomSts',request);
	}

	//삭제
	public deleteConerPlanCntstPerfomSts(request: ConerPlanCntstPerfomSts){
		return this.httpPost('/api/conerPlanCntstPerfomSts/deleteConerPlanCntstPerfomSts',request);
	}

	//엑셀
	public excelConerPlanCntstPerfomSts(request: ConerPlanCntstPerfomSts){
		return this.httpUrl('/api/conerPlanCntstPerfomSts/excel',request);
	}

	//레포트
	public reportConerPlanCntstPerfomSts(request: ConerPlanCntstPerfomSts){
		return this.httpUrl('/api/conerPlanCntstPerfomSts/selectReport',request);
	}

	//도움말
	public helpConerPlanCntstPerfomSts(){
		//return 'https://www.google.com';
		return this.httpUrl('/doc.html',null);
	}

}