import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { DayBestSaleInq } from './dayBestSaleInq.model';

@Injectable()
export class DayBestSaleInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/dayBestSaleInq',null);
	}

	//단일 대상 조회
	public selectDayBestSaleInq(request: DayBestSaleInq){
		return this.httpPost('/api/dayBestSaleInq/selectDayBestSaleInq',request);
	}

	//복수 대상 조회
	public selectDayBestSaleInqList(request: DayBestSaleInq){
		return this.httpPost('/api/dayBestSaleInq/selectDayBestSaleInqList',request);
	}

	//수정
	public updateDayBestSaleInq(request: DayBestSaleInq){
		return this.httpPost('/api/dayBestSaleInq/updateDayBestSaleInq',request);
	}

	//등록
	public insertDayBestSaleInq(request: DayBestSaleInq){
		return this.httpPost('/api/dayBestSaleInq/insertDayBestSaleInq',request);
	}

	//수정+등록
	public saveDayBestSaleInq(request: DayBestSaleInq){
		return this.httpPost('/api/dayBestSaleInq/saveDayBestSaleInq',request);
	}

	//삭제
	public deleteDayBestSaleInq(request: DayBestSaleInq){
		return this.httpPost('/api/dayBestSaleInq/deleteDayBestSaleInq',request);
	}

	//엑셀
	public excelDayBestSaleInq(request: DayBestSaleInq){
		return this.httpPost('/api/dayBestSaleInq/deleteDayBestSaleInq',request);
	}

	//레포트
	public reportDayBestSaleInq(request: DayBestSaleInq){
		return this.httpPost('/api/dayBestSaleInq/reportDayBestSaleInq',request);
	}

	//도움말
	public helpDayBestSaleInq(request: DayBestSaleInq){
		return this.httpPost('/api/dayBestSaleInq/deleteDayBestSaleInq',request);
	}

}