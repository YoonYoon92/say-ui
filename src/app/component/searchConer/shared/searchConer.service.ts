import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { SearchConer } from './SearchConer.model';
import { SearchConerParam } from './SearchConerParam.model';

@Injectable()
export class SearchConerService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/selectSearchConer',null);
	}


	//협력업체 SEARCH 복수 대상 조회
	public selectSearchConer(request: SearchConerParam){
		return this.httpPost('/api/component/selectSearchConer',request);
	}

}