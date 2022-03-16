import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CornerRtnSts } from './cornerRtnSts.model';

@Injectable()
export class CornerRtnStsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/report/cornerRtnSts',null);
	}

	//복수 대상 조회
	public selectCornerRtnStsList(request: CornerRtnSts){
		return this.httpPost('/api/cornerRtnSts/selectCornerRtnStsList',request);
	}

	//pdf
	public pdfCornerRtnSts(request: CornerRtnSts){
		return this.httpUrl('/api/report/cornerRtnSts/selectReport',request);
	}

	//csv
	public csvCornerRtnSts(request: CornerRtnSts){
		return this.httpUrl('/api/report/cornerRtnSts/report/csv',request);
	}

	//엑셀
	public excelCornerRtnSts(request: CornerRtnSts){
		return this.httpUrl('/api/report/cornerRtnSts/report/excel',request);
	}

	//도움말
	public helpCornerRtnSts(){
        return 'http://localhost:8000/indexDoc.html';
      //return this.httpUrl('/api/billReport/helpBillReport',null);
   }



}