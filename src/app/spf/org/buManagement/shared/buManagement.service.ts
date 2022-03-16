import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { BuManagement } from './buManagement.model';
import { BuManagementSave } from './buManagement.saveModel';

@Injectable()
export class BuManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/buManagement',null);
	}

	//단수 대상 조회
	public selectBuManagement(request: BuManagementSave){
		return this.httpPost('/api/buManagement/selectBuManagement',request);
	}

	//수정
	public saveBuManagement(request: BuManagementSave){
		return this.httpPost('/api/buManagement/saveBuManagement',request);
	}

	//등록
	public insertBuManagement(request: BuManagementSave){
		return this.httpPost('/api/buManagement/insertBuManagement',request);
	}

	//부 목록 조회
	public selectBuList(request: BuManagement){
		return this.httpPost('/api/buManagement/selectBuList',request);
	}

	//삭제
	// public deleteBuManagement(request: BuManagement){
	// 	return this.httpPost('/api/buManagement/deleteBuManagementList',request);
	// }

	//세분류 조회
	// public selectStoreComboLv4List(request: BuManagement){
	// 	return this.httpPost('/api/buManagement/selectStoreComboLv4List',request);
	// }
	// public selectClsList(request: BuManagement){
	// 	return this.httpPost('/api/buManagement/selectClsList',request);
	// }
	// public selectCls2List(request: BuManagement){
	// 	return this.httpPost('/api/buManagement/selectCls2List',request);
	// }
	//엑셀
	// public excelBuManagement(request: BuManagement){
	// 	return this.httpPost('/api/buManagement/deleteBuManagement',request);
	// }

	//레포트
	// public reportBuManagement(request: BuManagement){
	// 	return this.httpPost('/api/buManagement/reportBuManagement',request);
	// }

	//도움말
	public helpBuManagement(request: BuManagement){
		return this.httpPost('/api/buManagement/deleteBuManagement',request);
	}

}