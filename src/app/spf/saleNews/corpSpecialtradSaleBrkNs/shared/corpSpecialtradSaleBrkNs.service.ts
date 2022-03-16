import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CorpSpecialtradSaleBrkNs } from './corpSpecialtradSaleBrkNs.model';

@Injectable()
export class CorpSpecialtradSaleBrkNsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/corpSpecialtradSaleBrkNs',null);
	}

	//단일 대상 조회
	public selectCorpSpecialtradSaleBrkNs(request: CorpSpecialtradSaleBrkNs){
		return this.httpPost('/api/corpSpecialtradSaleBrkNs/selectCorpSpecialtradSaleBrkNs',request);
	}

	//복수 대상 조회
	public selectCorpSpecialtradSaleBrkNsList(request: CorpSpecialtradSaleBrkNs){
		return this.httpPost('/api/corpSpecialtradSaleBrkNs/selectCorpSpecialtradSaleBrkNsList',request);
	}

	//수정
	public updateCorpSpecialtradSaleBrkNs(request: CorpSpecialtradSaleBrkNs){
		return this.httpPost('/api/corpSpecialtradSaleBrkNs/updateCorpSpecialtradSaleBrkNs',request);
	}

	//등록
	public insertCorpSpecialtradSaleBrkNs(request: CorpSpecialtradSaleBrkNs){
		return this.httpPost('/api/corpSpecialtradSaleBrkNs/insertCorpSpecialtradSaleBrkNs',request);
	}

	//수정+등록
	public saveCorpSpecialtradSaleBrkNs(request: CorpSpecialtradSaleBrkNs){
		return this.httpPost('/api/corpSpecialtradSaleBrkNs/saveCorpSpecialtradSaleBrkNs',request);
	}

	//삭제
	public deleteCorpSpecialtradSaleBrkNs(request: CorpSpecialtradSaleBrkNs){
		return this.httpPost('/api/corpSpecialtradSaleBrkNs/deleteCorpSpecialtradSaleBrkNs',request);
	}

	//엑셀
	public excelCorpSpecialtradSaleBrkNs(request: CorpSpecialtradSaleBrkNs){
		return this.httpPost('/api/corpSpecialtradSaleBrkNs/deleteCorpSpecialtradSaleBrkNs',request);
	}

	//레포트
	public reportCorpSpecialtradSaleBrkNs(request: CorpSpecialtradSaleBrkNs){
		return this.httpPost('/api/corpSpecialtradSaleBrkNs/reportCorpSpecialtradSaleBrkNs',request);
	}

	//도움말
	public helpCorpSpecialtradSaleBrkNs(request: CorpSpecialtradSaleBrkNs){
		return this.httpPost('/api/corpSpecialtradSaleBrkNs/deleteCorpSpecialtradSaleBrkNs',request);
	}

}