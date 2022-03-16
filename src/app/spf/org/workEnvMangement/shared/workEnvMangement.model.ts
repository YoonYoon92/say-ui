export class WorkEnvMangement {
	startDt 		      : string;   /*시작일*/
	endDt   		      : string;   /*종료일*/

   jum			      : string;	/*점*/
   bu                : string;   /*부*/
   tim               : string;   /*팀*/

   storeLvCd         : string;	/*조직코드*/
   storeLvNm         : string;	/*조직명*/
   paramLvCd         : string;	/*조직 검색 코드*/


   workDay           : string; //선택 요일
   workYN            : string; //선택 영업유무
   workForm          : string; //선택 영업형태
   workTemperature   : string; //선택 온도
   workWeather       : string; //선택 날씨
   workCompareDt     : string; //선택 대비일
   workCarCnt        : string; //선택 차대수
   workcustomerCnt   : string; //선택 고객수
   toDay             : string; //당일
}