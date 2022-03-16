export class SalePriceChgReqFormInq {
	startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/

   jum			    : string;	/*점*/
   bu              : string;   /*부*/
   tim             : string;   /*팀*/

   chit           : string; //전표
   chitNum        : string; //전표번호
   cls            : string; //클래스
   clsNm          : string; //클래스명
   item           : string; //품목
   itemNm         : string; //품목명
   newSale        : number; //신매가
   oldSale        : number; //구매가
   sumNewSale      : number; //신매가
   sumOldSale      : number; //구매가
   diffSale       : number; //차액
   itemNum        : number; //수량
   conf           : string; //확정
   storeLvCd       : string;	/*조직코드*/
   storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/
}