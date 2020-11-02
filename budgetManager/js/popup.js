$(function(){

    chrome.storage.sync.get(['total','limit'], function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    })

    $('#spendAmount').on("click",function (){
        chrome.storage.sync.get(['total','limit'], function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function(){
                if (amount && newTotal >= budget.limit){
                    var notifOptions = {
                        type: 'basic',
                        iconUrl: 'img/icon48.png',
                        title: 'Limite excedido!',
                        message: 'Parece que você ja chegou no seu limite'
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                    chrome.notifications.clear('limitNotif'); 
                }
            });

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});