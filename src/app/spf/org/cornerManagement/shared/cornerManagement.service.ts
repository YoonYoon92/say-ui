import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CornerManagement } from './cornerManagement.model';
import { CornerManagementSave } from './cornerManagement.saveModel';

@Injectable()
export class CornerManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/cornerManagement',null);
	}

	//단수 대상 조회
	public selectCornerManagement(request: CornerManagementSave){
		return this.httpPost('/api/cornerManagement/selectCornerManagement',request);
	}

	//수정
	public saveCornerManagement(request: CornerManagementSave){
		return this.httpPost('/api/cornerManagement/saveCornerManagement',request);
	}

	//등록
	public insertCornerManagement(request: CornerManagementSave){
		return this.httpPost('/api/cornerManagement/insertCornerManagement',request);
	}

	//부 목록 조회
	public selectCornerList(request: CornerManagement){
		return this.httpPost('/api/cornerManagement/selectCornerList',request);
	}

	//삭제
	// public deleteCornerManagement(request: CornerManagement){
	// 	return this.httpPost('/api/cornerManagement/deleteCornerManagementList',request);
	// }

	//세분류 조회
	// public selectStoreComboLv4List(request: CornerManagement){
	// 	return this.httpPost('/api/cornerManagement/selectStoreComboLv4List',request);
	// }
	// public selectClsList(request: CornerManagement){
	// 	return this.httpPost('/api/cornerManagement/selectClsList',request);
	// }
	// public selectCls2List(request: CornerManagement){
	// 	return this.httpPost('/api/cornerManagement/selectCls2List',request);
	// }
	//엑셀
	// public excelCornerManagement(request: CornerManagement){
	// 	return this.httpPost('/api/cornerManagement/deleteCornerManagement',request);
	// }

	//레포트
	// public reportCornerManagement(request: CornerManagement){
	// 	return this.httpPost('/api/cornerManagement/reportCornerManagement',request);
	// }

	//도움말
	public helpCornerManagement(request: CornerManagement){
		return this.httpPost('/api/cornerManagement/deleteCornerManagement',request);
	}

}