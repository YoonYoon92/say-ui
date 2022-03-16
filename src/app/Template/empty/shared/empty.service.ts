import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { Empty } from './empty.model';

@Injectable()
export class EmptyService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/empty',null);
	}

	//단일 대상 조회
	public selectEmpty(request: Empty){
		return this.httpPost('/api/empty/selectEmpty',request);
	}

	//복수 대상 조회
	public selectEmptyList(request: Empty){
		return this.httpPost('/api/empty/selectEmptyList',request);
	}

	//수정
	public updateEmpty(request: Empty){
		return this.httpPost('/api/empty/updateEmpty',request);
	}

	//등록
	public insertEmpty(request: Empty){
		return this.httpPost('/api/empty/insertEmpty',request);
	}

	//수정+등록
	public saveEmpty(request: Empty){
		return this.httpPost('/api/empty/saveEmpty',request);
	}

	//삭제
	public deleteEmpty(request: Empty){
		return this.httpPost('/api/empty/deleteEmpty',request);
	}

	//엑셀
	public excelEmpty(request: Empty){
		return this.httpPost('/api/empty/deleteEmpty',request);
	}

	//도움말
	public helpEmpty(request: Empty){
		return this.httpPost('/api/empty/deleteEmpty',request);
	}

}
