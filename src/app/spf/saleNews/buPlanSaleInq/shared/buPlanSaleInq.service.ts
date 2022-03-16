import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { BuPlanSaleInq } from './buPlanSaleInq.model';

@Injectable()
export class BuPlanSaleInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/buPlanSaleInq',null);
	}

	//복수 대상 조회
	public selectBuPlanSaleInqList(request: BuPlanSaleInq){
		return this.httpPost('/api/buPlanSaleInq/selectBuPlanSaleInqList',request);
	}

	//수정
	public updateBuPlanSaleInq(request: BuPlanSaleInq){
		return this.httpPost('/api/buPlanSaleInq/updateBuPlanSaleInq',request);
	}

	//등록
	public insertBuPlanSaleInq(request: BuPlanSaleInq){
		return this.httpPost('/api/buPlanSaleInq/insertBuPlanSaleInq',request);
	}

	//수정+등록
	public saveBuPlanSaleInq(request: BuPlanSaleInq){
		return this.httpPost('/api/buPlanSaleInq/saveBuPlanSaleInq',request);
	}

	//삭제
	public deleteBuPlanSaleInq(request: BuPlanSaleInq){
		return this.httpPost('/api/buPlanSaleInq/deleteBuPlanSaleInq',request);
	}

	//엑셀
	public excelBuPlanSaleInq(request: BuPlanSaleInq){
		return this.httpPost('/api/buPlanSaleInq/deleteBuPlanSaleInq',request);
	}

	//레포트
	public reportBuPlanSaleInq(request: BuPlanSaleInq){
		return this.httpPost('/api/buPlanSaleInq/reportBuPlanSaleInq',request);
	}

	//도움말
	public helpBuPlanSaleInq(request: BuPlanSaleInq){
		return this.httpPost('/api/buPlanSaleInq/deleteBuPlanSaleInq',request);
	}

}