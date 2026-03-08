const details = (id)=>{
    // issuesLoading(false);
    fetch(singleIssueLink+id)
    .then(res=>res.json())
    .then(json=>{
        console.log(json);
        const issue = json.data;
        displayModalDetails(issue);
        issueDetail.showModal();
        // issuesLoading(true);
    }).catch(err=>console.log(err));
}



const displayModalDetails = (issue) => {
    const modal = document.getElementById("modal-details");
    modal.innerHTML = "";
    const id = issue.id;
    const title = issue.title;
    const description = issue.description;
    const status = issue.status;
    const cardColor = status === "open" ? "#28a745" : "#A855F7";
    const priority = issue.priority.toUpperCase();
    const priorityColor = priority === "HIGH" ? `btn-error` : priority === "MEDIUM" ? `btn-warning` : `btn-neutral`;
    const author = issue.author.toLowerCase().split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    const createdAt = new Date(issue.createdAt).toLocaleDateString();
    const newDiv = document.createElement("div");
    const labels = issue.labels;
    newDiv.innerHTML = `
            
                    <div class="space-y-5">
                        <div>
                            <h1 class="font-bold text-2xl">${title}</h1>
                            <div class="flex items-center gap-2 text-xs">
                                ${(status === "open")?(`<span class="btn bg-[${cardColor}] rounded-full h-7">Opened</span>`):(`<span class="btn bg-[${cardColor}] rounded-full h-7">Closed</span>`)}
                                <span class="w-1 h-1 bg-neutral/80 rounded-full inline-block">.</span>
                                <span class="text-neutral/50">Opened by ${author}</span>
                                <span class="w-1 h-1 bg-neutral/80 rounded-full inline-block">.</span>
                                <span class="text-neutral/50">${createdAt}</span>
                            </div>
                        </div>
                        <div id="issue-${labels}-${id}" class="flex flex-wrap gap-2">
                            ${labels.map(lbl => {
        if (lbl === "bug") {
            return `<span class="btn rounded-full bg-error/10 border-error text-error text-xs h-7"><i
                                    class="fa-solid fa-bug"></i>${lbl}</span>`;
        } else if (lbl === "help wanted") {
            return `<span class="btn rounded-full bg-warning/10 border-warning text-warning text-xs h-7"><i
                                    class="fa-regular fa-life-ring"></i>${lbl}</span>`;
        } else if (lbl === "enhancement") {
            return `<span class="btn rounded-full bg-success/10 border-success text-success text-xs h-7"><i
                                    class="fa-solid fa-wand-magic-sparkles"></i>${lbl}</span>`;
        }
    }).join('')}
                        </div>
                        <div class="text-neutral/50">
                            this is the description of the issue. It provides more details about the problem, steps to
                            reproduce, expected and actual results, and any other relevant information that can help in
                            understanding and resolving the issue.
                        </div>
                        <div class="bg-base-100 rounded:md shadow-sm flex items-center p-4">
                            <div class="w-[50%]">
                                <p class="text-neutral/50">Assignee</p>
                                <p class="font-semibold">${author}</p>
                            </div>
                            <div class="w-[50%]">
                                <p class="text-neutral/50">Priority</p>
                                <div data-priority="issue-${priority}"
                                    class="btn ${priorityColor} rounded-full text-xs h-8">${priority}</div>
                            </div>
                        </div>
                    </div>
                
        `;
    modal.append(newDiv);
    ;
};