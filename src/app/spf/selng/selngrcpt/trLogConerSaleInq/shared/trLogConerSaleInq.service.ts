import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../../shared/api-http.service';
import { TrLogConerSaleInq } from './TrLogConerSaleInq.model';

@Injectable()
export class TrLogConerSaleInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/TrLogConerSaleInq',null);
	}


	//복수 대상 조회
	public selectTrLogConerSaleInqList(request: TrLogConerSaleInq){
		return this.httpPost('/api/TrLogConerSaleInq/selectTrLogConerSaleInqList',request);
	}


	//엑셀
	public excelTrLogConerSaleInq(request: TrLogConerSaleInq){
		return this.httpPost('/api/TrLogConerSaleInq/deleteTrLogConerSaleInq',request);
	}

	//레포트
	public reportTrLogConerSaleInq(request: TrLogConerSaleInq){
		return this.httpPost('/api/TrLogConerSaleInq/reportTrLogConerSaleInq',request);
	}

	//도움말
	public helpTrLogConerSaleInq(request: TrLogConerSaleInq){
		return this.httpPost('/api/TrLogConerSaleInq/deleteTrLogConerSaleInq',request);
	}

}