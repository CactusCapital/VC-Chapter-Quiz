import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Check,
  ChevronRight,
  GraduationCap,
  Lock,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  X
} from "lucide-react";

const quizzes = [
  {
    id: "easy",
    title: "Easy",
    subtitle: "Core concepts and must-know definitions",
    level: "Foundation",
    unlockRequirement: null,
    questions: [
      {
        id: "easy-1",
        difficulty: "easy",
        category: "VC Fund Structure",
        source: "Sessions 5-7",
        type: "single",
        question: "Which description best matches the difference between LPs and GPs in a VC fund?",
        options: [
          "LPs manage the fund; GPs only provide capital",
          "LPs provide capital; GPs manage the fund and make investment decisions",
          "LPs and GPs both vote on every startup investment equally",
          "GPs are startup founders; LPs are startup employees"
        ],
        answer: 1,
        explanation:
          "LPs are the capital providers to the fund. GPs manage the fund, raise capital, invest in startups, and manage the portfolio."
      },
      {
        id: "easy-2",
        difficulty: "easy",
        category: "VC Fund Structure",
        source: "Sessions 5-7",
        type: "single",
        question: "In the common VC compensation model, what does '2 and 20' usually mean?",
        options: [
          "2% carry and 20% management fee",
          "2% annual management fee and 20% carried interest",
          "2 years to invest and 20 years to exit",
          "2 LPs and 20 GPs in every fund"
        ],
        answer: 1,
        explanation:
          "The standard model is usually a 2% annual management fee on AUM and 20% carried interest from profits after capital is returned to LPs."
      },
      {
        id: "easy-3",
        difficulty: "easy",
        category: "Fundraising Timing",
        source: "Sessions 5-7",
        type: "single",
        question:
          "A startup has 7 months of runway left. Based on the session's rule of thumb, what should the founders do?",
        options: [
          "Start fundraising now or very soon",
          "Wait until they have 1 month left to improve urgency",
          "Raise only after they already have profitability",
          "Stop hiring and avoid fundraising entirely"
        ],
        answer: 0,
        explanation:
          "The session taught that founders should usually begin fundraising 6-8 months before the cash runs out."
      },
      {
        id: "easy-4",
        difficulty: "easy",
        category: "Fundraising Amount",
        source: "Sessions 5-7",
        type: "single",
        question: "According to the fundraising session, what should the amount raised usually allow the startup to do?",
        options: [
          "Avoid needing milestones for as long as possible",
          "Prove key product, market, and competition theses over roughly 18-24 months",
          "Guarantee an IPO in the next round",
          "Avoid all dilution permanently"
        ],
        answer: 1,
        explanation:
          "The session framed fundraising around proving three theses: product, market, and competition, usually over 18-24 months."
      },
      {
        id: "easy-5",
        difficulty: "easy",
        category: "Power Law",
        source: "Sessions 5-7",
        type: "single",
        question: "Why is the power law so important in VC?",
        options: [
          "Because every portfolio company is expected to return the same amount",
          "Because a small number of outlier investments can drive most fund returns",
          "Because VCs avoid high-risk startups",
          "Because fund returns depend mainly on management fees"
        ],
        answer: 1,
        explanation:
          "VC returns are highly concentrated. A small number of exceptional outcomes can generate most of the fund's returns."
      },
      {
        id: "easy-6",
        difficulty: "easy",
        category: "Term Sheet",
        source: "Sessions 5-7",
        type: "single",
        question: "Which statement best describes a term sheet?",
        options: [
          "It is the final investment agreement",
          "It is a preliminary document describing key deal terms before final agreements",
          "It automatically transfers all founder shares to investors",
          "It is used only after IPO"
        ],
        answer: 1,
        explanation:
          "A term sheet is mostly a preliminary document that outlines the main investment terms before due diligence and final documents."
      },
      {
        id: "easy-7",
        difficulty: "easy",
        category: "Investment Instruments",
        source: "Sessions 5-7",
        type: "single",
        question: "Which statement best describes a SAFE?",
        options: [
          "It is usually a loan with interest and a repayment date",
          "It gives investors ordinary shares immediately",
          "It is an agreement for future equity, usually converting in a future priced round",
          "It is only used by public companies"
        ],
        answer: 2,
        explanation:
          "A SAFE is not usually debt. It gives money now in exchange for future equity, often converting in a later priced round."
      },
      {
        id: "easy-8",
        difficulty: "easy",
        category: "Valuation",
        source: "Sessions 5-7",
        type: "single",
        question: "A company raises $5M at a $20M post-money valuation. What is the pre-money valuation?",
        options: ["$5M", "$15M", "$20M", "$25M"],
        answer: 1,
        explanation:
          "Post-money valuation equals pre-money valuation plus the investment. So $20M post-money minus $5M investment equals $15M pre-money."
      },
      {
        id: "easy-9",
        difficulty: "easy",
        category: "Preferred Shares",
        source: "Sessions 5-7",
        type: "single",
        question: "Why do investors usually receive preferred shares rather than ordinary shares?",
        options: [
          "Preferred shares often include special rights such as liquidation preference, veto rights, or dividend priority",
          "Preferred shares have no rights at all",
          "Preferred shares are only for employees",
          "Preferred shares prevent the company from raising again"
        ],
        answer: 0,
        explanation:
          "Investors usually receive preferred shares because they include additional economic and control protections."
      },
      {
        id: "easy-10",
        difficulty: "easy",
        category: "IP",
        source: "Sessions 5-7",
        type: "single",
        question: "Which type of IP protection is most relevant for source code itself?",
        options: ["Copyright", "Trademark", "Design registration", "Liquidation preference"],
        answer: 0,
        explanation:
          "Source code itself is generally protected by copyright. A patent may protect a method or process, but not the literal code itself."
      },
      {
        id: "easy-11",
        difficulty: "easy",
        category: "Fundraising Mistakes",
        source: "Final Session",
        type: "single",
        question:
          "According to Amir Shevat's fundraising mistakes, why can raising VC money when you do not need it be a mistake?",
        options: [
          "Because every startup must bootstrap forever",
          "Because not every business needs VC, and bootstrap is increasingly relevant, especially with AI tools",
          "Because VC funding is illegal before product-market fit",
          "Because investors only fund companies that are already profitable"
        ],
        answer: 1,
        explanation:
          "The point is not that VC is bad. The point is that VC is suitable for specific types of companies, usually those with massive scale potential. Some businesses may be better served by bootstrapping."
      },
      {
        id: "easy-12",
        difficulty: "easy",
        category: "Investment Framework",
        source: "Final Session",
        type: "single",
        question: "According to Amir Shevat's framework, what are the 3 T's for evaluating an investment?",
        options: [
          "Team, TAM, Technology",
          "Term Sheet, Timing, Tax",
          "Traction, Trademark, Treasury",
          "Talent, Token, Transaction"
        ],
        answer: 0,
        explanation:
          "The 3 T's are Team, TAM, and Technology. Team is the most important, TAM checks whether the market is large and growing, and Technology checks whether the solution is feasible and relevant."
      }
    ]
  },
  {
    id: "medium",
    title: "Medium",
    subtitle: "Applied scenarios and investor logic",
    level: "Analyst Practice",
    unlockRequirement: "easy",
    questions: [
      {
        id: "medium-1",
        difficulty: "medium",
        category: "De-risking",
        source: "Sessions 5-7",
        type: "single",
        question: "Which fundraising approach best reflects the de-risking mindset from the session?",
        options: [
          "Raise the largest possible round before proving anything",
          "Raise enough to prove meaningful milestones, then raise more after risk is reduced",
          "Avoid investors even if the business needs capital",
          "Raise only from friends and family forever"
        ],
        answer: 1,
        explanation:
          "De-risking means proving milestones step by step before raising larger amounts of capital."
      },
      {
        id: "medium-2",
        difficulty: "medium",
        category: "Investor Fit",
        source: "Final Session",
        type: "single",
        question: "What is the main risk of raising from the wrong investors?",
        options: [
          "They may lack domain understanding, alignment, or shared incentives",
          "They will always offer too much money",
          "They prevent the company from having customers",
          "They automatically own the company's IP"
        ],
        answer: 0,
        explanation:
          "Founders should run due diligence on investors too. Misaligned investors can create strategic, governance, and relationship problems later."
      },
      {
        id: "medium-3",
        difficulty: "medium",
        category: "Term Sheet",
        source: "Sessions 5-7",
        type: "single",
        question: "Which parts of a term sheet are commonly binding?",
        options: [
          "Only valuation",
          "Confidentiality, exclusivity/no-shop, and sometimes expenses",
          "Every business term and every legal term",
          "Only the investor's board seat"
        ],
        answer: 1,
        explanation:
          "Term sheets are mostly non-binding, but confidentiality and exclusivity are usually binding, and expenses may sometimes be binding."
      },
      {
        id: "medium-4",
        difficulty: "medium",
        category: "SAFE Terms",
        source: "Sessions 5-7",
        type: "single",
        question: "Why would an early investor care about a SAFE valuation cap?",
        options: [
          "It guarantees the company will exit",
          "It limits the valuation used for conversion, protecting the investor if the next round valuation is high",
          "It prevents all future dilution",
          "It gives the investor a salary"
        ],
        answer: 1,
        explanation:
          "A valuation cap protects early SAFE investors by setting a maximum valuation for conversion into future equity."
      },
      {
        id: "medium-5",
        difficulty: "medium",
        category: "Cap Table",
        source: "Sessions 5-7",
        type: "single",
        question: "Why does an investor often care whether the ESOP pool is created before or after the investment?",
        options: [
          "Because it affects who absorbs the dilution",
          "Because employees cannot receive options after investment",
          "Because ESOP replaces the cap table",
          "Because it removes liquidation preference"
        ],
        answer: 0,
        explanation:
          "If the ESOP pool is included before investment, it affects the fully diluted pre-money cap table and usually increases dilution for existing shareholders."
      },
      {
        id: "medium-6",
        difficulty: "medium",
        category: "Cap Table",
        source: "Final Session",
        type: "single",
        question: "Which cap table situation would be a warning sign for an early-stage startup?",
        options: [
          "Founders still own a meaningful majority after the early round",
          "Too many inactive shareholders, dead equity, and founders already below 50% too early",
          "The company has a clean ESOP pool",
          "The cap table is simple and easy to understand"
        ],
        answer: 1,
        explanation:
          "A bad cap table can make future rounds harder. Too many partners, dead equity, or founders owning too little too early are warning signs."
      },
      {
        id: "medium-7",
        difficulty: "medium",
        category: "Anti-Dilution",
        source: "Sessions 5-7",
        type: "single",
        question: "When is anti-dilution protection usually triggered?",
        options: ["In an up round", "In a down round", "Only after IPO", "Whenever the company hires employees"],
        answer: 1,
        explanation:
          "Anti-dilution protections are designed to protect investors when the company raises a future round at a lower valuation."
      },
      {
        id: "medium-8",
        difficulty: "medium",
        category: "IP",
        source: "Sessions 5-7",
        type: "single",
        question:
          "A founder built core technology while using a previous employer's laptop and resources. What is the main investor concern?",
        options: [
          "The code cannot ever be used by anyone",
          "The previous employer may claim ownership of the IP",
          "The founder must use a SAFE",
          "The company automatically owns the IP because the founder wrote it"
        ],
        answer: 1,
        explanation:
          "IP created during employment or using employer resources may be claimed by the employer. Investors will want clean IP ownership and written assignment."
      },
      {
        id: "medium-9",
        difficulty: "medium",
        category: "B2C / C2B",
        source: "Sessions 5-7",
        type: "single",
        question: "Which set of metrics is most relevant for evaluating early B2C/C2B performance?",
        options: [
          "LTV, CAC, ROAS, retention, ARPU, and AOV",
          "Board seats, veto rights, and no-shop period",
          "Only number of employees",
          "Only patent count"
        ],
        answer: 0,
        explanation:
          "The C2B session emphasized acquisition, retention, and monetization metrics such as LTV, CAC, ROAS, retention, ARPU, and AOV."
      },
      {
        id: "medium-10",
        difficulty: "medium",
        category: "B2G / Defense Tech",
        source: "Sessions 5-7",
        type: "single",
        question:
          "Why is Defense Tech / B2G go-to-market often more complex than a typical B2B software sale?",
        options: [
          "There are usually no buyers",
          "The user, budget owner, and procurement stakeholder may be different people or entities",
          "The product never needs proof",
          "B2G always has shorter sales cycles than B2C"
        ],
        answer: 1,
        explanation:
          "Defense Tech sales often involve multiple stakeholders, including users, budget holders, and procurement processes."
      },
      {
        id: "medium-11",
        difficulty: "medium",
        category: "Incorporation",
        source: "Final Session",
        type: "single",
        question: "Why can wrong incorporation or special side letters create fundraising problems?",
        options: [
          "They can make the company harder for some investors to fund and can create unusual rights that complicate future rounds",
          "They automatically improve alignment with all investors",
          "They remove the need for due diligence",
          "They guarantee a higher valuation cap"
        ],
        answer: 0,
        explanation:
          "The final session warned that the wrong structure, such as not using Delaware when needed for US investors, or granting unusual side letters, can make future financing more complicated."
      },
      {
        id: "medium-12",
        difficulty: "medium",
        category: "Fundraising Time Management",
        source: "Final Session",
        type: "single",
        question:
          "A founder spends six months fundraising, accepts the first offer without shopping around, and starts only when cash is almost gone. What is the best diagnosis?",
        options: [
          "Strong fundraising leverage",
          "Poor fundraising time management and weak leverage",
          "Excellent cap table planning",
          "Correct use of non-dilutive funding"
        ],
        answer: 1,
        explanation:
          "Poor timing reduces leverage. The final session warned against fundraising for too long, accepting the first offer without shopping, and starting only after the cash is almost gone."
      }
    ]
  },
  {
    id: "hard",
    title: "Hard",
    subtitle: "Calculations, tradeoffs, and IC-style judgment",
    level: "Investment Committee",
    unlockRequirement: "medium",
    questions: [
      {
        id: "hard-1",
        difficulty: "hard",
        category: "VC Math",
        source: "Final Session",
        type: "single",
        question:
          "A small VC fund invests about $100K in each of 30 companies and owns around 1% of each. Why does this create pressure to invest only in companies with massive outcomes?",
        options: [
          "Because even a successful company must become very large for a 1% stake to return meaningful capital to the fund",
          "Because small exits are illegal for VC funds",
          "Because a 1% stake always guarantees a fund return",
          "Because management fees are enough to create strong returns"
        ],
        answer: 0,
        explanation:
          "If the fund owns only around 1%, even a good exit may not move the fund enough. That is why VC funds search for huge markets and companies with hundreds of millions or billions in potential value."
      },
      {
        id: "hard-2",
        difficulty: "hard",
        category: "De-risking",
        source: "Sessions 5-7",
        type: "single",
        question:
          "A startup wants to raise a very large round before proving product demand, technical feasibility, or a clear market thesis. What is the main investor concern?",
        options: [
          "The company is over-de-risking",
          "The company may be skipping milestone-based de-risking",
          "The company has too much traction",
          "The company is protecting investors too much"
        ],
        answer: 1,
        explanation:
          "The session warned against raising too much before proving milestones. The better logic is to prove risk step by step."
      },
      {
        id: "hard-3",
        difficulty: "hard",
        category: "Round Size Formula",
        source: "Final Session",
        type: "single",
        question:
          "A startup needs $1M to reach the next meaningful milestone. Based on Amir's healthy fundraising formula, what round size is closest?",
        options: ["$800K", "$1M exactly", "$1.2M", "$6M"],
        answer: 2,
        explanation:
          "The formula is round size equals the money needed until the next milestone plus a 20% buffer. $1M plus 20% equals $1.2M."
      },
      {
        id: "hard-4",
        difficulty: "hard",
        category: "Valuation Cap Formula",
        source: "Final Session",
        type: "single",
        question:
          "A startup raises a $1.5M round. According to the healthy fundraising formula, what valuation cap range is most aligned?",
        options: ["$1.5M-$2M", "$3M-$4M", "$6M-$9M", "$30M-$60M"],
        answer: 2,
        explanation:
          "The suggested cap is roughly 4x-6x the round size. For a $1.5M round, that implies around $6M-$9M."
      },
      {
        id: "hard-5",
        difficulty: "hard",
        category: "Dilution Discipline",
        source: "Final Session",
        type: "single",
        question: "Why is giving away more than 25% in one round usually dangerous?",
        options: [
          "It may create excessive dilution and weaken founder incentives too early",
          "It always makes the company impossible to sell",
          "It means the company cannot issue options",
          "It eliminates the need for future fundraising"
        ],
        answer: 0,
        explanation:
          "The rule was not to give more than 25% in a round. Excessive dilution early can damage founder ownership, motivation, and future fundraising flexibility."
      },
      {
        id: "hard-6",
        difficulty: "hard",
        category: "SAFE Stacking",
        source: "Sessions 5-7 and Final Session",
        type: "single",
        question:
          "A startup raised several SAFEs from different angels. Nobody can clearly explain what ownership will look like after conversion. What is the best investor concern?",
        options: [
          "The company has too much governance clarity",
          "SAFE stacking can create cap table uncertainty and surprise dilution",
          "SAFEs always prevent future equity rounds",
          "SAFEs automatically give all investors board control"
        ],
        answer: 1,
        explanation:
          "Stacked SAFEs can make it unclear how much investors and founders actually own after conversion, creating future dilution surprises."
      },
      {
        id: "hard-7",
        difficulty: "hard",
        category: "Liquidation Preference",
        source: "Sessions 5-7",
        type: "single",
        question:
          "An investor put in $5M for 25% ownership with a 1x non-participating liquidation preference. The company is sold for $12M. What would the investor usually choose?",
        options: [
          "$3M, because 25% of $12M is always required",
          "$5M, because the 1x preference is better than their 25% share",
          "$12M, because preferred shareholders get everything",
          "$0, because liquidation preference only applies in bankruptcy"
        ],
        answer: 1,
        explanation:
          "With non-participating preference, the investor usually chooses the better of getting their investment back or taking their ownership percentage. Here, $5M is better than 25% of $12M, which is $3M."
      },
      {
        id: "hard-8",
        difficulty: "hard",
        category: "IP Assignment",
        source: "Sessions 5-7",
        type: "single",
        question:
          "A founder says: 'I developed the core algorithm during university research, but I will assign it to the company now.' What should an investor check first?",
        options: [
          "Whether the founder has the legal right to assign it, including university approval or license if needed",
          "Whether the algorithm has a nice name",
          "Whether the founder has a SAFE",
          "Nothing, because founders always own university research automatically"
        ],
        answer: 0,
        explanation:
          "A founder cannot assign IP they do not own. University, employer, or military claims must be checked and cleared."
      },
      {
        id: "hard-9",
        difficulty: "hard",
        category: "B2C / C2B",
        source: "Sessions 5-7",
        type: "single",
        question: "A consumer AI startup has impressive technology but no clear user acquisition plan. Why might an investor pass?",
        options: [
          "Because consumer startups do not need technology",
          "Because in B2C/C2B, distribution and marketing excellence can matter more than pure technology",
          "Because AI startups cannot raise VC funding",
          "Because consumer companies never use paid acquisition"
        ],
        answer: 1,
        explanation:
          "The C2B session emphasized that strong consumer founders are often user acquisition machines, and that distribution can beat pure technology."
      },
      {
        id: "hard-10",
        difficulty: "hard",
        category: "Defense Tech",
        source: "Sessions 5-7",
        type: "single",
        question: "Which Defense Tech startup is most aligned with the investment thesis from the session?",
        options: [
          "A small x2 improvement that a government can easily build in-house",
          "A function leap with unique Israeli advantage and global market potential",
          "A local-only manufacturing business with no scalable technology",
          "A startup dependent on giving 50% ownership to a prime contractor from day one"
        ],
        answer: 1,
        explanation:
          "The Defense Tech session emphasized function leaps, unique Israeli advantage, and global potential, while avoiding incremental improvements and solutions governments can build internally."
      },
      {
        id: "hard-11",
        difficulty: "hard",
        category: "Investor Relationships",
        source: "Final Session",
        type: "single",
        question:
          "A founder receives a 'no' from a good investor and then never updates them again. According to Amir's relationship advice, what is the mistake?",
        options: [
          "They failed to keep communicating and build the relationship over time",
          "They avoided unnecessary communication, which is always better",
          "They protected the investor from information overload",
          "They correctly removed the investor from the market forever"
        ],
        answer: 0,
        explanation:
          "The principle was Always Be Communicating. Founders should maintain relationships with investors who said no and keep current investors updated."
      },
      {
        id: "hard-12",
        difficulty: "hard",
        category: "Integrated Case",
        source: "Sessions 5-7 and Final Session",
        type: "single",
        question:
          "A Defense Tech startup has field-experienced founders, a 10x capability improvement, early operational validation, and global demand. However, it also faces multiple procurement stakeholders and a long government sales process. What is the best investment read?",
        options: [
          "Strong positive thesis fit, but GTM/procurement complexity remains a key risk",
          "Automatic no, because B2G can never scale",
          "Automatic yes, because technology removes all sales risk",
          "The only relevant question is whether it has a trademark"
        ],
        answer: 0,
        explanation:
          "The positive signals match the Defense Tech thesis: strong team, function leap, validation, and global demand. The main risk is B2G go-to-market complexity, especially multiple stakeholders and procurement processes."
      }
    ]
  }
];

