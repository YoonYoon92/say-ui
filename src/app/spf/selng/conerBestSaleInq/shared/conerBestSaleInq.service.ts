import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ConerBestSaleInq } from './conerBestSaleInq.model';

@Injectable()
export class ConerBestSaleInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/conerBestSaleInq',null);
	}

	//단일 대상 조회
	public selectConerBestSaleInq(request: ConerBestSaleInq){
		return this.httpPost('/api/conerBestSaleInq/selectConerBestSaleInq',request);
	}

	//복수 대상 조회
	public selectConerBestSaleInqList(request: ConerBestSaleInq){
		return this.httpPost('/api/conerBestSaleInq/selectConerBestSaleInqList',request);
	}

	//수정
	public updateConerBestSaleInq(request: ConerBestSaleInq){
		return this.httpPost('/api/conerBestSaleInq/updateConerBestSaleInq',request);
	}

	//등록
	public insertConerBestSaleInq(request: ConerBestSaleInq){
		return this.httpPost('/api/conerBestSaleInq/insertConerBestSaleInq',request);
	}

	//수정+등록
	public saveConerBestSaleInq(request: ConerBestSaleInq){
		return this.httpPost('/api/conerBestSaleInq/saveConerBestSaleInq',request);
	}

	//삭제
	public deleteConerBestSaleInq(request: ConerBestSaleInq){
		return this.httpPost('/api/conerBestSaleInq/deleteConerBestSaleInq',request);
	}

	//엑셀
	public excelConerBestSaleInq(request: ConerBestSaleInq){
		return this.httpPost('/api/conerBestSaleInq/deleteConerBestSaleInq',request);
	}

	//레포트
	public reportConerBestSaleInq(request: ConerBestSaleInq){
		return this.httpPost('/api/conerBestSaleInq/reportConerBestSaleInq',request);
	}

	//도움말
	public helpConerBestSaleInq(request: ConerBestSaleInq){
		return this.httpPost('/api/conerBestSaleInq/deleteConerBestSaleInq',request);
	}

}