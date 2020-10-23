$(function(){
    $('#name').keyup(function(){
        $('#greet').text('Ola ' + $('#name').val());
    })
})