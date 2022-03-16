export class ReceiptInfoInq {
	startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/

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


	posNum			: string;
	receiptNum		: string;
	pointNum		: string; 
	totPoint		: string;
	payMethod		: string;
	payCardNum		: string;
	payAppNum		: string; 
	van				: string;

	stsDiv			: string;
	chit			: string;
	payDiv			: string;
	payPrice		: string;
	cardNo			: string;
	appNo			: string;

	cls			: string;
	clsNm		: string;
	item		: string;
	num			: number;
	price		: number;
	totPrice	: number;
	itemDiscount : number;
	netsales 		: number;

	couponCd			: string;
	couponNm			: string;
	couponDiscount	    : number;

	cashNum				: string;
	cashApp				: string;
	giftNum				: string;
	giftNm				: string;

	eventNm				: string;
	eventCd				: string;
	eventGiftNm				: string;
	eventGift				: number;
	eventAcceptAmount		: number;
}