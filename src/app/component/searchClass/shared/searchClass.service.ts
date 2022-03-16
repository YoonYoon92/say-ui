import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { SearchClass } from './searchClass.model';
import { SearchClassParam } from './searchClassParam.model';

@Injectable()
export class SearchClassService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/selectSearchClass',null);
	}


	//CLASS SEARCH 복수 대상 조회
	public selectSearchClass(request: SearchClassParam){
		return this.httpPost('/api/component/selectSearchClass',request);
	}

}