import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { CenterTreeGrid } from './CenterTreeGrid.model';

@Injectable()
export class CenterTreeGridService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/CenterTreeGrid',null);
	}

	//단일 대상 조회
	public selectCenterTreeGrid(request: CenterTreeGrid){
		return this.httpPost('/api/CenterTreeGrid/selectCenterTreeGrid',CenterTreeGrid);
	}

	//복수 대상 조회
	public selectCenterTreeGridList(request: CenterTreeGrid){
		return this.httpPost('/api/comm/selectStoreList',CenterTreeGrid);
	}

	//수정
	public updateCenterTreeGrid(request: CenterTreeGrid){
		return this.httpPost('/api/CenterTreeGrid/updateCenterTreeGrid',CenterTreeGrid);
	}

	//등록
	public insertCenterTreeGrid(request: CenterTreeGrid){
		return this.httpPost('/api/CenterTreeGrid/insertCenterTreeGrid',CenterTreeGrid);
	}

	//수정+등록
	public saveCenterTreeGrid(request: CenterTreeGrid){
		return this.httpPost('/api/CenterTreeGrid/saveCenterTreeGrid',CenterTreeGrid);
	}

	//삭제
	public deleteCenterTreeGrid(request: CenterTreeGrid){
		return this.httpPost('/api/CenterTreeGrid/deleteCenterTreeGrid',CenterTreeGrid);
	}

	//엑셀
	public excelCenterTreeGrid(request: CenterTreeGrid){
		return this.httpPost('/api/CenterTreeGrid/deleteCenterTreeGrid',CenterTreeGrid);
	}

	//도움말
	public helpCenterTreeGrid(request: CenterTreeGrid){
		return this.httpPost('/api/CenterTreeGrid/deleteCenterTreeGrid',CenterTreeGrid);
	}

}
