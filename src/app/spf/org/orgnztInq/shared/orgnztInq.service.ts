import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { OrgnztInq } from './OrgnztInq.model';

@Injectable()
export class OrgnztInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/orgnztInq',null);
	}
	//복수 대상 조회
	public selectOrgnztInqList(request: OrgnztInq){
		return this.httpPost('/api/orgnztInq/selectOrgnztInqList',request);
	}
	//세분류 조회
	public selectStoreComboLv4List(request: OrgnztInq){
		return this.httpPost('/api/orgnztInq/selectStoreComboLv4List',request);
	}
	//존리스트 조회
	public selectzoneStoreList(request: OrgnztInq){
		return this.httpPost('/api/orgnztInq/selectzoneStoreList',request);
	}
	//존리스트 조회
	public zoneStoreList(request: OrgnztInq){
		return this.httpPost('/api/orgnztInq/zoneStoreList',request);
	}
	//재활용가능코너 리스트
	public recycleStoreList(request: OrgnztInq){
		return this.httpPost('/api/orgnztInq/recycleStoreList',request);
	}

	//엑셀
	public excelOrgnztInq(request: OrgnztInq){
		return this.httpPost('/api/orgnztInq/deleteOrgnztInq',request);
	}


	//도움말
	public helpOrgnztInq(request: OrgnztInq){
		return this.httpPost('/api/orgnztInq/deleteOrgnztInq',request);
	}

}