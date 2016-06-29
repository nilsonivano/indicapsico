import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.indicaPsicoHome.onRendered(function(){
    $('.parallax').parallax();
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $('#contatoForm').hide();
    $('.scrollspy').scrollSpy();
});

Template.indicaForm.helpers({
  atendimentoTypes: function(){
    return atendimentoTypes
  },
  especializacaoTypes: function(){
    return especializacaoTypes
  },
  abordagemTypes: function(){
    return abordagemTypes
  },
  valores: function(){
    return valores
  }
});

Template.indicaForm.events({
  'click #convenioSim': function(){
    if($("#nomeConvenio").attr("disabled")){
      $("#nomeConvenio").attr("disabled", false)
    }
  },
  'click #convenioNao': function(){
    if(!$("#nomeConvenio").attr("disabled")){
      $("#nomeConvenio").attr("disabled",true)
    }
  },
  'click #contatoSim': function(){
    $('#contatoForm').show();
  },
  'click #contatoNao': function(){
    $('#contatoForm').hide();
  },
  'click #requisitaPsico': function(event){
    event.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var address = $('#address').val();
    var valores = $('#valores').val();
    var atendimentoType = $('#atendimentoType').val();
    var especializacaoType = $('#especializacaoType').val();
    var abordagemType = $('#abordagemType').val();
    var haveConvenio = $('input[name="convenioGroup"]:checked').val();
    if(haveConvenio == "convenioSim"){
      haveConvenio = true;
    } else{
      haveConvenio = false;
    }
    var nomeConvenio = $('#nomeConvenio').val();
    var haveContatar = $('input[name="contato"]:checked').val();
    if(haveContatar == "contatoSim"){
      haveContatar = true;
    } else{
      haveContatar = false;
    }
    var tipoContato = $('input[name=tipoContato]:checked');
    var contatoList = [];
    if(tipoContato){
      for (i=0;i<tipoContato.length;i++){
        var contato = tipoContato[i].value;
        contatoList.push(contato);
      }
    }
    var periodoContato = $('input[name=periodoContato]:checked');
    var periodoList = [];
    if(periodoContato){
      for(i=0;i<periodoContato.length;i++){
        var periodo = periodoContato[i].value;
        periodoList.push(periodo);
      }
    }
    Meteor.call('insertRequestPsico',name, email, phone, address, valores, atendimentoType, especializacaoType, abordagemType,
    haveConvenio, nomeConvenio, haveContatar, contatoList, periodoList, function(err, results){
          if(err){
            console.log(err)
          } else{
            if(haveConvenio == true){
              haveConvenio = "Sim"
            } else{
              haveConvenio = "Não"
            }
            if(haveContatar == true){
              haveContatar = "Sim"
            } else{
              haveContatar = "Não"
            }
            //Sending emails
            var html =
                '<div>' + 'Olá ' + name + ', sua proposta foi enviada ao IndicaPsico' +
                ' Pedimos agora que aguarde o nosso contato com a sugestão de psicólogos conforme sua necessidade. Abaixo você pode revisar as informações que você enviou:' + '</div>' +
                '</br>' +
                '<div>' + '<b>Nome: </b>' + name + '</div>' +
                '<div>' + '<b>Email: </b>' + email + '</div>' +
                '<div>' + '<b>Telefone: </b>' + phone + '<div>' +
                '<div>' + '<b>Endereço: </b>' + address + '<div>' +
                '<div>' + '<b>Valor: </b>' + valores + '<div>' +
                '<div>' + '<b>Tipo de atendimento: </b>' + atendimentoType + '<div>' +
                '<div>' + '<b>Tipo de especialização: </b>' + especializacaoType + '<div>' +
                '<div>' + '<b>Tipo de abordagem: </b>' + abordagemType + '<div>' +
                '<div>' + '<b>Convênio: </b>' + haveConvenio + '<div>' +
                '<div>' + '<b>Nome do Convênio: </b>' + nomeConvenio + '<div>' +
                '<div>' + '<b>Contatar: </b>' + haveContatar + '<div>' +
                '<div>' + '<b>Tipo de Contato: </b>' + contatoList + '<div>' +
                '<div>' + '<b>Período de Contato: </b>' + periodoList + '<div>' +
                '</br>' +
                '<div>' + 'Obrigado por utilizar o IndicaPsico (www.indicapsico.com.br)' + '</div>';
            Meteor.call('sendEmail',
                email,
                'contato@indicapsico.com.br',
                'Sua requisição foi enviada com sucesso para o IndicaPsico',
                html,
                function(err, results){
                  if(err){
                    console.log(err)
                  }
                });
          }
            var htmlIndicaPsico =
              '<div>' + 'Nova requisição no IndicaPsico' + '</div>' +
              '</br>' +
              '<div>' + '<b>Nome: </b>' + name + '</div>' +
              '<div>' + '<b>Email: </b>' + email + '</div>' +
              '<div>' + '<b>Telefone: </b>' + phone + '<div>' +
              '<div>' + '<b>Endereço: </b>' + address + '<div>' +
              '<div>' + '<b>Valor: </b>' + valores + '<div>' +
              '<div>' + '<b>Tipo de atendimento: </b>' + atendimentoType + '<div>' +
              '<div>' + '<b>Tipo de especialização: </b>' + especializacaoType + '<div>' +
              '<div>' + '<b>Tipo de abordagem: </b>' + abordagemType + '<div>' +
              '<div>' + '<b>Convênio: </b>' + haveConvenio + '<div>' +
              '<div>' + '<b>Nome do Convênio: </b>' + nomeConvenio + '<div>' +
              '<div>' + '<b>Contatar: </b>' + haveContatar + '<div>' +
              '<div>' + '<b>Tipo de Contato: </b>' + contatoList + '<div>' +
              '<div>' + '<b>Período de Contato: </b>' + periodoList + '<div>';
            Meteor.call('sendEmail',
              'contato@indicapsico.com.br',
              'contato@indicapsico.com.br',
              'Nova requisição IndicaPsico',
              htmlIndicaPsico,
              function(err, results){
                if(err){
                  Materialize.toast('Sua requisição não foi enviada. Favor insira todas as informações obrigatórias.', 10000);
                }
              });
          Materialize.toast('Sua requisição foi enviada com sucesso. Em breve retornaremos com o psicólogo mais indicado para suas necessidades.', 10000);
          $("#indicaForm").find('input:text, input:password, input:file, select, textarea').val('');
          $("#indicaForm").find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
        });
  }
});