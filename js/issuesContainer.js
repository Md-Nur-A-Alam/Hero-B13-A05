document.getElementById("action-btn").addEventListener("click", (event) => {
    const targetBtn = event.target.closest("BUTTON");
    if (!targetBtn) return;
    issuesLoading(false);
    document.querySelectorAll("#action-btn button").forEach(btn => btn.classList.remove("btn-primary"));
    targetBtn.classList.add("btn-primary");
    const status = targetBtn.innerText.trim().toLowerCase();
    console.log(status);
    issues(status);
})

const issues = (status) => {
    fetch(allIssuesLink)
        .then(res => res.json())
        .then(json => {
            let allIssues = json.data;
            if (status === "open") {
                allIssues = allIssues.filter(issue => issue.status === status);
            } else if (status === "closed") {
                allIssues = allIssues.filter(issue => issue.status === status);
            }
            const issuesCount = document.getElementById("issue-number");
            issuesCount.innerText = allIssues.length;
            displayIssues(allIssues);
        }).catch(err => console.log(err));
};



issues("all");