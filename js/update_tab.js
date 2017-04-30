chrome.tabs.onRemoved.addListener(function(id){
    update_num();
});
chrome.tabs.onMoved.addListener(function(id){
    update_num();
});
chrome.tabs.onUpdated.addListener(function(id){
    update_num();
});

function update_num(){
    chrome.tabs.query({},function(tabs){
        var length = tabs.length>9?9:tabs.length;
        console.log(length);
        for(var i=0;i<length;i++){
            var tabId = tabs[i].id;
            var title = tabs[i].title;
            var newTitle = setTitle(title);
            var newTitle ='('+(i+1)+')'+newTitle;
            console.log(newTitle);
            chrome.tabs.executeScript(tabId,
      {code:"var head = document.createElement('head');var title = document.createElement('title');var text = document.createTextNode('" + newTitle + "');title.appendChild(text);head.appendChild(title);document.body.appendChild(head);document.title='"+newTitle+"';"
      });
        }
    });
}

function setTitle(tit){
    var regex = new RegExp('\\([0-9]\\)','gi');
    return tit.replace(regex,'');
}