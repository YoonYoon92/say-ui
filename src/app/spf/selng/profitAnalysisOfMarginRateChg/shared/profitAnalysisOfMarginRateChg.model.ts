export class ProfitAnalysisOfMarginRateChg {

	startYM 		    : string;   /*시작년월*/
	endYM   		    : string;   /*종료년월*/
   
   jum			    : string;	 /*점*/
   bu  			    : string;	 /*부*/
   tim			    : string;	 /*팀*/
   pc 			    : string;	 /*세분류*/
   cornerCd 	    : string;	 /*코너*/
   classkeyCd 	    : string;	 /*클래스키 2자리*/
   
   classCd         : string;   /*클래스   7자리*/
   classNm         : string;   /*클래스명*/

   prevMarginRate  : number;   /*전마진율*/
   afterMarginRate : number;   /*후마진율*/
   
   storeLvCd       : string;   /*조직코드*/
   storeLvNm       : string; 	 /*조직명*/
   paramLvCd       : string;	 /*조직 검색 코드*/

}