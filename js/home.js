const allIssuesLink = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const searchIssuesLink = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";
const singleIssueLink = "https://phi-lab-server.vercel.app/api/v1/lab/issue/";



const issuesLoading = decision => {
    const loading = document.getElementById("loading");
    const container = document.getElementById("issues-container");
    (decision) ? (container.classList.remove("hidden"), loading.classList.add("hidden")) : (loading.classList.remove("hidden"), container.classList.add("hidden"));
}


const displayIssues = (issues) => {
    const container = document.getElementById("issues-container");
    container.innerHTML = "";
    issues.forEach(issue => {
        const id = issue.id;
        const title = issue.title;
        const description = issue.description;
        const status = issue.status;
        const cardColor = status === "open" ? "#28a745" : "#A855F7";
        const priority = issue.priority.toUpperCase();
    const priorityColor = priority === "HIGH" ? `btn-error` : priority === "MEDIUM" ? `btn-warning` : `btn-neutral`;
        const author = issue.author;
        const createdAt = new Date(issue.createdAt).toLocaleDateString();
        const newDiv = document.createElement("div");
        const labels = issue.labels;
        newDiv.innerHTML = `
            <div id="card-${id}" onClick="details(${id})" class="card w-full h-full bg-base-100 shadow-sm border-t-5 border-[${cardColor}]">
                <div class="card-body space-y-2">
                    <div class="flex items-center justify-between">
                        <div>
                            ${(status === "open") ? `<img src="./assets/open_status.png" alt="" class="w-8">` : `<img src="./assets/closed_status.png" alt="" class="w-8">`}
                        </div>
                        <span data-priority="issue-${priority}" class="btn btn-soft ${priorityColor} rounded-full">${priority}</span>
                    </div>
                    <h2 data-title="issue-${title}" class="text-xl font-semibold">${title}</h2>
                    <p data-description="issue-${description}" class="text-neutral/50">${description}</p>
                    <div id="issue-${labels}-${id}" class="flex flex-wrap gap-2">
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
                                <p>#<span id="issue-${id}">${id}</span> by <span data-author="issue-${author}">${author}</span></p>
                                <p data-created-at="issue-${createdAt}">${createdAt}</p>
                        </div>
                    </div>
        `;
        container.append(newDiv);
    });
    issuesLoading(true);
};
