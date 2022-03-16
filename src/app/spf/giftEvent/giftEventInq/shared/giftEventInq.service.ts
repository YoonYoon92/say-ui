import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { GiftEventInq } from './giftEventInq.model';

@Injectable()
export class GiftEventInqService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/giftEventInq',null);
	}

	//단일 대상 조회
	public selectGiftEventInq(request: GiftEventInq){
		return this.httpPost('/api/giftEventInq/selectGiftEventInq',request);
	}

	//복수 대상 조회
	public selectGiftEventInqList(request: GiftEventInq){
		return this.httpPost('/api/giftEventInq/selectGiftEventInqList',request);
	}

	//수정
	public updateGiftEventInq(request: GiftEventInq){
		return this.httpPost('/api/giftEventInq/updateGiftEventInq',request);
	}

	//등록
	public insertGiftEventInq(request: GiftEventInq){
		return this.httpPost('/api/giftEventInq/insertGiftEventInq',request);
	}

	//수정+등록
	public saveGiftEventInq(request: GiftEventInq){
		return this.httpPost('/api/giftEventInq/saveGiftEventInq',request);
	}

	//삭제
	public deleteGiftEventInq(request: GiftEventInq){
		return this.httpPost('/api/giftEventInq/deleteGiftEventInq',request);
	}

	//엑셀
	public excelGiftEventInq(request: GiftEventInq){
		return this.httpPost('/api/giftEventInq/deleteGiftEventInq',request);
	}

	//레포트
	public reportGiftEventInq(request: GiftEventInq){
		return this.httpPost('/api/giftEventInq/reportGiftEventInq',request);
	}

	//도움말
	public helpGiftEventInq(request: GiftEventInq){
		return this.httpPost('/api/giftEventInq/deleteGiftEventInq',request);
	}

}