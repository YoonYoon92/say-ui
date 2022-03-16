import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { LeftGridTopHeaderBtmDetail } from './LeftGridTopHeaderBtmDetail.model';

@Injectable()
export class LeftGridTopHeaderBtmDetailService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/LeftGridTopHeaderBtmDetail',null);
	}

	//단일 대상 조회
	public selectLeftGridTopHeaderBtmDetail(request: LeftGridTopHeaderBtmDetail){
		return this.httpPost('/api/LeftGridTopHeaderBtmDetail/selectLeftGridTopHeaderBtmDetail',LeftGridTopHeaderBtmDetail);
	}

	//복수 대상 조회
	public selectLeftGridTopHeaderBtmDetailList(request: LeftGridTopHeaderBtmDetail){
		return this.httpPost('/api/LeftGridTopHeaderBtmDetail/selectLeftGridTopHeaderBtmDetailList',LeftGridTopHeaderBtmDetail);
	}

	//수정
	public updateLeftGridTopHeaderBtmDetail(request: LeftGridTopHeaderBtmDetail){
		return this.httpPost('/api/LeftGridTopHeaderBtmDetail/updateLeftGridTopHeaderBtmDetail',LeftGridTopHeaderBtmDetail);
	}

	//등록
	public insertLeftGridTopHeaderBtmDetail(request: LeftGridTopHeaderBtmDetail){
		return this.httpPost('/api/LeftGridTopHeaderBtmDetail/insertLeftGridTopHeaderBtmDetail',LeftGridTopHeaderBtmDetail);
	}

	//수정+등록
	public saveLeftGridTopHeaderBtmDetail(request: LeftGridTopHeaderBtmDetail){
		return this.httpPost('/api/LeftGridTopHeaderBtmDetail/saveLeftGridTopHeaderBtmDetail',LeftGridTopHeaderBtmDetail);
	}

	//삭제
	public deleteLeftGridTopHeaderBtmDetail(request: LeftGridTopHeaderBtmDetail){
		return this.httpPost('/api/LeftGridTopHeaderBtmDetail/deleteLeftGridTopHeaderBtmDetail',LeftGridTopHeaderBtmDetail);
	}

	//엑셀
	public excelLeftGridTopHeaderBtmDetail(request: LeftGridTopHeaderBtmDetail){
		return this.httpPost('/api/LeftGridTopHeaderBtmDetail/deleteLeftGridTopHeaderBtmDetail',LeftGridTopHeaderBtmDetail);
	}

	//도움말
	public helpLeftGridTopHeaderBtmDetail(request: LeftGridTopHeaderBtmDetail){
		return this.httpPost('/api/LeftGridTopHeaderBtmDetail/deleteLeftGridTopHeaderBtmDetail',LeftGridTopHeaderBtmDetail);
	}

}
