Boletim.js

$(document).ready(function(){
  carregaBoletim();  
});


function carregaBoletim(){
	var linha = "";
	$.post("Boletim.asp", { acao: 'boletimtipo'}, function (result) {
		linha = "<option value=''>Selecione</option>";
		$.each(result, function (i, valor) {
			linha += "<option value='"+valor.chTipo+"'> " + valor.Titulo + " </option>"
		});
		$("#tipo").html(linha)
	}, "JSON");
  // Destinatario do boletim
}

function Pesquisar(){

  if($("#tipo").val()==""){
    alert("Informe boletim tipo");
    $("#tipo").focus();
    return false;
  }

  $.post("Boletim.asp", { acao: 'Pesquisar', tipo: $("#tipo").val() }, function (result) {
    if (result==undefined){
      alert("Nao ha valor para os parametros informa");
    }else{
      $.each(result, function (i, valor) {
        $("#BancoDeDados").val(valor.banco_dados);
        $("#FrequenciaDeEnvio").val(valor.frequencia);
        $("#Nome").val(valor.titulo);      
        $("#ProcedureDeEnvio").val(valor.procedure_boletim);      
        $("#ServidorDeEnvio").val(valor.servidor);            
      });
    }
  }, "JSON");
  // Destinatario do boletim
}

function Pesquisar_bkp(){

	$(".erromsg").remove();

   // verificar se os campos foram preenchidos
   var nomeboletim=$("#Nome");
   var frequenciaenvio=$("#FrequenciaDeEnvio");
   var servidorenvio =$("#ServidorDeEnvio");
   var bancodados =$("#BancoDeDados");
   var procedureenvio =$("#ProcedureDeEnvio");


   // Mensagem de erro padrão a ser inserida apenas o campo
   var erromsg = '<div class="erromsg" style="color:red">Preencha o campo <span></span></div>';
   

      if(!nomeboletim.val() || nomeboletim.val().length < 5){
    nomeboletim.after(erromsg);
    $(".erromsg span").text("nome boletim");
    $("#nome boletim").focus();
    return;
     }


   if(!frequenciaenvio.val() || frequenciaenvio.val().length < 5){
    frequenciaenvio.after(erromsg);
    $(".erromsg span").text("frequencia envio");
    $("#frequencia envio").focus();
    return;
   }


   if(!servidorenvio.val() || servidorenvio.val().length < 5){
    servidorenvio.after(erromsg);
    $(".erromsg span").text("servidor envio");
    $("#servidor envio").focus();
    return;
   }


   if(!bancodados.val() || bancodados.val().length < 5){
    bancodados.after(erromsg);
    $(".erromsg span").text("banco dados");
    $("#banco dados").focus();
    return;
   }


   if(!procedureenvio.val() ||procedureenvio.val().length < 5){
    procedureenvio.after(erromsg);
    $(".erromsg span").text("procedure envio");
    $("#procedure envio").focus();
    return;
   }


    var settings = {
      // "async": true,
      // "crossDomain": true,
      "url": "Boletim.asp",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      "data": {
        "acao":"Pesquisar",
        "nome": $("#Nome").val(),
        "frequenciaenvio": $("#frequenciaenvio").val(),
        "servidorenvio": $("#servidorenvio").val(),
        "bancodados": $("#bancodados").val(),
        "procedureenvio": $("#procedureenvio").val(),
      }
    };

    $.ajax(settings).done(function (response) {

      console.log(response); 

    });
    
}


function InserirNovo(){
  var linha = "";
  $.post("chDestinatario.asp", { acao: 'InserirDestinatario'}, function (result) {
    linha = "<option value=''>Selecione</option>";
    $.each(result, function (i, valor) {
      linha += "<option value='"+valor.email+"'> " + valor.titulo + " </option>"
    });
    $("#chDestinatario").html(linha)
  }, "JSON");
  // Destinatario do boletim
}


function Inserir_nov(){
  var linha;
   $.post("Boletim.asp", { acao: 'Inserir_nov' }, function (result) {
    if (result==undefined){
      alert("Nao ha valor para os parametros informa");
    }else{
      var linha = "";
       $.each(result, function (i, valor) {
        linha =+ "<tr><td>"+valor.email+"</td><td>"+valor.destino+"</td><td>"+valor.ordem+"</td><td>"+valor.dataInclusao+"</td><td>"+valor.dataDesativacao+"</td></tr>"
      });
      $('#tabela').html(linha);
    }
  }, "JSON");
  // Destinatario do boletim
}


