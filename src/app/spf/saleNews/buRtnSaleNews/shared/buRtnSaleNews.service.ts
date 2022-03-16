import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { BuRtnSaleNews } from './buRtnSaleNews.model';

@Injectable()
export class BuRtnSaleNewsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/buRtnSaleNews',null);
	}

	//단일 대상 조회
	public selectBuRtnSaleNews(request: BuRtnSaleNews){
		return this.httpPost('/api/buRtnSaleNews/selectBuRtnSaleNews',request);
	}

	//복수 대상 조회
	public selectBuRtnSaleNewsList(request: BuRtnSaleNews){
		return this.httpPost('/api/buRtnSaleNews/selectBuRtnSaleNewsList',request);
	}

	//수정
	public updateBuRtnSaleNews(request: BuRtnSaleNews){
		return this.httpPost('/api/buRtnSaleNews/updateBuRtnSaleNews',request);
	}

	//등록
	public insertBuRtnSaleNews(request: BuRtnSaleNews){
		return this.httpPost('/api/buRtnSaleNews/insertBuRtnSaleNews',request);
	}

	//수정+등록
	public saveBuRtnSaleNews(request: BuRtnSaleNews){
		return this.httpPost('/api/buRtnSaleNews/saveBuRtnSaleNews',request);
	}

	//삭제
	public deleteBuRtnSaleNews(request: BuRtnSaleNews){
		return this.httpPost('/api/buRtnSaleNews/deleteBuRtnSaleNews',request);
	}


   	//CSV
   	public csvBuRtnSaleNews(request: BuRtnSaleNews){
		return this.httpUrl('/api/buRtnSaleNews/downloadCsv',request);
	}

   	//Excel
   	public excelBuRtnSaleNews(request: BuRtnSaleNews){
		return this.httpUrl('/api/buRtnSaleNews/downloadExcel',request);
	}

 	//레포트
 	public reportBuRtnSaleNews(request: BuRtnSaleNews){
		return this.httpUrl('/api/buRtnSaleNews/viewReport',request);
	}

	//도움말
	public helpBuRtnSaleNews(){
		return 'https://www.google.com';
		// return this.httpUrl('/1232412.mht',null);
	 }

}