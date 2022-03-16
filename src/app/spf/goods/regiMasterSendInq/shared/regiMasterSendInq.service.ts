import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { RegiMasterSendInq } from './regiMasterSendInq.model';
import { RegiMasterSendInqSearch } from './regiMasterSendInq.Searchmodel';

@Injectable()
export class RegiMasterSendInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/regiMasterSendInq',null);
	}

	//단일 대상 조회
	public selectRegiMasterSendInq(request: RegiMasterSendInq){
		return this.httpPost('/api/regiMasterSendInq/selectRegiMasterSendInq',request);
	}

	//복수 대상 조회
	public selectRegiMasterSendInqList(request: RegiMasterSendInq){
		return this.httpPost('/api/regiMasterSendInq/selectRegiMasterSendInqList',request);
	}

	//검색리스트 조회
	public selectRegiMasterSendInqSearchList(request: RegiMasterSendInqSearch){
		return this.httpPost('/api/regiMasterSendInq/selectRegiMasterSendInqSearchList',request);
	}

	//수정
	public updateRegiMasterSendInq(request: RegiMasterSendInq){
		return this.httpPost('/api/regiMasterSendInq/updateRegiMasterSendInq',request);
	}

	//등록
	public insertRegiMasterSendInq(request: RegiMasterSendInq){
		return this.httpPost('/api/regiMasterSendInq/insertRegiMasterSendInq',request);
	}

	//수정+등록
	public saveRegiMasterSendInq(request: RegiMasterSendInq){
		return this.httpPost('/api/regiMasterSendInq/saveRegiMasterSendInq',request);
	}

	//삭제
	public deleteRegiMasterSendInq(request: RegiMasterSendInq){
		return this.httpPost('/api/regiMasterSendInq/deleteRegiMasterSendInq',request);
	}

	//엑셀
	public excelRegiMasterSendInq(request: RegiMasterSendInq){
		return this.httpUrl('/api/regiMasterSendInq/downloadExcel',request);
	}

	//레포트
	public reportRegiMasterSendInq(request: RegiMasterSendInq){
		return this.httpUrl('/api/regiMasterSendInq/reportRegiMasterSendInq',request);
	}

	//도움말
	public helpRegiMasterSendInq(request: RegiMasterSendInq){
		return this.httpPost('/api/regiMasterSendInq/deleteRegiMasterSendInq',request);
	}

}