function InserirDestinatario(){

  $(".erromsg").remove();

   // verificar se os campos foram preenchidos
   var email=$("#Email");
   var destino=$("#Destino");
   var ordem =$("#Ordem");
   var datainclusao =$("#DataInclusao");
   var datadesativacao =$("#DataDesativacao");
 



// Mensagem de erro padrão a ser inserida apenas o campo
   var erromsg = '<div class="erromsg" style="color:red">Preencha o campo <span></span></div>';
   if(!email.val() || email.val().length < 5){
    email.after(erromsg);
    $(".erromsg span").text("Email");
    $("#Email").focus();
    return;
   }

  

   if(!destino.val() || destino.val().length < 1){
    destino.after(erromsg);
    $(".erromsg span").text("Destino");
    $("#Destino").focus();
    return;
   }


 if(!ordem.val() || ordem.val().length < 1 ){
    ordem.after(erromsg);
    $(".erromsg span").text("Ordem");
    $("#Ordem").focus();
    return;
   }

   if(!datainclusao.val() || datainclusao.val().length < 4){
    datainclusao.after(erromsg);
    $(".erromsg span").text("DataInclusao");
    $("#DataInclusao").focus();
    return;
   }

   if(!datadesativacao.val() || datadesativacao.val().length < 4){
    datadesativacao.after(erromsg);
    $(".erromsg span").text("DataDesativacao");
    $("#DataDesativacao").focus();
    return;
    }

    var settings = {
      // "async": true,
      // "crossDomain": true,
      "url": "Boletim.asp",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      "data": {
        "acao":"InserirDestinatario",
        "email": $("#Email").val(),
        "destino": $("#Destino").val(),
        "datainclusao": $("#DataInclusao").val(),
        "datadesativacao": $("#DataDesativacao").val(),
      }
    };

    $.ajax(settings).done(function (response) {

      console.log(response); 

    });
}


function MostrarTodos(){
  var linha = "";
  $.post("chDestinatario.asp", { acao: 'MostrarTodos'}, function (result) {
    linha = "<option value=''>Selecione</option>";
    $.each(result, function (i, valor) {
      linha += "<option value='"+valor.email+"'> " + valor.titulo + " </option>"
    });
    $("#chDestinatario").html(linha)
  }, "JSON");
  // Destinatario do boletim
}

function MostrarTodos_bkp(){
  var linha;
   $.post("Boletim.asp", { acao: 'MostrarTodos_bkp' }, function (result) {
    if (result==undefined){
      alert("Nao ha valor para os parametros informa");
    }else{
      var linha = "";
       $.each(result, function (i, valor) {
        linha += "<tr><td>"+valor.email+"</td><td>"+valor.destino+"</td><td>"+valor.ordem+"</td><td>"+valor.dataInclusao+"</td><td>"+valor.dataDesativacao+"</td></tr>"
      });
      $('#tabela').html(linha);
    }
  }, "JSON");
  // Destinatario do boletim
}


function MostrarTodos_bkps (){

  $(".erromsg").remove();

   // verificar se os campos foram preenchidos
   var email=$("#Email");
   var destino=$("#Destino");
   var ordem =$("#ServidorDeEnvio");
   var datainclusao =$("#DataInclusao");
   var datadesativacao =$("#DataInclusao");


   // Mensagem de erro padrão a ser inserida apenas o campo
   var erromsg = '<div class="erromsg" style="color:red">Preencha o campo <span></span></div>';
   

      if(!email.val() || email.val().length < 5){
    email.after(erromsg);
    $(".erromsg span").text("Email");
    $("#Email").focus();
    return;
     }


   if(!destino.val() || destino.val().length < 1){
    destino.after(erromsg);
    $(".erromsg span").text("Destino");
    $("#Destino").focus();
    return;
   }


   if(!ordem.val() || ordem.val().length < 1){
    ordem.after(erromsg);
    $(".erromsg span").text("Ordem");
    $("#Ordem").focus();
    return;
   }


   if(!datainclusao.val() || datainclusao.val().length < 4){
    data.after(erromsg);
    $(".erromsg span").text("DataInclusao");
    $("#DataInclusao").focus();
    return;
   }


   if(!datadesativacao.val() ||datadesativacao.val().length < 4){
    datadesativacao.after(erromsg);
    $(".erromsg span").text("DataDesativacao");
    $("#DataDesativacao").focus();
    return;
   }


    var settings = {
      // "async": true,
      // "crossDomain": true,
      "url": "Boletim.asp",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      "data": {
        "acao":"MostrarTodos",
        "email": $("#email").val(),
        "email": $("#Destino").val(),
        "ordem": $("#Ordem").val(),
        "datainclusao": $("#DataInclusao").val(),
        "datadesativacao": $("#DataDesativacao").val(),
      }
    };

    $.ajax(settings).done(function (response) {

      console.log(response); 

    });
    
}


function Ativar_nov(){
  var linha = "";
  $.post("Boletim.asp", { acao: 'Ativar_nov'}, function (result) {
    linha = "<option value=''>Selecione</option>";
    $.each(result, function (i, valor) {
      linha += "<option value='"+valor.email+"'> " + valor.titulo + " </option>"
    });
    $("#tabela").html(linha)
  }, "JSON");
  // Destinatario do boletim
}

function Ativar(){
  var linha;
   $.post("Boletim.asp", { acao: 'Ativar' }, function (result) {
    if (result==undefined){
      alert("Nao ha valor para os parametros informa");
    }else{
      var linha = "";
       $.each(result, function (i, valor) {
        linha += "<tr><td>"+valor.email+"</td><td>"+valor.destino+"</td><td>"+valor.ordem+"</td><td>"+valor.dataInclusao+"</td><td>"+valor.dataDesativacao+"</td></tr>"
      });
      $('#tabela').html(linha);
    }
  }, "JSON");
  // Destinatario do boletim
}


