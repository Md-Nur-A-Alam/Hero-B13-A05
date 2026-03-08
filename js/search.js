document.getElementById("search").addEventListener("click",()=>{
    const input = document.getElementById("searchBox");
    const searchItem = input.value.trim().toLowerCase();
    const actionBnts = document.querySelectorAll("#action-btn button");
    actionBnts.forEach(btn=>btn.classList.remove("btn-primary"));
    issuesLoading(false);
    if(searchItem.length>0){
        fetch(searchIssuesLink+searchItem)
            .then(res=>res.json())
            .then(json=>{
                const searchResults = json.data;
                const issuesCount = document.getElementById("issue-number");
                issuesCount.innerText = searchResults.length;
                displayIssues(searchResults);
            }).catch(err=>console.log(err));
    }
    else{
        const actionBnts = document.querySelector("#action-btn button");
        actionBnts.classList.add("btn-primary");
        issues("all");
    }
})
