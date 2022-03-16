import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { BillReport } from './billReport.model';

@Injectable()
export class BillReportService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/billReport',null);
	}

	//단일 대상 조회
	public selectBillReport(request: BillReport){
		return this.httpPost('/api/billReport/selectBillReport',request);
	}

	//복수 대상 조회
	public selectBillReportList(request: BillReport){
		return this.httpPost('/api/billReport/selectBillReportList',request);
	}

	//수정
	public updateBillReport(request: BillReport){
		return this.httpPost('/api/billReport/updateBillReport',request);
	}

	//등록
	public insertBillReport(request: BillReport){
		return this.httpPost('/api/billReport/insertBillReport',request);
	}

	//수정+등록
	public saveBillReport(request: BillReport){
		return this.httpPost('/api/billReport/saveBillReport',request);
	}

	//삭제
	public deleteBillReport(request: BillReport){
		return this.httpPost('/api/billReport/deleteBillReport',request);
	}

	//엑셀
	public excelBillReport(request: BillReport){
		return this.httpPost('/api/billReport/deleteBillReport',request);
	}

	//레포트
	public reportBillReport(request: BillReport){
		return this.httpPost('/api/billReport/reportBillReport',request);
	}

	//도움말
	public helpBillReport(request: BillReport){
		return this.httpPost('/api/billReport/deleteBillReport',request);
	}

}