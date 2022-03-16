import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CloseBefZoneSalePrint } from './closeBefZoneSalePrint.model';

@Injectable()
export class CloseBefZoneSalePrintService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/CloseBefZoneSalePrint',null);
	}

	//단일 대상 조회
	public selectCloseBefZoneSalePrint(request: CloseBefZoneSalePrint){
		return this.httpPost('/api/CloseBefZoneSalePrint/selectCloseBefZoneSalePrint',request);
	}

	//복수 대상 조회
	public selectCloseBefZoneSalePrintList(request: CloseBefZoneSalePrint){
		return this.httpPost('/api/CloseBefZoneSalePrint/selectCloseBefZoneSalePrintList',request);
	}

	//수정
	public updateCloseBefZoneSalePrint(request: CloseBefZoneSalePrint){
		return this.httpPost('/api/CloseBefZoneSalePrint/updateCloseBefZoneSalePrint',request);
	}

	//등록
	public insertCloseBefZoneSalePrint(request: CloseBefZoneSalePrint){
		return this.httpPost('/api/CloseBefZoneSalePrint/insertCloseBefZoneSalePrint',request);
	}

	//수정+등록
	public saveCloseBefZoneSalePrint(request: CloseBefZoneSalePrint){
		return this.httpPost('/api/CloseBefZoneSalePrint/saveCloseBefZoneSalePrint',request);
	}

	//삭제
	public deleteCloseBefZoneSalePrint(request: CloseBefZoneSalePrint){
		return this.httpPost('/api/CloseBefZoneSalePrint/deleteCloseBefZoneSalePrint',request);
	}

	//엑셀
	public excelCloseBefZoneSalePrint(request: CloseBefZoneSalePrint){
		// return this.httpUrl('/api/CloseBefZoneSalePrint/csv',request);
		return this.httpUrl('/api/CloseBefZoneSalePrint/excel',request);
	}

	//레포트
	public reportCloseBefZoneSalePrint(request: CloseBefZoneSalePrint){
		return this.httpUrl('/api/closeBefZoneSalePrint/reportCloseBefZoneSalePrintList',request);
	}

	//도움말
	public helpCloseBefZoneSalePrint(){
		// return 'https://www.google.com';
		return this.httpUrl('/help_doc_test.html',null);
	}

}