$(document).ready(function () {
  function init() {
    active = "x"; //togle
    board = new Array(9);
    enabled = true;
    human = true;
    moves = 0;
  }

  $(".console").click(init).click();

  var $myel = $("#selectgame");
  if ($myel.css("visibility") === "visible") {
    $myel.hide();
    $myel.fadeIn("slow");
  }

  $("#go_cr").on("click", function () {//evento clic en jugar
    $myel.fadeOut("slow");
    agregarLineaColumnasXFilas();
  });

  function agregarLineaColumnasXFilas() {//agrega las lineas y columnas que ingresa el usuario
    var rows = "";
    var colms = "";
    var selected1 = $("#x_row");
    if (selected1.length > 0) {
      rows = selected1.val();
    }

    var selected2 = $("#x_col");
    if (selected2.length > 0) {
      colms = selected2.val();
    }

    if (rows != "" || colms != "") {
      

      $("#cmd").append(
        '<p class="line3"><img src="sources/head.png" style="width:10%;height:10%;" />Human gave input: size of grid->[' +
          rows +
          "x" +
          colms +
          "]<b></b></p>"
      );

      var m = +rows;
      var n = +colms;

      var count1 = 1;
      var count2 = 1;
      for (var i = 0; i < m; i++) {
        $(".wrap").append('<div class="row r0" id="avi' + count2 + '" >');
        for (var j = 0; j < n; j++) {
          var k = "#avi";
          var clsr = k.concat(count2.toString());
          $(clsr).append(
            '<div id="block' +
              count1 +
              '" class="el c0 d1 "> <div id="inner' +
              count1 +
              '" ></div></div>'
          );
          console.log(count1);

          count1++;
        }
        $(".wrap").append("</div>");

        count2++;
      }
      createDirt(m * n);
    }
  }

  function createDirt(k) {
    /// agrega lineas a la consola
    $("#cmd").append(
      '<p class="line3"><img src="sources/ai_image.png" style="width:10%;height:10%;" />Placing dirt randomly on the Grids....<b></b></p>'
    );
    console.log(k);
    for (let i = 1; i <= k; i++) {
      if (getRandomInt(4987) % 2 == 0) {
        addCsls(i);
      }
    }
    VaccumeScan(k);
  }

  function getRandomInt(max) {
    //get numero random
    return Math.floor(Math.random() * max);
  }

  function addCsls(i) {
    // agrega mugre
    var k = "#inner";
    var clsr = k.concat(i.toString());
    $(clsr).append(
      '<img src="sources/paint.png" style="width:70%;height:70%;" />'
    );
    console.log("apply dirt" + i);
    Startcleaning(i);
  }
  statarr = [];
  perarr = [];
  function Startcleaning(i) {
    if (!statarr.includes(i)) {
      statarr.push(i);
      console.log("arr" + i);
    }
  }

  function VaccumeScan(k) {
    //Ciclo de escaneo de bot de la aspiradora
    for (let i = 1; i <= k; i++) {
      setTimeout(function timer() {
        Scanning(i, k);
      }, i * 1000);
    }
  }

  function Scanning(i, k) {
    l = i - 1;
    Descan(l, k);
    if (i != k) {
      $("#cmd").append(
        '<p class="line1"> Vaccum cleaner scanning ->[' +
          i +
          "<sup>th</sup>] grid..<b></b></p>"
      );
      var h = "#block";
      var clsr = h.concat(i.toString());
      $(clsr).empty();
      $(clsr).append(
        '<img src="sources/vacuum.png" style="width:70%;height:70%;" />'
      );
    } else {
      var total = 0;
      for (var j in perarr) {
        total += perarr[j];
      }
      var score = total / k;
      if (statarr.includes(i)) {
        $("#cmd").append(
          '<p class="line3"> Dirt found..<span class="fa fa-exclamation-triangle"></span>->CLEANING [' +
            i +
            "<sup>th</sup>] grid..<b></b></p>"
        );
        $("#cmd").append(
          '<p class="line4"><img src="sources/ai_image.png" style="width:10%;height:10%;" /> AVERAGE PERFORMANCE->[' +
            score +
            "] <b></b></p>"
        );
        var h = "#block";
        var clsr = h.concat(i.toString());
        $(clsr).empty();
        $(clsr).append(
          '<img src="sources/checked.png" style="width:70%;height:70%;" />'
        );
        console.log("scanning");
      } else {
        $("#cmd").append(
          '<p class="line2"> Tile is already clean-> moving forward..END OF TILES<span class="fa fa-thumbs-up"></span></p>'
        );
        $("#cmd").append(
          '<p class="line4"><img src="sources/ai_image.png" style="width:10%;height:10%;" /> AVERAGE PERFORMANCE->[' +
            score * 100 +
            "%] <b></b></p>"
        );
        var h = "#block";
        var clsr = h.concat(i.toString());
        $(clsr).empty();
        $(clsr).append(
          '<img src="sources/vacuum.png" style="width:70%;height:70%;" />'
        );
      }
    }
  }

  function Descan(i, k) {
    if (l != 0) {
      if (statarr.includes(i)) {
        var score = (statarr.indexOf(i) + 1) / k;
        perarr.push(score);
        $("#cmd").append(
          '<p class="line3"> Dirt found..<span class="fa fa-exclamation-triangle"></span>->CLEANING [' +
            i +
            "<sup>th</sup>] grid..<b></b></p>"
        );
        $("#cmd").append(
          '<p class="line3"><img src="sources/ai_image.png" style="width:10%;height:10%;" />PERFORMANCE->[' +
            score +
            "] <b></b></p>"
        );
        var k = "#block";
        var clsr = k.concat(i.toString());
        $(clsr).empty();
        $(clsr).append(
          '<img src="sources/checked.png" style="width:70%;height:70%;" />'
        );
        console.log("scanning");
      } else {
        $("#cmd").append(
          '<p class="line2"> Tile is already clean-> moving forward..<span class="fa fa-thumbs-up"></span></p>'
        );
        var k = "#block";
        var clsr = k.concat(i.toString());
        $(clsr).empty();
        console.log("scanning");
      }
    }
  }

  function letsClean(i) {
    console.log("clean");
  }
});
