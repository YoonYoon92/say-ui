import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ZoneLinkManagement } from './zoneLinkManagement.model';

@Injectable()
export class ZoneLinkManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/zoneLinkManagement',null);
	}

	//단일 대상 조회
	public selectZoneLinkManagement(request: ZoneLinkManagement){
		return this.httpPost('/api/zoneLinkManagement/selectZoneLinkManagement',request);
	}

	//복수 대상 조회
	public selectZoneLinkManagementList(request: ZoneLinkManagement){
		return this.httpPost('/api/zoneLinkManagement/selectZoneLinkManagementList',request);
	}
	//존목록조회
	public selectzoneStoreList(request: ZoneLinkManagement){
		return this.httpPost('/api/zoneLinkManagement/selectzoneStoreList',request);
	}
	
	//수정
	public updateZoneLinkManagement(request: ZoneLinkManagement){
		return this.httpPost('/api/zoneLinkManagement/updateZoneLinkManagement',request);
	}

	//등록
	public insertZoneLinkManagement(request: ZoneLinkManagement){
		return this.httpPost('/api/zoneLinkManagement/insertZoneLinkManagement',request);
	}

	//수정+등록
	public saveZoneLinkManagement(request: ZoneLinkManagement){
		return this.httpPost('/api/zoneLinkManagement/saveZoneLinkManagement',request);
	}

	//삭제
	public deleteZoneLinkManagement(request: ZoneLinkManagement){
		return this.httpPost('/api/zoneLinkManagement/deleteZoneLinkManagement',request);
	}
	public selectConerchk(request: ZoneLinkManagement){
		return this.httpPost('/api/zoneLinkManagement/selectConerchk',request);
	}
	
	

}