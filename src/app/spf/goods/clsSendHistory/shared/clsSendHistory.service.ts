import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ClsSendHistory } from './clsSendHistory.model';

@Injectable()
export class ClsSendHistoryService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/clsSendHistory',null);
	}



	//복수 대상 조회
	public selectClsSendHistoryList(request: ClsSendHistory){
		return this.httpPost('/api/clsSendHistory/selectClsSendHistoryList',request);
	}

	//세분류 조회
	public selectStoreComboLv4List(request: ClsSendHistory){
		return this.httpPost('/api/clsSendHistory/selectStoreComboLv4List',request);
	}
	public selectClsList(request: ClsSendHistory){
		return this.httpPost('/api/clsSendHistory/selectClsList',request);
	}
	public selectCls2List(request: ClsSendHistory){
		return this.httpPost('/api/clsSendHistory/selectCls2List',request);
	}
	//엑셀
	public excelClsSendHistory(request: ClsSendHistory){
		return this.httpPost('/api/clsSendHistory/deleteClsSendHistory',request);
	}

	//레포트
	public reportClsSendHistory(request: ClsSendHistory){
		return this.httpPost('/api/clsSendHistory/reportClsSendHistory',request);
	}

	//도움말
	public helpClsSendHistory(request: ClsSendHistory){
		return this.httpPost('/api/clsSendHistory/deleteClsSendHistory',request);
	}
	//코너조회
	public selectConerList(request: ClsSendHistory){
		return this.httpPost('/api/clsInq/selectConerList',request);
	}
	//클래스상세조회
	public selectDetailClsList(request: ClsSendHistory){
		return this.httpPost('/api/clsInq/selectDetailClsList',request);
	}

}