import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { DirectoryOfPartnersInq } from './directoryOfPartnersInq.model';

@Injectable()
export class DirectoryOfPartnersInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/directoryOfPartnersInq',null);
	}

	//단일 대상 조회
	public selectDirectoryOfPartnersInq(request: DirectoryOfPartnersInq){
		return this.httpPost('/api/directoryOfPartnersInq/selectDirectoryOfPartnersInq',request);
	}

	//복수 대상 조회
	public selectDirectoryOfPartnersInqList(request: DirectoryOfPartnersInq){
		return this.httpPost('/api/directoryOfPartnersInq/selectDirectoryOfPartnersInqList',request);
	}

	//수정
	public updateDirectoryOfPartnersInq(request: DirectoryOfPartnersInq){
		return this.httpPost('/api/directoryOfPartnersInq/updateDirectoryOfPartnersInq',request);
	}

	//등록
	public insertDirectoryOfPartnersInq(request: DirectoryOfPartnersInq){
		return this.httpPost('/api/directoryOfPartnersInq/insertDirectoryOfPartnersInq',request);
	}

	//수정+등록
	public saveDirectoryOfPartnersInq(request: DirectoryOfPartnersInq){
		return this.httpPost('/api/directoryOfPartnersInq/saveDirectoryOfPartnersInq',request);
	}

	//삭제
	public deleteDirectoryOfPartnersInq(request: DirectoryOfPartnersInq){
		return this.httpPost('/api/directoryOfPartnersInq/deleteDirectoryOfPartnersInq',request);
	}

	//엑셀
	public excelDirectoryOfPartnersInq(request: DirectoryOfPartnersInq){
		return this.httpUrl('/api/directoryOfPartnersInq/downloadExcel',request);
	}

	//레포트
	public reportDirectoryOfPartnersInq(request: DirectoryOfPartnersInq){
		return this.httpUrl('/api/directoryOfPartnersInq/reportDirectoryOfPartnersInq',request);
	}

	//도움말
	public helpDirectoryOfPartnersInq(request: DirectoryOfPartnersInq){
		return this.httpPost('/api/directoryOfPartnersInq/deleteDirectoryOfPartnersInq',request);
	}

}