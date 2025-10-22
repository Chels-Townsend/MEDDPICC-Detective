// Game State
let gameState = "intro";
let currentStakeholder = null;
let discoveredElements = {
  metrics: false,
  economicBuyer: false,
  decisionCriteria: false,
  decisionProcess: false,
  paperProcess: false,
  pain: false,
  champion: false,
  competition: false,
};
let score = 0;
let showModal = false;
let modalContent = null;
let discoveryNotes = [];
let quizAnswers = [];
let currentQuizQuestion = 0;
let quizScore = 0;
let showRestartConfirm = false;

// MEDDPICC Info
const meddpiccInfo = {
  metrics: {
    label: "Metrics",
    color: "#3b82f6",
    icon: "📈",
    description: "Quantifiable business outcomes the customer wants to achieve",
    why: "Metrics help you build a compelling business case and demonstrate ROI. Without concrete numbers, you can't prove value or justify the investment.",
    example:
      "In this case: $75K quarterly loss, potential $300K annual savings with 30% efficiency gain",
  },
  economicBuyer: {
    label: "Economic Buyer",
    color: "#10b981",
    icon: "💰",
    description: "The person with budget authority who signs the contract",
    why: "You must identify and engage the person who controls the money. Selling to anyone else wastes time and risks losing deals at the final stage.",
    example:
      "In this case: Jennifer Park (CFO) has final signature authority for purchases over $50K",
  },
  decisionCriteria: {
    label: "Decision Criteria",
    color: "#8b5cf6",
    icon: "✅",
    description:
      "The specific requirements used to evaluate and compare solutions",
    why: "Understanding their criteria lets you position your strengths and differentiate from competitors. You can influence criteria early in the sales cycle.",
    example:
      "In this case: Integration capabilities, mobile access, reporting, scalability to 200+ users, SSO & SOC2 compliance",
  },
  decisionProcess: {
    label: "Decision Process",
    color: "#f59e0b",
    icon: "📋",
    description:
      "The steps and timeline the organization follows to make a buying decision",
    why: "Knowing the process helps you forecast accurately, identify potential roadblocks, and align your sales activities to their buying journey.",
    example:
      "In this case: Technical eval (2 weeks) → Pilot (4 weeks) → Budget approval → Procurement. Total: 8-10 weeks",
  },
  paperProcess: {
    label: "Paper Process",
    color: "#ef4444",
    icon: "📄",
    description:
      "The legal, procurement, and contracting steps required to finalize the deal",
    why: "Paper process delays kill deals. Understanding security reviews, legal approvals, and procurement timelines prevents surprise delays at closing.",
    example:
      "In this case: Security review (2 weeks), legal review (3 weeks), board approval if >$100K. Q3 budget already approved",
  },
  pain: {
    label: "Pain",
    color: "#ec4899",
    icon: "⚠️",
    description: "The critical business problems causing urgency for change",
    why: "Pain creates urgency. Without clear, urgent pain, deals stall. The stronger the pain, the faster they'll move to solve it.",
    example:
      "In this case: System crashes 2x/week during deadlines, 5+ hours weekly on workarounds, zero project visibility, lost files",
  },
  champion: {
    label: "Champion",
    color: "#14b8a6",
    icon: "👥",
    description:
      "An internal advocate who sells on your behalf when you're not in the room",
    why: "Champions navigate internal politics, influence stakeholders, and keep deals moving. Without a champion, you're fighting blind against internal resistance.",
    example:
      "In this case: Sarah Chen actively pushing leadership for months and willing to champion the solution internally",
  },
  competition: {
    label: "Competition",
    color: "#f97316",
    icon: "⚡",
    description:
      "Alternative solutions the customer is considering, including status quo",
    why: "You can't win without knowing who you're competing against and why. Understanding competition helps you differentiate and position strategically.",
    example:
      "In this case: Asana (too simple), Monday.com (expensive, current frontrunner), ClickUp (complex learning curve), status quo",
  },
};

// Stakeholders
const stakeholders = {
  sarah: {
    name: "Sarah Chen",
    title: "Project Manager",
    avatar: "👩‍💼",
    bio: "Runs daily operations, feels the pain of current tools",
  },
  mike: {
    name: "Mike Rodriguez",
    title: "VP of Operations",
    avatar: "👨‍💼",
    bio: "Focused on efficiency and ROI",
  },
  jennifer: {
    name: "Jennifer Park",
    title: "CFO",
    avatar: "👩‍💻",
    bio: "Controls the budget, signs the checks",
  },
  tom: {
    name: "Tom Anderson",
    title: "IT Director",
    avatar: "👨‍🔧",
    bio: "Technical gatekeeper, knows the landscape",
  },
};

