import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { DayAggregation } from './dayAggregation.model';

@Injectable()
export class DayAggregationService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/dayAggregation',null);
	}

	//단일 대상 조회
	public selectDayAggregation(request: DayAggregation){
		return this.httpPost('/api/dayAggregation/selectDayAggregation',request);
	}

	//복수 대상 조회
	public selectDayAggregationList(request: DayAggregation){
		return this.httpPost('/api/dayAggregation/selectDayAggregationList',request);
	}

	//수정
	public updateDayAggregation(request: DayAggregation){
		return this.httpPost('/api/dayAggregation/updateDayAggregation',request);
	}

	//등록
	public insertDayAggregation(request: DayAggregation){
		return this.httpPost('/api/dayAggregation/insertDayAggregation',request);
	}

	//수정+등록
	public saveDayAggregation(request: DayAggregation){
		return this.httpPost('/api/dayAggregation/saveDayAggregation',request);
	}

	//삭제
	public deleteDayAggregation(request: DayAggregation){
		return this.httpPost('/api/dayAggregation/deleteDayAggregation',request);
	}
	//엑셀
	public excelDayAggregation(request: DayAggregation){
		return this.httpUrl('/api/dayAggregation/excel',request);
	}
	//엑셀
	public excelDayAggregation2(request: DayAggregation){
		return this.httpUrl('/api/dayAggregation/excel2',request);
	}
	//엑셀
	public excelDayAggregation3(request: DayAggregation){
		return this.httpUrl('/api/dayAggregation/excel3',request);
	}
	//레포트
	public reportDayAggregation(request: DayAggregation){
		return this.httpPost('/api/dayAggregation/reportDayAggregation',request);
	}

	//도움말
	public helpDayAggregation(request: DayAggregation){
		return this.httpPost('/api/dayAggregation/deleteDayAggregation',request);
	}

}