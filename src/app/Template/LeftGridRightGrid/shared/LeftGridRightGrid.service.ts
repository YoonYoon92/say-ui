import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { LeftGridRightGrid } from './LeftGridRightGrid.model';

@Injectable()
export class LeftGridRightGridService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/LeftGridRightGrid',null);
	}

	//단일 대상 조회
	public selectLeftGridRightGrid(request: LeftGridRightGrid){
		return this.httpPost('/api/LeftGridRightGrid/selectLeftGridRightGrid',LeftGridRightGrid);
	}

	//복수 대상 조회
	public selectLeftGridRightGridList(request: LeftGridRightGrid){
		return this.httpPost('/api/LeftGridRightGrid/selectLeftGridRightGridList',LeftGridRightGrid);
	}

	//수정
	public updateLeftGridRightGrid(request: LeftGridRightGrid){
		return this.httpPost('/api/LeftGridRightGrid/updateLeftGridRightGrid',LeftGridRightGrid);
	}

	//등록
	public insertLeftGridRightGrid(request: LeftGridRightGrid){
		return this.httpPost('/api/LeftGridRightGrid/insertLeftGridRightGrid',LeftGridRightGrid);
	}

	//수정+등록
	public saveLeftGridRightGrid(request: LeftGridRightGrid){
		return this.httpPost('/api/LeftGridRightGrid/saveLeftGridRightGrid',LeftGridRightGrid);
	}

	//삭제
	public deleteLeftGridRightGrid(request: LeftGridRightGrid){
		return this.httpPost('/api/LeftGridRightGrid/deleteLeftGridRightGrid',LeftGridRightGrid);
	}

	//엑셀
	public exceleLeftGridRightGrid(request: LeftGridRightGrid){
		return this.httpPost('/api/LeftGridRightGrid/deleteLeftGridRightGrid',LeftGridRightGrid);
	}

	//도움말
	public helpLeftGridRightGrid(request: LeftGridRightGrid){
		return this.httpPost('/api/LeftGridRightGrid/deleteLeftGridRightGrid',LeftGridRightGrid);
	}

}
