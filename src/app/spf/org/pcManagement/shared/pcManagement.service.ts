import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { PcManagement } from './pcManagement.model';
import { PcManagementSave } from './pcManagement.saveModel';

@Injectable()
export class PcManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/pcManagement',null);
	}

	//단수 대상 조회
	public selectPcManagement(request: PcManagementSave){
		return this.httpPost('/api/pcManagement/selectPcManagement',request);
	}

	//수정
	public savePcManagement(request: PcManagementSave){
		return this.httpPost('/api/pcManagement/savePcManagement',request);
	}

	//등록
	public insertPcManagement(request: PcManagementSave){
		return this.httpPost('/api/pcManagement/insertPcManagement',request);
	}

	//부 목록 조회
	public selectBuList(request: PcManagement){
		return this.httpPost('/api/pcManagement/selectBuList',request);
	}

	//팀 목록 조회
	public selectTimList(request: PcManagement){
		return this.httpPost('/api/pcManagement/selectTimList',request);
	}

	//PC 목록 조회
	public selectPcList(request: PcManagement){
		return this.httpPost('/api/pcManagement/selectPcList',request);
	}

	//삭제
	// public deletePcManagement(request: PcManagement){
	// 	return this.httpPost('/api/pcManagement/deletePcManagementList',request);
	// }

	//세분류 조회
	// public selectStoreComboLv4List(request: PcManagement){
	// 	return this.httpPost('/api/pcManagement/selectStoreComboLv4List',request);
	// }
	// public selectClsList(request: PcManagement){
	// 	return this.httpPost('/api/pcManagement/selectClsList',request);
	// }
	// public selectCls2List(request: PcManagement){
	// 	return this.httpPost('/api/pcManagement/selectCls2List',request);
	// }
	//엑셀
	// public excelPcManagement(request: PcManagement){
	// 	return this.httpPost('/api/pcManagement/deletePcManagement',request);
	// }

	//레포트
	// public reportPcManagement(request: PcManagement){
	// 	return this.httpPost('/api/pcManagement/reportPcManagement',request);
	// }

	//도움말
	public helpPcManagement(request: PcManagement){
		return this.httpPost('/api/pcManagement/deletePcManagement',request);
	}

}