function Ativar_novo (){

  $(".erromsg").remove();

   // verificar se os campos foram preenchidos
   var email=$("#Email");
   var destino=$("#Destino");
   var ordem =$("#ServidorDeEnvio");
   var datainclusao =$("#DataInclusao");
   var datadesativacao =$("#DataInclusao");


   // Mensagem de erro padrão a ser inserida apenas o campo
   var erromsg = '<div class="erromsg" style="color:red">Preencha o campo <span></span></div>';
   

      if(!email.val() || email.val().length < 5){
    email.after(erromsg);
    $(".erromsg span").text("Email");
    $("#Email").focus();
    return;
     }


   if(!destino.val() || destino.val().length < 1){
    destino.after(erromsg);
    $(".erromsg span").text("Destino");
    $("#Destino").focus();
    return;
   }


   if(!ordem.val() || ordem.val().length < 1){
    ordem.after(erromsg);
    $(".erromsg span").text("Ordem");
    $("#Ordem").focus();
    return;
   }


   if(!datainclusao.val() || datainclusao.val().length < 4){
    datainclusao.after(erromsg);
    $(".erromsg span").text("DataInclusao");
    $("#DataInclusao").focus();
    return;
   }


   if(!datadesativacao.val() ||datadesativacao.val().length < 4){
    datadesativacao.after(erromsg);
    $(".erromsg span").text("DataDesativacao");
    $("#DataDesativacao").focus();
    return;
   }


    var settings = {
      // "async": true,
      // "crossDomain": true,
      "url": "Boletim.asp",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      "data": {
        "acao":"Ativar",
        "email": $("#email").val(),
        "email": $("#Destino").val(),
        "ordem": $("#Ordem").val(),
        "datainclusao": $("#DataInclusao").val(),
        "datadesativacao": $("#DataDesativacao").val(),
      }
    };

    $.ajax(settings).done(function (response) {

      console.log(response); 

    });
    
}

function Desativar_nov(){
  var linha = "";
  $.post("Boletim.asp", { acao: 'Desativar_nov'}, function (result) {
    linha = "<option value=''>Selecione</option>";
    $.each(result, function (i, valor) {
      linha += "<option value='"+valor.email+"'> " + valor.titulo + " </option>"
    });
    $("#tabela").html(linha)
  }, "JSON");
  // Destinatario do boletim
}

function Desativar_novo(){
  var linha;
   $.post("Boletim.asp", { acao: 'Desativar_novo' }, function (result) {
    if (result==undefined){
      alert("Nao ha valor para os parametros informa");
    }else{
      var linha = "";
       $.each(result, function (i, valor) {
        linha += "<tr><td>"+valor.email+"</td><td>"+valor.destino+"</td><td>"+valor.ordem+"</td><td>"+valor.dataInclusao+"</td><td>"+valor.dataDesativacao+"</td></tr>"
      });
      $('#tabela').html(linha);
    }
  }, "JSON");
  // Destinatario do boletim
}


function Desativar (){

  $(".erromsg").remove();

   // verificar se os campos foram preenchidos
   var email=$("#Email");
   var destino=$("#Destino");
   var ordem =$("#ServidorDeEnvio");
   var datainclusao =$("#DataInclusao");
   var datadesativacao =$("#DataInclusao");


   // Mensagem de erro padrão a ser inserida apenas o campo
   var erromsg = '<div class="erromsg" style="color:red">Preencha o campo <span></span></div>';
   

      if(!email.val() || email.val().length < 5){
    email.after(erromsg);
    $(".erromsg span").text("Email");
    $("#Email").focus();
    return;
     }


   if(!destino.val() || destino.val().length < 1){
    destino.after(erromsg);
    $(".erromsg span").text("Destino");
    $("#Destino").focus();
    return;
   }


   if(!ordem.val() || ordem.val().length < 1){
    ordem.after(erromsg);
    $(".erromsg span").text("Ordem");
    $("#Ordem").focus();
    return;
   }


   if(!datainclusao.val() || datainclusao.val().length < 4){
    data.after(erromsg);
    $(".erromsg span").text("DataInclusao");
    $("#DataInclusao").focus();
    return;
   }


   if(!datadesativacao.val() ||datadesativacao.val().length < 4){
    datadesativacao.after(erromsg);
    $(".erromsg span").text("DataDesativacao");
    $("#DataDesativacao").focus();
    return;
   }


    var settings = {
      // "async": true,
      // "crossDomain": true,
      "url": "Boletim.asp",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      "data": {
        "acao":"Desativar",
        "email": $("#email").val(),
        "email": $("#Destino").val(),
        "ordem": $("#Ordem").val(),
        "datainclusao": $("#DataInclusao").val(),
        "datadesativacao": $("#DataDesativacao").val(),
      }
    };

    $.ajax(settings).done(function (response) {

      console.log(response); 

    });
    
}
