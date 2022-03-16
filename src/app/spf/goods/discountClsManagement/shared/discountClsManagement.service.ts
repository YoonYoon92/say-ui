import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { DiscountClsManagement } from './discountClsManagement.model';

@Injectable()
export class DiscountClsManagementService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/discountClsManagement',null);
	}

	//단일 대상 조회
	public selectDiscountClsManagement(request: DiscountClsManagement){
		return this.httpPost('/api/discountClsManagement/selectDiscountClsManagement',request);
	}

	//복수 대상 조회
	public selectDiscountClsManagementList(request: DiscountClsManagement){
		return this.httpPost('/api/discountClsManagement/selectDiscountClsManagementList',request);
	}

	//수정
	public updateDiscountClsManagement(request: DiscountClsManagement){
		return this.httpPost('/api/discountClsManagement/updateDiscountClsManagement',request);
	}

	//등록
	public insertDiscountClsManagement(request: DiscountClsManagement){
		return this.httpPost('/api/discountClsManagement/insertDiscountClsManagement',request);
	}

	//수정+등록
	public saveDiscountClsManagement(request: DiscountClsManagement){
		return this.httpPost('/api/discountClsManagement/saveDiscountClsManagement',request);
	}

	//삭제
	public deleteDiscountClsManagement(request: DiscountClsManagement){
		return this.httpPost('/api/discountClsManagement/deleteDiscountClsManagement',request);
	}

	//엑셀
	public excelDiscountClsManagement(request: DiscountClsManagement){
		return this.httpPost('/api/discountClsManagement/deleteDiscountClsManagement',request);
	}

	//레포트
	public reportDiscountClsManagement(request: DiscountClsManagement){
		return this.httpPost('/api/discountClsManagement/reportDiscountClsManagement',request);
	}

	//도움말
	public helpDiscountClsManagement(request: DiscountClsManagement){
		return this.httpPost('/api/discountClsManagement/deleteDiscountClsManagement',request);
	}

}