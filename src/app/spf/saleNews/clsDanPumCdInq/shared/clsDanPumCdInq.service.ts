import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ClsDanPumCdInq } from './clsDanPumCdInq.model';

@Injectable()
export class ClsDanPumCdInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/clsDanPumCdInq',null);
	}

	//단일 대상 조회
	public selectClsDanPumCdInq(request: ClsDanPumCdInq){
		return this.httpPost('/api/clsDanPumCdInq/selectClsDanPumCdInq',request);
	}

	//복수 대상 조회
	public selectClsDanPumCdInqList(request: ClsDanPumCdInq){
		return this.httpPost('/api/clsDanPumCdInq/selectClsDanPumCdInqList',request);
	}

	//수정
	public updateClsDanPumCdInq(request: ClsDanPumCdInq){
		return this.httpPost('/api/clsDanPumCdInq/updateClsDanPumCdInq',request);
	}

	//등록
	public insertClsDanPumCdInq(request: ClsDanPumCdInq){
		return this.httpPost('/api/clsDanPumCdInq/insertClsDanPumCdInq',request);
	}

	//수정+등록
	public saveClsDanPumCdInq(request: ClsDanPumCdInq){
		return this.httpPost('/api/clsDanPumCdInq/saveClsDanPumCdInq',request);
	}

	//삭제
	public deleteClsDanPumCdInq(request: ClsDanPumCdInq){
		return this.httpPost('/api/clsDanPumCdInq/deleteClsDanPumCdInq',request);
	}

	//엑셀
	public excelClsDanPumCdInq(request: ClsDanPumCdInq){
		return this.httpUrl('/api/clsDanPumCdInq/downloadExcel',request);
	}

	//레포트
	public reportClsDanPumCdInq(request: ClsDanPumCdInq){
		return this.httpUrl('/api/clsDanPumCdInq/reportClsDanPumCdInq',request);
	}

	//도움말
	public helpClsDanPumCdInq(request: ClsDanPumCdInq){
		return this.httpPost('/api/clsDanPumCdInq/deleteClsDanPumCdInq',request);
	}

}