
window.onload = function () {


    chrome.storage.sync.get(["total", 'limit'], function (budget) {
        document.getElementById("total").innerHTML = budget.total;
        document.getElementById("limit").innerHTML = budget.limit
    })






    var nameInput = document.getElementById("spendAmount")
    nameInput.addEventListener('click', function () {
        chrome.storage.sync.get(['total', 'limit'], function (budget) {
            var newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);


            }
            var amount = document.getElementById("amount").value;

            if (amount) {
                newTotal += parseInt(amount);
            }
            chrome.storage.sync.set({ 'total': newTotal }, function () {
                if (amount && newTotal >= budget.limit) {
                    Notify()

                }
            });

            document.getElementById("total").innerHTML = newTotal;
            document.getElementById("amount").value = '';



        })
    })

    document.getElementById('go-to-options').addEventListener('click', function () {
        console.log("this is correct")

        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }


    });




    function Notify() {
        var exceed = new Notification("Limit Reached!", {

            icon: "icon48.png",
            body: "Uh oh! Looks like you've reached your limit!",
            requireInteraction: true
        });

    }



}

