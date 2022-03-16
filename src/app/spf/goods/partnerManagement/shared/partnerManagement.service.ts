import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { PartnerManagement } from './partnerManagement.model';

@Injectable()
export class PartnerManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/partnerManagement',null);
	}

	//단일 대상 조회
	public selectPartnerManagement(request: PartnerManagement){
		return this.httpPost('/api/partnerManagement/selectPartnerManagement',request);
	}

	//복수 대상 조회
	public selectPartnerManagementList(request: PartnerManagement){
		return this.httpPost('/api/partnerManagement/selectPartnerManagementList',request);
	}

	//수정
	public updatePartnerManagement(request: PartnerManagement){
		return this.httpPost('/api/partnerManagement/updatePartnerManagement',request);
	}

	//등록
	public insertPartnerManagement(request: PartnerManagement){
		return this.httpPost('/api/partnerManagement/insertPartnerManagement',request);
	}

	//수정+등록
	public savePartnerManagement(request: PartnerManagement){
		return this.httpPost('/api/partnerManagement/savePartnerManagement',request);
	}

	//삭제
	public deletePartnerManagement(request: PartnerManagement){
		return this.httpPost('/api/partnerManagement/deletePartnerManagement',request);
	}

	//엑셀
	public excelPartnerManagement(request: PartnerManagement){
		return this.httpPost('/api/partnerManagement/deletePartnerManagement',request);
	}

	//레포트
	public reportPartnerManagement(request: PartnerManagement){
		return this.httpPost('/api/partnerManagement/reportPartnerManagement',request);
	}

	//도움말
	public helpPartnerManagement(request: PartnerManagement){
		return this.httpPost('/api/partnerManagement/deletePartnerManagement',request);
	}

}