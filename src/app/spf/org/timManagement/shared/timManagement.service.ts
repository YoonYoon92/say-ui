import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { TimManagement } from './timManagement.model';
import { TimManagementSave } from './timManagement.saveModel';

@Injectable()
export class TimManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/timManagement',null);
	}

	//단수 대상 조회
	public selectTimManagement(request: TimManagementSave){
		return this.httpPost('/api/timManagement/selectTimManagement',request);
	}

	//수정
	public saveTimManagement(request: TimManagementSave){
		return this.httpPost('/api/timManagement/saveTimManagement',request);
	}

	//등록
	public insertTimManagement(request: TimManagementSave){
		return this.httpPost('/api/timManagement/insertTimManagement',request);
	}

	//부 목록 조회
	public selectBuList(request: TimManagement){
		return this.httpPost('/api/timManagement/selectBuList',request);
	}

	//부 목록 조회
	public selectTimList(request: TimManagement){
		return this.httpPost('/api/timManagement/selectTimList',request);
	}

	//삭제
	// public deleteTimManagement(request: TimManagement){
	// 	return this.httpPost('/api/timManagement/deleteTimManagementList',request);
	// }

	//세분류 조회
	// public selectStoreComboLv4List(request: TimManagement){
	// 	return this.httpPost('/api/timManagement/selectStoreComboLv4List',request);
	// }
	// public selectClsList(request: TimManagement){
	// 	return this.httpPost('/api/timManagement/selectClsList',request);
	// }
	// public selectCls2List(request: TimManagement){
	// 	return this.httpPost('/api/timManagement/selectCls2List',request);
	// }
	//엑셀
	// public excelTimManagement(request: TimManagement){
	// 	return this.httpPost('/api/timManagement/deleteTimManagement',request);
	// }

	//레포트
	// public reportTimManagement(request: TimManagement){
	// 	return this.httpPost('/api/timManagement/reportTimManagement',request);
	// }

	//도움말
	public helpTimManagement(request: TimManagement){
		return this.httpPost('/api/timManagement/deleteTimManagement',request);
	}

}