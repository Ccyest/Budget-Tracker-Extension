window.onload = function () {
    alert("test");
    console.log("nishiyige")

    chrome.storage.sync.get('limit', function (budget) {
        document.getElementById("limit").innerHTML = budget.limit
    })



    var saveLimit = document.getElementById("saveLimit")
    saveLimit.addEventListener("click", function () {
        var limit = document.getElementById('limit').value;
        if (limit) {
            chrome.storage.sync.set({ "limit": limit }, function () {
                close();
            })
        }
    });

    var reset = document.getElementById("resetTotal")
    reset.addEventListener("click", function () {
        Notify();
        console.log("go problem on notif? HELL YES")

        chrome.storage.sync.set({ "total": 0 }, function () {
            alert("should work")


        });
    });


    function Notify() {
        var notifOptions = new Notification("Total Reset!", {

            icon: "icon48.png",
            body: "Total has been reset to zero!",

            requireInteraction: true
        });

    }

}