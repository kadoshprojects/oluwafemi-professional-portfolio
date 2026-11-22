document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      const cats = card.dataset.category.split(" ");
      card.style.display = (f === "all" || cats.includes(f)) ? "flex" : "none";
    });
  });
});

document.querySelector(".menu").addEventListener("click", () => {
  document.querySelector(".topbar nav").classList.toggle("open");
});

document.getElementById("year").textContent = new Date().getFullYear();

if (window.Chart) {
  const legendOpts = {
    labels: {
      color: "#d8e6df",
      font: { family: "DM Sans", size: 11 }
    }
  };

  new Chart(document.getElementById("mixChart"), {
    type: "doughnut",
    data: {
      labels: ["Healthcare (3)", "Education Workflows (2)", "Construction Controls (4)"],
      datasets: [{
        data: [3, 2, 4],
        backgroundColor: ["#34d399", "#10b981", "#6ee7b7"],
        borderColor: "#133b2c",
        borderWidth: 2,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "66%",
      plugins: {
        legend: {
          position: "bottom",
          ...legendOpts
        }
      }
    }
  });

  new Chart(document.getElementById("lifecycleChart"), {
    type: "bar",
    data: {
      labels: ["Initiate", "Plan", "Execute", "Monitor", "Close"],
      datasets: [{
        label: "Lifecycle stages",
        data: [1, 1, 1, 1, 1],
        backgroundColor: ["#34d399", "#2eb886", "#279d72", "#20825e", "#19674a"],
        borderRadius: 5,
        barThickness: 20
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        x: { display: false, grid: { display: false }, ticks: { display: false } },
        y: { grid: { display: false }, ticks: { color: "#e2efe8", font: { family: "DM Sans", size: 11 } } }
      },
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}

// In-page preview modal for Evidence Library items
const modal = document.getElementById("previewModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalDownload = document.getElementById("modalDownload");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".evidence[data-preview]").forEach(item => {
  item.addEventListener("click", async () => {
    const filePath = item.dataset.preview;
    const title = item.dataset.title || "Artefact Preview";
    modalTitle.textContent = title;
    modalDownload.href = filePath;
    modalContent.textContent = "Loading artefact preview...";
    modal.classList.add("open");

    try {
      const res = await fetch(filePath);
      if (!res.ok) throw new Error("Unable to load file");
      const text = await res.text();
      modalContent.textContent = text;
    } catch (err) {
      modalContent.textContent = "Preview unavailable directly in local file:// mode. Use the Download file button above or host via GitHub Pages / Netlify.";
    }
  });
});

function closeModal() {
  modal.classList.remove("open");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});
