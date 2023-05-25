document.addEventListener("contextmenu", function(event) {
    // get element that was right-clicked
    var element = event.target;
    // get the closest parent element 
    var parent = element.closest("ul.jobsearch-ResultsList > li");
    if(parent){
        const companyName = parent.querySelector(".companyName").innerText;
        const companyLocation = parent.querySelector(".companyLocation").innerText;
        //add a new option to the context menu in firefox
        browser.runtime.sendMessage({
            createContextMenu: true,
            companyName: companyName,
            companyLocation: companyLocation
        });
    }else{
        // delete the context menu in firefox
        browser.runtime.sendMessage({
            deleteContextMenu: true
        });
    }
});