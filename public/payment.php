<?php
	session_start();	
	function hmac($algo,$data,$passwd){
	        /* md5 and sha1 only */
	        $algo=strtolower($algo);
	        $p=array('md5'=>'H32','sha1'=>'H40');
	        if(strlen($passwd)>64) $passwd=pack($p[$algo],$algo($passwd));
	        if(strlen($passwd)<64) $passwd=str_pad($passwd,64,chr(0));
	
	        $ipad=substr($passwd,0,64) ^ str_repeat(chr(0x36),64);
	        $opad=substr($passwd,0,64) ^ str_repeat(chr(0x5C),64);
	
	        return($algo($opad.pack($p[$algo],$algo($ipad.$data))));
	}
	# XXX ePay.bg https://www.epay.bg/

	# XXX ePay.bg URL (https://devep2.datamax.bg/ep2/epay2_demo/ if POST to DEMO system)
	$submit_url = 'https://devep2.datamax.bg/ep2/epay2_demo/';
	$secret     = 'NS5R3E6QM1AWQSNKZCMZAVXOK6T5UA4Z638ZEWDJ443OQB061HHAZLX4L6PETE70';
	
  $min        = "D201522170";
	$invoice    = sprintf("%.0f", rand(1, 100000));;
  $exp_date   = '01.08.2020';
  $sum        = "1";
  $descr      = "This is da shit";
  $email      = "kubu@abv.bg";
  
$data = <<<DATA
MIN={$min}
INVOICE={$invoice}
AMOUNT={$sum}
EXP_TIME={$exp_date}
DESCR={$descr}
EMAIL={$email}
DATA;
	
	$ENCODED  = base64_encode($data);
	$CHECKSUM = hmac('sha1', $ENCODED, $secret); # XXX SHA-1 algorithm REQUIRED
	
	
echo <<<HTML
<HTML>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link type="text/css" rel="stylesheet" href="materialize.min.css" media="screen,projection" />
  <link type="text/css" rel="stylesheet" href="style.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>
<form action="{$submit_url}" method=POST>
<input type=hidden name=PAGE value="credit_paydirect">
<input type=hidden name=ENCODED value="{$ENCODED}">
<input type=hidden name=CHECKSUM value="{$CHECKSUM}">
<input type=hidden name=URL_OK value="https://regimes.yoannakamenova.bg/thankyou.html">
<input type=hidden name=URL_CANCEL value="https://regimes.yoannakamenova.bg/error.html">
      <div>
          <img class="svgImages" src="img/gallery/creditcardicon.svg" style="width:20%;">
          </div>

  <div class="container">
       <div class="row hide-on-small-and-down">
          <p class="center payPara">ВАШАТА ПОРЪЧКА</p>
          <table class="bordered">
          <tbody>
          <tr>
              <td class="payData">Идентификационен 
              номер</td>
              <td class="payDataRegular">{$min}</td>
            </tr>
            <tr>
              <td class="payData">Номер   
              фактура
            </td>
              <td class="payDataRegular">{$invoice}</td>
            </tr>
              <td class="payData">Краен срок   
              на плащане</td>
              <td class="payDataRegular">{$exp_date}</td>
            </tr>
            </tr>
              <td class="payData">Описание 
              на продукта</td>
              <td class="payDataRegular">{$descr}</td>
            </tr>
            <tr>
              <td class="payData">Крайна цена</td>
              <td class="payDataRegular">{$sum}</td>
            </tr>
              <td>
              </td>
          </tbody>
        </table>
        <div class="row">
          <div class="col s12 center">
            <button  class="btn-large buttons2pay hide-on-small-and-down" type="submit">ПЛАТИ
            </button>
          </div>
        </div>
    </div>

  <div class="row hide-on-med-and-up">
    <table class="bordered">
          <tbody>
          <tr>
              <td class="center payData">Идентификационен 
              номер
              <br>
              <br>
              <span class="payDatas">{$min}</span>
            </td>
            </tr>
            <tr>
              <td class="center payData">Номер   
              фактура
              <br>
              <br>
              <span class="payDatas">{$invoice}</span>
            </td>             
            </tr>
              <td class="center payData">Краен срок   
              на плащане
              <br>
              <br>
              <span class="payDatas">{$exp_date}</span>
              </td>            
            </tr>
            </tr>
              <td class="center payData">Описание 
              на продукта
              <br>
              <br>
              <span class="payDatas">{$descr}</span>
              </td>              
            </tr>
            <tr>
              <td class="center payData">Крайна цена
              <br>
              <br>
              <span class="payDatas">{$sum}</span>
              </td>              
            </tr>
              <td>
              </td>
          </tbody>
        </table>
          <div class="row">
            <div class="col s12 center">
              <button  class="btn buttons2pay hide-on-med-and-up" type="submit">ПЛАТИ
            </button>
            </div>
          </div>
      </form>
  </div>
  <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script type="text/javascript" src="materialize.min.js"></script>
</body>
</HTML>
HTML;
	?>
