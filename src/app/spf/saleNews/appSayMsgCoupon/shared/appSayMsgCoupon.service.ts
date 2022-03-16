import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { AppSayMsgCoupon } from './appSayMsgCoupon.model';

@Injectable()
export class AppSayMsgCouponService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/appSayMsgCoupon',null);
	}

	//단일 대상 조회
	public selectAppSayMsgCoupon(request: AppSayMsgCoupon){
		return this.httpPost('/api/appSayMsgCoupon/selectAppSayMsgCoupon',request);
	}

	//복수 대상 조회
	public selectAppSayMsgCouponList(request: AppSayMsgCoupon){
		return this.httpPost('/api/appSayMsgCoupon/selectAppSayMsgCouponList',request);
	}

	//수정
	public updateAppSayMsgCoupon(request: AppSayMsgCoupon){
		return this.httpPost('/api/appSayMsgCoupon/updateAppSayMsgCoupon',request);
	}

	//등록
	public insertAppSayMsgCoupon(request: AppSayMsgCoupon){
		return this.httpPost('/api/appSayMsgCoupon/insertAppSayMsgCoupon',request);
	}

	//수정+등록
	public saveAppSayMsgCoupon(request: AppSayMsgCoupon){
		return this.httpPost('/api/appSayMsgCoupon/saveAppSayMsgCoupon',request);
	}

	//삭제
	public deleteAppSayMsgCoupon(request: AppSayMsgCoupon){
		return this.httpPost('/api/appSayMsgCoupon/deleteAppSayMsgCoupon',request);
	}

	//엑셀
	public excelAppSayMsgCoupon(request: AppSayMsgCoupon){
		return this.httpPost('/api/appSayMsgCoupon/deleteAppSayMsgCoupon',request);
	}

	//레포트
	public reportAppSayMsgCoupon(request: AppSayMsgCoupon){
		return this.httpPost('/api/appSayMsgCoupon/reportAppSayMsgCoupon',request);
	}

	//도움말
	public helpAppSayMsgCoupon(request: AppSayMsgCoupon){
		return this.httpPost('/api/appSayMsgCoupon/deleteAppSayMsgCoupon',request);
	}

}