import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { TopHeaderBtmDetail } from './TopHeaderBtmDetail.model';

@Injectable()
export class TopHeaderBtmDetailService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/TopHeaderBtmDetail',null);
	}

	//단일 대상 조회
	public selectTopHeaderBtmDetail(request: TopHeaderBtmDetail){
		return this.httpPost('/api/TopHeaderBtmDetail/selectTopHeaderBtmDetail',TopHeaderBtmDetail);
	}

	//복수 대상 조회
	public selectTopHeaderBtmDetailList(request: TopHeaderBtmDetail){
		return this.httpPost('/api/TopHeaderBtmDetail/selectTopHeaderBtmDetailList',TopHeaderBtmDetail);
	}

	//수정
	public updateTopHeaderBtmDetail(request: TopHeaderBtmDetail){
		return this.httpPost('/api/TopHeaderBtmDetail/updateTopHeaderBtmDetail',TopHeaderBtmDetail);
	}

	//등록
	public insertTopHeaderBtmDetail(request: TopHeaderBtmDetail){
		return this.httpPost('/api/TopHeaderBtmDetail/insertTopHeaderBtmDetail',TopHeaderBtmDetail);
	}

	//수정+등록
	public saveTopHeaderBtmDetail(request: TopHeaderBtmDetail){
		return this.httpPost('/api/TopHeaderBtmDetail/saveTopHeaderBtmDetail',TopHeaderBtmDetail);
	}

	//삭제
	public deleteTopHeaderBtmDetail(request: TopHeaderBtmDetail){
		return this.httpPost('/api/TopHeaderBtmDetail/deleteTopHeaderBtmDetail',TopHeaderBtmDetail);
	}

	//엑셀
	public excelTopHeaderBtmDetail(request: TopHeaderBtmDetail){
		return this.httpPost('/api/TopHeaderBtmDetail/deleteTopHeaderBtmDetail',TopHeaderBtmDetail);
	}

	//도움말
	public helpTopHeaderBtmDetail(request: TopHeaderBtmDetail){
		return this.httpPost('/api/TopHeaderBtmDetail/deleteTopHeaderBtmDetail',TopHeaderBtmDetail);
	}

}
