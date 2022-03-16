import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { LeftGridRightForm } from './LeftGridRightForm.model';

@Injectable()
export class LeftGridRightFormService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/LeftGridRightForm',null);
	}

	//단일 대상 조회
	public selectLeftGridRightForm(request: LeftGridRightForm){
		return this.httpPost('/api/LeftGridRightForm/selectLeftGridRightForm',LeftGridRightForm);
	}

	//복수 대상 조회
	public selectLeftGridRightFormList(request: LeftGridRightForm){
		return this.httpPost('/api/LeftGridRightForm/selectLeftGridRightFormList',LeftGridRightForm);
	}

	//수정
	public updateLeftGridRightForm(request: LeftGridRightForm){
		return this.httpPost('/api/LeftGridRightForm/updateLeftGridRightForm',LeftGridRightForm);
	}

	//등록
	public insertLeftGridRightForm(request: LeftGridRightForm){
		return this.httpPost('/api/LeftGridRightForm/insertLeftGridRightForm',LeftGridRightForm);
	}

	//수정+등록
	public saveLeftGridRightForm(request: LeftGridRightForm){
		return this.httpPost('/api/LeftGridRightForm/saveLeftGridRightForm',LeftGridRightForm);
	}

	//삭제
	public deleteLeftGridRightForm(request: LeftGridRightForm){
		return this.httpPost('/api/LeftGridRightForm/deleteLeftGridRightForm',LeftGridRightForm);
	}

	//엑셀
	public excelLeftGridRightForm(request: LeftGridRightForm){
		return this.httpPost('/api/LeftGridRightForm/deleteLeftGridRightForm',LeftGridRightForm);
	}

	//도움말
	public helpLeftGridRightForm(request: LeftGridRightForm){
		return this.httpPost('/api/LeftGridRightForm/deleteLeftGridRightForm',LeftGridRightForm);
	}
}
