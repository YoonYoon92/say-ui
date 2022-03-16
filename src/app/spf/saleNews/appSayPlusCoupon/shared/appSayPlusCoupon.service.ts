import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { AppSayPlusCoupon } from './appSayPlusCoupon.model';

@Injectable()
export class AppSayPlusCouponService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/appSayPlusCoupon',null);
	}

	//단일 대상 조회
	public selectAppSayPlusCoupon(request: AppSayPlusCoupon){
		return this.httpPost('/api/appSayPlusCoupon/selectAppSayPlusCoupon',request);
	}

	//복수 대상 조회
	public selectAppSayPlusCouponList(request: AppSayPlusCoupon){
		return this.httpPost('/api/appSayPlusCoupon/selectAppSayPlusCouponList',request);
	}

	//수정
	public updateAppSayPlusCoupon(request: AppSayPlusCoupon){
		return this.httpPost('/api/appSayPlusCoupon/updateAppSayPlusCoupon',request);
	}

	//등록
	public insertAppSayPlusCoupon(request: AppSayPlusCoupon){
		return this.httpPost('/api/appSayPlusCoupon/insertAppSayPlusCoupon',request);
	}

	//수정+등록
	public saveAppSayPlusCoupon(request: AppSayPlusCoupon){
		return this.httpPost('/api/appSayPlusCoupon/saveAppSayPlusCoupon',request);
	}

	//삭제
	public deleteAppSayPlusCoupon(request: AppSayPlusCoupon){
		return this.httpPost('/api/appSayPlusCoupon/deleteAppSayPlusCoupon',request);
	}

	//엑셀
	public excelAppSayPlusCoupon(request: AppSayPlusCoupon){
		return this.httpPost('/api/appSayPlusCoupon/deleteAppSayPlusCoupon',request);
	}

	//레포트
	public reportAppSayPlusCoupon(request: AppSayPlusCoupon){
		return this.httpPost('/api/appSayPlusCoupon/reportAppSayPlusCoupon',request);
	}

	//도움말
	public helpAppSayPlusCoupon(request: AppSayPlusCoupon){
		return this.httpPost('/api/appSayPlusCoupon/deleteAppSayPlusCoupon',request);
	}

}