$(document).ready(function () {
    var pageNum = 1;

    $("#search").click(function () {
        $("p").html("");

        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v3/search/book?target=title",
            data: { query: $("#bookname").val(), page: pageNum},
            headers: {Authorization: "KakaoAK cc3f00d83ee24351443360e2a9d3b0e2"}

        })
        .done(function (msg) {
            console.log(msg);
            for (var i = 0; i < 10; i++){
                $("span").append("<h3><a href='"+ msg.documents[i].url +"'>" + msg.documents[i].title + "</a></h3>");
                $("span").append("<img src='" + msg.documents[i].thumbnail + "'>");
                // $("span").append("<strong>저자:</strong> " + msg.documents[i].authors);
                // $("span").append("<strong>출판사:</strong> " + msg.documents[i].publisher);
                // $("span").append("<span>상태:</span>"+msg.documents[i].status);
            };
        });
    })

    $(window).scroll(function(){  

        if ( Math.ceil($(window).scrollTop()) + $(window).height() >= $(document).height() ){
            pageNum++;
            $.ajax({
                method: "GET",
                url: "https://dapi.kakao.com/v3/search/book?target=title",
                data: { query: $("#bookname").val(),  page: pageNum},
                headers: {Authorization: "KakaoAK cc3f00d83ee24351443360e2a9d3b0e2"}
            })
            .done(function (msg) {
                console.log(msg);
                for (var i = 0; i < 10; i++){
                    $("span").append("<h3><a href='"+ msg.documents[i].url +"'>" + msg.documents[i].title + "</a></h3>");
                    $("span").append("<img src='" + msg.documents[i].thumbnail + "'/>");
                    // $("span").append("<strong>저자:</strong> " + msg.documents[i].authors);
                    // $("span").append("<strong>출판사:</strong> " + msg.documents[i].publisher);
                    // $("span").append("<span>상태:</span>"+msg.documents[i].status);

                }
            });

        }
    });
})