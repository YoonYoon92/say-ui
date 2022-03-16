import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ConerLinkManagement } from './conerLinkManagement.model';

@Injectable()
export class ConerLinkManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/conerLinkManagement',null);
	}

	//단일 대상 조회
	public selectConerLinkManagement(request: ConerLinkManagement){
		return this.httpPost('/api/conerLinkManagement/selectConerLinkManagement',request);
	}

	//복수 대상 조회
	public selectConerLinkManagementList(request: ConerLinkManagement){
		return this.httpPost('/api/conerLinkManagement/selectConerLinkManagementList',request);
	}

	//수정
	public updateConerLinkManagement(request: ConerLinkManagement){
		return this.httpPost('/api/conerLinkManagement/updateConerLinkManagement',request);
	}

	//등록
	public insertConerLinkManagement(request: ConerLinkManagement){
		return this.httpPost('/api/conerLinkManagement/insertConerLinkManagement',request);
	}

	//수정+등록
	public saveConerLinkManagement(request: ConerLinkManagement){
		return this.httpPost('/api/conerLinkManagement/saveConerLinkManagement',request);
	}

	//삭제
	public deleteConerLinkManagement(request: ConerLinkManagement){
		return this.httpPost('/api/conerLinkManagement/deleteConerLinkManagement',request);
	}

	//엑셀
	public excelConerLinkManagement(request: ConerLinkManagement){
		return this.httpPost('/api/conerLinkManagement/deleteConerLinkManagement',request);
	}

	//레포트
	public reportConerLinkManagement(request: ConerLinkManagement){
		return this.httpPost('/api/conerLinkManagement/reportConerLinkManagement',request);
	}

	//도움말
	public helpConerLinkManagement(request: ConerLinkManagement){
		return this.httpPost('/api/conerLinkManagement/deleteConerLinkManagement',request);
	}

}