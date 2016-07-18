placeMarkerLead = function(PsicoLeads,map,markerImage){
    var markersOld = [];
    var length = PsicoLeads.length;
    var bounds = new google.maps.LatLngBounds();
    for(i = 0; i<length; i++){
        var lat = PsicoLeads[i].addressGeocode.lat;
        var lng = PsicoLeads[i].addressGeocode.lng;
        var LatLng = {lat: lat, lng: lng};
        var address = PsicoLeads[i].addressGeocode.address;
        var name = PsicoLeads[i].name;
        var phone = PsicoLeads[i].phone;
        var email = PsicoLeads[i].email;
        var valoresRange = PsicoLeads[i].valoresRange;
        var atendimentoType = PsicoLeads[i].atendimentoType;
        var especializacaoType = PsicoLeads[i].especializacaoType;
        var haveConvenio = PsicoLeads[i].haveConvenio;
        var convenioName = PsicoLeads[i].convenioName;
        var haveContatar = PsicoLeads[i].haveContatar;
        var contatoType =  PsicoLeads[i].contatoType;
        var contatoHorario =  PsicoLeads[i].contatoHorario;
        var createdAt = PsicoLeads[i].createdAt;
        var contentString =
            '<div>' + '<b>Nome: </b>' + name + '</div>' +
            '<div style="max-width: 250px">' + '<b>Endereço: </b>' + address + '</div>' +
            '<div>' + '<b>Email: </b>' + email + '</div>' +
            '<div>' + '<b>Telefone: </b>' + phone + '</div>' +
            '<div>' + '<b>Valores Range: </b>' + valoresRange + '</div>' +
            '<div>' + '<b>Tipo de Atendimento: </b>' + atendimentoType + '</div>' +
            '<div>' + '<b>Tipo de Especializacao: </b>' + especializacaoType + '</div>' +
            '<div>' + '<b>Tem Convenio: </b>' + haveConvenio + '</div>' +
            '<div>' + '<b>Convenio: </b>' + convenioName + '</div>' +
            '<div>' + '<b>Contatar: </b>' + haveContatar + '</div>' +
            '<div>' + '<b>Tipo de Contato: </b>' + contatoType + '</div>' +
            '<div>' + '<b>Contato Horario: </b>' + contatoHorario + '</div>' +
            '<div>' + '<b>Data da requisição: </b>' + createdAt + '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            map: map,
            position: LatLng,
            icon: markerImage,
            infowindow: infowindow
        });
        markersOld[i] = marker;
        google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(map, this);
        });
        bounds.extend(marker.getPosition());
    }
    map.fitBounds(bounds);
    return markersOld
};

placeMarkerPsico = function(PsicoArray,map,markerImage){
    var markersOld = [];
    var length = PsicoArray.length;
    var bounds = new google.maps.LatLngBounds();
    for(i = 0; i<length; i++){
        var lat = PsicoArray[i].addressGeocode.lat;
        var lng = PsicoArray[i].addressGeocode.lng;
        var LatLng = {lat: lat, lng: lng};
        var address = PsicoArray[i].addressGeocode.address;
        var name = PsicoArray[i].name;
        var crp = PsicoArray[i].crp;
        var phone = PsicoArray[i].contacts.phone;
        var email = PsicoArray[i].contacts.email;
        var website = PsicoArray[i].contacts.website;
        var abordagemType = PsicoArray[i].abordagemType;
        var servicoType = PsicoArray[i].servicoType;
        var convenio = PsicoArray[i].convenio;
        var contentString =
            '<div>' + '<b>Nome: </b>' + name + '</div>' +
            '<div>' + '<b>CRP: </b>' + crp + '</div>' +
            '<div style="max-width: 250px">' + '<b>Endereço: </b>' + address + '</div>' +
            '<div>' + '<b>Email: </b>' + email + '</div>' +
            '<div>' + '<b>Telefone: </b>' + phone + '</div>' +
            '<div>' + '<b>Website: </b>' + website + '</div>' +
            '<div>' + '<b>Convênio: </b>' + convenio + '</div>' +
            '<div>' + '<b>Tipo de Serviço: </b>' + servicoType + '</div>' +
            '<div>' + '<b>Tipo de Abordagem: </b>' + abordagemType + '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            map: map,
            position: LatLng,
            icon: markerImage,
            infowindow: infowindow
        });
        markersOld[i] = marker;
        google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(map, this);
        });
        bounds.extend(marker.getPosition());
    }
    map.fitBounds(bounds);
    return markersOld
};