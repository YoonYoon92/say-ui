import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { PointSalesInq } from './pointSalesInq.model';

@Injectable()
export class PointSalesInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/pointSalesInq',null);
	}

	//단일 대상 조회
	public selectPointSalesInq(request: PointSalesInq){
		return this.httpPost('/api/pointSalesInq/selectPointSalesInq',request);
	}

	//복수 대상 조회
	public selectPointSalesInqList(request: PointSalesInq){
		return this.httpPost('/api/pointSalesInq/selectPointSalesInqList',request);
	}

	//수정
	public updatePointSalesInq(request: PointSalesInq){
		return this.httpPost('/api/pointSalesInq/updatePointSalesInq',request);
	}

	//등록
	public insertPointSalesInq(request: PointSalesInq){
		return this.httpPost('/api/pointSalesInq/insertPointSalesInq',request);
	}

	//수정+등록
	public savePointSalesInq(request: PointSalesInq){
		return this.httpPost('/api/pointSalesInq/savePointSalesInq',request);
	}

	//삭제
	public deletePointSalesInq(request: PointSalesInq){
		return this.httpPost('/api/pointSalesInq/deletePointSalesInq',request);
	}

	//엑셀
	public excelPointSalesInq(request: PointSalesInq){
		return this.httpPost('/api/pointSalesInq/deletePointSalesInq',request);
	}

	//레포트
	public reportPointSalesInq(request: PointSalesInq){
		return this.httpPost('/api/pointSalesInq/reportPointSalesInq',request);
	}

	//도움말
	public helpPointSalesInq(request: PointSalesInq){
		return this.httpPost('/api/pointSalesInq/deletePointSalesInq',request);
	}

}