export class CornerManagementSave {

      ms05Jum         :    string;       //점코드        
      ms05Bu          :    string;       //부코드        
      ms05Tim         :    string;       //부코드        
      ms05Pc          :    string;       //부코드        
      ms05Corner      :    string;       //부코드        
      ms05CornerOn      :    string;       //온라인 코너

      // MS0501         2          COLHDG(' 점번호 ')    
      // MS0502         2          COLHDG(' 부서번호 ')  
      // MS0503         2          COLHDG(' 팀번호 ')    
      // MS0504         2          COLHDG(' Ｐ／Ｃ번호 ')
      // MS0505         5          COLHDG(' 코너번호 ')  
      // MS0506        24J         COLHDG(' 점명 ')      
      // MS0507        20J         COLHDG(' 부서명 ')    
      // MS0508        20J         COLHDG(' 팀명 ')      
      // MS0509        20J         COLHDG(' Ｐ／Ｃ명 ')  
      // MS0510        20J         COLHDG(' 코너명 ')    
      
      ms05JumNm     :    string;       //24J         COLHDG(' 점명 ')        
      ms05BuNm      :    string;       //20J         COLHDG(' 부서명 ')      
      ms05TimNm     :    string;       //20J         COLHDG(' 팀명 ')        
      ms05PcNm      :    string;       //20J         COLHDG(' Ｐ／Ｃ명 ')    
      ms05CornerNm  :    string;       //20J         COLHDG(' 코너명 ')      
      ms0511        :    string;       //1          COLHDG(' 코너등급 ')    
      ms0512        :    number;       //5P 2       COLHDG(' 코너직영인원 ')
      ms0513        :    number;       //5P 2       COLHDG(' 코너판촉인원 ')
      ms0514        :    number;       //5P 2       COLHDG(' 코너평수 ')    
      ms0515        :    string;       //8          COLHDG(' 코드폐기일 ')  
      ms0516        :    string;       //8          COLHDG(' 코드부여일 ')  
      ms0517        :    string;       //8          COLHDG(' 코드수정일 ')  
      ms0518        :    string;       //3          COLHDG(' ZONNING 구분 ')
      ms0519        :    string;       //8          COLHDG(' 등록 USER-ID') 
      ms0520        :    string;       //8          COLHDG(' 변경 USER-ID') 
      ms0521        :    string;       //3          COLHDG(' FILLER')       
      ms05211        :    string;       //1          COLHDG(' PDA사용')       
      ms05212        :    string;       //1          COLHDG(' 관리유무')       
      ms05213        :    string;       //1          COLHDG(' 온라인사업유무')       

      ms05703        :    string;       //1     매장종류      
      ms05704        :    string;       //8     신규입점일     
      ms05705        :    string;       //8     매출분석시작일       

      ms05103        :    string;       //8     계약시작일     
      ms05104        :    string;       //8     계약종료일
      dgs0204        :    string;       //8     계약사유
      ms05107        :    string;       //8     퇴점일
      egs0204        :    string;       //8     퇴점사유

      // * 재정에서　분류한　코드                                      
      // * MS0505:5:1 = '1' 직매입과세    '2' 면세                     
      // * MS0505:5:1 = '3' 특정매입과세  '4' 면세                     
      // * MS0505:5:1 = '5' 임대을과세    '7' 면세                     
      // * MS0505:5:1 = '9' 임대갑                                     
                                                                  
      // * MS0521 ----* 여분필드（ＰＤＡ사용／관리유무／온라인사업유무） 
}