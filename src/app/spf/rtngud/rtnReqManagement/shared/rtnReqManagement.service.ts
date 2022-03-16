import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { RtnReqManagement } from './rtnReqManagement.model';

@Injectable()
export class RtnReqManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/rtnReqManagement',null);
	}

	//단일 대상 조회
	public selectRtnReqManagement(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/selectRtnReqManagement',request);
	}

	//복수 대상 조회
	public selectRtnReqManagementList(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/selectRtnReqManagementList',request);
	}
	//전표년도조회
	public chitYearList(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/chitYearList',request);
	}
	//거래선확인
	public checkPartner(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/checkPartner',request);
	}
	//전표년도조회
	public chitSearchResult(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/chitSearchResult',request);
	}
	public chitSearchResultDetail(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/chitSearchResultDetail',request);
	}
	//단품조회
	public itemList(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/itemList',request);
	}
	public itemDetail(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/itemDetail',request);
	}

	//수정
	public updateRtnReqManagement(request: any){
		return this.httpPost('/api/rtnReqManagement/updateRtnReqManagement',request);
	}

	//등록
	public itemsCdCheck(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/itemsCdCheck',request);
	}
	public insertRtnReqManagement2(request: any){
		return this.httpPost('/api/rtnReqManagement/insertRtnReqManagement2',request);
	}

	//수정+등록
	public saveRtnReqManagement(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/saveRtnReqManagement',request);
	}

	//삭제
	public deleteRtnReqManagement(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/deleteRtnReqManagement',request);
	}

	//엑셀
	public excelRtnReqManagement(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/deleteRtnReqManagement',request);
	}

	//레포트
	public reportRtnReqManagement(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/reportRtnReqManagement',request);
	}

	//도움말
	public helpRtnReqManagement(request: RtnReqManagement){
		return this.httpPost('/api/rtnReqManagement/deleteRtnReqManagement',request);
	}

}