const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const projectDetails = {
  lumio: {
    name: "Lumio",
    description: "예시 프로젝트 설명: 처음 투자하는 사람도 흐름을 쉽게 이해할 수 있도록 금융 앱의 핵심 경험을 정리한 가상 프로젝트입니다.",
    role: "사용자 인터뷰 정리, 정보 구조 설계, 모바일 화면 및 인터랙션 디자인",
    technologies: "Figma, FigJam, 프로토타이핑",
    achievement: "예시 성과: 핵심 과업의 단계를 줄인 시안을 제작하고, 사용성 테스트에서 과업 완료율이 개선되는 결과를 확인했습니다."
  },
  mori: {
    name: "Mori",
    description: "예시 프로젝트 설명: 바쁜 일상 속 작은 루틴을 이어가도록 돕는 라이프스타일 브랜드와 웹 경험을 설계한 가상 프로젝트입니다.",
    role: "브랜드 전략 정리, 비주얼 아이덴티티, 반응형 웹 디자인",
    technologies: "Figma, Illustrator, HTML, CSS",
    achievement: "예시 성과: 브랜드 가이드와 웹 UI 패턴을 통일해 여러 화면에서 일관된 브랜드 경험을 제공했습니다."
  },
  "ondo-studio": {
    name: "Ondo Studio",
    description: "예시 프로젝트 설명: 스튜디오의 작업과 분위기를 방문자에게 전하는 포트폴리오 웹사이트를 기획한 가상 프로젝트입니다.",
    role: "콘텐츠 구조 설계, 웹 UI 디자인, 반응형 동작 정의",
    technologies: "Figma, HTML, CSS, JavaScript",
    achievement: "예시 성과: 모바일과 데스크톱에서 주요 작업을 쉽게 둘러볼 수 있는 반응형 포트폴리오 시안을 완성했습니다."
  }
};

const projectModal = document.getElementById("project-modal");
const projectModalClose = projectModal.querySelector(".project-modal-close");
let lastFocusedProjectTrigger = null;

// 선택한 프로젝트의 예시 정보를 모달에 채우고 모달을 엽니다.
function openProjectDetails(trigger) {
  const project = projectDetails[trigger.dataset.project];
  if (!project) {
    throw new Error(`프로젝트 정보를 찾을 수 없습니다: ${trigger.dataset.project}`);
  }

  lastFocusedProjectTrigger = trigger;
  projectModal.querySelector("#project-modal-title").textContent = project.name;
  projectModal.querySelector("#project-modal-description").textContent = project.description;
  projectModal.querySelector("#project-modal-role").textContent = project.role;
  projectModal.querySelector("#project-modal-technologies").textContent = project.technologies;
  projectModal.querySelector("#project-modal-achievement").textContent = project.achievement;
  projectModal.showModal();
  projectModalClose.focus();
}

// 모달을 닫고 열기 전 프로젝트 카드로 키보드 포커스를 돌려보냅니다.
function closeProjectDetails() {
  if (!projectModal.open) return;

  projectModal.close();
  lastFocusedProjectTrigger?.focus();
  lastFocusedProjectTrigger = null;
}

document.querySelectorAll(".project-card-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => openProjectDetails(trigger));
});

projectModalClose.addEventListener("click", closeProjectDetails);
projectModal.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeProjectDetails();
});
projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProjectDetails();
});

document.getElementById("current-year").textContent = new Date().getFullYear();

document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");
  status.textContent = "메시지를 확인했습니다. 곧 답장 드릴게요!";
  form.reset();
});
