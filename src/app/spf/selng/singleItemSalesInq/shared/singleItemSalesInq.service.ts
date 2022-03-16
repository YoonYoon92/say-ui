import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { SingleItemSalesInq } from './singleItemSalesInq.model';

@Injectable()
export class SingleItemSalesInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/salesByTypeInq',null);
	}


	//복수 대상 조회
	public selectSingleItemSalesInqList(request: SingleItemSalesInq){
		return this.httpPost('/api/spf/selng/selectSingleItemSalesInqList',request);
	}

	//품목코드 대분류 combobox 생성 조회
	public selectStoreComboLargeCatList(request: SingleItemSalesInq){
		return this.httpPost('/api/spf/selng/selectStoreComboLargeCatList',request);
	}

	//품목코드 중분류 combobox 생성 조회
	public selectStoreComboMidiumCatList(request: SingleItemSalesInq){
		return this.httpPost('/api/spf/selng/selectStoreComboMidiumCatList',request);
	}

	//품목코드 소분류 combobox 생성 조회
	public selectStoreComboSmallCatList(request: SingleItemSalesInq){
		return this.httpPost('/api/spf/selng/selectStoreComboSmallCatList',request);
	}


}