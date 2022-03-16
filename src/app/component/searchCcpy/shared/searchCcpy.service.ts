import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { SearchCcpy } from './searchCcpy.model';
import { SearchCcpyParam } from './searchCcpyParam.model';

@Injectable()
export class SearchCcpyService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/selectSearchCcpy',null);
	}


	//협력업체 SEARCH 복수 대상 조회
	public selectSearchCcpy(request: SearchCcpyParam){
		return this.httpPost('/api/component/selectSearchCcpy',request);
	}

}