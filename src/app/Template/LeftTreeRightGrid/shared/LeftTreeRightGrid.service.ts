import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { LeftTreeRightGrid } from './LeftTreeRightGrid.model';

@Injectable()
export class LeftTreeRightGridService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/LeftTreeRightGrid',null);
	}

	//단일 대상 조회
	public selectLeftTreeRightGrid(request: LeftTreeRightGrid){
		return this.httpPost('/api/LeftTreeRightGrid/selectLeftTreeRightGrid',request);
	}

	//복수 대상 조회
	public selectLeftTreeRightGridList(request: LeftTreeRightGrid){
		return this.httpPost('/api/comm/selectStoreList',request);
	}

	//수정
	public updateLeftTreeRightGrid(request: LeftTreeRightGrid){
		return this.httpPost('/api/LeftTreeRightGrid/updateLeftTreeRightGrid',request);
	}

	//등록
	public insertLeftTreeRightGrid(request: LeftTreeRightGrid){
		return this.httpPost('/api/LeftTreeRightGrid/insertLeftTreeRightGrid',request);
	}

	//수정+등록
	public saveLeftTreeRightGrid(request: LeftTreeRightGrid){
		return this.httpPost('/api/LeftTreeRightGrid/saveLeftTreeRightGrid',request);
	}

	//삭제
	public deleteLeftTreeRightGrid(request: LeftTreeRightGrid){
		return this.httpPost('/api/LeftTreeRightGrid/deleteLeftTreeRightGrid',request);
	}

	//엑셀
	public excelLeftTreeRightGrid(request: LeftTreeRightGrid){
		return this.httpPost('/api/LeftTreeRightGrid/deleteLeftTreeRightGrid',request);
	}

	//도움말
	public helpLeftTreeRightGrid(request: LeftTreeRightGrid){
		return this.httpPost('/api/LeftTreeRightGrid/deleteLeftTreeRightGrid',request);
	}

}
