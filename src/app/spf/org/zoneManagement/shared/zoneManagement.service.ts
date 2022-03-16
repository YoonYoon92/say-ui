import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ZoneManagement } from './zoneManagement.model';
import { ZoneManagementSave } from './zoneManagement.saveModel';

@Injectable()
export class ZoneManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/zoneManagement',null);
	}

	//단수 대상 조회
	public selectZoneManagement(request: ZoneManagementSave){
		return this.httpPost('/api/zoneManagement/selectZoneManagement',request);
	}

	//수정
	public saveZoneManagement(request: ZoneManagementSave){
		return this.httpPost('/api/zoneManagement/saveZoneManagement',request);
	}

	//등록
	public insertZoneManagement(request: ZoneManagementSave){
		return this.httpPost('/api/zoneManagement/insertZoneManagement',request);
	}

	//부 목록 조회
	public selectBuList(request: ZoneManagement){
		return this.httpPost('/api/zoneManagement/selectBuList',request);
	}

	//존 목록 조회
	public selectZoneList(request: ZoneManagement){
		return this.httpPost('/api/zoneManagement/selectZoneList',request);
	}

	//삭제
	// public deleteZoneManagement(request: ZoneManagement){
	// 	return this.httpPost('/api/zoneManagement/deleteZoneManagementList',request);
	// }

	
	//엑셀
	// public excelZoneManagement(request: ZoneManagement){
	// 	return this.httpPost('/api/zoneManagement/deleteZoneManagement',request);
	// }

	//레포트
	// public reportZoneManagement(request: ZoneManagement){
	// 	return this.httpPost('/api/zoneManagement/reportZoneManagement',request);
	// }

	//도움말
	public helpZoneManagement(request: ZoneManagement){
		return this.httpPost('/api/zoneManagement/deleteZoneManagement',request);
	}

}