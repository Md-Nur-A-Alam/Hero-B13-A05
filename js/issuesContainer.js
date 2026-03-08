document.getElementById("action-btn").addEventListener("click",(event)=>{
    const targetBtn = event.target.closest("BUTTON");
    if(!targetBtn) return;
    document.querySelectorAll("#action-btn button").forEach(btn => btn.classList.remove("btn-primary"));
    targetBtn.classList.add("btn-primary");
    const status = targetBtn.innerText.trim().toLowerCase();
    console.log(status);
    issues(status);
})

const issues = (status)=>{
    const allIssues = fetch()
}