import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { UserProgList } from './userProgList.model';
import { UserProgListUser } from './userProgListUser.model';

@Injectable()
export class UserProgListService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/progList',null);
	}

	//사용자 리스트 조회
	public selectUserProgListUser(){
		return this.httpPost('/api/comm/selectUserList',"");
	}

	/**
     * 관리자메뉴 조회
     * @param reqeust 
     */
    public selectAdminProgList(reqeust: any){
        return this.httpPost('/api/program/selectAdminProgList', reqeust);
	}

	/**
     * 관리자메뉴 저장
     * @param reqeust 
     */
    public saveAdminProgList(reqeust: any){
        return this.httpPost('/api/program/saveAdminProgList', reqeust);
	}

	/**
     * 사용자메뉴 조회
     * @param reqeust 
     */
    public selectUserProgList(reqeust: any){
        return this.httpPost('/api/program/selectUserProgList', reqeust);
	}

	//도움말
	public helpUserProgList(request: UserProgList){
		return this.httpPost('/api/progList/deleteProgList',request);
	}

}