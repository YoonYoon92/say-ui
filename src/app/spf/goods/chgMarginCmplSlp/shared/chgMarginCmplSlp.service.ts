import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ChgMarginCmplSlp } from './chgMarginCmplSlp.model';

@Injectable()
export class ChgMarginCmplSlpService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/chgMarginCmplSlp',null);
	}

	//단일 대상 조회
	public selectChgMarginCmplSlp(request: ChgMarginCmplSlp){
		return this.httpPost('/api/chgMarginCmplSlp/selectChgMarginCmplSlp',request);
	}

	//복수 대상 조회
	public selectChgMarginCmplSlpList(request: ChgMarginCmplSlp){
		return this.httpPost('/api/chgMarginCmplSlp/selectChgMarginCmplSlpList',request);
	}

	//수정
	public updateChgMarginCmplSlp(request: ChgMarginCmplSlp){
		return this.httpPost('/api/chgMarginCmplSlp/updateChgMarginCmplSlp',request);
	}

	//등록
	public insertChgMarginCmplSlp(request: ChgMarginCmplSlp){
		return this.httpPost('/api/chgMarginCmplSlp/insertChgMarginCmplSlp',request);
	}

	//수정+등록
	public saveChgMarginCmplSlp(request: ChgMarginCmplSlp){
		return this.httpPost('/api/chgMarginCmplSlp/saveChgMarginCmplSlp',request);
	}

	//삭제
	public deleteChgMarginCmplSlp(request: ChgMarginCmplSlp){
		return this.httpPost('/api/chgMarginCmplSlp/deleteChgMarginCmplSlp',request);
	}

	//엑셀
	public excelChgMarginCmplSlp(request: ChgMarginCmplSlp){
		return this.httpUrl('/api/chgMarginCmplSlp/downloadExcel',request);
	}

	//레포트
	public reportChgMarginCmplSlp(request: ChgMarginCmplSlp){
		return this.httpPost('/api/chgMarginCmplSlp/reportChgMarginCmplSlp',request);
	}

	//도움말
	public helpChgMarginCmplSlp(request: ChgMarginCmplSlp){
		return this.httpPost('/api/chgMarginCmplSlp/deleteChgMarginCmplSlp',request);
	}

}