import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { WorkEnvMangement } from './workEnvMangement.model';

@Injectable()
export class WorkEnvMangementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/workEnvMangement',null);
	}

	//단일 대상 조회
	public selectWorkEnvMangement(request: WorkEnvMangement){
		return this.httpPost('/api/workEnvMangement/selectWorkEnvMangement',request);
	}

	//복수 대상 조회
	public selectWorkEnvMangementList(request: WorkEnvMangement){
		return this.httpPost('/api/workEnvMangement/selectWorkEnvMangementList',request);
	}

	//수정
	public updateWorkEnvMangement(request: WorkEnvMangement){
		return this.httpPost('/api/workEnvMangement/updateWorkEnvMangement',request);
	}

	//등록
	public insertWorkEnvMangement(request: WorkEnvMangement){
		return this.httpPost('/api/workEnvMangement/insertWorkEnvMangement',request);
	}

	//수정+등록
	public saveWorkEnvMangement(request: WorkEnvMangement){
		return this.httpPost('/api/workEnvMangement/saveWorkEnvMangement',request);
	}

	//삭제
	public deleteWorkEnvMangement(request: WorkEnvMangement){
		return this.httpPost('/api/workEnvMangement/deleteWorkEnvMangement',request);
	}

	//엑셀
	public excelWorkEnvMangement(request: WorkEnvMangement){
		return this.httpPost('/api/workEnvMangement/deleteWorkEnvMangement',request);
	}

	//레포트
	public reportWorkEnvMangement(request: WorkEnvMangement){
		return this.httpPost('/api/workEnvMangement/reportWorkEnvMangement',request);
	}

	//도움말
	public helpWorkEnvMangement(request: WorkEnvMangement){
		return this.httpPost('/api/workEnvMangement/deleteWorkEnvMangement',request);
	}

}