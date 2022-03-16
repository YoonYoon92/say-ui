import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { BuyReqManagement } from './buyReqManagement.model';

@Injectable()
export class BuyReqManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/buyReqManagement',null);
	}

	//단일 대상 조회
	public selectBuyReqManagement(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/selectBuyReqManagement',request);
	}

	//복수 대상 조회
	public selectBuyReqManagementList(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/selectBuyReqManagementList',request);
	}
	//전표년도조회
	public chitYearList(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/chitYearList',request);
	}
	//거래선확인
	public checkPartner(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/checkPartner',request);
	}
	//전표년도조회
	public chitSearchResult(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/chitSearchResult',request);
	}
	public chitSearchResultDetail(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/chitSearchResultDetail',request);
	}
	//단품조회
	public itemList(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/itemList',request);
	}
	public itemDetail(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/itemDetail',request);
	}

	//수정
	public updateBuyReqManagement(request: any){
		return this.httpPost('/api/buyReqManagement/updateBuyReqManagement',request);
	}

	//등록
	public itemsCdCheck(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/itemsCdCheck',request);
	}
	public insertBuyReqManagement2(request: any){
		return this.httpPost('/api/buyReqManagement/insertBuyReqManagement2',request);
	}

	//수정+등록
	public saveBuyReqManagement(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/saveBuyReqManagement',request);
	}

	//삭제
	public deleteBuyReqManagement(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/deleteBuyReqManagement',request);
	}

	//엑셀
	public excelBuyReqManagement(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/deleteBuyReqManagement',request);
	}

	//레포트
	public reportBuyReqManagement(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/reportBuyReqManagement',request);
	}

	//도움말
	public helpBuyReqManagement(request: BuyReqManagement){
		return this.httpPost('/api/buyReqManagement/deleteBuyReqManagement',request);
	}

}