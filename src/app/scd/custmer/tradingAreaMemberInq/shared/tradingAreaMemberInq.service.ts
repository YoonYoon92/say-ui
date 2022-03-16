import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { TradingAreaMemberInq } from './tradingAreaMemberInq.model';

@Injectable()
export class TradingAreaMemberInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/tradingAreaMemberInq',null);
	}

	//단일 대상 조회
	public selectTradingAreaMemberInq(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/selectTradingAreaMemberInq',request);
	}

	//복수 대상 조회
	public selectTradingAreaMemberInqList(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/selectTradingAreaMemberInqList',request);
	}
	//상권리스트조회
	public tradingAreaCdList(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/tradingAreaCdList',request);
	}
	
	public areaCdList(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/areaCdList',request);
	}
	//수정
	public updateTradingAreaMemberInq(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/updateTradingAreaMemberInq',request);
	}

	//등록
	public insertTradingAreaMemberInq(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/insertTradingAreaMemberInq',request);
	}

	//수정+등록
	public saveTradingAreaMemberInq(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/saveTradingAreaMemberInq',request);
	}

	//삭제
	public deleteTradingAreaMemberInq(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/deleteTradingAreaMemberInq',request);
	}

	//엑셀
	public excelTradingAreaMemberInq(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/deleteTradingAreaMemberInq',request);
	}

	//레포트
	public reportTradingAreaMemberInq(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/reportTradingAreaMemberInq',request);
	}

	//도움말
	public helpTradingAreaMemberInq(request: TradingAreaMemberInq){
		return this.httpPost('/api/tradingAreaMemberInq/deleteTradingAreaMemberInq',request);
	}

}