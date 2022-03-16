import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { CenterGrid } from './CenterGrid.model';

@Injectable()
export class CenterGridService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/TopParamBtmGrid',null);
	}

	//단일 대상 조회
	public selectTopParamBtmGrid(request: CenterGrid){
		return this.httpPost('/api/TopParamBtmGrid/selectTopParamBtmGrid',request);
	}

	//복수 대상 조회
	public selectTopParamBtmGridList(request: CenterGrid){
		return this.httpPost('/api/TopParamBtmGrid/selectTopParamBtmGridList',request);
	}

	//수정
	public updateTopParamBtmGrid(request: CenterGrid){
		return this.httpPost('/api/TopParamBtmGrid/updateTopParamBtmGrid',request);
	}

	//등록
	public insertTopParamBtmGrid(request: CenterGrid){
		return this.httpPost('/api/TopParamBtmGrid/insertTopParamBtmGrid',request);
	}

	//수정+등록
	public saveTopParamBtmGrid(request: CenterGrid){
		return this.httpPost('/api/TopParamBtmGrid/saveTopParamBtmGrid',request);
	}

	//삭제
	public deleteTopParamBtmGrid(request: CenterGrid){
		return this.httpPost('/api/TopParamBtmGrid/deleteTopParamBtmGrid',request);
	}

	//엑셀
	public excelTopParamBtmGrid(request: CenterGrid){
		return this.httpPost('/api/TopParamBtmGrid/deleteTopParamBtmGrid',request);
	}

	//도움말
	public helpTopParamBtmGrid(request: CenterGrid){
		return this.httpPost('/api/TopParamBtmGrid/deleteTopParamBtmGrid',request);
	}

}
