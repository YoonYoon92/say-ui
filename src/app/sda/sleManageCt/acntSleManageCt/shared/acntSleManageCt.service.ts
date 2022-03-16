import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { AcntSleManageCt } from './acntSleManageCt.model';

@Injectable()
export class AcntSleManageCtService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/acntSleManageCt',null);
	}

	//단일 대상 조회
	// public selectAcntSleManageCt(request: AcntSleManageCt){
	// 	return this.httpPost('/api/acntSleManageCt/selectAcntSleManageCt',request);
	// }

	//복수 대상 조회
	public selectAcntSleManageCtList(request: AcntSleManageCt){
		return this.httpPost('/api/acntSleManageCt/selectAcntSleManageCtList',request);
	}

	//수정
	// public updateAcntSleManageCt(request: AcntSleManageCt){
	// 	return this.httpPost('/api/acntSleManageCt/updateAcntSleManageCt',request);
	// }

	//등록
	// public insertAcntSleManageCt(request: AcntSleManageCt){
	// 	return this.httpPost('/api/acntSleManageCt/insertAcntSleManageCt',request);
	// }

	//수정+등록
	// public saveAcntSleManageCt(request: AcntSleManageCt){
	// 	return this.httpPost('/api/acntSleManageCt/saveAcntSleManageCt',request);
	// }

	//삭제
	// public deleteAcntSleManageCt(request: AcntSleManageCt){
	// 	return this.httpPost('/api/acntSleManageCt/deleteAcntSleManageCt',request);
	// }

	//엑셀
	public excelAcntSleManageCt(request: AcntSleManageCt){
		return this.httpUrl('/api/acntSleManageCt/downloadExcel',request);
	}

	//레포트
	// public reportAcntSleManageCt(request: AcntSleManageCt){
	// 	return this.httpPost('/api/acntSleManageCt/reportAcntSleManageCt',request);
	// }

	//도움말
	public helpAcntSleManageCt(request: AcntSleManageCt){
		return this.httpPost('/api/acntSleManageCt/deleteAcntSleManageCt',request);
	}

}