var contextMenuItem = {
    id: "spendMoney",
    title: "Add it in spending",
    contexts: ["selection"]
};

console.log("testing context menu")
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function (budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({ 'total': newTotal }, function () {
                    if (newTotal >= budget.limit) {
                        Notify();
                    }
                })
            })
        }
    }
})


function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

function Notify() {
    var notifOptions = new Notification("Limit Reached!", {

        icon: "icon48.png",
        body: "Uh oh! Looks like you've reached your limit!",
        requireInteraction: true
    });

}