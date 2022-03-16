import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { PcLastYearCntstIncrsrateInq } from './pcLastYearCntstIncrsrateInq.model';

@Injectable()
export class PcLastYearCntstIncrsrateInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/pcLastYearCntstIncrsrateInq',null);
	}

	//단일 대상 조회
	public selectPcLastYearCntstIncrsrateInq(request: PcLastYearCntstIncrsrateInq){
		return this.httpPost('/api/pcLastYearCntstIncrsrateInq/selectPcLastYearCntstIncrsrateInq',request);
	}

	//복수 대상 조회
	public selectPcLastYearCntstIncrsrateInqList(request: PcLastYearCntstIncrsrateInq){
		return this.httpPost('/api/pcLastYearCntstIncrsrateInq/selectPcLastYearCntstIncrsrateInqList',request);
	}
	//존 조회
	public selectzoneStoreList(request: PcLastYearCntstIncrsrateInq){
		return this.httpPost('/api/pcLastYearCntstIncrsrateInq/selectzoneStoreList',request);
	}
	

	//엑셀
	public excelPcLastYearCntstIncrsrateInq(request: PcLastYearCntstIncrsrateInq){
		return this.httpUrl('/api/pcLastYearCntstIncrsrateInq/downloadExcel',request);
	}

	//레포트
	public reportPcLastYearCntstIncrsrateInq(request: PcLastYearCntstIncrsrateInq){
		return this.httpPost('/api/pcLastYearCntstIncrsrateInq/reportPcLastYearCntstIncrsrateInq',request);
	}

	//도움말
	public helpPcLastYearCntstIncrsrateInq(request: PcLastYearCntstIncrsrateInq){
		return this.httpPost('/api/pcLastYearCntstIncrsrateInq/deletePcLastYearCntstIncrsrateInq',request);
	}

}