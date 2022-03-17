window.addEventListener("load", function(event){
    function timeServer(){
        let xmlHttp;
        //XMLHttpRequest는 대부분의 브라우저 지원 가능 : https://caniuse.com/#search=XMLHttpRequest
        if(window.XMLHttpRequest){
            xmlHttp = new XMLHttpRequest
            // InternetExplorer ActiveXObject 지원하는 경우
        } else if(window.ActiveXObject){
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
    

        xmlHttp.open('HEAD', window.location.href.toString(), false);
        xmlHttp.setRequestHeader("Content-Type", "text/html");
        xmlHttp.send('');
        /*
        받은 response 헤더정보에서 Date (시간정보) 정보 리턴. 
        */
        return xmlHttp.getResponseHeader("Date");
    }; // timeServer

    function timer(){
        var _ts = timeServer();
        //gmt 시간 가져오기 // Tue, 15 Mar 2022 00:00:00 GMT
        var sliceYear = _ts.slice(12,16);
        var sliceDay = _ts.slice(5,7);
        var sliceHr = _ts.slice(17,19);
        var sliceMin = _ts.slice(20,22);
        var sliceSec = _ts.slice(23,25);

        var nowTime = new Date(sliceYear, 02, sliceDay, sliceHr, sliceMin, sliceSec);
        //월은 index 로 -1 해야함 주의
        nowTime.setHours(nowTime.getHours() + 9);
        // 한국시간으로 맞추기

        var eventStart = new Date(2022, 02, 16, 00, 00, 00);
        var eventEnd = new Date(2022, 02, 16, 23, 59, 59);
        //아이폰의 크롬과 사파리에서는 Date 를 ', : 같은 기호 사용 불가로 위와 같은 표준 표기법 사용해야함
        // 참고 ) https://gosasac.tistory.com/48

        var countD = eventEnd.getDate() - nowTime.getDate();
        var countHr = eventEnd.getHours() - nowTime.getHours();
        var countMin = eventEnd.getMinutes() - nowTime.getMinutes();
        var countSec = eventEnd.getSeconds() - nowTime.getSeconds();

        if(countD < 10){ countD = "0" + countD };
        if(countHr < 10){ countHr = "0" + countHr };
        if(countMin < 10){ countMin = "0" + countMin };
        if(countSec < 10){ countHr = "0" + countSec };

        $(".clock .day").text(countD);
        $(".clock .hr").text(countHr);
        $(".clock .min").text(countMin);
        $(".clock .sec").text(countSec);

        if(nowTime >= eventStart && nowTime <= eventEnd){
            $("#timesale").attr("style", "display:block;")
        } else {
            $("#timesale").attr("style", "display:none;")
            clearInterval(timer);
        }
    }; //timer

    setInterval(timer, 1000);
});