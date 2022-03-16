import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { EventHallSaleInq } from './eventHallSaleInq.model';
import { EventHallSaleInqSearch } from './eventHallSaleInq.Searchmodel';

@Injectable()
export class EventHallSaleInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/eventHallSaleInq',null);
	}



	//복수 대상 조회
	public selectEventHallSaleInqList(request: EventHallSaleInq){
		return this.httpPost('/api/eventHallSaleInq/selectEventHallSaleInqList',request);
	}
	//행사리스트 조회
	public selectEventHallSaleInqSearchList(request: EventHallSaleInqSearch){
		return this.httpPost('/api/eventHallSaleInq/selectEventHallSaleInqSearchList',request);
	}
	//PC리스트 조회
	public selectPcListStoreList(request: EventHallSaleInqSearch){
		return this.httpPost('/api/eventHallSaleInq/PcList',request);
	}
	
}