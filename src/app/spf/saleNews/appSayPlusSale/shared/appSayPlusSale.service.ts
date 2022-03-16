import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { AppSayPlusSale } from './appSayPlusSale.model';

@Injectable()
export class AppSayPlusSaleService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/appSayPlusSale',null);
	}

	//단일 대상 조회
	public selectAppSayPlusSale(request: AppSayPlusSale){
		return this.httpPost('/api/appSayPlusSale/selectAppSayPlusSale',request);
	}

	//복수 대상 조회
	public selectAppSayPlusSaleList(request: AppSayPlusSale){
		return this.httpPost('/api/appSayPlusSale/selectAppSayPlusSaleList',request);
	}

	//수정
	public updateAppSayPlusSale(request: AppSayPlusSale){
		return this.httpPost('/api/appSayPlusSale/updateAppSayPlusSale',request);
	}

	//등록
	public insertAppSayPlusSale(request: AppSayPlusSale){
		return this.httpPost('/api/appSayPlusSale/insertAppSayPlusSale',request);
	}

	//수정+등록
	public saveAppSayPlusSale(request: AppSayPlusSale){
		return this.httpPost('/api/appSayPlusSale/saveAppSayPlusSale',request);
	}

	//삭제
	public deleteAppSayPlusSale(request: AppSayPlusSale){
		return this.httpPost('/api/appSayPlusSale/deleteAppSayPlusSale',request);
	}

	//엑셀
	public excelAppSayPlusSale(request: AppSayPlusSale){
		return this.httpPost('/api/appSayPlusSale/deleteAppSayPlusSale',request);
	}

	//레포트
	public reportAppSayPlusSale(request: AppSayPlusSale){
		return this.httpPost('/api/appSayPlusSale/reportAppSayPlusSale',request);
	}

	//도움말
	public helpAppSayPlusSale(request: AppSayPlusSale){
		return this.httpPost('/api/appSayPlusSale/deleteAppSayPlusSale',request);
	}

}