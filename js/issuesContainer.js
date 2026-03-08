document.getElementById("action-btn").addEventListener("click", (event) => {
    const targetBtn = event.target.closest("BUTTON");
    if (!targetBtn) return;
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

const displayIssues = (issues) => {
    const container = document.getElementById("issues-container");
    container.innerHTML = "";
    issues.forEach(issue => {
        const id = issue.id;
        const title = issue.title;
        const description = issue.description;
        const status = issue.status;
        const cardColor = status === "open" ? "#28a745" : "#A855F7";
        const priority = issue.priority;
        const priorityColor = priority === "high" ? `btn-error` : priority === "medium" ? `btn-warning` : `btn-neutral`;
        const author = issue.author;
        const createdAt = new Date(issue.created_at).toLocaleDateString();
        const newDiv = document.createElement("div");
        const labels = issue.labels;
        newDiv.innerHTML = `
            <div id="card-${id}" onClick="details(${id})" class="card w-full h-full bg-base-100 shadow-sm border-t-5 border-[${cardColor}]">
                <div class="card-body space-y-2">
                    <div class="flex items-center justify-between">
                        <div id="issue-${status}">
                            <img src="./assets/${status}-Status.png" alt="" class="w-8">
                        </div>
                        <span id="issue-${priority}" class="btn btn-soft ${priorityColor} rounded-full">${priority}</span>
                    </div>
                    <h2 id="issue-${title}" class="text-xl font-semibold">${title}</h2>
                    <p id="issue-${description}" class="text-neutral/50">${description}</p>
                    <div id="issue-${labels}" class="flex flex-wrap gap-2">
                    ${labels.map(lbl => {
                        if (lbl === "bug") {
                            return `<span class="btn rounded-full bg-error/10 border-error text-error text-xs"><i class="fa-solid fa-bug"></i>${lbl}</span>`;
                        } else if (lbl === "help wanted") {
                            return `<span class="btn rounded-full bg-warning/10 border-warning text-warning text-xs"><i class="fa-regular fa-life-ring"></i>${lbl}</span>`;
                        } else if (lbl === "enhancement") {
                            return `<span class="btn rounded-full bg-success/10 border-success text-success text-xs"><i class="fa-solid fa-wand-magic-sparkles"></i>${lbl}</span>`;
                        }
                    }).join('')}
                    </div>
                        </div>
                        <hr class="border-neutral/10">
                        <div class="card-body text-neutral/50">
                                <p>#<span id="issue-${id}">${id}</span> by <span id="issue-${author}">${author}</span></p>
                                <p id="issue-${createdAt}">${createdAt}</p>
                        </div>
                    </div>
        `;
        container.append(newDiv);
    });
};


issues("all");