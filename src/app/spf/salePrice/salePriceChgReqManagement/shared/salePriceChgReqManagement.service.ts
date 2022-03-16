import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { SalePriceChgReqManagement } from './salePriceChgReqManagement.model';

@Injectable()
export class SalePriceChgReqManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/salePriceChgReqManagement',null);
	}

	//단일 대상 조회
	public selectSalePriceChgReqManagement(request: SalePriceChgReqManagement){
		return this.httpPost('/api/salePriceChgReqManagement/selectSalePriceChgReqManagement',request);
	}

	//복수 대상 조회
	public selectSalePriceChgReqManagementList(request: SalePriceChgReqManagement){
		return this.httpPost('/api/salePriceChgReqManagement/selectSalePriceChgReqManagementList',request);
	}

	//수정
	public updateSalePriceChgReqManagement(request: any){
		return this.httpPost('/api/salePriceChgReqManagement/updateSalePriceChgReqManagement',request);
	}

	//등록
	public insertSalePriceChgReqManagement(request: any){
		return this.httpPost('/api/salePriceChgReqManagement/insertSalePriceChgReqManagement',request);
	}

	//수정+등록
	public saveSalePriceChgReqManagement(request: SalePriceChgReqManagement){
		return this.httpPost('/api/salePriceChgReqManagement/saveSalePriceChgReqManagement',request);
	}

	//삭제
	public deleteSalePriceChgReqManagement(request: SalePriceChgReqManagement){
		return this.httpPost('/api/salePriceChgReqManagement/deleteSalePriceChgReqManagement',request);
	}

	//엑셀
	public excelSalePriceChgReqManagement(request: SalePriceChgReqManagement){
		return this.httpPost('/api/salePriceChgReqManagement/deleteSalePriceChgReqManagement',request);
	}

	//레포트
	public reportSalePriceChgReqManagement(request: SalePriceChgReqManagement){
		return this.httpPost('/api/salePriceChgReqManagement/reportSalePriceChgReqManagement',request);
	}

	//도움말
	public helpSalePriceChgReqManagement(request: SalePriceChgReqManagement){
		return this.httpPost('/api/salePriceChgReqManagement/deleteSalePriceChgReqManagement',request);
	}

		//전표년도조회
		public chitSearchResult(request: SalePriceChgReqManagement){
			return this.httpPost('/api/salePriceChgReqManagement/chitSearchResult',request);
		}
		public chitSearchResultDetail(request: SalePriceChgReqManagement){
			return this.httpPost('/api/salePriceChgReqManagement/chitSearchResultDetail',request);
		}

		//거래선확인
		public checkPartner(request: SalePriceChgReqManagement){
			return this.httpPost('/api/salePriceChgReqManagement/checkPartner',request);
		}
		//단품조회
		public itemList(request: SalePriceChgReqManagement){
			return this.httpPost('/api/salePriceChgReqManagement/itemList',request);
		}
		//
		public itemDetail(request: SalePriceChgReqManagement){
			return this.httpPost('/api/salePriceChgReqManagement/itemDetail',request);
		}
		public itemsCdCheck(request: SalePriceChgReqManagement){
			return this.httpPost('/api/salePriceChgReqManagement/itemsCdCheck',request);
		}
		
}