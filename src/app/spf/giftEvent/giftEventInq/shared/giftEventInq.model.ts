export class GiftEventInq {
	dbType				: string;
	startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/

   jum			    : string;	/*점*/
   bu              : string;   /*부*/
   tim             : string;   /*팀*/

   storeLvCd       : string;	/*조직코드*/
   storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/


	searchDay	    : string;  /*검색일*/
	eventYY	       : string;  /*행사년도*/        
	eventNo	       : string;  /*행사번호*/                  
	frEventDay	    : string;  /*행사시작일*/
	toEventDay	    : string;  /*행사종료일*/
	eventName	    : string;  /*행사명*/               
	saleLevel       : number;  /*지급금액대*/               
	eventGift       : number;  /*지급상품권*/              
	eventGoods      : number;  /*지급사은품*/             
	eventEtc        : number;  /*지급기타*/ 
}