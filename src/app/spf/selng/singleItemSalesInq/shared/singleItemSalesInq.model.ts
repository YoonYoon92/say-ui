export class SingleItemSalesInq {

	startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/

   jum			    : string;	 /*점*/
   bu              : string;   /*부*/
   tim             : string;   /*팀*/
   pc              : string;   /*세분류*/


   cornerCd        : string;   /*코너번호*/
   cornerName      : string;   /*코너명*/
   classKeyCd      : string;   /*클래스key*/
   classKeyName    : string;   /*클래스key명*/

   singleItemCd    : string;   /*단품코드*/
   singleItemName  : string;   /*단품명*/

   partner           : string; //협력업체
   partnerNm         : string; //협력업체명


   lcatCd          : string;   /*품목코드 대분류*/
   mcatCd          : string;   /*품목코드 중분류*/
   scatCd          : string;   /*품목코드 소분류*/

   lcatName        : string;   /*품목명 대분류*/
   mcatName        : string;   /*품목명 중분류*/
   scatName        : string;   /*품목명 소분류*/
   
   storeLvCd       : string;   /*조직코드*/
   storeLvNm       : string; 	 /*조직명*/
   paramLvCd       : string;	 /*조직 검색 코드*/

}