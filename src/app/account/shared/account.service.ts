import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../shared/api-http.service';

@Injectable()
export class AccountService extends ApiHttpService{

	//단일 대상 조회
	public selectAccount(request: any){
		return this.httpPost('/api/comm/selectUserLogin',request);
	}
	public insertlog(request: any){
		return this.httpPost('/api/comm/insertlog',request);
	}

}
