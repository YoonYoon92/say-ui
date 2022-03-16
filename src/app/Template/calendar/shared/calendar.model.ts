export class Calendar {
	startDt 		: string;   /*시작일*/
	endDt   		: string;   /*종료일*/

	comboVal   		: string;   /*콤보박스 값*/
	textFieldVal	: string;	/*text 값*/
	urlFieldVal		: string;	/*url 값*/
	emailFieldVal	: string;	/*email 값*/
	numFieldVal		: string;	/*숫자필드 값*/
	checkVal		: string;	/*체크박스 값 */
	toggleVal		: string;	/*토글 값 */
	dateVal		    : string;	/*날짜 값 */

	page    		: number;   /*현재 페이지*/
	start   		: number;   /*start index*/
	limit   		: number;   /*limit index*/

	storeLvCd          : string;	/*조직코드*/
	storeLvNm          : string;	/*조직명*/
	paramLvCd          : string;	/*조직 검색 코드*/
}