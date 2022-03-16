import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { UserProgListManagement } from './userProgListManagement.model';
import { UserProgListManagementSave } from './userProgListManagement.saveModel';

@Injectable()
export class UserProgListManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/userProgListManagement',null);
	}

	//단수 대상 조회
	public selectUserProgListManagement(request: UserProgListManagementSave){
		return this.httpPost('/api/userProgListManagement/selectUserProgListManagement',request);
	}

	//수정
	public saveUserProgListManagement(request: UserProgListManagementSave){
		return this.httpPost('/api/userProgListManagement/saveUserProgListManagement',request);
	}

	//등록
	public insertUserProgListManagement(request: UserProgListManagementSave){
		return this.httpPost('/api/userProgListManagement/insertUserProgListManagement',request);
	}

	//PGM 목록 조회
	public selectPgmList(request: UserProgListManagement){
		return this.httpPost('/api/userProgListManagement/selectPgmList',request);
	}

	//MenuGroupId 목록 조회
	public selectMenuGroupIdList(request: UserProgListManagement){
		return this.httpPost('/api/userProgListManagement/selectMenuGroupIdList',request);
	}

	//MenuGroupId 목록 조회
	public selectMenuIdList(request: UserProgListManagement){
		return this.httpPost('/api/userProgListManagement/selectMenuIdList',request);
	}

	

	//삭제
	// public deleteUserProgListManagement(request: UserProgListManagement){
	// 	return this.httpPost('/api/userProgListManagement/deleteUserProgListManagementList',request);
	// }

	//세분류 조회
	// public selectStoreComboLv4List(request: UserProgListManagement){
	// 	return this.httpPost('/api/userProgListManagement/selectStoreComboLv4List',request);
	// }
	// public selectClsList(request: UserProgListManagement){
	// 	return this.httpPost('/api/userProgListManagement/selectClsList',request);
	// }
	// public selectCls2List(request: UserProgListManagement){
	// 	return this.httpPost('/api/userProgListManagement/selectCls2List',request);
	// }
	//엑셀
	// public excelUserProgListManagement(request: UserProgListManagement){
	// 	return this.httpPost('/api/userProgListManagement/deleteUserProgListManagement',request);
	// }

	//레포트
	// public reportUserProgListManagement(request: UserProgListManagement){
	// 	return this.httpPost('/api/userProgListManagement/reportUserProgListManagement',request);
	// }

	//도움말
	public helpUserProgListManagement(request: UserProgListManagement){
		return this.httpPost('/api/userProgListManagement/deleteUserProgListManagement',request);
	}

}