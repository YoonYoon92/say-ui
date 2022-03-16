import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ProfitAnalysisOfMarginRateChg } from './profitAnalysisOfMarginRateChg.model';
import { ProfitAnalysisOfMarginRateChgCls } from './profitAnalysisOfMarginRateChgCls.model';

@Injectable()
export class ProfitAnalysisOfMarginRateChgService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/salesByTypeInq',null);
	}


	//복수 대상 조회
	public selectProfitAnalysisOfMarginRateChgList(request: ProfitAnalysisOfMarginRateChg){
		return this.httpPost('/api/spf/selng/selectProfitAnalysisOfMarginRateChgList',request);
	}

	//클래스상세조회
	public selectDetailClsList(request: ProfitAnalysisOfMarginRateChgCls){
		return this.httpPost('/api/clsInq/selectDetailClsList',request);
	}
	//클래스마진조회
	public selectDetailClsMargin(request: ProfitAnalysisOfMarginRateChgCls){
		return this.httpPost('/api/clsInq/selectDetailClsMargin',request);
	}



}