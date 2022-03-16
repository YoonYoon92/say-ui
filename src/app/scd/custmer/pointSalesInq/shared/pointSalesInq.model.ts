import { NumberValueAccessor } from "@angular/forms";

export class PointSalesInq {
	startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/

   jum			    : string;	/*점*/
   bu              : string;   /*부*/
   tim             : string;   /*팀*/

   storeLvCd       : string;	/*조직코드*/
   storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/

   searchDt          : string;
   searchPoint       : string;
   
   stsDiv            : string;
   pointNm           : string;
   pointScore        : number;
   lostPoint         : number;

   saleDt            : string;
   saleDiv           : string;
   posNum            : string;
   receipt           : string;
   clsNm             : string;
   pointDiv          : string;
   cardSale          : number;
   cardPoint         : number;
   cashSale          : number;
   cashPoint         : number;
   salePoint         : number;
   totPoint          : number;
   netSale           : number;
   saleReturn        : string;
   saleUpate         : string;

}