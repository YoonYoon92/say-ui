import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ClsManagement } from './clsManagement.model';

@Injectable()
export class ClsManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/clsManagement',null);
	}

	//단일 대상 조회
	public selectClsManagement(request: ClsManagement){
		return this.httpPost('/api/clsManagement/selectClsManagement',request);
	}

	//복수 대상 조회
	public selectClsManagementList(request: ClsManagement){
		return this.httpPost('/api/clsManagement/selectClsManagementList',request);
	}
	//코너리스트 조회
	public selectConerList(request: ClsManagement){
		return this.httpPost('/api/clsManagement/selectConerList',request);
	}	
	//키 조회
	public selectKeyList(request: ClsManagement){
		return this.httpPost('/api/clsManagement/selectKeyList',request);
	}
	//수정
	public updateClsManagement(request: ClsManagement){
		return this.httpPost('/api/clsManagement/updateClsManagement',request);
	}

	//등록
	public insertClsManagement(request: ClsManagement){
		return this.httpPost('/api/clsManagement/insertClsManagement',request);
	}

	//수정+등록
	public saveClsManagement(request: ClsManagement){
		return this.httpPost('/api/clsManagement/saveClsManagement',request);
	}

	//삭제
	public deleteClsManagement(request: ClsManagement){
		return this.httpPost('/api/clsManagement/deleteClsManagement',request);
	}

	//엑셀
	public excelClsManagement(request: ClsManagement){
		return this.httpPost('/api/clsManagement/deleteClsManagement',request);
	}

	//레포트
	public reportClsManagement(request: ClsManagement){
		return this.httpPost('/api/clsManagement/reportClsManagement',request);
	}

	//도움말
	public helpClsManagement(request: ClsManagement){
		return this.httpPost('/api/clsManagement/deleteClsManagement',request);
	}

}