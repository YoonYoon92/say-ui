import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ClsPlnNetSaleSlt } from './clsPlnNetSaleSlt.model';

@Injectable()
export class ClsPlnNetSaleSltService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/clsPlnNetSaleSlt',null);
	}

	//단일 대상 조회
	public selectClsPlnNetSaleSlt(request: ClsPlnNetSaleSlt){
		return this.httpPost('/api/clsPlnNetSaleSlt/selectClsPlnNetSaleSlt',request);
	}

	//복수 대상 조회
	public selectClsPlnNetSaleSltList(request: ClsPlnNetSaleSlt){
		return this.httpPost('/api/clsPlnNetSaleSlt/selectClsPlnNetSaleSltList',request);
	}

	//수정
	public updateClsPlnNetSaleSlt(request: ClsPlnNetSaleSlt){
		return this.httpPost('/api/clsPlnNetSaleSlt/updateClsPlnNetSaleSlt',request);
	}

	//등록
	public insertClsPlnNetSaleSlt(request: ClsPlnNetSaleSlt){
		return this.httpPost('/api/clsPlnNetSaleSlt/insertClsPlnNetSaleSlt',request);
	}

	//수정+등록
	public saveClsPlnNetSaleSlt(request: ClsPlnNetSaleSlt){
		return this.httpPost('/api/clsPlnNetSaleSlt/saveClsPlnNetSaleSlt',request);
	}

	//삭제
	public deleteClsPlnNetSaleSlt(request: ClsPlnNetSaleSlt){
		return this.httpPost('/api/clsPlnNetSaleSlt/deleteClsPlnNetSaleSlt',request);
	}

	//엑셀
	public excelClsPlnNetSaleSlt(request: ClsPlnNetSaleSlt){
		return this.httpPost('/api/clsPlnNetSaleSlt/deleteClsPlnNetSaleSlt',request);
	}

	//레포트
	public reportClsPlnNetSaleSlt(request: ClsPlnNetSaleSlt){
		return this.httpPost('/api/clsPlnNetSaleSlt/reportClsPlnNetSaleSlt',request);
	}

	//도움말
	public helpClsPlnNetSaleSlt(request: ClsPlnNetSaleSlt){
		return this.httpPost('/api/clsPlnNetSaleSlt/deleteClsPlnNetSaleSlt',request);
	}

}