// Quiz Questions
const quizQuestions = [
  {
    question: "What is the definition of METRICS in MEDDPICC?",
    type: "definition",
    options: [
      "The person who controls the budget",
      "Quantifiable business outcomes the customer wants to achieve",
      "The steps to make a buying decision",
      "The legal and procurement process",
    ],
    correct: 1,
    explanation:
      "Metrics are quantifiable business outcomes that help build a compelling business case and demonstrate ROI.",
  },
  {
    question:
      "In this deal, what is the potential annual savings if they achieve a 30% efficiency gain?",
    type: "deal-specific",
    options: ["$150K", "$200K", "$300K", "$500K"],
    correct: 2,
    explanation:
      "Mike Rodriguez mentioned they could achieve roughly $300K in annual savings with a 30% cut in project completion time.",
  },
  {
    question: "What is the ECONOMIC BUYER?",
    type: "definition",
    options: [
      "The person who will use the product daily",
      "The person with budget authority who signs the contract",
      "The person who evaluates technical requirements",
      "The person who champions the solution internally",
    ],
    correct: 1,
    explanation:
      "The Economic Buyer is the person with budget authority who has the power to sign the contract and approve the purchase.",
  },
  {
    question: "Who is the Economic Buyer in this deal?",
    type: "deal-specific",
    options: ["Sarah Chen", "Mike Rodriguez", "Jennifer Park", "Tom Anderson"],
    correct: 2,
    explanation:
      "Jennifer Park (CFO) is the Economic Buyer. She controls the budget and anything over $50K needs her signature.",
  },
  {
    question: "What does PAIN represent in MEDDPICC?",
    type: "definition",
    options: [
      "The competitor's weaknesses",
      "The critical business problems causing urgency for change",
      "The price point that's too high",
      "The paperwork required to close",
    ],
    correct: 1,
    explanation:
      "Pain represents the critical business problems causing urgency for change. Without clear, urgent pain, deals tend to stall.",
  },
  {
    question: "What is the total timeline for TechFlow's buying process?",
    type: "deal-specific",
    options: ["4-6 weeks", "6-8 weeks", "8-10 weeks", "10-12 weeks"],
    correct: 2,
    explanation:
      "Tom Anderson mentioned the total timeline is usually 8-10 weeks: technical eval (2 weeks) + pilot (4 weeks) + budget approval + procurement.",
  },
  {
    question: "What is a CHAMPION in MEDDPICC?",
    type: "definition",
    options: [
      "The highest-ranking executive in the company",
      "An internal advocate who sells on your behalf when you're not in the room",
      "The person who has the final budget approval",
      "The competitive vendor you need to beat",
    ],
    correct: 1,
    explanation:
      "A Champion is an internal advocate who sells on your behalf, navigates internal politics, and keeps deals moving forward.",
  },
  {
    question: "Which competitor is currently the frontrunner in this deal?",
    type: "deal-specific",
    options: ["Asana", "ClickUp", "Monday.com", "Jira"],
    correct: 2,
    explanation:
      "According to Tom Anderson, Monday.com is the current frontrunner, though it's expensive.",
  },
  {
    question: "What does DECISION CRITERIA mean?",
    type: "definition",
    options: [
      "The timeline for making a decision",
      "The specific requirements used to evaluate and compare solutions",
      "The committee that makes the final choice",
      "The legal terms in the contract",
    ],
    correct: 1,
    explanation:
      "Decision Criteria are the specific requirements the customer uses to evaluate and compare different solutions.",
  },
  {
    question:
      "What ROI threshold would get this deal fast-tracked according to Jennifer?",
    type: "deal-specific",
    options: [
      "$100K+ in annual value",
      "$150K+ in annual value",
      "$250K+ in annual value",
      "$500K+ in annual value",
    ],
    correct: 2,
    explanation:
      "Jennifer Park stated that if they can prove $250K+ in annual value through efficiency gains and cost savings, the deal gets fast-tracked.",
  },
];

// Dialogues
const dialogues = {
  sarah: {
    responses: [
      {
        text: "Tell me about your day-to-day frustrations",
        element: "pain",
        reply:
          "Honestly? Our current tool crashes at least twice a week during critical deadlines. My team wastes 5+ hours weekly just on workarounds. It's killing our productivity!",
        points: 20,
      },
      {
        text: "How does your team feel about exploring new solutions?",
        element: "champion",
        reply:
          "I'm 100% on board! I've been pushing leadership for months to upgrade. I'll champion this internally if it solves our problems. Count me in!",
        points: 20,
      },
      {
        text: "What other solutions have you looked at?",
        element: "competition",
        reply:
          "We've demoed Asana and Monday.com. Asana was too simple for our complex workflows, and Monday was way too expensive for what we need.",
        points: 20,
      },
    ],
  },
  mike: {
    responses: [
      {
        text: "What's the business impact of the current inefficiencies?",
        element: "metrics",
        reply:
          "Great question! We lose about $75K per quarter in lost productivity and missed deadlines. If we can cut project completion time by 30%, that's roughly $300K in annual savings.",
        points: 20,
      },
      {
        text: "What criteria will you use to evaluate solutions?",
        element: "decisionCriteria",
        reply:
          "Three things: Integration with our existing tools, mobile accessibility for our remote team, and robust reporting. Also needs to scale to 200+ users without breaking the bank.",
        points: 20,
      },
      {
        text: "Tell me more about the pain points",
        element: "pain",
        reply:
          "Sarah's team can't collaborate effectively. Files get lost, version control is a nightmare, and we have zero visibility into project status until it's too late.",
        points: 20,
      },
    ],
  },
  jennifer: {
    responses: [
      {
        text: "Who has final approval on this purchase?",
        element: "economicBuyer",
        reply:
          "That's me. Anything over $50K needs my signature. Mike and I work together on business case, but I control the budget and final decision.",
        points: 20,
      },
      {
        text: "What does your procurement process look like?",
        element: "paperProcess",
        reply:
          "We'll need security review (2 weeks), legal review (3 weeks), and then board approval if it's over $100K. Budget is already approved for Q3, so timing works if we move fast.",
        points: 20,
      },
      {
        text: "What ROI would make this a no-brainer?",
        element: "metrics",
        reply:
          "If we can prove $250K+ in annual value through efficiency gains and cost savings, this gets fast-tracked. Mike mentioned potential $300K impact - that would seal the deal.",
        points: 20,
      },
    ],
  },
  tom: {
    responses: [
      {
        text: "What other vendors are you considering?",
        element: "competition",
        reply:
          "We're looking at Asana, Monday.com, and ClickUp. Monday is the frontrunner but expensive. ClickUp has great features but Sarah's worried about learning curve.",
        points: 20,
      },
      {
        text: "Walk me through your typical buying process",
        element: "decisionProcess",
        reply:
          "First, I do technical evaluation (2 weeks). Then pilot with Sarah's team (4 weeks). If successful, goes to Jennifer for budget approval, then procurement. Total timeline is usually 8-10 weeks.",
        points: 20,
      },
      {
        text: "What must the solution integrate with?",
        element: "decisionCriteria",
        reply:
          "Must integrate with Slack, Google Workspace, and our custom CRM. API access is non-negotiable. Also need SSO and SOC2 compliance for security team approval.",
        points: 20,
      },
    ],
  },
};

