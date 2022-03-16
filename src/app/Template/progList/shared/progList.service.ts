import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { ProgList } from './progList.model';

@Injectable()
export class ProgListService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/progList',null);
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



	//단일 대상 조회
	public selectProgList(request: ProgList){
		return this.httpPost('/api/progList/selectProgList',request);
	}

	//복수 대상 조회
	public selectProgListList(request: ProgList){
		return this.httpPost('api/comm/selectCommProgList',request);
	}

	//수정
	public updateProgList(request: ProgList){
		return this.httpPost('/api/progList/updateProgList',request);
	}

	//등록
	public insertProgList(request: ProgList){
		return this.httpPost('/api/progList/insertProgList',request);
	}

	//수정+등록
	public saveProgList(request: ProgList){
		return this.httpPost('/api/progList/saveProgList',request);
	}

	//삭제
	public deleteProgList(request: ProgList){
		return this.httpPost('/api/progList/deleteProgList',request);
	}

	//엑셀
	public excelProgList(request: ProgList){
		return this.httpPost('/api/progList/deleteProgList',request);
	}

	//레포트
	public reportProgList(request: ProgList){
		return this.httpPost('/api/progList/reportProgList',request);
	}

	//도움말
	public helpProgList(request: ProgList){
		return this.httpPost('/api/progList/deleteProgList',request);
	}

}