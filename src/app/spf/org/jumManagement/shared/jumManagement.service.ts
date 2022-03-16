import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { JumManagement } from './jumManagement.model';
import { JumManagementSave } from './jumManagement.saveModel';

@Injectable()
export class JumManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/jumManagement',null);
	}

	//단수 대상 조회
	public selectJumManagement(request: JumManagementSave){
		return this.httpPost('/api/jumManagement/selectJumManagement',request);
	}

	//수정
	public saveJumManagement(request: JumManagementSave){
		return this.httpPost('/api/jumManagement/saveJumManagement',request);
	}

	//등록
	public insertJumManagement(request: JumManagementSave){
		return this.httpPost('/api/jumManagement/insertJumManagement',request);
	}

	//점 목록 조회
	public selectJumList(request: JumManagement){
		return this.httpPost('/api/jumManagement/selectJumList',request);
	}

	//삭제
	// public deleteJumManagement(request: JumManagement){
	// 	return this.httpPost('/api/jumManagement/deleteJumManagementList',request);
	// }

	//세분류 조회
	// public selectStoreComboLv4List(request: JumManagement){
	// 	return this.httpPost('/api/jumManagement/selectStoreComboLv4List',request);
	// }
	// public selectClsList(request: JumManagement){
	// 	return this.httpPost('/api/jumManagement/selectClsList',request);
	// }
	// public selectCls2List(request: JumManagement){
	// 	return this.httpPost('/api/jumManagement/selectCls2List',request);
	// }
	//엑셀
	// public excelJumManagement(request: JumManagement){
	// 	return this.httpPost('/api/jumManagement/deleteJumManagement',request);
	// }

	//레포트
	// public reportJumManagement(request: JumManagement){
	// 	return this.httpPost('/api/jumManagement/reportJumManagement',request);
	// }

	//도움말
	public helpJumManagement(request: JumManagement){
		return this.httpPost('/api/jumManagement/deleteJumManagement',request);
	}

}