// Render Functions
function render() {
  window.scrollTo(0, 0);
  const app = document.getElementById("app");

  if (gameState === "intro") {
    app.innerHTML = renderIntro();
  } else if (gameState === "playing") {
    app.innerHTML = renderPlaying();
  } else if (gameState === "conversation") {
    app.innerHTML = renderConversation();
  } else if (gameState === "quizIntro") {
    app.innerHTML = renderQuizIntro();
  } else if (gameState === "quiz") {
    app.innerHTML = renderQuiz();
  } else if (gameState === "victory") {
    app.innerHTML = renderVictory();
  }

  if (showModal && modalContent) {
    const modalHTML = renderModal();
    app.insertAdjacentHTML("beforeend", modalHTML);
  }

  if (showRestartConfirm) {
    const restartHTML = renderRestartConfirm();
    app.insertAdjacentHTML("beforeend", restartHTML);
  }

  attachEventListeners();
}

function renderIntro() {
  return `
    <div class="gradient-bg center-container">
      <div class="card" style="max-width: 800px;">
        <div class="emoji-large">🕵️‍♂️</div>
        <h1>MEDDPICC Detective</h1>
        <p class="subtitle">
          Your mission: Qualify this deal by uncovering all <strong>8 MEDDPICC elements</strong> 
          through strategic conversations with key stakeholders.
        </p>

        <!-- Learning Objective Section -->
        <div style="background: #eff6ff; padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center; border: 1px solid #3b82f6;">
          <h3 style="color: #1e40af; margin: 0 0 12px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span>🎯</span> Learning Objective
          </h3>
          <p style="color: #1e3a8a; margin: 0; font-size: 17px; line-height: 1.7; font-weight: 500;">
            Master the MEDDPICC Framework by learning to identify and define all 8 critical elements of deal qualification through strategic discovery conversations
          </p>
        </div>

        <!-- How to Play Section -->
        <div style="background: #f0fdf4; padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: left; border: 1px solid #10b981;">
          <h3 style="color: #065f46; margin: 0 0 16px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 8px;">
            <span>📋</span> How to Play
          </h3>
          <div style="color: #047857; font-size: 15px; line-height: 1.8;">
            <p style="margin: 0 0 12px 0;"><strong>1. Choose Your Stakeholder:</strong> Select from 4 key contacts at TechFlow Solutions, each with unique insights</p>
            <p style="margin: 0 0 12px 0;"><strong>2. Ask Strategic Questions:</strong> Pick the right question to uncover specific MEDDPICC elements</p>
            <p style="margin: 0 0 12px 0;"><strong>3. Take Notes:</strong> Your discoveries are automatically documented for reference</p>
            <p style="margin: 0 0 12px 0;"><strong>4. Complete Discovery:</strong> Uncover all 8 MEDDPICC elements by talking to different stakeholders</p>
            <p style="margin: 0;"><strong>5. Test Your Knowledge:</strong> Take a 10-question quiz covering MEDDPICC definitions and deal-specific details</p>
          </div>
        </div>
        
        <div class="info-box">
          <h3>The Case:</h3>
          <p><strong>Company:</strong> TechFlow Solutions (500 employees)</p>
          <p><strong>Opportunity:</strong> Project Management Software</p>
          <p style="margin: 0;"><strong>Potential Value:</strong> $150K-$300K annual contract</p>
        </div>

        <button class="btn-primary" onclick="startGame()">
          Start Investigation 🔍
        </button>
      </div>
    </div>
  `;
}

