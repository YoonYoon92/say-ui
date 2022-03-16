export class ConerPlanCntstPerfomSts {
   dbType				: string;
   startDt 		    : string;   /*시작일*/
   endDt   		    : string;   /*종료일*/ 
   mmDt            : string;   //월1일
   yyDt              :string; //년1일

   serchLevel       : string; 

   jum			    : string;	/*점*/
   bu              : string;   /*부*/
   tim             : string;   /*팀*/
   pc              : string;  /*세분류*/
   jumNm			    : string;	/*점*/
   buNm              : string;   /*부*/
   timNm             : string;   /*팀*/
   pcNm              : string;  /*세분류*/


   storeLvCd       : string;	/*조직코드*/
   storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/
   

   
   coner           : string;  //코너
   conerNm         : string;  //코너명
   ddSplan         : number;  //일실적
   mmSplan         : number;  //월실적
   yySplan         : number;  //년실적
   ddTry           : number;  //일목표
   mmTry           : number;  //월목표
   yyTry           : number;  //년목표
   ddAchivmentrate : number;  //일달성율
   mmAchivmentrate : number;  //월달성율
   yyAchivmentrate : number;  //년달성율
}