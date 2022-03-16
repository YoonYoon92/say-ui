import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { LedgrSbManageCt } from './ledgrSbManageCt.model';

@Injectable()
export class LedgrSbManageCtService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/ledgrSbManageCt',null);
	}

	//단일 대상 조회
	// public selectLedgrSbManageCt(request: LedgrSbManageCt){
	// 	return this.httpPost('/api/ledgrSbManageCt/selectLedgrSbManageCt',request);
	// }

	//복수 대상 조회
	public selectLedgrSbManageCtList(request: LedgrSbManageCt){
		return this.httpPost('/api/ledgrSbManageCt/selectLedgrSbManageCtList',request);
	}

	//수정
	// public updateLedgrSbManageCt(request: LedgrSbManageCt){
	// 	return this.httpPost('/api/ledgrSbManageCt/updateLedgrSbManageCt',request);
	// }

	//등록
	// public insertLedgrSbManageCt(request: LedgrSbManageCt){
	// 	return this.httpPost('/api/ledgrSbManageCt/insertLedgrSbManageCt',request);
	// }

	//수정+등록
	// public saveLedgrSbManageCt(request: LedgrSbManageCt){
	// 	return this.httpPost('/api/ledgrSbManageCt/saveLedgrSbManageCt',request);
	// }

	//삭제
	// public deleteLedgrSbManageCt(request: LedgrSbManageCt){
	// 	return this.httpPost('/api/ledgrSbManageCt/deleteLedgrSbManageCt',request);
	// }

	//엑셀
	public excelLedgrSbManageCt(request: LedgrSbManageCt){
		return this.httpUrl('/api/ledgrSbManageCt/downloadExcel',request);
	}

	//레포트
	// public reportLedgrSbManageCt(request: LedgrSbManageCt){
	// 	return this.httpPost('/api/ledgrSbManageCt/reportLedgrSbManageCt',request);
	// }

	//도움말
	public helpLedgrSbManageCt(request: LedgrSbManageCt){
		return this.httpPost('/api/ledgrSbManageCt/deleteLedgrSbManageCt',request);
	}

}