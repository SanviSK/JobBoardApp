// Dark/Light Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const btn = document.querySelector(".toggle-btn");
  btn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
}

// Reusable function to create job cards
function addJob(title, company, desc) {
  const jobCard = document.createElement("div");
  jobCard.classList.add("job-card");
  jobCard.innerHTML = `
    <h3>${title}</h3>
    <p><strong>Company:</strong> ${company}</p>
    <p>${desc}</p>
    <button class="apply-btn">Apply</button>
  `;
  
  // Apply button
  jobCard.querySelector(".apply-btn").addEventListener("click", () => {
    if (seekerProfile.name) {
      alert(`${seekerProfile.name} applied for ${title} at ${company}!`);
    } else {
      alert("Please create your profile before applying.");
    }
  });

  document.getElementById("jobList").appendChild(jobCard);
}

// Add some dummy jobs when page loads
window.onload = () => {
  const sampleJobs = [
    {
      title: "Frontend Developer",
      company: "Tech Corp",
      desc: "Work with React, CSS, and modern JavaScript frameworks."
    },
    {
      title: "Backend Developer",
      company: "CodeWorks",
      desc: "Build REST APIs using Node.js and Express."
    },
    {
      title: "UI/UX Designer",
      company: "DesignHub",
      desc: "Create engaging and user-friendly designs for web and mobile."
    }
  ];

  sampleJobs.forEach(job => addJob(job.title, job.company, job.desc));
};

// Handle Job Posting
const jobForm = document.getElementById("jobForm");
jobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("jobTitle").value;
  const company = document.getElementById("company").value;
  const desc = document.getElementById("description").value;

  addJob(title, company, desc);
  jobForm.reset();
});

// Handle Profile Creation
let seekerProfile = {};
const profileForm = document.getElementById("profileForm");
const profileCard = document.getElementById("profileCard");

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  seekerProfile.name = document.getElementById("seekerName").value;
  seekerProfile.skills = document.getElementById("skills").value.split(",");

  // Show profile on page
  profileCard.innerHTML = `
    <h3>${seekerProfile.name}</h3>
    <p><strong>Skills:</strong> ${seekerProfile.skills.join(", ")}</p>
  `;

  profileForm.reset();
});

// Search Jobs
function searchJobs() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const jobs = document.querySelectorAll(".job-card");
  jobs.forEach(job => {
    const text = job.innerText.toLowerCase();
    job.style.display = text.includes(query) ? "block" : "none";
  });
}