const quizOrder = quizzes.map((quiz) => quiz.id);

function createInitialProgress() {
  return Object.fromEntries(
    quizzes.map((quiz) => [
      quiz.id,
      {
        currentIndex: 0,
        answers: {},
        submitted: {}
      }
    ])
  );
}

function Button({ children, className = "", variant = "primary", disabled = false, ...props }) {
  const variants = {
    primary: "bg-cactus-orange text-white shadow-sm hover:bg-[#d97b12]",
    secondary: "border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50",
    dark: "bg-black text-white hover:bg-slate-800",
    ghost: "text-slate-700 hover:bg-slate-100",
    danger: "border border-red-200 bg-white text-red-700 hover:bg-red-50"
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
        variants[variant]
      } ${disabled ? "cursor-not-allowed opacity-45 hover:bg-inherit" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-soft ${className}`}>{children}</div>;
}

function ProgressBar({ value, className = "" }) {
  const normalized = Math.max(0, Math.min(100, value || 0));
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div className="h-full rounded-full bg-cactus-green transition-all duration-500" style={{ width: `${normalized}%` }} />
    </div>
  );
}

function isCorrectAnswer(question, selected) {
  if (question.type === "multi") {
    const expected = Array.isArray(question.answer) ? [...question.answer].sort() : [question.answer];
    const actual = Array.isArray(selected) ? [...selected].sort() : [];
    return expected.length === actual.length && expected.every((value, index) => value === actual[index]);
  }

  return selected === question.answer;
}

function getQuizStats(quiz, quizProgress) {
  const questions = quiz.questions ?? [];
  const answered = questions.filter((question) => quizProgress.submitted[question.id]).length;
  const correct = questions.filter(
    (question) => quizProgress.submitted[question.id] && isCorrectAnswer(question, quizProgress.answers[question.id])
  ).length;
  return {
    answered,
    correct,
    total: questions.length,
    percentage: questions.length ? Math.round((correct / questions.length) * 100) : 0,
    progress: questions.length ? Math.round((answered / questions.length) * 100) : 0
  };
}

function performanceLabel(percentage) {
  if (percentage >= 90) return "IC ready";
  if (percentage >= 75) return "Strong analyst instincts";
  if (percentage >= 60) return "Good base - review weak spots";
  return "Needs another pass";
}

function App() {
  const [progress, setProgress] = useState(createInitialProgress);
  const [completed, setCompleted] = useState({});
  const [activeQuizId, setActiveQuizId] = useState("easy");
  const [view, setView] = useState("home");

  const activeQuiz = quizzes.find((quiz) => quiz.id === activeQuizId) ?? quizzes[0];
  const activeProgress = progress[activeQuiz.id] ?? createInitialProgress()[activeQuiz.id];
  const activeStats = getQuizStats(activeQuiz, activeProgress);
  const currentQuestion = activeQuiz.questions[activeProgress.currentIndex];
  const isSubmitted = currentQuestion ? Boolean(activeProgress.submitted[currentQuestion.id]) : false;
  const selectedAnswer = currentQuestion ? activeProgress.answers[currentQuestion.id] : undefined;
  const nextQuiz = quizzes[quizOrder.indexOf(activeQuiz.id) + 1];
  const canContinue = nextQuiz && completed[activeQuiz.id];

  const totalStats = useMemo(() => {
    return quizzes.reduce(
      (acc, quiz) => {
        const stats = getQuizStats(quiz, progress[quiz.id]);
        acc.answered += stats.answered;
        acc.correct += stats.correct;
        acc.total += stats.total;
        return acc;
      },
      { answered: 0, correct: 0, total: 0 }
    );
  }, [progress]);

  const totalProgress = totalStats.total ? Math.round((totalStats.answered / totalStats.total) * 100) : 0;

  function isUnlocked(quiz) {
    return !quiz.unlockRequirement || Boolean(completed[quiz.unlockRequirement]);
  }

  function updateQuizProgress(quizId, updater) {
    setProgress((current) => ({
      ...current,
      [quizId]: updater(current[quizId])
    }));
  }

  function startQuiz(quizId) {
    const quiz = quizzes.find((item) => item.id === quizId);
    if (!quiz || !isUnlocked(quiz)) return;
    setActiveQuizId(quizId);
    setView("quiz");
  }

  function selectAnswer(optionIndex) {
    if (!currentQuestion || isSubmitted) return;
    updateQuizProgress(activeQuiz.id, (quizProgress) => ({
      ...quizProgress,
      answers: {
        ...quizProgress.answers,
        [currentQuestion.id]: optionIndex
      }
    }));
  }

  function submitAnswer() {
    if (!currentQuestion || selectedAnswer === undefined) return;
    updateQuizProgress(activeQuiz.id, (quizProgress) => ({
      ...quizProgress,
      submitted: {
        ...quizProgress.submitted,
        [currentQuestion.id]: true
      }
    }));
  }

  function goToQuestion(index) {
    if (index < 0 || index >= activeQuiz.questions.length) return;
    updateQuizProgress(activeQuiz.id, (quizProgress) => ({
      ...quizProgress,
      currentIndex: index
    }));
    setView("quiz");
  }

  function finishQuiz() {
    setCompleted((current) => ({ ...current, [activeQuiz.id]: true }));
    setView("summary");
  }

  function handleNext() {
    if (activeProgress.currentIndex >= activeQuiz.questions.length - 1) {
      finishQuiz();
      return;
    }
    goToQuestion(activeProgress.currentIndex + 1);
  }

  function resetCurrentQuiz(openQuiz = false) {
    setProgress((current) => ({
      ...current,
      [activeQuiz.id]: createInitialProgress()[activeQuiz.id]
    }));
    setCompleted((current) => {
      const next = { ...current };
      const activeIndex = quizOrder.indexOf(activeQuiz.id);
      quizOrder.slice(activeIndex).forEach((id) => delete next[id]);
      return next;
    });
    if (openQuiz || view === "summary") {
      setView("quiz");
    }
  }

  function resetAll() {
    setProgress(createInitialProgress());
    setCompleted({});
    setActiveQuizId("easy");
    setView("home");
  }

  function continueToNextQuiz() {
    if (!nextQuiz) return;
    setActiveQuizId(nextQuiz.id);
    setView("quiz");
  }

  function retakeQuiz() {
    resetCurrentQuiz(true);
  }

  return (
    <div className="min-h-screen bg-cactus-bg text-slate-900">
      <header className="border-b border-slate-200 bg-white px-4 py-6 text-slate-900 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <img
              src="/cactus-academy-logo.png"
              alt="Cactus Academy by Cactus Capital logo"
              className="h-16 w-auto object-contain md:h-20"
            />
            <div className="hidden border-l border-slate-200 pl-5 md:block">
              <p className="text-sm font-semibold text-slate-500">Review and extra practice</p>
              <p className="text-lg font-bold text-black">VC Chapter</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={resetCurrentQuiz}>
              <RotateCcw className="h-4 w-4" />
              Reset Current Quiz
            </Button>
            <Button variant="danger" onClick={resetAll}>
              <X className="h-4 w-4" />
              Reset All
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <section className="mb-8 grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
          <Card className="overflow-hidden">
            <div className="grid gap-6 p-6 md:grid-cols-[1fr_280px] md:p-8">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-cactus-orange">
                  <Sparkles className="h-4 w-4" />
                  Cactus Academy Review
                </div>
                <h1 className="max-w-3xl text-3xl font-black tracking-tight text-black md:text-5xl">
                  Train the instincts behind venture decisions.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                  Work through fund structure, fundraising mechanics, VC math, consumer metrics, Defense Tech,
                  IP, cap tables, and investor-ready judgment across three progressive levels.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={() => startQuiz("easy")}>
                    Start Easy
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" onClick={() => setView("home")}>
                    View Levels
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl bg-black p-5 text-white">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-cactus-green">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-slate-300">Total progress</p>
                <p className="mt-2 text-4xl font-black">{totalProgress}%</p>
                <ProgressBar value={totalProgress} className="mt-4 bg-slate-700" />
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-slate-300">Score</p>
                    <p className="text-xl font-bold">
                      {totalStats.correct}/{totalStats.total}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-slate-300">Completed</p>
                    <p className="text-xl font-bold">
                      {Object.keys(completed).length}/{quizzes.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {view === "home" && (
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                locked={!isUnlocked(quiz)}
                completed={Boolean(completed[quiz.id])}
                stats={getQuizStats(quiz, progress[quiz.id])}
                requirement={quizzes.find((item) => item.id === quiz.unlockRequirement)?.title}
                onStart={() => startQuiz(quiz.id)}
              />
            ))}
          </motion.section>
        )}

        {view === "quiz" && (
          <QuizView
            quiz={activeQuiz}
            quizProgress={activeProgress}
            stats={activeStats}
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            isSubmitted={isSubmitted}
            onSelect={selectAnswer}
            onSubmit={submitAnswer}
            onPrevious={() => goToQuestion(activeProgress.currentIndex - 1)}
            onNext={handleNext}
            onQuestionSelect={goToQuestion}
            onBackHome={() => setView("home")}
          />
        )}

        {view === "summary" && (
          <SummaryView
            quiz={activeQuiz}
            quizProgress={activeProgress}
            stats={getQuizStats(activeQuiz, activeProgress)}
            canContinue={canContinue}
            nextQuiz={nextQuiz}
            onReview={goToQuestion}
            onRetake={retakeQuiz}
            onContinue={continueToNextQuiz}
            onBackHome={() => setView("home")}
          />
        )}
      </main>
    </div>
  );
}

function QuizCard({ quiz, locked, completed, stats, requirement, onStart }) {
  const tone =
    quiz.id === "easy"
      ? "bg-cactus-green"
      : quiz.id === "medium"
        ? "bg-cactus-orange"
        : "bg-black";

  return (
    <Card className={`p-6 transition ${locked ? "opacity-55" : "hover:-translate-y-1 hover:shadow-xl"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
            {quiz.level}
          </span>
          <h2 className="mt-4 text-2xl font-black text-black">{quiz.title}</h2>
          <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{quiz.subtitle}</p>
        </div>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${tone}`}>
          {locked ? <Lock className="h-5 w-5" /> : completed ? <Trophy className="h-5 w-5" /> : <Target className="h-5 w-5" />}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-500">Progress</span>
          <span className="font-bold text-slate-900">
            {stats.answered}/{stats.total}
          </span>
        </div>
        <ProgressBar value={stats.progress} />
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
          <span className="font-semibold text-slate-500">Score</span>
          <span className="font-black text-black">
            {stats.correct}/{stats.total}
          </span>
        </div>
      </div>

      {locked && (
        <p className="mt-5 rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-600">
          Complete {requirement} to unlock.
        </p>
      )}

      <Button className="mt-6 w-full" variant={locked ? "secondary" : completed ? "dark" : "primary"} disabled={locked} onClick={onStart}>
        {locked ? (
          <>
            <Lock className="h-4 w-4" />
            Locked
          </>
        ) : completed ? (
          <>
            Review Quiz
            <ChevronRight className="h-4 w-4" />
          </>
        ) : (
          <>
            Start Quiz
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </Card>
  );
}

function QuizView({
  quiz,
  quizProgress,
  stats,
  currentQuestion,
  selectedAnswer,
  isSubmitted,
  onSelect,
  onSubmit,
  onPrevious,
  onNext,
  onQuestionSelect,
  onBackHome
}) {
  if (!quiz.questions.length) {
    return (
      <Card className="p-8 text-center">
        <BookOpenCheck className="mx-auto h-10 w-10 text-cactus-green" />
        <h2 className="mt-4 text-2xl font-black">No questions yet</h2>
        <p className="mt-2 text-slate-600">This level is empty, so there is nothing to answer.</p>
        <Button className="mt-6" onClick={onBackHome}>
          Back to levels
        </Button>
      </Card>
    );
  }

  const correct = currentQuestion && isCorrectAnswer(currentQuestion, selectedAnswer);
  const isLast = quizProgress.currentIndex === quiz.questions.length - 1;

  return (
    <section className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-cactus-orange">{quiz.level}</p>
              <h2 className="text-2xl font-black text-black">{quiz.title}</h2>
            </div>
            <GraduationCap className="h-7 w-7 text-cactus-green" />
          </div>
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm font-semibold text-slate-600">
              <span>
                Question {quizProgress.currentIndex + 1} of {quiz.questions.length}
              </span>
              <span>
                {stats.correct}/{stats.total}
              </span>
            </div>
            <ProgressBar value={stats.progress} />
          </div>
          <div className="mt-6 grid grid-cols-6 gap-2 lg:grid-cols-5">
            {quiz.questions.map((question, index) => {
              const submitted = quizProgress.submitted[question.id];
              const selected = quizProgress.answers[question.id];
              const answerCorrect = submitted && isCorrectAnswer(question, selected);
              const isCurrent = index === quizProgress.currentIndex;
              const statusClass = isCurrent
                ? "bg-black text-white"
                : answerCorrect
                  ? "bg-cactus-green text-white"
                  : submitted
                    ? "bg-red-500 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200";

              return (
                <button
                  key={question.id}
                  className={`aspect-square rounded-lg text-sm font-black transition ${statusClass}`}
                  onClick={() => onQuestionSelect(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <Button className="mt-6 w-full" variant="secondary" onClick={onBackHome}>
            <ArrowLeft className="h-4 w-4" />
            Levels
          </Button>
        </Card>
      </aside>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 bg-white p-5 md:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase text-cactus-green">
                  {currentQuestion.category}
                </span>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase text-cactus-orange">
                  {currentQuestion.source}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-black leading-tight text-black md:text-3xl">{currentQuestion.question}</h2>
            </div>

            <div className="p-5 md:p-7">
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const selected = selectedAnswer === index;
                  const correctOption = currentQuestion.answer === index;
                  const wrongSelected = isSubmitted && selected && !correctOption;
                  const showCorrect = isSubmitted && correctOption;
                  const stateClass = showCorrect
                    ? "border-cactus-green bg-green-50 text-slate-950"
                    : wrongSelected
                      ? "border-red-400 bg-red-50 text-slate-950"
                      : selected
                        ? "border-black bg-slate-50 text-black"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";

                  return (
                    <button
                      key={option}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${stateClass}`}
                      onClick={() => onSelect(index)}
                      disabled={isSubmitted}
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-black ${
                          showCorrect
                            ? "border-cactus-green bg-cactus-green text-white"
                            : wrongSelected
                              ? "border-red-500 bg-red-500 text-white"
                              : selected
                                ? "border-black bg-black text-white"
                                : "border-slate-300 bg-white text-slate-500"
                        }`}
                      >
                        {showCorrect ? <Check className="h-4 w-4" /> : wrongSelected ? <X className="h-4 w-4" /> : String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-sm font-semibold leading-6 md:text-base">{option}</span>
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 rounded-2xl border p-5 ${
                    correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${
                        correct ? "bg-cactus-green" : "bg-red-500"
                      }`}
                    >
                      {correct ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                    </span>
                    <h3 className="text-lg font-black text-black">{correct ? "Correct" : "Not quite"}</h3>
                  </div>
                  <p className="mt-3 leading-7 text-slate-700">{currentQuestion.explanation}</p>
                </motion.div>
              )}

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button variant="secondary" onClick={onPrevious} disabled={quizProgress.currentIndex === 0}>
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                {!isSubmitted ? (
                  <Button onClick={onSubmit} disabled={selectedAnswer === undefined}>
                    Submit Answer
                    <Check className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={onNext}>
                    {isLast ? "See Summary" : "Next"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function SummaryView({ quiz, quizProgress, stats, canContinue, nextQuiz, onReview, onRetake, onContinue, onBackHome }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Card className="p-6 md:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cactus-green text-white">
          <Trophy className="h-7 w-7" />
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-wide text-cactus-orange">{quiz.level}</p>
        <h2 className="mt-2 text-3xl font-black text-black">{quiz.title} summary</h2>
        <p className="mt-3 text-slate-600">{quiz.subtitle}</p>

        <div className="mt-7 rounded-2xl bg-black p-5 text-white">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-300">Score</p>
              <p className="mt-1 text-4xl font-black">
                {stats.correct}/{stats.total}
              </p>
            </div>
            <p className="text-5xl font-black text-cactus-green">{stats.percentage}%</p>
          </div>
          <div className="mt-5 rounded-xl bg-white/10 px-4 py-3 text-base font-bold">{performanceLabel(stats.percentage)}</div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {canContinue && (
            <Button onClick={onContinue}>
              Continue to {nextQuiz.title}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <Button variant="secondary" onClick={onRetake}>
            <RotateCcw className="h-4 w-4" />
            Retake Current Quiz
          </Button>
          <Button variant="ghost" onClick={onBackHome}>
            Back to all levels
          </Button>
        </div>
      </Card>

      <Card className="p-5 md:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-black text-black">Question review</h3>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
            {stats.correct} correct
          </span>
        </div>
        <div className="space-y-3">
          {quiz.questions.map((question, index) => {
            const selected = quizProgress.answers[question.id];
            const correct = quizProgress.submitted[question.id] && isCorrectAnswer(question, selected);

            return (
              <button
                key={question.id}
                className="flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-slate-300 hover:bg-slate-50"
                onClick={() => onReview(index)}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ${
                    correct ? "bg-cactus-green" : "bg-red-500"
                  }`}
                >
                  {correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </span>
                <span>
                  <span className="block text-sm font-black text-slate-900">
                    {index + 1}. {question.category}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">{question.question}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Card>
    </motion.section>
  );
}

export default App;
