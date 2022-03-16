import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { LeftTreeRightForm } from './LeftTreeRightForm.model';

@Injectable()
export class LeftTreeRightFormService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/LeftTreeRightForm',null);
	}

	//단일 대상 조회
	public selectLeftTreeRightForm(request: LeftTreeRightForm){
		return this.httpPost('/api/LeftTreeRightForm/selectLeftTreeRightForm',LeftTreeRightForm);
	}

	//복수 대상 조회
	public selectLeftTreeRightFormList(request: LeftTreeRightForm){
		return this.httpPost('/api/comm/selectStoreList',LeftTreeRightForm);
	}

	//수정
	public updateLeftTreeRightForm(request: LeftTreeRightForm){
		return this.httpPost('/api/LeftTreeRightForm/updateLeftTreeRightForm',LeftTreeRightForm);
	}

	//등록
	public insertLeftTreeRightForm(request: LeftTreeRightForm){
		return this.httpPost('/api/LeftTreeRightForm/insertLeftTreeRightForm',LeftTreeRightForm);
	}

	//수정+등록
	public saveLeftTreeRightForm(request: LeftTreeRightForm){
		return this.httpPost('/api/LeftTreeRightForm/saveLeftTreeRightForm',LeftTreeRightForm);
	}

	//삭제
	public deleteLeftTreeRightForm(request: LeftTreeRightForm){
		return this.httpPost('/api/LeftTreeRightForm/deleteLeftTreeRightForm',LeftTreeRightForm);
	}

	//엑셀
	public excelLeftTreeRightForm(request: LeftTreeRightForm){
		return this.httpPost('/api/LeftTreeRightForm/deleteLeftTreeRightForm',LeftTreeRightForm);
	}

	//도움말
	public helpLeftTreeRightForm(request: LeftTreeRightForm){
		return this.httpPost('/api/LeftTreeRightForm/deleteLeftTreeRightForm',LeftTreeRightForm);
	}
}
