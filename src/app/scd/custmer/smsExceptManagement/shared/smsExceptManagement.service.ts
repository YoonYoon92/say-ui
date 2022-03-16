import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { SmsExceptManagement } from './smsExceptManagement.model';

@Injectable()
export class SmsExceptManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/smsExceptManagement',null);
	}

	//단일 대상 조회
	public selectSmsExceptManagement(request: SmsExceptManagement){
		return this.httpPost('/api/smsExceptManagement/selectSmsExceptManagement',request);
	}

	//복수 대상 조회
	public selectSmsExceptManagementList(request: SmsExceptManagement){
		return this.httpPost('/api/smsExceptManagement/selectSmsExceptManagementList',request);
	}

	//수정
	public updateSmsExceptManagement(request: SmsExceptManagement){
		return this.httpPost('/api/smsExceptManagement/updateSmsExceptManagement',request);
	}

	//등록
	public insertSmsExceptManagement(request: SmsExceptManagement){
		return this.httpPost('/api/smsExceptManagement/insertSmsExceptManagement',request);
	}

	//수정+등록
	public saveSmsExceptManagement(request: SmsExceptManagement){
		return this.httpPost('/api/smsExceptManagement/saveSmsExceptManagement',request);
	}

	//삭제
	public deleteSmsExceptManagement(request: SmsExceptManagement){
		return this.httpPost('/api/smsExceptManagement/deleteSmsExceptManagement',request);
	}

	//엑셀
	public excelSmsExceptManagement(request: SmsExceptManagement){
		return this.httpPost('/api/smsExceptManagement/deleteSmsExceptManagement',request);
	}

	//레포트
	public reportSmsExceptManagement(request: SmsExceptManagement){
		return this.httpPost('/api/smsExceptManagement/reportSmsExceptManagement',request);
	}

	//도움말
	public helpSmsExceptManagement(request: SmsExceptManagement){
		return this.httpPost('/api/smsExceptManagement/deleteSmsExceptManagement',request);
	}

}