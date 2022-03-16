import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { NonSalesCornerByPeriodMgt } from './nonSalesCornerByPeriodMgt.model';
import { NonSalesCornerByPeriodMgtCornerClosed } from './nonSalesCornerByPeriodMgtCornerClosed.model';

@Injectable()
export class NonSalesCornerByPeriodMgtService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/NonSalesCornerByPeriodMgtApiChk',null);
	}


	//복수 대상 조회
	public selectNonSalesCornerByPeriodList(request: NonSalesCornerByPeriodMgt){
		return this.httpPost('/api/nonSalesCornerByPeriodMgt/selectNonSalesCornerByPeriodList',request);
	}

	/**
     * 미사용 코너 폐기
     * @param reqeust 
     */
	public updateNonSalesCornerClosed(reqeust: any){
        return this.httpPost('/api/nonSalesCornerByPeriodMgt/updateNonSalesCornerClosed', reqeust);
	}

	//폐기코너 엑셀
	public excelNonSalesCornerClosed(request: any){
		return this.httpUrl('/api/nonSalesCornerByPeriodMgt/excelCornerClosed',request);
	}

	//pdf
	public pdfNonSalesCornerByPeriod(request: NonSalesCornerByPeriodMgt){
		return this.httpUrl('/api/nonSalesCornerByPeriodMgt/pdf',request);
	}

	//csv
	public csvNonSalesCornerByPeriod(request: NonSalesCornerByPeriodMgt){
		return this.httpUrl('/api/nonSalesCornerByPeriodMgt/csv',request);
	}

	//엑셀
	public excelNonSalesCornerByPeriod(request: NonSalesCornerByPeriodMgt){
		return this.httpUrl('/api/nonSalesCornerByPeriodMgt/excel',request);
	}

	//도움말
	public helpNonSalesCornerByPeriod(){
		return 'http://localhost:8000/indexDocNonSalesCornerByPeriod.html';
		//return this.httpUrl('/api/billReport/helpBillReport',null);
	}


}