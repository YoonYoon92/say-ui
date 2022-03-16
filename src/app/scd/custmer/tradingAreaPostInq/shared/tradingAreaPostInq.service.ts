import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { TradingAreaPostInq } from './tradingAreaPostInq.model';

@Injectable()
export class TradingAreaPostInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/tradingAreaPostInq',null);
	}

	//단일 대상 조회
	public selectTradingAreaPostInq(request: TradingAreaPostInq){
		return this.httpPost('/api/tradingAreaPostInq/selectTradingAreaPostInq',request);
	}

	//복수 대상 조회
	public selectTradingAreaPostInqList(request: TradingAreaPostInq){
		return this.httpPost('/api/tradingAreaPostInq/selectTradingAreaPostInqList',request);
	}
	//상권 리스트 조회
	public tradingAreaCdList(request: TradingAreaPostInq){
		return this.httpPost('/api/tradingAreaPostInq/tradingAreaCdList',request);
	}

	
}