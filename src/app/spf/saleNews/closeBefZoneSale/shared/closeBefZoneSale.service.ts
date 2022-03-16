import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CloseBefZoneSale } from './closeBefZoneSale.model';

@Injectable()
export class CloseBefZoneSaleService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/closeBefZoneSale',null);
	}

	//단일 대상 조회
	public selectCloseBefZoneSale(request: CloseBefZoneSale){
		return this.httpPost('/api/closeBefZoneSale/selectCloseBefZoneSale',request);
	}

	//복수 대상 조회
	public selectCloseBefZoneSaleList(request: CloseBefZoneSale){
		return this.httpPost('/api/closeBefZoneSale/selectCloseBefZoneSaleList',request);
	}

	//수정
	public updateCloseBefZoneSale(request: CloseBefZoneSale){
		return this.httpPost('/api/closeBefZoneSale/updateCloseBefZoneSale',request);
	}

	//등록
	public insertCloseBefZoneSale(request: CloseBefZoneSale){
		return this.httpPost('/api/closeBefZoneSale/insertCloseBefZoneSale',request);
	}

	//수정+등록
	public saveCloseBefZoneSale(request: CloseBefZoneSale){
		return this.httpPost('/api/closeBefZoneSale/saveCloseBefZoneSale',request);
	}

	//삭제
	public deleteCloseBefZoneSale(request: CloseBefZoneSale){
		return this.httpPost('/api/closeBefZoneSale/deleteCloseBefZoneSale',request);
	}

	//엑셀
	public excelCloseBefZoneSale(request: CloseBefZoneSale){
		return this.httpPost('/api/closeBefZoneSale/deleteCloseBefZoneSale',request);
	}

	//레포트
	public reportCloseBefZoneSale(request: CloseBefZoneSale){
		return this.httpPost('/api/closeBefZoneSale/reportCloseBefZoneSale',request);
	}

	//도움말
	public helpCloseBefZoneSale(request: CloseBefZoneSale){
		return this.httpPost('/api/closeBefZoneSale/deleteCloseBefZoneSale',request);
	}

}