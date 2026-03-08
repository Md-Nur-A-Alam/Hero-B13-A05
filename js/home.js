const allIssuesLink = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const searchIssuesLink = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";



const issuesLoading = decision =>{
    const loading = document.getElementById("loading");
    const container = document.getElementById("issues-container");
    (decision)?(container.classList.remove("hidden"),loading.classList.add("hidden")):(loading.classList.remove("hidden"),container.classList.add("hidden"));
}