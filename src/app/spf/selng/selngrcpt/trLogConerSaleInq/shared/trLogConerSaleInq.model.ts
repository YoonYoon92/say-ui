export class TrLogConerSaleInq {
	startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/
   endDtCheck	    : string;   /*종료일*/


   jum			    : string;	/*점*/
   bu              : string;   /*부*/
   tim             : string;   /*팀*/
   coner           : string; /*코너*/
   conerNm         : string; /*코너명*/
   pos             : string; /*포스번호*/
   dt              : string; /*조회날짜*/
   regi            : string; /*포스번호*/
   recipt          : string; /*조회날짜*/
   div             : string; /*구분*/ 
   discount        : number; //할인
   netSale         : number;  //순매출
   totSale         : number;  //총매출


   storeLvCd       : string;	/*조직코드*/
   storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/
   prePayCheck     : string;  /*선수금체크---일반결제N,선수금Y,일반외상C*/
   prePayCheckNm   : string;  /*선수금체크*/
}