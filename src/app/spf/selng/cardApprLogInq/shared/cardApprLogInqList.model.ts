export class CardApprLogInqList {

   apprDate              :string;         //날짜
   van                   :string;         //van사          
   wcc                   :string;         //승인구분WCC (A: swipe, I: IC, F: fallback, Z: ic수기입력, @: magnetic수기입력)          
   regi                  :string;         //regi번호         
   receipt               :string;         //영수증번호      
   replyCd               :string;         //응답코드      
   msg                   :string;         //응답메시지          
   repNo                 :string;         //대표번호        
   cardCoNm              :string;         //대표카드사명     
   apprCardCo            :string;         //카드사(카드사코드+카드사명)   
   apprCardCoCd          :string;         //카드사코드(2byte)
   apprCardCoNm          :string;         //카드사명 
   apprMaeipCo           :string;         //매입사(매입사코드+매입사명)  
   apprMaeipCoCd         :string;         //매입사코드(2byte)
   apprMaeipCoNm         :string;         //매입사명
   reqc                  :string;         //전문구분(0200:승인, 0420:취소)         
   cardNoNonMask         :string;         //카드번호(full)
   cardNoMask            :string;         //카드번호(마스킹)   
   appNo                 :string;         //승인번호        
   amt                   :number;         //승인금액          
   sdateTime             :string;         //승인요청시간        
   rdateTime             :string;         //승인응답시간        
   rsec                  :number;         //응답시간(초)         
   confCardNo            :string;         //확정카드번호   
   confirm               :string;         //확정유무                                   

}