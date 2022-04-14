window.addEventListener("load",function(event) {
    function timeServer() {
        let xmlHttp;

        // XMLHttpRequest는 대부분의 브라우저 지원가능: https://caniuse.com/#search=XMLHttpRequest
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();

            // InternetExplorer ActiveXObject 지원하는 경우
        } else if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }


        /*
            * xmlHttp.open
            *   : 헤더 정보만 받기 위해 HEAD방식으로 요청.
            *     HEAD정보만 달라는 뜻이고, async (비동기) false 옵션을 줘서 동기로 요청하겠다는 뜻.
            *     하지만 Synchronous XMLHttpRequest는 deprecated되었기 때문에 사용을 권장하지 않음.
            *
            * xmlHttp.setRequestHeader
            *   : reqeust header를 설정하는 부분.
            *     안보내도 되고, xmlHttp.setRequestHeader("Authorization", "ABCDEFG"); 이런식으로 보내도 된다.
            *
            * xmlHttp.send : HTTP 요청을 보낸다
            */
        xmlHttp.open('HEAD', window.location.href.toString(), false);
        xmlHttp.setRequestHeader("Content-Type", "text/html");
        xmlHttp.send('');

        /* 
            * 받은 response 헤더정보에서 Date 속성을 리턴.
            * 만약 모든 헤더정보가 보고싶다면 xmlHttp.getAllResponseHeaders()을 해보면 된다.
            * 시간정보를 받아오려면 Date를 가져오면 된다.
            */
        return xmlHttp.getResponseHeader("Date"); // type: string
    }; 
  
    
      function timer(){
          
          var _ts = timeServer(),
           _nowTime = new Date(_ts),
           _nowYear = _nowTime.getFullYear(),
           _nowMonth = _nowTime.getMonth(),
           _nowDate = _nowTime.getDate(),
          
           eventNow = new Date(_nowYear, _nowMonth, _nowDate),
           eventStart = new Date(시작연도,시작월-1,시작일),
           eventEnd = new Date(종료연도,종료월-1,종료일+1),
           //아이폰의 크롬과 사파리에서는 Date 를 ', : 같은 기호 사용 불가로 위와 같은 표준 표기법 사용해야함
           // 참고 ) https://gosasac.tistory.com/48
           // 주의 ) 월은 index 이므로 -1 해야함
           // 주의 ) 종료일은 해당 날짜의 23:59:59 까지 이므로 실제로 종료되는 시점은 종료일+1 의 00:00:00 임을 주의
              
           diffT =  eventEnd.getTime() - eventNow.getTime(),
           countD = (diffT / (1000 * 60 * 60 * 24)) -1,
           // 날짜 차이 계산. 밀리초를 날짜로 바꾸기 위해 (1000*60*60*24) 로 나눠줌
           // 참고 ) new Date(year,month,0) 으로 하면 0일은 없기 때문에 전월의 마지막 일이 출력됨
           // 주의 ) 종료일이 위에서  +1 이 되었으므로 -1 해주어야함
           countHr = 23 - _nowTime.getHours(),
           countMin = 59 - _nowTime.getMinutes(),
           countSec = 59 - _nowTime.getSeconds();

          if(countD < 10){countD = "0" + countD} 
          if(countHr < 10){countHr = "0" + countHr};
          if(countMin < 10){countMin = "0" + countMin};
          if(countSec < 10){countSec = "0" + countSec};

          $(".clock .day").text(countD);
          $(".clock .hr").text(countHr);
          $(".clock .min").text(countMin);
          $(".clock .sec").text(countSec);
           if(_nowTime >= eventStart && _nowTime <= eventEnd){
              $("#timesale").attr("style","display:block;")
           } else{
               $("#timesale").attr("style","display:none;")
               clearInterval(timer);
           }  
      }; // timer 
      //1초 간격으로 timeSale 실행
      setInterval(timer, 1000);

    // 특정 상세페이지에 이벤트 배너 감추기
    var _url = window.location.search,
     urlParam = new URLSearchParams(_url),
     product_no = urlParam.get('product_no');
       
    if(product_no == "242" || product_no == "243" || product_no == "247" || product_no == "248" || product_no == "249"){
    	$("#timerDetail").attr("style","display:block;");
    	$("#eventBannerDetail").attr("style","display:none;");
    }else if(product_no == "251" || product_no == "241" || product_no == "144"){
    	$("#timerDetail").attr("style","display:none;");
        $("#eventBannerDetail").attr("style","display:none;");
    }else{
    	$("#timerDetail").attr("style","display:none;")
    }

},false); 