function renderPlaying() {
  const discoveredCount = Object.values(discoveredElements).filter(
    (v) => v
  ).length;
  const totalElements = 8;
  const progressPercent = (discoveredCount / totalElements) * 100;

  return `
    <div class="gradient-bg">
      <div class="game-container">
        <div class="header-card">
          <div>
            <h2 style="margin: 0 0 5px 0; font-size: 28px;">🕵️‍♂️ MEDDPICC Detective</h2>
            <p style="margin: 0; color: #6b7280;">Uncover all 8 elements to qualify this deal</p>
          </div>
          <div style="display: flex; align-items: center; gap: 20px;">
            <button class="btn-secondary" onclick="confirmRestart()" style="padding: 10px 20px; font-size: 13px;">
              ↻ Start Over
            </button>
            <div class="score-display">
              <div class="score-number">${score}</div>
              <div class="score-label">points</div>
            </div>
          </div>
        </div>

        <div class="grid-container">
          <div class="white-card">
            <h2>Choose who to talk to:</h2>
            <div class="stakeholder-grid">
              ${Object.entries(stakeholders)
                .map(
                  ([key, person]) => `
                <div class="stakeholder-card" onclick="selectStakeholder('${key}')">
                  <div class="stakeholder-avatar">${person.avatar}</div>
                  <div class="stakeholder-name">${person.name}</div>
                  <div class="stakeholder-title">${person.title}</div>
                  <div class="stakeholder-bio">${person.bio}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="white-card progress-card">
            <h3 style="margin: 0 0 15px 0;">MEDDPICC Progress</h3>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${progressPercent}%"></div>
            </div>
            <div class="progress-count">${discoveredCount} / ${totalElements} Found</div>
            <div>
              ${Object.entries(meddpiccInfo)
                .map(
                  ([key, info]) => `
                <div class="meddpicc-item ${
                  discoveredElements[key] ? "discovered" : ""
                }">
                  <div class="meddpicc-icon">${info.icon}</div>
                  <div class="meddpicc-label">${info.label}</div>
                  ${
                    discoveredElements[key]
                      ? '<div class="checkmark">✓</div>'
                      : ""
                  }
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>

        <!-- Notes Section Below -->
        <div class="white-card" style="margin-top: 20px;">
          <div class="notes-header">
            <span>📝</span>
            <span>Your Investigation Notes</span>
          </div>
          ${
            discoveryNotes.length === 0
              ? `
            <div class="notes-empty">
              Talk to stakeholders to gather intel and build your notes
            </div>
          `
              : `
            <div class="notes-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px;">
              ${discoveryNotes
                .map(
                  (note) => `
                <div class="note-item">
                  <div class="note-header">
                    <span class="note-element">${
                      meddpiccInfo[note.element].icon
                    } ${note.elementLabel}</span>
                    <span class="note-stakeholder">${note.stakeholder}</span>
                  </div>
                  <div class="note-content">"${note.reply}"</div>
                  <div class="note-key-info">💡 ${note.keyInfo}</div>
                </div>
              `
                )
                .join("")}
            </div>
          `
          }
        </div>
      </div>
    </div>
  `;
}

function renderConversation() {
  const stakeholder = stakeholders[currentStakeholder];
  const dialogue = dialogues[currentStakeholder];
  const discoveredCount = Object.values(discoveredElements).filter(
    (v) => v
  ).length;
  const totalElements = 8;
  const progressPercent = (discoveredCount / totalElements) * 100;

  return `
    <div class="gradient-bg">
      <div style="max-width: 1400px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div class="header-card" style="margin-bottom: 24px;">
          <div>
            <h2 style="margin: 0 0 5px 0; font-size: 24px; font-weight: 700;">Conversation with ${
              stakeholder.name
            }</h2>
            <p style="margin: 0; color: #64748b; font-size: 14px;">${
              stakeholder.title
            }</p>
          </div>
          <div style="display: flex; align-items: center; gap: 20px;">
            <button class="btn-secondary" onclick="confirmRestart()" style="padding: 10px 20px; font-size: 13px;">
              ↻ Start Over
            </button>
            <div class="score-display">
              <div class="score-number">${score}</div>
              <div class="score-label">points</div>
            </div>
          </div>
        </div>

        <!-- Two Column Layout -->
        <div class="conversation-layout" style="display: grid; grid-template-columns: 1fr 380px; gap: 24px;">
          <!-- Main Conversation Area -->
          <div class="white-card">
            <div class="stakeholder-info">
              <div style="font-size: 60px;">${stakeholder.avatar}</div>
              <div class="stakeholder-details">
                <div style="font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 5px; letter-spacing: -0.025em;">
                  ${stakeholder.name}
                </div>
                <div style="font-size: 16px; color: #64748b; margin-bottom: 5px; font-weight: 500;">
                  ${stakeholder.title}
                </div>
                <div style="font-size: 14px; color: #94a3b8;">
                  ${stakeholder.bio}
                </div>
              </div>
            </div>

            <div class="response-section">
              <div class="response-label">Choose your approach:</div>
              ${dialogue.responses
                .map(
                  (response, idx) => `
                <button class="response-btn" onclick="handleResponse(${idx})">
                  💬 ${response.text}
                </button>
              `
                )
                .join("")}
            </div>

            <button class="btn-secondary" onclick="backToStakeholders()">
              ← Back to Stakeholders
            </button>
          </div>

          <!-- MEDDPICC Progress Sidebar -->
          <div class="conversation-sidebar" style="position: sticky; top: 20px; max-height: calc(100vh - 40px); overflow-y: auto;">
            <div class="white-card">
              <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">MEDDPICC Progress</h3>
              <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${progressPercent}%"></div>
              </div>
              <div class="progress-count">${discoveredCount} / ${totalElements} Found</div>
              <div>
                ${Object.entries(meddpiccInfo)
                  .map(
                    ([key, info]) => `
                  <div class="meddpicc-item ${
                    discoveredElements[key] ? "discovered" : ""
                  }">
                    <div class="meddpicc-icon">${info.icon}</div>
                    <div class="meddpicc-label">${info.label}</div>
                    ${
                      discoveredElements[key]
                        ? '<div class="checkmark">✓</div>'
                        : ""
                    }
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderQuizIntro() {
  return `
    <div class="gradient-bg gradient-bg-success center-container">
      <div class="card" style="max-width: 700px;">
        <div style="text-align: right; margin-bottom: 16px;">
          <button class="btn-secondary" onclick="confirmRestart()" style="padding: 8px 16px; font-size: 12px;">
            ↻ Start Over
          </button>
        </div>
        
        <div class="emoji-xlarge">🎯</div>
        <h1 style="font-size: 42px;">Discovery Complete!</h1>
        <p style="font-size: 20px; color: #64748b; margin-bottom: 32px; line-height: 1.7;">
          Excellent work! You've uncovered all <strong>8 MEDDPICC elements</strong> for this deal.
        </p>

        <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 32px; text-align: left; border: 1px solid #e2e8f0;">
          <h3 style="color: #0f172a; margin-bottom: 16px; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
            ✅ What You've Learned
          </h3>
          <div class="elements-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            ${Object.entries(meddpiccInfo)
              .map(
                ([key, info]) => `
              <div style="display: flex; align-items: center; gap: 8px; padding: 10px; background: #ecfdf5; border-radius: 8px; border: 1px solid #10b981;">
                <span style="font-size: 18px;">${info.icon}</span>
                <span style="font-size: 14px; color: #065f46; font-weight: 600;">${info.label}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div style="background: #fffbeb; padding: 24px; border-radius: 12px; margin-bottom: 32px; text-align: left; border: 1px solid #fbbf24;">
          <h3 style="color: #78350f; margin-bottom: 12px; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <span>📝</span> Next: Knowledge Check
          </h3>
          <p style="color: #92400e; margin: 0 0 12px 0; line-height: 1.7; font-size: 15px;">
            Test your understanding with a <strong>10-question quiz</strong> covering MEDDPICC definitions and specific details from this deal.
          </p>
          <p style="color: #92400e; margin: 0; line-height: 1.7; font-size: 15px; background: #fef3c7; padding: 12px; border-radius: 6px; border-left: 3px solid #f59e0b;">
            <strong>📋 Don't worry!</strong> Your investigation notes will be available during the quiz to help you answer deal-specific questions.
          </p>
        </div>

        <button class="btn-primary" onclick="startQuiz()" style="padding: 16px 48px; font-size: 18px;">
          Start Quiz →
        </button>
      </div>
    </div>
  `;
}

function renderQuiz() {
  const question = quizQuestions[currentQuizQuestion];
  const totalQuestions = quizQuestions.length;
  const progressPercent = (currentQuizQuestion / totalQuestions) * 100;

  return `
    <div class="gradient-bg">
      <div style="max-width: 1400px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div class="emoji-large">📝</div>
          <h1 style="font-size: 36px; margin-bottom: 10px; color: white;">Knowledge Check</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 18px;">
            Test your understanding of MEDDPICC and this deal
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 400px; gap: 20px;">
          <!-- Quiz Section -->
          <div class="white-card">
            <!-- Progress Bar -->
            <div style="background: #f3f4f6; border-radius: 8px; padding: 8px; margin-bottom: 30px;">
              <div style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); height: 8px; border-radius: 4px; width: ${progressPercent}%; transition: width 0.3s;"></div>
            </div>

            <div style="text-align: center; margin-bottom: 20px; color: #6b7280; font-weight: 500;">
              Question ${currentQuizQuestion + 1} of ${totalQuestions}
            </div>

            <!-- Question Type Badge -->
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="display: inline-block; background: ${
                question.type === "definition" ? "#dbeafe" : "#fef3c7"
              }; color: ${
    question.type === "definition" ? "#1e40af" : "#92400e"
  }; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                ${
                  question.type === "definition"
                    ? "📚 Definition"
                    : "🎯 Deal Specific"
                }
              </span>
            </div>

            <!-- Question -->
            <div style="background: #f9fafb; padding: 30px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #667eea;">
              <div style="font-size: 20px; font-weight: 600; color: #1f2937; line-height: 1.6;">
                ${question.question}
              </div>
            </div>

            <!-- Answer Options -->
            <div style="margin-bottom: 20px;">
              ${question.options
                .map(
                  (option, idx) => `
                <button class="response-btn" onclick="answerQuizQuestion(${idx})" style="font-size: 18px; padding: 24px;">
                  <span style="font-weight: bold; color: #667eea; margin-right: 12px;">${String.fromCharCode(
                    65 + idx
                  )}.</span>
                  ${option}
                </button>
              `
                )
                .join("")}
            </div>

            <!-- Quiz Progress Footer -->
            <div style="text-align: center; color: #9ca3af; font-size: 14px; margin-top: 30px;">
              ${quizAnswers.length} answered • ${quizScore} correct so far
            </div>
          </div>

          <!-- Notes Reference Section -->
          <div class="white-card" style="position: sticky; top: 20px; max-height: calc(100vh - 40px); overflow-y: auto;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 15px; color: #1f2937; font-weight: bold; font-size: 16px;">
              <span>📝</span>
              <span>Your Notes</span>
            </div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 20px; font-style: italic;">
              Reference your discoveries to answer deal-specific questions
            </div>
            ${
              discoveryNotes.length === 0
                ? `
              <div class="notes-empty">
                No notes available
              </div>
            `
                : `
              ${discoveryNotes
                .map(
                  (note) => `
                <div class="note-item" style="margin-bottom: 10px;">
                  <div class="note-header">
                    <span class="note-element" style="font-size: 12px;">${
                      meddpiccInfo[note.element].icon
                    } ${note.elementLabel}</span>
                    <span class="note-stakeholder">${note.stakeholder}</span>
                  </div>
                  <div class="note-content" style="font-size: 12px;">"${
                    note.reply
                  }"</div>
                  <div class="note-key-info" style="font-size: 11px;">💡 ${
                    note.keyInfo
                  }</div>
                </div>
              `
                )
                .join("")}
            `
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderRestartConfirm() {
  return `
    <div class="modal-overlay" onclick="cancelRestart()">
      <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 500px;">
        <div class="modal-emoji">⚠️</div>
        <h2 class="modal-title">Start Over?</h2>
        <p style="color: #64748b; text-align: center; margin-bottom: 32px; line-height: 1.6;">
          This will reset all your progress, including discovered elements, notes, and quiz answers. Are you sure you want to start over?
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <button class="btn-secondary" onclick="cancelRestart()" style="width: 100%; padding: 14px;">
            Cancel
          </button>
          <button class="btn-primary" onclick="confirmRestartYes()" style="width: 100%; padding: 14px; background: #ef4444;">
            Yes, Start Over
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderModal() {
  // Quiz feedback modal
  if (modalContent && modalContent.quizFeedback) {
    return `
      <div class="modal-overlay" onclick="nextQuizQuestion()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-emoji">${modalContent.correct ? "✅" : "❌"}</div>
          <h2 class="modal-title">${
            modalContent.correct ? "Correct!" : "Not Quite"
          }</h2>
          <div style="text-align: center; font-size: 18px; font-weight: 600; color: ${
            modalContent.correct ? "#10b981" : "#ef4444"
          }; margin-bottom: 30px;">
            ${modalContent.correct ? "+50 points" : "+0 points"}
          </div>

          <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px; font-weight: 600;">Question:</div>
            <div style="color: #1f2937; margin-bottom: 15px;">${
              modalContent.question
            }</div>
            
            ${
              !modalContent.correct
                ? `
              <div style="margin-bottom: 15px;">
                <div style="font-size: 14px; color: #ef4444; margin-bottom: 5px; font-weight: 600;">Your answer:</div>
                <div style="color: #6b7280; padding: 10px; background: #fee2e2; border-radius: 6px;">${modalContent.selectedAnswer}</div>
              </div>
            `
                : ""
            }
            
            <div>
              <div style="font-size: 14px; color: #10b981; margin-bottom: 5px; font-weight: 600;">Correct answer:</div>
              <div style="color: #1f2937; padding: 10px; background: #d1fae5; border-radius: 6px; font-weight: 500;">${
                modalContent.correctAnswer
              }</div>
            </div>
          </div>

          <div style="background: #dbeafe; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
            <div style="font-weight: bold; color: #1e40af; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span>💡</span> Explanation
            </div>
            <div style="color: #1e3a8a; line-height: 1.6; font-size: 14px;">
              ${modalContent.explanation}
            </div>
          </div>

          <button class="modal-btn" onclick="nextQuizQuestion()">
            ${
              currentQuizQuestion < quizQuestions.length - 1
                ? "Next Question →"
                : "See Results"
            }
          </button>
        </div>
      </div>
    `;
  }

  // Discovery modal
  const info = meddpiccInfo[modalContent.element];
  const stakeholder = stakeholders[currentStakeholder];

  if (modalContent.pointsDeducted) {
    return `
      <div class="modal-overlay" onclick="closeModal()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-emoji">⚠️</div>
          <h2 class="modal-title" style="color: #ef4444;">Already Discovered!</h2>
          <div style="text-align: center; font-size: 20px; font-weight: 700; color: #ef4444; margin-bottom: 24px; padding: 16px; background: #fee2e2; border-radius: 10px; border: 2px solid #ef4444;">
            -10 points penalty
          </div>
          
          <div style="background: #fef2f2; padding: 20px; border-radius: 10px; margin-bottom: 24px; border-left: 4px solid #ef4444;">
            <div style="font-weight: 600; color: #7f1d1d; margin-bottom: 8px; font-size: 14px;">
              ⛔ Why the penalty?
            </div>
            <div style="color: #991b1b; line-height: 1.6; font-size: 14px;">
              You've already uncovered <strong>${info.label}</strong> from another stakeholder. In real sales, asking redundant questions wastes time and can damage credibility with prospects.
            </div>
          </div>

          <div style="background: #eff6ff; padding: 20px; border-radius: 10px; margin-bottom: 24px; border-left: 4px solid #3b82f6;">
            <div style="font-weight: 600; color: #1e40af; margin-bottom: 8px; font-size: 14px;">
              💡 Pro Tip
            </div>
            <div style="color: #1e3a8a; line-height: 1.6; font-size: 14px;">
              Check your <strong>MEDDPICC Progress</strong> tracker on the right side to see which elements you've already discovered. Focus on finding the remaining elements to qualify the deal efficiently!
            </div>
          </div>

          <button class="modal-btn" onclick="closeModal()">Continue Investigation</button>
        </div>
      </div>
    `;
  }

  // Check if this is the last element
  if (modalContent.isLastElement) {
    return `
      <div class="modal-overlay" onclick="event.stopPropagation()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-emoji">🎯</div>
          <h2 class="modal-title">${info.label} Discovered!</h2>
          <div class="modal-points">+${modalContent.earnedPoints} points</div>

          <div class="response-box">
            <div class="response-label-small">${stakeholder.name} responds:</div>
            <div class="response-text">"${modalContent.reply}"</div>
          </div>

          <div class="info-section info-section-yellow">
            <div class="info-section-title">
              <span>💡</span> What is ${info.label}?
            </div>
            <div class="info-section-content">${info.description}</div>
          </div>

          <div class="info-section info-section-blue">
            <div class="info-section-title">
              <span>🎯</span> Why This Matters
            </div>
            <div class="info-section-content">${info.why}</div>
          </div>

          <div class="info-section info-section-green">
            <div class="info-section-title">
              <span>✅</span> In This Deal
            </div>
            <div class="info-section-content">${info.example}</div>
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 12px; margin: 24px 0; border: 2px solid #10b981;">
            <div style="text-align: center; font-size: 18px; font-weight: 700; color: #065f46; margin-bottom: 8px;">
              🎉 All MEDDPICC Elements Discovered!
            </div>
            <div style="text-align: center; font-size: 14px; color: #047857; line-height: 1.6;">
              Congratulations! You've completed the discovery phase. Ready to test your knowledge?
            </div>
          </div>

          <button class="modal-btn" onclick="closeModalAndStartQuiz()" style="background: #10b981; font-size: 18px; padding: 18px;">
            Test Your Knowledge 🎓
          </button>
        </div>
      </div>
    `;
  }

  // Regular discovery modal
  return `
    <div class="modal-overlay" onclick="closeModal()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-emoji">🎯</div>
        <h2 class="modal-title">${info.label} Discovered!</h2>
        <div class="modal-points">+${modalContent.earnedPoints} points</div>

        <div class="response-box">
          <div class="response-label-small">${stakeholder.name} responds:</div>
          <div class="response-text">"${modalContent.reply}"</div>
        </div>

        <div class="info-section info-section-yellow">
          <div class="info-section-title">
            <span>💡</span> What is ${info.label}?
          </div>
          <div class="info-section-content">${info.description}</div>
        </div>

        <div class="info-section info-section-blue">
          <div class="info-section-title">
            <span>🎯</span> Why This Matters
          </div>
          <div class="info-section-content">${info.why}</div>
        </div>

        <div class="info-section info-section-green">
          <div class="info-section-title">
            <span>✅</span> In This Deal
          </div>
          <div class="info-section-content">${info.example}</div>
        </div>

        <button class="modal-btn" onclick="closeModal()">Continue Investigation</button>
      </div>
    </div>
  `;
}

function renderVictory() {
  const discoveryScore = score;
  const quizMaxScore = quizQuestions.length * 50; // 50 points per question
  const quizEarnedScore = quizScore * 50;
  const totalScore = discoveryScore + quizEarnedScore;
  const maxTotalScore = 160 + quizMaxScore; // 8 elements * 20 points = 160
  const scorePercentage = (totalScore / maxTotalScore) * 100;

  // Calculate individual percentages
  const discoveryPercentage = (discoveryScore / 160) * 100;
  const quizPercentage = (quizEarnedScore / quizMaxScore) * 100;

  let grade = "C";
  let message = "You completed the investigation!";
  let emoji = "🎉";
  let gradientClass = "gradient-bg";
  let gradeColor = "#f59e0b";
  let feedback = "";
  let nextSteps = "";

  if (scorePercentage >= 90) {
    grade = "A+";
    message = "Outstanding! You're a MEDDPICC Master!";
    emoji = "🏆";
    gradientClass = "gradient-bg-success";
    gradeColor = "#10b981";
    feedback =
      "You've demonstrated exceptional mastery of the MEDDPICC framework. Your ability to identify and articulate each element shows you're ready to qualify deals with confidence and precision.";
    nextSteps =
      "Keep this momentum going! Apply MEDDPICC rigorously in your next sales conversations and watch your win rates soar.";
  } else if (scorePercentage >= 80) {
    grade = "A";
    message = "Excellent Work! Strong MEDDPICC Knowledge";
    emoji = "⭐";
    gradientClass = "gradient-bg-success";
    gradeColor = "#10b981";
    feedback =
      "You've shown strong understanding of MEDDPICC principles and can effectively identify key deal elements. You're well-equipped to use this framework in real sales scenarios.";
    nextSteps =
      "Review any questions you missed to strengthen your weak spots. Practice applying MEDDPICC in your discovery calls to build even more confidence.";
  } else if (scorePercentage >= 70) {
    grade = "B";
    message = "Good Job! Solid Foundation Built";
    emoji = "👍";
    gradientClass = "gradient-bg";
    gradeColor = "#3b82f6";
    feedback =
      "You've grasped the core concepts of MEDDPICC and can identify most key elements. With a bit more practice, you'll be qualifying deals like a pro.";
    nextSteps =
      "Focus on understanding why each MEDDPICC element matters in the sales process. Replay the game to reinforce the concepts you found challenging.";
  } else if (scorePercentage >= 60) {
    grade = "C";
    message = "Nice Start! Room to Grow";
    emoji = "📚";
    gradientClass = "gradient-bg";
    gradeColor = "#f59e0b";
    feedback =
      "You've completed your first MEDDPICC investigation and learned the framework basics. There's significant opportunity to deepen your understanding.";
    nextSteps =
      "Review the MEDDPICC definitions carefully and replay the game to strengthen your knowledge. Pay special attention to how each element connects to deal qualification.";
  } else {
    grade = "D";
    message = "Keep Learning! Practice Makes Perfect";
    emoji = "💪";
    gradientClass = "gradient-bg";
    gradeColor = "#ef4444";
    feedback =
      "MEDDPICC is a powerful framework that takes practice to master. Don't be discouraged – every expert started as a beginner.";
    nextSteps =
      "Take your time to review each MEDDPICC element's definition and importance. Replay the game and focus on understanding rather than speed.";
  }

  return `
    <div class="${gradientClass} center-container">
      <div class="card" style="max-width: 800px;">
        <div class="emoji-xlarge">${emoji}</div>
        <h1 style="font-size: 48px; margin-bottom: 10px;">${message}</h1>
        <p style="font-size: 18px; color: #6b7280; margin-bottom: 30px; line-height: 1.6;">${feedback}</p>
        
        <!-- Grade Box with Color Coding -->
        <div style="background: linear-gradient(135deg, ${gradeColor}15 0%, ${gradeColor}25 100%); padding: 32px; border-radius: 16px; margin-bottom: 30px; border: 3px solid ${gradeColor};">
          <div style="font-size: 64px; font-weight: 800; color: ${gradeColor}; margin-bottom: 8px; letter-spacing: -0.025em; text-align: center;">
            ${grade}
          </div>
          <div style="font-size: 28px; font-weight: 600; color: ${gradeColor}; letter-spacing: -0.025em; text-align: center;">
            ${totalScore} / ${maxTotalScore} points
          </div>
          <div style="text-align: center; margin-top: 12px; font-size: 16px; color: ${gradeColor}; font-weight: 600;">
            ${scorePercentage.toFixed(1)}% Overall
          </div>
        </div>

        <!-- Detailed Score Breakdown with Color Coding -->
        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 30px; text-align: left; border: 2px solid #e5e7eb;">
          <h3 style="color: #374151; margin-bottom: 20px; text-align: center; font-size: 18px; text-transform: uppercase; letter-spacing: 0.05em;">📊 Performance Breakdown</h3>
          
          <!-- Discovery Phase -->
          <div style="background: ${
            discoveryPercentage >= 75
              ? "#ecfdf5"
              : discoveryPercentage >= 50
              ? "#fef3c7"
              : "#fee2e2"
          }; padding: 16px; border-radius: 10px; margin-bottom: 12px; border-left: 4px solid ${
    discoveryPercentage >= 75
      ? "#10b981"
      : discoveryPercentage >= 50
      ? "#f59e0b"
      : "#ef4444"
  };">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">🕵️</span>
                Discovery Phase
              </span>
              <span style="font-weight: bold; color: ${
                discoveryPercentage >= 75
                  ? "#065f46"
                  : discoveryPercentage >= 50
                  ? "#92400e"
                  : "#7f1d1d"
              }; font-size: 18px;">
                ${discoveryScore} / 160
              </span>
            </div>
            <div style="background: rgba(255,255,255,0.5); height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="background: ${
                discoveryPercentage >= 75
                  ? "#10b981"
                  : discoveryPercentage >= 50
                  ? "#f59e0b"
                  : "#ef4444"
              }; height: 100%; width: ${discoveryPercentage}%; transition: width 0.5s;"></div>
            </div>
            <div style="text-align: right; margin-top: 6px; font-size: 13px; color: ${
              discoveryPercentage >= 75
                ? "#065f46"
                : discoveryPercentage >= 50
                ? "#92400e"
                : "#7f1d1d"
            }; font-weight: 600;">
              ${discoveryPercentage.toFixed(0)}% Complete
            </div>
          </div>

          <!-- Quiz Phase -->
          <div style="background: ${
            quizPercentage >= 75
              ? "#ecfdf5"
              : quizPercentage >= 50
              ? "#fef3c7"
              : "#fee2e2"
          }; padding: 16px; border-radius: 10px; border-left: 4px solid ${
    quizPercentage >= 75
      ? "#10b981"
      : quizPercentage >= 50
      ? "#f59e0b"
      : "#ef4444"
  };">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">📝</span>
                Knowledge Quiz
              </span>
              <span style="font-weight: bold; color: ${
                quizPercentage >= 75
                  ? "#065f46"
                  : quizPercentage >= 50
                  ? "#92400e"
                  : "#7f1d1d"
              }; font-size: 18px;">
                ${quizEarnedScore} / ${quizMaxScore}
              </span>
            </div>
            <div style="background: rgba(255,255,255,0.5); height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="background: ${
                quizPercentage >= 75
                  ? "#10b981"
                  : quizPercentage >= 50
                  ? "#f59e0b"
                  : "#ef4444"
              }; height: 100%; width: ${quizPercentage}%; transition: width 0.5s;"></div>
            </div>
            <div style="text-align: right; margin-top: 6px; font-size: 13px; color: ${
              quizPercentage >= 75
                ? "#065f46"
                : quizPercentage >= 50
                ? "#92400e"
                : "#7f1d1d"
            }; font-weight: 600;">
              ${quizScore}/${
    quizQuestions.length
  } correct (${quizPercentage.toFixed(0)}%)
            </div>
          </div>
        </div>

        <!-- Next Steps Recommendation -->
        <div style="background: #eff6ff; padding: 24px; border-radius: 12px; margin-bottom: 30px; text-align: left; border: 2px solid #3b82f6;">
          <h3 style="color: #1e40af; margin-bottom: 12px; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <span>🎯</span> Next Steps
          </h3>
          <p style="color: #1e3a8a; margin: 0; line-height: 1.7; font-size: 15px;">
            ${nextSteps}
          </p>
        </div>

        <!-- Elements Discovered -->
        <div style="text-align: left; margin-bottom: 30px;">
          <h3 style="color: #374151; margin-bottom: 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">MEDDPICC Elements Discovered</h3>
          <div class="elements-grid">
            ${Object.entries(meddpiccInfo)
              .map(
                ([key, info]) => `
              <div class="element-item ${
                discoveredElements[key]
                  ? "element-discovered"
                  : "element-missing"
              }">
                <span style="font-size: 20px;">${info.icon}</span>
                <span style="font-size: 14px; color: #374151;">${
                  info.label
                }</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        ${
          discoveryNotes.length > 0
            ? `
          <div style="text-align: left; margin-bottom: 30px; max-height: 300px; overflow-y: auto; background: #f9fafb; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb;">
            <h3 style="color: #374151; margin-bottom: 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">📝 Your Investigation Notes</h3>
            ${discoveryNotes
              .map(
                (note) => `
              <div style="background: white; border-left: 4px solid ${
                meddpiccInfo[note.element].color
              }; padding: 12px; border-radius: 6px; margin-bottom: 10px; font-size: 13px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="font-weight: bold; color: #1f2937; margin-bottom: 6px;">
                  ${meddpiccInfo[note.element].icon} ${
                  note.elementLabel
                } <span style="color: #9ca3af; font-weight: normal; font-size: 11px;">- ${
                  note.stakeholder
                }</span>
                </div>
                <div style="color: #4b5563; font-size: 12px;">${
                  note.keyInfo
                }</div>
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }

        <button class="btn-primary" onclick="playAgain()" style="padding: 16px 48px; font-size: 18px;">
          Play Again 🔄
        </button>
      </div>
    </div>
  `;
}

// Event Handlers
function attachEventListeners() {
  // Event listeners are handled via onclick in the HTML
}

function startGame() {
  gameState = "playing";
  render();
}

function selectStakeholder(key) {
  currentStakeholder = key;
  gameState = "conversation";
  render();
}

function handleResponse(responseIndex) {
  const dialogue = dialogues[currentStakeholder];
  const response = dialogue.responses[responseIndex];

  let earnedPoints = 0;
  let pointsDeducted = false;

  if (!discoveredElements[response.element]) {
    discoveredElements[response.element] = true;
    earnedPoints = response.points;
    score += earnedPoints;

    // Add to notes
    const info = meddpiccInfo[response.element];
    discoveryNotes.push({
      element: response.element,
      elementLabel: info.label,
      stakeholder: stakeholders[currentStakeholder].name,
      reply: response.reply,
      keyInfo: info.example,
    });
  } else {
    // Element already discovered - deduct 10 points
    earnedPoints = -10;
    score = Math.max(0, score - 10); // Don't let score go negative
    pointsDeducted = true;
  }

  // Check if all elements discovered
  const allDiscovered = Object.values(discoveredElements).every((val) => val);

  modalContent = {
    element: response.element,
    reply: response.reply,
    earnedPoints: earnedPoints,
    alreadyDiscovered: pointsDeducted,
    pointsDeducted: pointsDeducted,
    isLastElement: allDiscovered && !pointsDeducted,
  };
  showModal = true;

  render();
}

function startQuiz() {
  gameState = "quiz";
  currentQuizQuestion = 0;
  quizAnswers = [];
  quizScore = 0;
  render();
}

function answerQuizQuestion(selectedIndex) {
  const question = quizQuestions[currentQuizQuestion];
  const isCorrect = selectedIndex === question.correct;

  if (isCorrect) {
    quizScore++;
  }

  quizAnswers.push({
    questionIndex: currentQuizQuestion,
    selectedIndex: selectedIndex,
    correct: isCorrect,
  });

  // Show feedback modal
  modalContent = {
    quizFeedback: true,
    correct: isCorrect,
    question: question.question,
    selectedAnswer: question.options[selectedIndex],
    correctAnswer: question.options[question.correct],
    explanation: question.explanation,
  };
  showModal = true;
  render();
}

function nextQuizQuestion() {
  showModal = false;
  modalContent = null;
  currentQuizQuestion++;

  if (currentQuizQuestion >= quizQuestions.length) {
    // Quiz complete - go to victory
    gameState = "victory";
  }

  render();
}

function closeModal() {
  showModal = false;
  modalContent = null;
  gameState = "playing";
  render();
}

function closeModalAndStartQuiz() {
  showModal = false;
  modalContent = null;
  gameState = "quizIntro";
  render();
}

function backToStakeholders() {
  gameState = "playing";
  currentStakeholder = null;
  render();
}

function playAgain() {
  gameState = "intro";
  currentStakeholder = null;
  discoveredElements = {
    metrics: false,
    economicBuyer: false,
    decisionCriteria: false,
    decisionProcess: false,
    paperProcess: false,
    pain: false,
    champion: false,
    competition: false,
  };
  score = 0;
  showModal = false;
  modalContent = null;
  discoveryNotes = [];
  quizAnswers = [];
  currentQuizQuestion = 0;
  quizScore = 0;
  showRestartConfirm = false;
  render();
}

function confirmRestart() {
  showRestartConfirm = true;
  render();
}

function cancelRestart() {
  showRestartConfirm = false;
  render();
}

function confirmRestartYes() {
  playAgain();
}

// Initialize
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

render();
