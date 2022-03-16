import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { PeriodyearMmSaleAnalys } from './periodyearMmSaleAnalys.model';

@Injectable()
export class PeriodyearMmSaleAnalysService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/periodyearMmSaleAnalys',null);
	}

	//단일 대상 조회
	public selectPeriodyearMmSaleAnalys(request: PeriodyearMmSaleAnalys){
		return this.httpPost('/api/periodyearMmSaleAnalys/selectPeriodyearMmSaleAnalys',request);
	}

	//복수 대상 조회
	public selectPeriodyearMmSaleAnalysList(request: PeriodyearMmSaleAnalys){
		return this.httpPost('/api/periodyearMmSaleAnalys/selectPeriodyearMmSaleAnalysList',request);
	}

	//수정
	public updatePeriodyearMmSaleAnalys(request: PeriodyearMmSaleAnalys){
		return this.httpPost('/api/periodyearMmSaleAnalys/updatePeriodyearMmSaleAnalys',request);
	}

	//등록
	public insertPeriodyearMmSaleAnalys(request: PeriodyearMmSaleAnalys){
		return this.httpPost('/api/periodyearMmSaleAnalys/insertPeriodyearMmSaleAnalys',request);
	}

	//수정+등록
	public savePeriodyearMmSaleAnalys(request: PeriodyearMmSaleAnalys){
		return this.httpPost('/api/periodyearMmSaleAnalys/savePeriodyearMmSaleAnalys',request);
	}

	//삭제
	public deletePeriodyearMmSaleAnalys(request: PeriodyearMmSaleAnalys){
		return this.httpPost('/api/periodyearMmSaleAnalys/deletePeriodyearMmSaleAnalys',request);
	}

	//엑셀
	public excelPeriodyearMmSaleAnalys(request: PeriodyearMmSaleAnalys){
		return this.httpUrl('/api/periodyearMmSaleAnalys/downloadExcel',request);
	}

	//레포트
	public reportPeriodyearMmSaleAnalys(request: PeriodyearMmSaleAnalys){
		return this.httpUrl('/api/periodyearMmSaleAnalys/reportPeriodyearMmSaleAnalys',request);
	}

	//도움말
	public helpPeriodyearMmSaleAnalys(request: PeriodyearMmSaleAnalys){
		return this.httpPost('/api/periodyearMmSaleAnalys/deletePeriodyearMmSaleAnalys',request);
	}

}