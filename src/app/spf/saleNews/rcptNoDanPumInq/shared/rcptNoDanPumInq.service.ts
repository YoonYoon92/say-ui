import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { RcptNoDanPumInq } from './rcptNoDanPumInq.model';
import { RcptNoDanPumInqSearch } from './rcptNoDanPumInq.Searchmodel';

@Injectable()
export class RcptNoDanPumInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/rcptNoDanPumInq',null);
	}

	//단일 대상 조회
	public selectRcptNoDanPumInq(request: RcptNoDanPumInq){
		return this.httpPost('/api/rcptNoDanPumInq/selectRcptNoDanPumInq',request);
	}

	//복수 대상 조회
	public selectRcptNoDanPumInqList(request: RcptNoDanPumInq){
		return this.httpPost('/api/rcptNoDanPumInq/selectRcptNoDanPumInqList',request);
	}

	//검색리스트 조회
	public selectRcptNoDanPumInqSearchList(request: RcptNoDanPumInqSearch){
		return this.httpPost('/api/rcptNoDanPumInq/selectRcptNoDanPumInqSearchList',request);
	}

	//수정
	public updateRcptNoDanPumInq(request: RcptNoDanPumInq){
		return this.httpPost('/api/rcptNoDanPumInq/updateRcptNoDanPumInq',request);
	}

	//등록
	public insertRcptNoDanPumInq(request: RcptNoDanPumInq){
		return this.httpPost('/api/rcptNoDanPumInq/insertRcptNoDanPumInq',request);
	}

	//수정+등록
	public saveRcptNoDanPumInq(request: RcptNoDanPumInq){
		return this.httpPost('/api/rcptNoDanPumInq/saveRcptNoDanPumInq',request);
	}

	//삭제
	public deleteRcptNoDanPumInq(request: RcptNoDanPumInq){
		return this.httpPost('/api/rcptNoDanPumInq/deleteRcptNoDanPumInq',request);
	}

	//엑셀
	public excelRcptNoDanPumInq(request: RcptNoDanPumInq){
		return this.httpUrl('/api/rcptNoDanPumInq/downloadExcel',request);
	}

	//레포트
	public reportRcptNoDanPumInq(request: RcptNoDanPumInq){
		return this.httpUrl('/api/rcptNoDanPumInq/reportRcptNoDanPumInq',request);
	}

	//도움말
	public helpRcptNoDanPumInq(request: RcptNoDanPumInq){
		return this.httpPost('/api/rcptNoDanPumInq/deleteRcptNoDanPumInq',request);
	}

}