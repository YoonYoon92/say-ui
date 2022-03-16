import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { PwdChg } from './pwdChg.model';

@Injectable()
export class PwdChgService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/pwdChg',null);
	}

	//단일 대상 조회
	public selectPwdChg(request: PwdChg){
		return this.httpPost('/api/pwdChg/selectPwdChg',request);
	}

	//복수 대상 조회
	public selectPwdChgList(request: PwdChg){
		return this.httpPost('/api/pwdChg/selectPwdChgList',request);
	}

	//수정
	public updatePwdChg(request: PwdChg){
		return this.httpPost('/api/pwdChg/updatePwdChg',request);
	}

	//등록
	public insertPwdChg(request: PwdChg){
		return this.httpPost('/api/pwdChg/insertPwdChg',request);
	}

	//수정+등록
	public savePwdChg(request: PwdChg){
		return this.httpPost('/api/pwdChg/savePwdChg',request);
	}

	//삭제
	public deletePwdChg(request: PwdChg){
		return this.httpPost('/api/pwdChg/deletePwdChg',request);
	}

	//엑셀
	public excelPwdChg(request: PwdChg){
		return this.httpPost('/api/pwdChg/deletePwdChg',request);
	}

	//레포트
	public reportPwdChg(request: PwdChg){
		return this.httpPost('/api/pwdChg/reportPwdChg',request);
	}

	//도움말
	public helpPwdChg(request: PwdChg){
		return this.httpPost('/api/pwdChg/deletePwdChg',request);
	}

}