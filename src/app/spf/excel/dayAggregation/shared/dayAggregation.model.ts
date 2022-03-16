export class DayAggregation {
	startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/
	mmDt			: string;   /*1일*/
	mmEndDt			: string;   /*월말*/
	yyDt			: string;   /*1월*/
   jum			    : string;	/*점*/
   bu              : string;   /*부*/
   tim             : string;   /*팀*/

   storeLvCd       : string;	/*조직코드*/
   storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/

	comboVal   		: string;   /*콤보박스 값*/
	textFieldVal	: string;	/*text 값*/
	urlFieldVal		: string;	/*url 값*/
	emailFieldVal	: string;	/*email 값*/
	numFieldVal		: string;	/*숫자필드 값*/
	checkVal		: string;	/*체크박스 값 */
	toggleVal		: string;	/*토글 값 */
	dateVal		    : string;	/*날짜 값 */
}