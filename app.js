const STORAGE_KEY = "aicourse-practice-state-v1";
const THEME_KEY = "aicourse-theme";

const els = {
  appMenuBtn: document.querySelector("#appMenuBtn"),
  appMenu: document.querySelector("#appMenu"),
  clearStudyDataBtn: document.querySelector("#clearStudyDataBtn"),
  showStudyTimerBtn: document.querySelector("#showStudyTimerBtn"),
  backHomeBtn: document.querySelector("#backHomeBtn"),
  subtitle: document.querySelector("#subtitle"),
  totalCount: document.querySelector("#totalCount"),
  wrongCount: document.querySelector("#wrongCount"),
  logCount: document.querySelector("#logCount"),
  homeMode: document.querySelector("#homeMode"),
  normalMode: document.querySelector("#normalMode"),
  multipleMode: document.querySelector("#multipleMode"),
  wrongMode: document.querySelector("#wrongMode"),
  examMode: document.querySelector("#examMode"),
  graphMode: document.querySelector("#graphMode"),
  analyticsMode: document.querySelector("#analyticsMode"),
  relaxMode: document.querySelector("#relaxMode"),
  resetWrong: document.querySelector("#resetWrong"),
  modeLabel: document.querySelector("#modeLabel"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  emptyState: document.querySelector("#emptyState"),
  homePanel: document.querySelector("#homePanel"),
  homeMastery: document.querySelector("#homeMastery"),
  relaxPanel: document.querySelector("#relaxPanel"),
  gameScore: document.querySelector("#gameScore"),
  gameDeleteLeft: document.querySelector("#gameDeleteLeft"),
  gameBoard: document.querySelector("#gameBoard"),
  gameMessage: document.querySelector("#gameMessage"),
  gameOverActions: document.querySelector("#gameOverActions"),
  gameHomeBtn: document.querySelector("#gameHomeBtn"),
  gameAgainBtn: document.querySelector("#gameAgainBtn"),
  gameRestartBtn: document.querySelector("#gameRestartBtn"),
  gameUndoBtn: document.querySelector("#gameUndoBtn"),
  gameDeleteBtn: document.querySelector("#gameDeleteBtn"),
  gameEasyBtn: document.querySelector("#gameEasyBtn"),
  examPanel: document.querySelector("#examPanel"),
  examIntro: document.querySelector("#examIntro"),
  startExamBtn: document.querySelector("#startExamBtn"),
  resumeExamBtn: document.querySelector("#resumeExamBtn"),
  examHistoryCount: document.querySelector("#examHistoryCount"),
  examBestScore: document.querySelector("#examBestScore"),
  scoreTrend: document.querySelector("#scoreTrend"),
  examHistoryList: document.querySelector("#examHistoryList"),
  examAnswerSheet: document.querySelector("#examAnswerSheet"),
  examTimer: document.querySelector("#examTimer"),
  examAnswered: document.querySelector("#examAnswered"),
  answerSheetGrid: document.querySelector("#answerSheetGrid"),
  newExamBtn: document.querySelector("#newExamBtn"),
  submitExamBtn: document.querySelector("#submitExamBtn"),
  examQuestionNo: document.querySelector("#examQuestionNo"),
  examQuestionType: document.querySelector("#examQuestionType"),
  examQuestionModule: document.querySelector("#examQuestionModule"),
  examStem: document.querySelector("#examStem"),
  examOptions: document.querySelector("#examOptions"),
  examResult: document.querySelector("#examResult"),
  examPrevBtn: document.querySelector("#examPrevBtn"),
  examNextBtn: document.querySelector("#examNextBtn"),
  studyPanel: document.querySelector("#studyPanel"),
  panelTitle: document.querySelector("#panelTitle"),
  panelSubtitle: document.querySelector("#panelSubtitle"),
  graphView: document.querySelector("#graphView"),
  analyticsView: document.querySelector("#analyticsView"),
  moduleSummary: document.querySelector("#moduleSummary"),
  knowledgeGraph: document.querySelector("#knowledgeGraph"),
  graphSearch: document.querySelector("#graphSearch"),
  graphSearchBtn: document.querySelector("#graphSearchBtn"),
  specialTrainingBtn: document.querySelector("#specialTrainingBtn"),
  graphResult: document.querySelector("#graphResult"),
  analysisCards: document.querySelector("#analysisCards"),
  examAnalytics: document.querySelector("#examAnalytics"),
  accuracyBars: document.querySelector("#accuracyBars"),
  studyAdvice: document.querySelector("#studyAdvice"),
  practicePanel: document.querySelector("#practicePanel"),
  practiceSheetToggle: document.querySelector("#practiceSheetToggle"),
  practiceSheetCount: document.querySelector("#practiceSheetCount"),
  practiceSheetGrid: document.querySelector("#practiceSheetGrid"),
  practiceSheetProgress: document.querySelector("#practiceSheetProgress"),
  studyTimer: document.querySelector("#studyTimer"),
  studyTimerText: document.querySelector("#studyTimerText"),
  studyTimerToggle: document.querySelector("#studyTimerToggle"),
  studyTimerReset: document.querySelector("#studyTimerReset"),
  studyTimerClose: document.querySelector("#studyTimerClose"),
  card: document.querySelector("#card"),
  questionNo: document.querySelector("#questionNo"),
  questionType: document.querySelector("#questionType"),
  questionModule: document.querySelector("#questionModule"),
  stem: document.querySelector("#stem"),
  options: document.querySelector("#options"),
  answerPanel: document.querySelector("#answerPanel"),
  resultLine: document.querySelector("#resultLine"),
  correctLine: document.querySelector("#correctLine"),
  practiceNav: document.querySelector("#practiceNav"),
  prevBtn: document.querySelector("#prevBtn"),
  showAnswerBtn: document.querySelector("#showAnswerBtn"),
  nextBtn: document.querySelector("#nextBtn"),
};
els.themeChoices = [...document.querySelectorAll(".theme-choice")];
els.railActions = [...document.querySelectorAll(".rail-action")];
els.bottomTabs = [...document.querySelectorAll(".bottom-tab")];

let questions = [];
let mode = "home";
let answered = false;
let selectedAnswers = new Set();
let knowledge = null;
let examTimerId = null;
let examViewActive = false;
let studyTimerId = null;
let activeSpecialty = null;
let selectedGraphNode = null;
let game2048 = null;
let gameMoveAnimations = new Map();
let practiceSheetExpanded = false;
let touchStart = null;

const EXAM_SIZE = 60;
const EXAM_DURATION_MS = 30 * 60 * 1000;
const GAME_SIZE = 4;
const GAME_DELETE_LIMIT = 10;
game2048 = createInitialGame();
let state = loadState();
let themePreference = loadThemePreference();

applyTheme(themePreference);

const MODULE_RULES = [
  {
    name: "人工智能基础与发展",
    color: "#2563eb",
    keywords: ["图灵", "智能", "人工智能", "低谷", "符号主义", "连接主义", "行为主义", "达特茅斯", "机器智能"],
    subtopics: {
      "图灵测试": ["图灵", "机器智能"],
      "发展历程": ["低谷", "达特茅斯", "人工智能"],
      "主要学派": ["符号主义", "连接主义", "行为主义"],
    },
  },
  {
    name: "知识表示与知识图谱",
    color: "#0891b2",
    keywords: ["知识", "知识图谱", "本体", "语义", "推理", "专家系统", "产生式", "框架", "rdf", "neo4j"],
    subtopics: {
      "知识表示": ["知识", "本体", "语义"],
      "推理方法": ["推理", "产生式", "专家系统"],
      "图数据库": ["知识图谱", "rdf", "neo4j"],
    },
  },
  {
    name: "搜索与问题求解",
    color: "#7c3aed",
    keywords: ["搜索", "启发", "a*", "博弈", "剪枝", "路径", "状态空间", "宽度优先", "深度优先", "代价"],
    subtopics: {
      "状态空间搜索": ["状态空间", "宽度优先", "深度优先"],
      "启发式搜索": ["启发", "a*", "代价"],
      "博弈搜索": ["博弈", "剪枝"],
    },
  },
  {
    name: "机器学习基础",
    color: "#16a34a",
    keywords: ["机器学习", "监督", "无监督", "分类", "回归", "聚类", "训练集", "测试集", "过拟合", "欠拟合", "特征"],
    subtopics: {
      "监督学习": ["监督", "分类", "回归"],
      "无监督学习": ["无监督", "聚类"],
      "模型评估": ["训练集", "测试集", "过拟合", "欠拟合", "特征"],
    },
  },
  {
    name: "神经网络与深度学习",
    color: "#ea580c",
    keywords: ["神经", "感知机", "深度学习", "卷积", "cnn", "rnn", "反向传播", "激活函数", "梯度", "transformer"],
    subtopics: {
      "神经元模型": ["神经", "感知机", "激活函数"],
      "训练算法": ["反向传播", "梯度"],
      "深度网络": ["深度学习", "卷积", "cnn", "rnn", "transformer"],
    },
  },
  {
    name: "自然语言处理与大模型",
    color: "#db2777",
    keywords: ["自然语言", "语言模型", "大模型", "词向量", "语料", "文本", "机器翻译", "问答", "prompt", "提示词"],
    subtopics: {
      "文本表示": ["词向量", "语料", "文本"],
      "语言模型": ["语言模型", "大模型"],
      "NLP 应用": ["自然语言", "机器翻译", "问答", "prompt", "提示词"],
    },
  },
  {
    name: "计算机视觉与模式识别",
    color: "#ca8a04",
    keywords: ["视觉", "图像", "识别", "检测", "分割", "目标", "像素", "模式识别", "人脸"],
    subtopics: {
      "图像基础": ["图像", "像素"],
      "视觉任务": ["检测", "分割", "目标"],
      "模式识别": ["识别", "模式识别", "人脸", "视觉"],
    },
  },
  {
    name: "AI 应用、伦理与治理",
    color: "#475569",
    keywords: ["伦理", "治理", "风险", "隐私", "安全", "公平", "责任", "应用", "医疗", "交通", "教育", "航空"],
    subtopics: {
      "伦理治理": ["伦理", "治理", "公平", "责任"],
      "安全风险": ["风险", "隐私", "安全"],
      "典型应用": ["应用", "医疗", "交通", "教育", "航空"],
    },
  },
];

const MODULE_RELATIONS = [
  ["人工智能基础与发展", "奠基", "搜索与问题求解"],
  ["人工智能基础与发展", "奠基", "知识表示与知识图谱"],
  ["搜索与问题求解", "支撑", "机器学习基础"],
  ["机器学习基础", "扩展", "神经网络与深度学习"],
  ["神经网络与深度学习", "支撑", "自然语言处理与大模型"],
  ["神经网络与深度学习", "支撑", "计算机视觉与模式识别"],
  ["知识表示与知识图谱", "增强", "自然语言处理与大模型"],
  ["自然语言处理与大模型", "应用于", "AI 应用、伦理与治理"],
  ["计算机视觉与模式识别", "应用于", "AI 应用、伦理与治理"],
];

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      normalIndex: Number.isInteger(saved?.normalIndex) ? saved.normalIndex : 0,
      singleIndex: Number.isInteger(saved?.singleIndex) ? saved.singleIndex : null,
      multipleIndex: Number.isInteger(saved?.multipleIndex) ? saved.multipleIndex : null,
      specialIndex: Number.isInteger(saved?.specialIndex) ? saved.specialIndex : 0,
      wrongIndex: Number.isInteger(saved?.wrongIndex) ? saved.wrongIndex : 0,
      wrongBook: saved?.wrongBook && typeof saved.wrongBook === "object" ? saved.wrongBook : {},
      answerLog: Array.isArray(saved?.answerLog) ? saved.answerLog : [],
      exam: normalizeExam(saved?.exam),
      examHistory: Array.isArray(saved?.examHistory) ? saved.examHistory : [],
      studyTimer: normalizeStudyTimer(saved?.studyTimer),
    };
  } catch {
    return {
      normalIndex: 0,
      singleIndex: null,
      multipleIndex: null,
      specialIndex: 0,
      wrongIndex: 0,
      wrongBook: {},
      answerLog: [],
      exam: normalizeExam(null),
      examHistory: [],
      studyTimer: normalizeStudyTimer(null),
    };
  }
}

function defaultState() {
  return {
    normalIndex: 0,
    singleIndex: null,
    multipleIndex: null,
    specialIndex: 0,
    wrongIndex: 0,
    wrongBook: {},
    answerLog: [],
    exam: normalizeExam(null),
    examHistory: [],
    studyTimer: normalizeStudyTimer(null),
  };
}

function normalizeStudyTimer(timer) {
  return {
    seconds: Number.isInteger(timer?.seconds) && timer.seconds >= 0 ? timer.seconds : 0,
    enabled: timer?.enabled !== false,
    running: timer?.running !== false,
  };
}

function normalizeExam(exam) {
  return {
    questionIds: Array.isArray(exam?.questionIds) ? exam.questionIds : [],
    index: Number.isInteger(exam?.index) ? exam.index : 0,
    answers: exam?.answers && typeof exam.answers === "object" ? exam.answers : {},
    startedAt: Number.isFinite(exam?.startedAt) ? exam.startedAt : null,
    durationMs: Number.isFinite(exam?.durationMs) ? exam.durationMs : EXAM_DURATION_MS,
    submitted: Boolean(exam?.submitted),
    result: exam?.result && typeof exam.result === "object" ? exam.result : null,
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadThemePreference() {
  const saved = localStorage.getItem(THEME_KEY);
  return ["system", "light", "dark"].includes(saved) ? saved : "system";
}

function applyTheme(preference) {
  themePreference = preference;
  if (preference === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.dataset.theme = preference;
  }
  localStorage.setItem(THEME_KEY, preference);
  updateThemeMenu();
}

function updateThemeMenu() {
  for (const button of els.themeChoices) {
    button.classList.toggle("active", button.dataset.themeChoice === themePreference);
  }
  if (els.showStudyTimerBtn) {
    els.showStudyTimerBtn.textContent = state.studyTimer.enabled ? "学习计时器已显示" : "显示学习计时器";
    els.showStudyTimerBtn.disabled = state.studyTimer.enabled;
  }
}

function toggleAppMenu(force = null) {
  const shouldOpen = force ?? els.appMenu.classList.contains("hidden");
  els.appMenu.classList.toggle("hidden", !shouldOpen);
  els.appMenuBtn.setAttribute("aria-expanded", String(shouldOpen));
}

function clearStudyData() {
  if (!confirm("确定清除所有做题记录、错题本和考试历史？题库不会被删除。")) return;
  state = defaultState();
  examViewActive = false;
  activeSpecialty = null;
  selectedGraphNode = null;
  answered = false;
  selectedAnswers = new Set();
  migrateIndexes();
  saveState();
  toggleAppMenu(false);
  render();
}

function currentList() {
  if (mode === "special" && activeSpecialty) {
    return questions.filter((q) => {
      if (activeSpecialty.subtopic) {
        return q.module === activeSpecialty.module && q.subtopic === activeSpecialty.subtopic;
      }
      return q.module === activeSpecialty.module;
    });
  }
  if (mode === "wrong") {
    return questions.filter((q) => state.wrongBook[q.id]);
  }
  if (mode === "multiple") {
    return questions.filter((q) => q.type === "multiple");
  }
  return questions.filter((q) => q.type !== "multiple");
}

function isPanelMode() {
  return mode === "graph" || mode === "analytics";
}

function isExamMode() {
  return mode === "exam";
}

function isRelaxMode() {
  return mode === "relax";
}

function isPracticeMode() {
  return mode === "single" || mode === "multiple" || mode === "wrong" || mode === "special";
}

function currentIndex() {
  const list = currentList();
  const key = indexKey();
  if (state[key] < 0) state[key] = 0;
  if (state[key] >= list.length) state[key] = Math.max(0, list.length - 1);
  return state[key];
}

function setCurrentIndex(value) {
  const list = currentList();
  const key = indexKey();
  state[key] = Math.min(Math.max(value, 0), Math.max(0, list.length - 1));
  if (mode === "single" || mode === "multiple") {
    const question = list[state[key]];
    const allIndex = question ? questions.findIndex((q) => q.id === question.id) : 0;
    state.normalIndex = Math.max(0, allIndex);
  }
  saveState();
}

function indexKey() {
  if (mode === "wrong") return "wrongIndex";
  if (mode === "multiple") return "multipleIndex";
  if (mode === "special") return "specialIndex";
  return "singleIndex";
}

function migrateIndexes() {
  const legacyIndex = Math.min(
    Math.max(Number.isInteger(state.normalIndex) ? state.normalIndex : 0, 0),
    Math.max(0, questions.length - 1),
  );

  if (!Number.isInteger(state.singleIndex)) {
    state.singleIndex = questions
      .slice(0, legacyIndex)
      .filter((q) => q.type !== "multiple").length;
  }

  if (!Number.isInteger(state.multipleIndex)) {
    state.multipleIndex = questions
      .slice(0, legacyIndex)
      .filter((q) => q.type === "multiple").length;
  }

  state.answerLog = Array.isArray(state.answerLog) ? state.answerLog : [];
}

function typeText(type) {
  if (type === "multiple") return "多选";
  if (type === "boolean") return "判断";
  return "单选";
}

function answerText(question) {
  const map = new Map(question.options.map((opt) => [opt.key, opt.text]));
  return question.correctAnswers
    .map((key) => `${key}. ${map.get(key) ?? ""}`)
    .join("；");
}

function sameAnswers(left, right) {
  if (left.length !== right.length) return false;
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((item, index) => item === sortedRight[index]);
}

function logAnswer(question, selected, isCorrect, action) {
  state.answerLog.push({
    questionId: question.id,
    sourceNumber: question.sourceNumber,
    type: question.type,
    mode,
    selectedAnswers: selected,
    correctAnswers: [...question.correctAnswers],
    isCorrect,
    action,
    at: Date.now(),
  });

  if (state.answerLog.length > 1000) {
    state.answerLog = state.answerLog.slice(-1000);
  }
}

function render() {
  updateAppNavigation();

  if (mode === "home") {
    renderHome();
    return;
  }

  els.backHomeBtn.classList.remove("hidden");
  els.totalCount.textContent = questions.length;
  els.wrongCount.textContent = Object.keys(state.wrongBook).length;
  els.logCount.textContent = state.answerLog.length;
  els.homeMode.classList.toggle("active", mode === "home");
  els.normalMode.classList.toggle("active", mode === "single");
  els.multipleMode.classList.toggle("active", mode === "multiple");
  els.wrongMode.classList.toggle("active", mode === "wrong");
  els.examMode.classList.toggle("active", mode === "exam");
  els.graphMode.classList.toggle("active", mode === "graph");
  els.analyticsMode.classList.toggle("active", mode === "analytics");
  els.relaxMode.classList.toggle("active", mode === "relax");
  els.modeLabel.textContent = modeLabel();
  els.subtitle.textContent = subtitleText();

  if (isRelaxMode()) {
    renderRelaxMode();
    return;
  }

  if (isExamMode()) {
    renderExamMode();
    return;
  }

  if (isPanelMode()) {
    renderPanelMode();
    return;
  }

  const list = currentList();
  const index = currentIndex();
  const question = list[index];
  const wrongTotal = Object.keys(state.wrongBook).length;

  stopExamTimer();
  els.homePanel.classList.add("hidden");
  els.relaxPanel.classList.add("hidden");
  els.examPanel.classList.add("hidden");
  els.studyPanel.classList.add("hidden");
  els.practicePanel.classList.remove("hidden");
  els.practicePanel.classList.toggle("sheet-expanded", practiceSheetExpanded);
  els.practiceSheetToggle?.setAttribute("aria-expanded", String(practiceSheetExpanded));
  els.card.classList.remove("hidden");
  els.practiceNav.classList.remove("hidden");
  updateStudyTimer();
  startStudyTimerIfNeeded();

  if (!question) {
    els.emptyState.classList.remove("hidden");
    els.practicePanel.classList.add("hidden");
    els.prevBtn.disabled = true;
    els.nextBtn.disabled = true;
    els.showAnswerBtn.disabled = true;
    els.progressText.textContent = "0 / 0";
    els.progressBar.style.width = "0%";
    return;
  }

  answered = false;
  selectedAnswers = new Set();
  els.emptyState.classList.add("hidden");
  els.card.classList.remove("hidden");
  els.answerPanel.classList.add("hidden");
  els.questionNo.textContent = `第 ${question.sourceNumber ?? index + 1} 题`;
  els.questionType.textContent = typeText(question.type);
  els.questionModule.textContent = question.module ?? "未分类";
  els.stem.textContent = question.stem;
  els.options.innerHTML = "";

  for (const option of question.options) {
    const button = document.createElement("button");
    button.className = "option";
    button.type = "button";
    button.dataset.key = option.key;
    button.innerHTML = `
      <span class="option-key">${option.key}</span>
      <span class="option-text"></span>
    `;
    button.querySelector(".option-text").textContent = option.text;
    button.addEventListener("click", () => handleOptionClick(option.key));
    els.options.appendChild(button);
  }

  els.prevBtn.disabled = index === 0;
  els.nextBtn.disabled = index >= list.length - 1 && mode === "wrong";
  els.showAnswerBtn.textContent = question.type === "multiple" ? "提交答案" : "直接看答案";
  els.showAnswerBtn.disabled = false;
  if (question.type === "multiple") {
    els.showAnswerBtn.disabled = true;
  }
  els.progressText.textContent = `${index + 1} / ${list.length}`;
  els.progressBar.style.width = `${((index + 1) / list.length) * 100}%`;
  renderPracticeSheet(list, index);
}

function updateAppNavigation() {
  const activeKey = mode === "multiple" || mode === "wrong" || mode === "special" ? "single" : mode;
  for (const button of els.railActions) {
    button.classList.toggle("active", button.dataset.mode === activeKey);
  }
  for (const button of els.bottomTabs) {
    button.classList.toggle("active", button.dataset.mode === activeKey);
  }
}

function answeredQuestionMap() {
  const map = new Map();
  for (const log of state.answerLog.filter((item) => item.action === "answer")) {
    map.set(log.questionId, log.isCorrect ? "correct" : "wrong");
  }
  return map;
}

function renderPracticeSheet(list, index) {
  const answeredMap = answeredQuestionMap();
  const completed = list.filter((question) => answeredMap.has(question.id)).length;
  els.practiceSheetCount.textContent = `${list.length} 题`;
  els.practiceSheetToggle?.setAttribute("aria-expanded", String(practiceSheetExpanded));
  els.practiceSheetProgress.textContent = `已完成 ${completed} / ${list.length}`;
  els.practiceSheetGrid.innerHTML = list
    .map((question, itemIndex) => {
      const status = answeredMap.get(question.id);
      const classes = ["practice-cell"];
      if (itemIndex === index) classes.push("current");
      if (status) classes.push(status);
      return `<button class="${classes.join(" ")}" type="button" data-index="${itemIndex}">${itemIndex + 1}</button>`;
    })
    .join("");

  for (const button of els.practiceSheetGrid.querySelectorAll(".practice-cell")) {
    button.addEventListener("click", () => {
      setCurrentIndex(Number(button.dataset.index));
      practiceSheetExpanded = false;
      render();
    });
  }
}

function modeLabel() {
  if (mode === "home") return "功能大厅";
  if (mode === "relax") return "放松一下";
  if (mode === "exam") return "模拟考试";
  if (mode === "graph") return "知识图谱";
  if (mode === "analytics") return "学习分析";
  if (mode === "wrong") return "错题复习";
  if (mode === "multiple") return "多选训练";
  if (mode === "special") return activeSpecialty?.subtopic ?? activeSpecialty?.module ?? "专项训练";
  return "单选/判断";
}

function subtitleText() {
  if (mode === "home") return "北航人工智能导论复习系统";
  if (mode === "relax") return "2048 小游戏，达到 I❤️BUAA 有彩蛋";
  if (mode === "exam") return "随机抽取 60 题，限时 30 分钟，交卷后统一评分";
  if (mode === "graph") return "把期末题库映射为 AI 导论课程知识网络";
  if (mode === "analytics") return "根据答题日志定位薄弱模块并生成复习建议";
  if (mode === "wrong") return "答对错题后自动移出错题本";
  if (mode === "multiple") return "多选题必须全选且不漏选才得分";
  if (mode === "special") return `专项训练：${activeSpecialty?.subtopic ?? activeSpecialty?.module ?? ""}`;
  return "单选和判断题，点选后显示答案";
}

function renderHome() {
  stopExamTimer();
  stopStudyTimer();
  activeSpecialty = null;
  updateAppNavigation();
  els.backHomeBtn.classList.add("hidden");
  els.totalCount.textContent = questions.length;
  els.wrongCount.textContent = Object.keys(state.wrongBook).length;
  els.logCount.textContent = state.answerLog.length;
  els.homeMode.classList.add("active");
  els.normalMode.classList.remove("active");
  els.multipleMode.classList.remove("active");
  els.wrongMode.classList.remove("active");
  els.examMode.classList.remove("active");
  els.graphMode.classList.remove("active");
  els.analyticsMode.classList.remove("active");
  els.relaxMode.classList.remove("active");
  els.modeLabel.textContent = "功能大厅";
  els.subtitle.textContent = "北航人工智能导论复习系统";
  els.progressText.textContent = `${questions.length} 题库`;
  els.progressBar.style.width = `${overallMastery()}%`;
  els.homeMastery.textContent = `${overallMastery()}%`;
  els.homePanel.classList.remove("hidden");
  els.relaxPanel.classList.add("hidden");
  els.emptyState.classList.add("hidden");
  els.examPanel.classList.add("hidden");
  els.studyPanel.classList.add("hidden");
  els.practicePanel.classList.add("hidden");
  els.card.classList.add("hidden");
  els.practiceNav.classList.add("hidden");
  els.prevBtn.disabled = true;
  els.nextBtn.disabled = true;
  els.showAnswerBtn.disabled = true;
}

function overallMastery() {
  if (!knowledge || !knowledge.modules.length) return 0;
  const masteredQuestionIds = new Set(
    state.answerLog
      .filter((item) => item.action === "answer" && item.isCorrect)
      .map((item) => item.questionId),
  );
  return Math.round((masteredQuestionIds.size / questions.length) * 100);
}

function classifyQuestion(question) {
  const text = `${question.stem} ${question.options.map((option) => option.text).join(" ")}`.toLowerCase();
  let best = { module: MODULE_RULES[0], score: 0 };

  for (const module of MODULE_RULES) {
    const score = module.keywords.reduce((sum, keyword) => {
      return sum + (text.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);
    if (score > best.score) best = { module, score };
  }

  return best.score > 0 ? best.module.name : "AI 综合应用";
}

function buildKnowledgeModel() {
  const modules = new Map();
  for (const module of MODULE_RULES) {
    modules.set(module.name, {
      ...module,
      count: 0,
      questions: [],
      concepts: new Map(),
      subtopicStats: new Map(Object.keys(module.subtopics ?? {}).map((name) => [name, {
        name,
        count: 0,
        questions: [],
        keywords: module.subtopics[name],
      }])),
    });
  }
  modules.set("AI 综合应用", {
    name: "AI 综合应用",
    color: "#64748b",
    keywords: ["综合"],
    count: 0,
    questions: [],
    concepts: new Map(),
    subtopicStats: new Map([["综合理解", {
      name: "综合理解",
      count: 0,
      questions: [],
      keywords: ["综合"],
    }]]),
  });

  for (const question of questions) {
    question.module = classifyQuestion(question);
    const module = modules.get(question.module);
    module.count += 1;
    module.questions.push(question);
    for (const concept of extractConcepts(question)) {
      module.concepts.set(concept, (module.concepts.get(concept) ?? 0) + 1);
    }
    const subtopic = classifySubtopic(module, question);
    question.subtopic = subtopic;
    if (!module.subtopicStats.has(subtopic)) {
      module.subtopicStats.set(subtopic, {
        name: subtopic,
        count: 0,
        questions: [],
        keywords: ["综合"],
      });
    }
    const stat = module.subtopicStats.get(subtopic);
    stat.count += 1;
    stat.questions.push(question);
  }

  return {
    modules: [...modules.values()]
      .filter((module) => module.count > 0)
      .map((module) => ({
        ...module,
        subtopics: [...module.subtopicStats.values()].filter((subtopic) => subtopic.count > 0),
      })),
    relations: MODULE_RELATIONS,
  };
}

function classifySubtopic(module, question) {
  const text = `${question.stem} ${question.options.map((option) => option.text).join(" ")}`.toLowerCase();
  let best = { name: "综合理解", score: 0 };

  for (const [name, keywords] of Object.entries(module.subtopics ?? {})) {
    const score = keywords.reduce((sum, keyword) => {
      return sum + (text.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);
    if (score > best.score) best = { name, score };
  }

  return best.score > 0 ? best.name : "综合理解";
}

function extractConcepts(question) {
  const text = `${question.stem} ${question.options.map((option) => option.text).join(" ")}`;
  const candidates = [];

  for (const module of MODULE_RULES) {
    for (const keyword of module.keywords) {
      if (text.toLowerCase().includes(keyword.toLowerCase())) candidates.push(keyword);
    }
  }

  const normalized = [...new Set(candidates)]
    .filter((item) => item.length >= 2)
    .slice(0, 6);
  return normalized.length ? normalized : ["综合理解"];
}

function renderPanelMode() {
  stopExamTimer();
  stopStudyTimer();
  els.emptyState.classList.add("hidden");
  els.homePanel.classList.add("hidden");
  els.relaxPanel.classList.add("hidden");
  els.examPanel.classList.add("hidden");
  els.practicePanel.classList.add("hidden");
  els.card.classList.add("hidden");
  els.studyPanel.classList.remove("hidden");
  els.practiceNav.classList.add("hidden");
  els.prevBtn.disabled = true;
  els.nextBtn.disabled = true;
  els.showAnswerBtn.disabled = true;

  els.graphView.classList.toggle("hidden", mode !== "graph");
  els.analyticsView.classList.toggle("hidden", mode !== "analytics");
  els.progressText.textContent = `${questions.length} 题`;
  els.progressBar.style.width = "100%";

  if (mode === "graph") {
    els.panelTitle.textContent = "题库知识图谱";
    els.panelSubtitle.textContent = "按课程模块、题目和关键词建立节点关系";
    renderGraph();
  } else if (mode === "analytics") {
    els.panelTitle.textContent = "学习画像与复习建议";
    els.panelSubtitle.textContent = "根据本地答题日志统计正确率、错题分布和薄弱模块";
    renderAnalytics();
  }
}

function ensureExam() {
  const validIds = new Set(questions.map((question) => question.id));
  const validQuestionIds = state.exam.questionIds.filter((id) => validIds.has(id));
  state.exam.questionIds = validQuestionIds;
  state.exam.index = Math.min(state.exam.index, Math.max(0, validQuestionIds.length - 1));
  if (!validQuestionIds.length) {
    state.exam = normalizeExam(null);
  }
}

function startNewExam() {
  const selectedQuestions = selectExamQuestions();
  state.exam = normalizeExam({
    questionIds: selectedQuestions.map((question) => question.id),
    index: 0,
    answers: {},
    startedAt: Date.now(),
    durationMs: EXAM_DURATION_MS,
    submitted: false,
    result: null,
  });
  examViewActive = true;
  saveState();
}

function selectExamQuestions() {
  const targetSize = Math.min(EXAM_SIZE, questions.length);
  const modules = knowledge?.modules?.length
    ? knowledge.modules.map((module) => module.name)
    : [...new Set(questions.map((question) => question.module ?? "未分类"))];
  const buckets = modules
    .map((module) => ({
      module,
      items: weightedShuffle(questions.filter((question) => (question.module ?? "未分类") === module)),
    }))
    .filter((bucket) => bucket.items.length > 0);

  const selected = [];
  const selectedIds = new Set();
  let cursor = 0;
  while (selected.length < targetSize && buckets.some((bucket) => bucket.items.length > 0)) {
    const bucket = buckets[cursor % buckets.length];
    cursor += 1;
    const question = bucket.items.shift();
    if (!question || selectedIds.has(question.id)) continue;
    selected.push(question);
    selectedIds.add(question.id);
  }

  if (selected.length < targetSize) {
    for (const question of weightedShuffle(questions)) {
      if (selected.length >= targetSize) break;
      if (selectedIds.has(question.id)) continue;
      selected.push(question);
      selectedIds.add(question.id);
    }
  }

  return selected;
}

function weightedShuffle(items) {
  return items
    .map((item) => ({
      item,
      rank: Math.random() ** (1 / examQuestionWeight(item)),
    }))
    .sort((a, b) => b.rank - a.rank)
    .map((entry) => entry.item);
}

function examQuestionWeight(question) {
  const wrongBookWeight = state.wrongBook[question.id] ? 3 + Math.min(3, state.wrongBook[question.id].count ?? 1) : 0;
  const recentLogs = state.answerLog
    .filter((log) => log.action === "answer" && log.questionId === question.id)
    .slice(-5);
  const wrongLogWeight = recentLogs.filter((log) => log.isCorrect === false).length * 1.5;
  const unseenWeight = recentLogs.length ? 0 : 0.8;
  return 1 + wrongBookWeight + wrongLogWeight + unseenWeight;
}

function hasActiveExam() {
  return state.exam.questionIds.length > 0 && !state.exam.submitted && Number.isFinite(state.exam.startedAt);
}

function examQuestions() {
  const byId = new Map(questions.map((question) => [question.id, question]));
  return state.exam.questionIds.map((id) => byId.get(id)).filter(Boolean);
}

function currentExamQuestion() {
  return examQuestions()[state.exam.index];
}

function renderExamMode() {
  ensureExam();
  stopExamTimer();
  stopStudyTimer();
  els.emptyState.classList.add("hidden");
  els.homePanel.classList.add("hidden");
  els.relaxPanel.classList.add("hidden");
  els.studyPanel.classList.add("hidden");
  els.practicePanel.classList.add("hidden");
  els.card.classList.add("hidden");
  els.examPanel.classList.remove("hidden");
  els.practiceNav.classList.add("hidden");
  els.prevBtn.disabled = true;
  els.nextBtn.disabled = true;
  els.showAnswerBtn.disabled = true;
  els.progressText.textContent = "模拟考试";
  els.progressBar.style.width = hasActiveExam() ? `${examProgressPercent()}%` : "0%";

  if (!hasActiveExam() || !examViewActive) {
    renderExamIntro();
    return;
  }

  els.examIntro.classList.add("hidden");
  els.examAnswerSheet.classList.remove("hidden");
  els.examQuestionNo.closest(".exam-question").classList.remove("hidden");
  renderExamQuestion();
  renderAnswerSheet();
  renderExamTimer();
  startExamTimer();
}

function renderExamIntro() {
  const latest = state.examHistory.at(-1);
  const best = state.examHistory.reduce((max, item) => Math.max(max, item.percent ?? 0), 0);
  els.examIntro.classList.remove("hidden");
  els.examAnswerSheet.classList.add("hidden");
  els.examQuestionNo.closest(".exam-question").classList.add("hidden");
  els.examHistoryCount.textContent = state.examHistory.length;
  els.examBestScore.textContent = state.examHistory.length ? `最佳 ${best}%` : "暂无记录";
  els.resumeExamBtn.classList.toggle("hidden", !hasActiveExam());
  els.startExamBtn.textContent = hasActiveExam() || latest ? "开始新考试" : "开始考试";
  renderScoreTrend(els.scoreTrend, state.examHistory);
  renderExamHistoryList();
}

function renderScoreTrend(container, history) {
  if (!container) return;
  if (!history.length) {
    container.innerHTML = `<div class="trend-empty">完成一次模拟考试后生成分数曲线</div>`;
    return;
  }

  const items = history.slice(-10);
  const width = 360;
  const height = 170;
  const padding = 24;
  const step = items.length > 1 ? (width - padding * 2) / (items.length - 1) : 0;
  const points = items.map((item, index) => {
    const x = items.length === 1 ? width / 2 : padding + index * step;
    const y = height - padding - ((item.percent ?? 0) / 100) * (height - padding * 2);
    return { x, y, item };
  });
  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = points.length > 1
    ? `${padding},${height - padding} ${polyline} ${width - padding},${height - padding}`
    : "";

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" class="trend-axis"></line>
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="trend-axis"></line>
      <line x1="${padding}" y1="${padding + (height - padding * 2) * 0.4}" x2="${width - padding}" y2="${padding + (height - padding * 2) * 0.4}" class="trend-grid"></line>
      ${area ? `<polygon points="${area}" class="trend-area"></polygon>` : ""}
      <polyline points="${polyline}" class="trend-line"></polyline>
      ${points.map((point, index) => `
        <g class="trend-point" transform="translate(${point.x} ${point.y})">
          <circle r="4.5"></circle>
          <text y="-9">${point.item.percent}%</text>
          <title>第 ${state.examHistory.length - items.length + index + 1} 次：${point.item.score}/${point.item.total}</title>
        </g>
      `).join("")}
    </svg>
  `;
}

function renderExamHistoryList() {
  if (!state.examHistory.length) {
    els.examHistoryList.innerHTML = `<div class="exam-history-empty">暂无历史考试记录</div>`;
    return;
  }

  els.examHistoryList.innerHTML = state.examHistory
    .slice(-6)
    .reverse()
    .map((item, index) => `
      <article class="exam-history-row">
        <div>
          <strong>${item.score}/${item.total} · ${item.percent}%</strong>
          <span>${formatDateTime(item.submittedAt)} · 用时 ${formatTime(item.usedMs)}</span>
        </div>
        <em>${index === 0 ? "最近" : item.reason === "timeout" ? "超时" : "完成"}</em>
      </article>
    `)
    .join("");
}

function formatDateTime(timestamp) {
  if (!Number.isFinite(timestamp)) return "时间未知";
  const date = new Date(timestamp);
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getMonth() + 1}/${date.getDate()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function examProgressPercent() {
  const list = examQuestions();
  if (!list.length) return 0;
  const answered = list.filter((question) => hasExamAnswer(question.id)).length;
  return (answered / list.length) * 100;
}

function renderExamQuestion() {
  const list = examQuestions();
  const question = currentExamQuestion();
  if (!question) return;

  els.examQuestionNo.textContent = `第 ${state.exam.index + 1} 题`;
  els.examQuestionType.textContent = typeText(question.type);
  els.examQuestionModule.textContent = question.module ?? "未分类";
  els.examStem.textContent = question.stem;
  els.examOptions.innerHTML = "";

  const selected = new Set(state.exam.answers[question.id] ?? []);
  const correctSet = new Set(question.correctAnswers);
  for (const option of question.options) {
    const button = document.createElement("button");
    button.className = "option";
    button.type = "button";
    button.dataset.key = option.key;
    if (selected.has(option.key)) button.classList.add("selected");
    if (state.exam.submitted) {
      button.disabled = true;
      if (correctSet.has(option.key)) button.classList.add("correct");
      if (selected.has(option.key) && !correctSet.has(option.key)) button.classList.add("wrong");
    }
    button.innerHTML = `
      <span class="option-key">${option.key}</span>
      <span class="option-text"></span>
    `;
    button.querySelector(".option-text").textContent = option.text;
    button.addEventListener("click", () => handleExamOptionClick(option.key));
    els.examOptions.appendChild(button);
  }

  els.examPrevBtn.disabled = state.exam.index === 0;
  els.examNextBtn.disabled = state.exam.index >= list.length - 1;
  els.submitExamBtn.disabled = state.exam.submitted;
  els.examResult.classList.toggle("hidden", !state.exam.submitted);
  if (state.exam.submitted && state.exam.result) {
    const isCorrect = sameAnswers(state.exam.answers[question.id] ?? [], question.correctAnswers);
    els.examResult.innerHTML = `
      <div class="result-line ${isCorrect ? "good" : "bad"}">${isCorrect ? "本题正确" : "本题错误"}</div>
      <div class="correct-line">正确答案：${answerText(question)}</div>
    `;
  } else {
    els.examResult.innerHTML = "";
  }
}

function renderAnswerSheet() {
  const list = examQuestions();
  const answered = list.filter((question) => hasExamAnswer(question.id)).length;
  els.examAnswered.textContent = `${answered} / ${list.length} 已答`;
  els.answerSheetGrid.innerHTML = list
    .map((question, index) => {
      const classes = ["sheet-cell"];
      if (index === state.exam.index) classes.push("current");
      if (hasExamAnswer(question.id)) classes.push("answered");
      if (state.exam.submitted) {
        classes.push(sameAnswers(state.exam.answers[question.id] ?? [], question.correctAnswers) ? "correct" : "wrong");
      }
      return `<button class="${classes.join(" ")}" type="button" data-index="${index}">${index + 1}</button>`;
    })
    .join("");

  for (const button of els.answerSheetGrid.querySelectorAll(".sheet-cell")) {
    button.addEventListener("click", () => {
      state.exam.index = Number(button.dataset.index);
      saveState();
      renderExamQuestion();
      renderAnswerSheet();
    });
  }
}

function hasExamAnswer(questionId) {
  return Array.isArray(state.exam.answers[questionId]) && state.exam.answers[questionId].length > 0;
}

function handleExamOptionClick(key) {
  if (state.exam.submitted) return;
  const question = currentExamQuestion();
  if (!question) return;
  const selected = new Set(state.exam.answers[question.id] ?? []);

  if (question.type === "multiple") {
    if (selected.has(key)) selected.delete(key);
    else selected.add(key);
  } else {
    selected.clear();
    selected.add(key);
  }

  state.exam.answers[question.id] = [...selected];
  saveState();
  renderExamQuestion();
  renderAnswerSheet();
  els.progressBar.style.width = `${examProgressPercent()}%`;
}

function moveExam(delta) {
  const list = examQuestions();
  state.exam.index = Math.min(Math.max(state.exam.index + delta, 0), Math.max(0, list.length - 1));
  saveState();
  renderExamQuestion();
  renderAnswerSheet();
}

function isCoarsePointer() {
  return window.matchMedia?.("(pointer: coarse)").matches ?? false;
}

function beginTouch(event, area) {
  if (!isCoarsePointer() || event.touches.length !== 1) return;
  const touch = event.touches[0];
  touchStart = {
    area,
    x: touch.clientX,
    y: touch.clientY,
  };
}

function endTouch(event) {
  if (!touchStart || !isCoarsePointer()) {
    touchStart = null;
    return;
  }

  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStart.x;
  const dy = touch.clientY - touchStart.y;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  const area = touchStart.area;
  touchStart = null;

  if (Math.max(absX, absY) < 42) return;

  if (area === "game") {
    if (absX > absY) moveGame(dx > 0 ? "right" : "left");
    else moveGame(dy > 0 ? "down" : "up");
    event.preventDefault();
    return;
  }

  if (absX < 64 || absX < absY * 1.35) return;
  if (area === "practice" && isPracticeMode()) {
    move(dx > 0 ? -1 : 1);
    event.preventDefault();
  } else if (area === "exam" && mode === "exam" && examViewActive) {
    moveExam(dx > 0 ? -1 : 1);
    event.preventDefault();
  }
}

function remainingExamMs() {
  if (!state.exam.startedAt) return EXAM_DURATION_MS;
  return Math.max(0, state.exam.durationMs - (Date.now() - state.exam.startedAt));
}

function formatTime(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatStudyTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function updateStudyTimer() {
  if (!els.studyTimer) return;
  const visible = isPracticeMode() && state.studyTimer.enabled;
  els.studyTimer.classList.toggle("hidden", !visible);
  els.studyTimerText.textContent = formatStudyTime(state.studyTimer.seconds);
  els.studyTimerToggle.textContent = state.studyTimer.running ? "暂停" : "继续";
  els.studyTimerToggle.classList.toggle("primary", state.studyTimer.running);
}

function startStudyTimerIfNeeded() {
  stopStudyTimer();
  if (!isPracticeMode() || !state.studyTimer.enabled || !state.studyTimer.running) return;
  studyTimerId = window.setInterval(() => {
    if (!isPracticeMode() || !state.studyTimer.enabled || !state.studyTimer.running) {
      stopStudyTimer();
      return;
    }
    state.studyTimer.seconds += 1;
    els.studyTimerText.textContent = formatStudyTime(state.studyTimer.seconds);
    saveState();
  }, 1000);
}

function stopStudyTimer() {
  if (studyTimerId) {
    window.clearInterval(studyTimerId);
    studyTimerId = null;
  }
}

function renderExamTimer() {
  els.examTimer.textContent = state.exam.submitted ? "已交卷" : formatTime(remainingExamMs());
}

function startExamTimer() {
  stopExamTimer();
  if (state.exam.submitted) return;
  examTimerId = window.setInterval(() => {
    renderExamTimer();
    if (remainingExamMs() <= 0) {
      submitExam("timeout");
    }
  }, 1000);
}

function stopExamTimer() {
  if (examTimerId) {
    window.clearInterval(examTimerId);
    examTimerId = null;
  }
}

function submitExam(reason = "manual") {
  if (state.exam.submitted) return;
  const list = examQuestions();
  let correct = 0;
  const byModule = {};
  const details = [];

  for (const question of list) {
    const selected = state.exam.answers[question.id] ?? [];
    const isCorrect = sameAnswers(selected, question.correctAnswers);
    if (isCorrect) correct += 1;
    byModule[question.module] ??= { total: 0, correct: 0, wrong: 0 };
    byModule[question.module].total += 1;
    byModule[question.module][isCorrect ? "correct" : "wrong"] += 1;
    details.push({ questionId: question.id, isCorrect, selectedAnswers: selected });

    logAnswer(question, selected, isCorrect, "answer");
    if (!isCorrect) {
      state.wrongBook[question.id] = {
        count: (state.wrongBook[question.id]?.count ?? 0) + 1,
        lastSelected: selected,
        lastWrongAt: Date.now(),
      };
    }
  }

  const usedMs = state.exam.startedAt ? Date.now() - state.exam.startedAt : EXAM_DURATION_MS;
  state.exam.submitted = true;
  state.exam.result = {
    score: correct,
    total: list.length,
    percent: list.length ? Math.round((correct / list.length) * 100) : 0,
    usedMs,
    reason,
    byModule,
    details,
    submittedAt: Date.now(),
  };
  state.examHistory.push(state.exam.result);
  state.examHistory = state.examHistory.slice(-20);
  examViewActive = false;
  saveState();
  stopExamTimer();
  renderExamSummary();
  render();
}

function renderExamSummary() {
  if (!state.exam.result) return;
  const weakModules = Object.entries(state.exam.result.byModule)
    .map(([name, stat]) => ({ name, ...stat, accuracy: stat.correct / stat.total }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);
  const weakText = weakModules.map((item) => `${item.name}（${Math.round(item.accuracy * 100)}%）`).join("、");
  window.alert(`交卷完成：${state.exam.result.score}/${state.exam.result.total}，正确率 ${state.exam.result.percent}%。薄弱模块：${weakText || "暂无"}`);
}

function renderGraph() {
  if (!knowledge) return;
  if (!selectedGraphNode) {
    const firstModule = knowledge.modules[0];
    selectedGraphNode = firstModule ? { module: firstModule.name, subtopic: null } : null;
  }
  const mastery = masteryByModule();
  els.moduleSummary.innerHTML = knowledge.modules
    .map((module) => {
      const stat = mastery.get(module.name) ?? { mastered: 0, total: module.count, percent: 0 };
      return `
      <article class="module-chip" style="--module-color: ${module.color}">
        <strong>${module.name}</strong>
        <span>掌握度 ${stat.mastered}/${stat.total}</span>
      </article>
    `;
    })
    .join("");

  const moduleNodes = knowledge.modules
    .map((module, index) => {
      const angle = (Math.PI * 2 * index) / knowledge.modules.length - Math.PI / 2;
      const x = 50 + Math.cos(angle) * 27;
      const y = 50 + Math.sin(angle) * 27;
      return { module, angle, x, y };
    });

  const centerLines = moduleNodes
    .map(({ x, y }) => `<line x1="50" y1="50" x2="${x}" y2="${y}" class="graph-line center-link"></line>`)
    .join("");

  const subtopicNodes = moduleNodes.flatMap(({ module, angle }) => {
    const subtopics = module.subtopics.slice(0, 3);
    const spread = 0.24;
    return subtopics.map((subtopic, index) => {
      const offset = (index - (subtopics.length - 1) / 2) * spread;
      const subAngle = angle + offset;
      return {
        module,
        subtopic,
        x: 50 + Math.cos(subAngle) * 43,
        y: 50 + Math.sin(subAngle) * 43,
      };
    });
  });

  const subtopicLines = subtopicNodes
    .map(({ module, x, y }) => {
      const parent = moduleNodes.find((node) => node.module.name === module.name);
      if (!parent) return "";
      return `<line x1="${parent.x}" y1="${parent.y}" x2="${x}" y2="${y}" class="graph-line subtopic-link"></line>`;
    })
    .join("");

  const lines = knowledge.relations
    .map(([from, relation, to]) => {
      const a = moduleNodes.find((node) => node.module.name === from);
      const b = moduleNodes.find((node) => node.module.name === to);
      if (!a || !b) return "";
      return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="graph-line"><title>${from} ${relation} ${to}</title></line>`;
    })
    .join("");

  const nodes = moduleNodes
    .map(({ module, x, y }) => {
      const stat = mastery.get(module.name) ?? { mastered: 0, total: module.count, percent: 0 };
      const radius = Math.max(5.8, Math.min(8.2, 5.2 + module.count / 36));
      const ringRadius = radius + 1.7;
      const circumference = 2 * Math.PI * ringRadius;
      const dash = `${(stat.percent / 100) * circumference} ${circumference}`;
      return `
      <g class="graph-node graph-action ${isSelectedGraphNode(module.name) ? "selected" : ""}" data-module="${module.name}" transform="translate(${x} ${y})">
        <circle r="${radius}" fill="${module.color}"></circle>
        <circle r="${ringRadius}" class="mastery-ring" stroke-dasharray="${dash}"></circle>
        <text y="-0.8">${module.name.replace("与", "/")}</text>
        <text y="4.2" class="mastery-label">${stat.mastered}/${stat.total}</text>
      </g>
    `;
    })
    .join("");

  const subtopicSvg = subtopicNodes
    .map(({ module, subtopic, x, y }) => `
      <g class="subtopic-node graph-action ${isSelectedGraphNode(module.name, subtopic.name) ? "selected" : ""}" data-module="${module.name}" data-subtopic="${subtopic.name}" transform="translate(${x} ${y})">
        <circle r="${Math.max(3.6, Math.min(5.2, 3.5 + subtopic.count / 18))}"></circle>
        <text y="-0.4">${subtopic.name}</text>
        <text y="3.5" class="subtopic-count">${subtopic.count}题</text>
      </g>
    `)
    .join("");

  els.knowledgeGraph.innerHTML = `
    <svg viewBox="0 0 100 100" role="img">
      <g>${centerLines}${lines}${subtopicLines}</g>
      <g class="graph-center" transform="translate(50 50)">
        <circle r="10.5"></circle>
        <text y="-1.5">北航</text>
        <text y="3.2">人工智能导论</text>
      </g>
      <g>${subtopicSvg}</g>
      <g>${nodes}</g>
    </svg>
  `;

  for (const node of els.knowledgeGraph.querySelectorAll(".graph-action")) {
    node.addEventListener("click", () => {
      selectGraphNode(node.dataset.module, node.dataset.subtopic || null);
    });
  }

  renderGraphResult();
}

function isSelectedGraphNode(module, subtopic = null) {
  return selectedGraphNode?.module === module && (selectedGraphNode?.subtopic || null) === (subtopic || null);
}

function selectGraphNode(module, subtopic = null) {
  selectedGraphNode = { module, subtopic: subtopic || null };
  els.graphSearch.value = "";
  renderGraph();
}

function renderGraphResult(query) {
  if (!knowledge) return;
  const mastery = masteryByModule();
  const value = (query ?? els.graphSearch.value ?? "").trim().toLowerCase();
  let module = knowledge.modules.find((item) => item.name === selectedGraphNode?.module) || knowledge.modules[0];
  let subtopic = selectedGraphNode?.subtopic
    ? module?.subtopics.find((item) => item.name === selectedGraphNode.subtopic)
    : null;

  if (value) {
    const matchedQuestions = questions.filter((question) => {
      const haystack = `${question.module} ${question.subtopic} ${question.stem} ${question.options.map((option) => option.text).join(" ")}`.toLowerCase();
      return haystack.includes(value);
    });
    if (matchedQuestions.length) {
      module = knowledge.modules.find((item) => item.name === matchedQuestions[0].module) || module;
      subtopic = null;
      selectedGraphNode = { module: module.name, subtopic: null };
      return renderQuestionResult(module, null, matchedQuestions, `检索：${els.graphSearch.value.trim()}`, mastery);
    }
  }

  const list = subtopic ? subtopic.questions : module.questions;
  renderQuestionResult(module, subtopic, list, subtopic?.name || module.name, mastery);
}

function renderQuestionResult(module, subtopic, list, title, mastery) {
  const concepts = [...module.concepts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const stat = mastery.get(module.name) ?? { mastered: 0, total: module.count, percent: 0 };
  const preview = list.slice(0, 8);
  const targetLabel = subtopic ? `${module.name} / ${subtopic.name}` : module.name;
  els.specialTrainingBtn.disabled = list.length === 0;

  els.graphResult.innerHTML = `
    <div class="graph-result-meta">
      <h4>${title}</h4>
      <span>${list.length} 题</span>
    </div>
    <p>${targetLabel} 当前掌握度为 ${stat.mastered}/${stat.total}（${stat.percent}%）。核心概念：${concepts.map(([name]) => name).join("、") || "综合理解"}。</p>
    <div class="question-preview-list">
      ${preview.map((question) => `
        <button class="question-preview" type="button" data-id="${question.id}">
          <span>第 ${question.sourceNumber} 题 · ${typeText(question.type)}</span>
          <strong>${question.stem}</strong>
        </button>
      `).join("") || `<div class="graph-empty">没有匹配题目</div>`}
    </div>
    ${list.length > preview.length ? `<p class="graph-more">还有 ${list.length - preview.length} 道题，点击“专项训练”继续。</p>` : ""}
  `;

  for (const button of els.graphResult.querySelectorAll(".question-preview")) {
    button.addEventListener("click", () => openQuestionFromGraph(button.dataset.id));
  }
}

function openQuestionFromGraph(questionId) {
  const question = questions.find((item) => item.id === questionId);
  if (!question) return;
  activeSpecialty = { module: question.module, subtopic: question.subtopic || null };
  mode = "special";
  const list = currentList();
  const index = list.findIndex((item) => item.id === question.id);
  state.specialIndex = Math.max(0, index);
  saveState();
  render();
}

function masteryByModule() {
  const masteredQuestionIds = new Set(
    state.answerLog
      .filter((item) => item.action === "answer" && item.isCorrect)
      .map((item) => item.questionId),
  );

  return new Map(knowledge.modules.map((module) => {
    const mastered = module.questions.filter((question) => masteredQuestionIds.has(question.id)).length;
    const total = module.count;
    return [module.name, {
      mastered,
      total,
      percent: total ? Math.round((mastered / total) * 100) : 0,
    }];
  }));
}

function analyticsByModule() {
  const stats = new Map(knowledge.modules.map((module) => [module.name, {
    total: module.count,
    answered: 0,
    correct: 0,
    wrong: 0,
  }]));

  for (const log of state.answerLog.filter((item) => item.action === "answer")) {
    const question = questions.find((item) => item.id === log.questionId);
    if (!question) continue;
    const stat = stats.get(question.module);
    if (!stat) continue;
    stat.answered += 1;
    if (log.isCorrect) stat.correct += 1;
    else stat.wrong += 1;
  }

  return [...stats.entries()].map(([name, stat]) => ({
    name,
    ...stat,
    accuracy: stat.answered ? stat.correct / stat.answered : null,
  }));
}

function renderAnalytics() {
  if (!knowledge) return;
  const stats = analyticsByModule();
  const answered = state.answerLog.filter((item) => item.action === "answer").length;
  const correct = state.answerLog.filter((item) => item.action === "answer" && item.isCorrect).length;
  const wrongTotal = Object.keys(state.wrongBook).length;
  const overall = answered ? Math.round((correct / answered) * 100) : 0;
  const latestExam = state.examHistory.at(-1);
  const bestExam = state.examHistory.reduce((best, item) => (item.percent > (best?.percent ?? -1) ? item : best), null);

  els.analysisCards.innerHTML = `
    <article><strong>${answered}</strong><span>已答记录</span></article>
    <article><strong>${overall}%</strong><span>总体正确率</span></article>
    <article><strong>${wrongTotal}</strong><span>当前错题</span></article>
    <article><strong>${state.examHistory.length}</strong><span>模拟考试</span></article>
  `;

  els.examAnalytics.innerHTML = `
    <div class="graph-card">
      <div class="graph-side-head">
        <h3>模拟考试趋势</h3>
        <span class="type">${latestExam ? `最近 ${latestExam.percent}%` : "暂无记录"}</span>
      </div>
      <div class="exam-analytics-grid">
        <article><strong>${bestExam ? `${bestExam.percent}%` : "-"}</strong><span>最佳成绩</span></article>
        <article><strong>${latestExam ? `${latestExam.score}/${latestExam.total}` : "-"}</strong><span>最近得分</span></article>
        <article><strong>${latestExam ? formatTime(latestExam.usedMs) : "-"}</strong><span>最近用时</span></article>
      </div>
      <div class="score-trend compact">${renderScoreTrendMarkup(state.examHistory)}</div>
    </div>
  `;

  els.accuracyBars.innerHTML = stats
    .sort((a, b) => (a.accuracy ?? -1) - (b.accuracy ?? -1))
    .map((stat) => {
      const percent = stat.accuracy === null ? 0 : Math.round(stat.accuracy * 100);
      const label = stat.accuracy === null ? "未练习" : `${percent}%`;
      return `
        <div class="bar-row">
          <span>${stat.name}</span>
          <div><i style="width: ${Math.max(4, percent)}%"></i></div>
          <strong>${label}</strong>
        </div>
      `;
    })
    .join("");

  const weak = stats
    .filter((stat) => stat.answered > 0)
    .sort((a, b) => a.accuracy - b.accuracy || b.wrong - a.wrong)
    .slice(0, 3);
  const untouched = stats.filter((stat) => stat.answered === 0).slice(0, 2);
  const advice = [];
  if (weak.length) {
    advice.push(`优先复习 ${weak.map((item) => item.name).join("、")}，这些模块在当前答题日志中的正确率最低。`);
  }
  if (untouched.length) {
    advice.push(`补充练习 ${untouched.map((item) => item.name).join("、")}，避免只刷熟悉模块导致知识覆盖不完整。`);
  }
  if (wrongTotal) {
    advice.push("进入错题复习模式，把反复答错的题目与知识图谱中的模块对应起来，先看概念再做题。");
  }
  if (!advice.length) {
    advice.push("当前答题记录较少，建议先完成 30 道以上题目，再根据模块正确率生成更可靠的复习计划。");
  }

  els.studyAdvice.innerHTML = advice.map((item) => `<p>${item}</p>`).join("");
}

function renderScoreTrendMarkup(history) {
  if (!history.length) return `<div class="trend-empty">完成模拟考试后生成趋势</div>`;
  const items = history.slice(-10);
  const width = 360;
  const height = 150;
  const padding = 22;
  const step = items.length > 1 ? (width - padding * 2) / (items.length - 1) : 0;
  const points = items.map((item, index) => {
    const x = items.length === 1 ? width / 2 : padding + index * step;
    const y = height - padding - ((item.percent ?? 0) / 100) * (height - padding * 2);
    return { x, y, item };
  });
  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="trend-axis"></line>
      <polyline points="${polyline}" class="trend-line"></polyline>
      ${points.map((point) => `
        <g class="trend-point" transform="translate(${point.x} ${point.y})">
          <circle r="4"></circle>
          <text y="-8">${point.item.percent}%</text>
        </g>
      `).join("")}
    </svg>
  `;
}

function createInitialGame() {
  const game = {
    board: Array.from({ length: GAME_SIZE }, () => Array(GAME_SIZE).fill(0)),
    score: 0,
    deleteLeft: GAME_DELETE_LIMIT,
    undoStack: [],
    deleteMode: false,
    won: false,
    over: false,
  };
  addRandomTile(game.board);
  addRandomTile(game.board);
  return game;
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function addRandomTile(board) {
  const empty = [];
  for (let row = 0; row < GAME_SIZE; row += 1) {
    for (let col = 0; col < GAME_SIZE; col += 1) {
      if (board[row][col] === 0) empty.push([row, col]);
    }
  }
  if (!empty.length) return false;
  const [row, col] = empty[Math.floor(Math.random() * empty.length)];
  board[row][col] = Math.random() < 0.9 ? 2 : 4;
  return { row, col };
}

function pushGameUndo() {
  game2048.undoStack.push({
    board: cloneBoard(game2048.board),
    score: game2048.score,
    deleteLeft: game2048.deleteLeft,
    won: game2048.won,
    over: game2048.over,
  });
  if (game2048.undoStack.length > 40) game2048.undoStack.shift();
}

function slideLine(line) {
  const values = line.filter(Boolean);
  const merged = [];
  let gained = 0;
  for (let index = 0; index < values.length; index += 1) {
    if (values[index] === values[index + 1]) {
      const value = values[index] * 2;
      merged.push(value);
      gained += value;
      index += 1;
    } else {
      merged.push(values[index]);
    }
  }
  while (merged.length < GAME_SIZE) merged.push(0);
  return { line: merged, gained };
}

function moveGame(direction) {
  if (game2048.over) return;
  const previousBoard = cloneBoard(game2048.board);
  const before = JSON.stringify(game2048.board);
  const next = cloneBoard(game2048.board);
  let gained = 0;

  for (let i = 0; i < GAME_SIZE; i += 1) {
    let line;
    if (direction === "left" || direction === "right") {
      line = [...next[i]];
      if (direction === "right") line.reverse();
      const result = slideLine(line);
      if (direction === "right") result.line.reverse();
      next[i] = result.line;
      gained += result.gained;
    } else {
      line = next.map((row) => row[i]);
      if (direction === "down") line.reverse();
      const result = slideLine(line);
      if (direction === "down") result.line.reverse();
      for (let row = 0; row < GAME_SIZE; row += 1) next[row][i] = result.line[row];
      gained += result.gained;
    }
  }

  if (JSON.stringify(next) === before) return;
  pushGameUndo();
  game2048.board = next;
  game2048.score += gained;
  gameMoveAnimations = buildGameMoveAnimations(previousBoard, next, direction);
  game2048.newTile = addRandomTile(game2048.board);
  updateGameStatus();
  renderGame();
}

function buildGameMoveAnimations(previousBoard, nextBoard, direction) {
  const animations = new Map();
  const vectors = {
    left: { dr: 0, dc: -1 },
    right: { dr: 0, dc: 1 },
    up: { dr: -1, dc: 0 },
    down: { dr: 1, dc: 0 },
  };
  const vector = vectors[direction];
  if (!vector) return animations;

  const previousCells = [];
  for (let row = 0; row < GAME_SIZE; row += 1) {
    for (let col = 0; col < GAME_SIZE; col += 1) {
      if (previousBoard[row][col]) {
        previousCells.push({ row, col, value: previousBoard[row][col], used: false });
      }
    }
  }

  const scanRows = direction === "down" ? [GAME_SIZE - 1, GAME_SIZE - 2, GAME_SIZE - 3, 0] : [0, 1, 2, 3];
  const scanCols = direction === "right" ? [GAME_SIZE - 1, GAME_SIZE - 2, GAME_SIZE - 3, 0] : [0, 1, 2, 3];

  for (const row of scanRows) {
    for (const col of scanCols) {
      const value = nextBoard[row][col];
      if (!value) continue;
      const candidates = previousCells
        .filter((cell) => !cell.used && (cell.value === value || cell.value * 2 === value))
        .map((cell) => ({
          cell,
          distance: Math.abs(cell.row - row) + Math.abs(cell.col - col),
          aligned: direction === "left" || direction === "right" ? cell.row === row : cell.col === col,
        }))
        .filter((item) => item.aligned)
        .sort((a, b) => a.distance - b.distance);
      const match = candidates[0]?.cell;
      if (!match) continue;
      match.used = true;
      if (match.row !== row || match.col !== col) {
        animations.set(`${row},${col}`, direction);
      }
    }
  }

  return animations;
}

function updateGameStatus() {
  if (!game2048.won && game2048.board.some((row) => row.some((value) => value >= 2048))) {
    game2048.won = true;
    els.gameMessage.classList.remove("hidden");
    els.gameMessage.textContent = "彩蛋达成：I❤️BUAA";
  }
  game2048.over = !canGameMove() && game2048.deleteLeft <= 0;
}

function canGameMove() {
  for (let row = 0; row < GAME_SIZE; row += 1) {
    for (let col = 0; col < GAME_SIZE; col += 1) {
      const value = game2048.board[row][col];
      if (!value) return true;
      if (row < GAME_SIZE - 1 && game2048.board[row + 1][col] === value) return true;
      if (col < GAME_SIZE - 1 && game2048.board[row][col + 1] === value) return true;
    }
  }
  return false;
}

function renderRelaxMode() {
  stopExamTimer();
  stopStudyTimer();
  els.emptyState.classList.add("hidden");
  els.homePanel.classList.add("hidden");
  els.examPanel.classList.add("hidden");
  els.studyPanel.classList.add("hidden");
  els.practicePanel.classList.add("hidden");
  els.card.classList.add("hidden");
  els.practiceNav.classList.add("hidden");
  els.relaxPanel.classList.remove("hidden");
  els.prevBtn.disabled = true;
  els.nextBtn.disabled = true;
  els.showAnswerBtn.disabled = true;
  els.progressText.textContent = "方向键 / Z / Delete";
  els.progressBar.style.width = `${gameProgressPercent()}%`;
  renderGame();
}

function renderGame() {
  els.gameScore.textContent = game2048.score;
  els.gameDeleteLeft.textContent = game2048.deleteLeft;
  if (mode === "relax") {
    els.progressBar.style.width = `${gameProgressPercent()}%`;
  }
  els.gameDeleteBtn.classList.toggle("primary", game2048.deleteMode);
  els.gameDeleteBtn.textContent = game2048.deleteMode ? "取消删除" : "删除方块";
  els.gameUndoBtn.disabled = game2048.undoStack.length === 0;
  const isBlockedWithDeletes = !canGameMove() && game2048.deleteLeft > 0;
  els.gameMessage.classList.toggle("hidden", !game2048.won && !game2048.over && !game2048.deleteMode && !isBlockedWithDeletes);
  els.gameOverActions.classList.toggle("hidden", !game2048.over);
  if (game2048.over) els.gameMessage.textContent = "失败了：没有可移动方块，删除机会也用完了";
  else if (isBlockedWithDeletes) els.gameMessage.textContent = "没有可移动方块了，可以用删除机会打开局面";
  else if (game2048.deleteMode) els.gameMessage.textContent = "删除模式：单击一个方块";
  else if (game2048.won) els.gameMessage.textContent = "彩蛋达成：I❤️BUAA";

  els.gameBoard.innerHTML = game2048.board
    .flatMap((row, rowIndex) => row.map((value, colIndex) => `
      <button
        class="game-cell ${value ? "filled" : ""} tile-${Math.min(value, 2048)} ${gameTileAnimationClass(rowIndex, colIndex, value)}"
        style="--row: ${rowIndex}; --col: ${colIndex};"
        type="button"
        data-row="${rowIndex}"
        data-col="${colIndex}"
        aria-label="${value || "空"}"
      >
        ${gameTileText(value)}
      </button>
    `))
    .join("");

  for (const cell of els.gameBoard.querySelectorAll(".game-cell")) {
    cell.addEventListener("click", () => handleGameCellClick(Number(cell.dataset.row), Number(cell.dataset.col)));
  }
  gameMoveAnimations = new Map();
  game2048.newTile = null;
}

function gameTileAnimationClass(row, col, value) {
  if (!value) return "";
  if (game2048.newTile?.row === row && game2048.newTile?.col === col) return "tile-new";
  const direction = gameMoveAnimations.get(`${row},${col}`);
  return direction ? `tile-move-${direction}` : "";
}

function gameTileText(value) {
  if (!value) return "";
  if (value >= 2048) return "I❤️BUAA";
  return String(value);
}

function maxGameTile() {
  return Math.max(...game2048.board.flat(), 0);
}

function gameProgressPercent() {
  return Math.min(100, Math.round((maxGameTile() / 2048) * 100));
}

function undoGame() {
  const previous = game2048.undoStack.pop();
  if (!previous) return;
  game2048.board = cloneBoard(previous.board);
  game2048.score = previous.score;
  game2048.deleteLeft = previous.deleteLeft;
  game2048.won = previous.won;
  game2048.over = previous.over;
  game2048.deleteMode = false;
  renderGame();
}

function restartGame() {
  if (!confirm("确定重新开始 2048？")) return;
  game2048 = createInitialGame();
  renderRelaxMode();
}

function restartGameDirect() {
  game2048 = createInitialGame();
  renderRelaxMode();
}

function addEasyTile() {
  if (!confirm("确定请求一次支援吗？系统会在随机空位投放一个 512 方块，本次操作可以撤销。")) return;
  const empty = [];
  for (let row = 0; row < GAME_SIZE; row += 1) {
    for (let col = 0; col < GAME_SIZE; col += 1) {
      if (game2048.board[row][col] === 0) empty.push([row, col]);
    }
  }
  if (!empty.length) {
    window.alert("棋盘已经没有空位了。");
    return;
  }
  pushGameUndo();
  const [row, col] = empty[Math.floor(Math.random() * empty.length)];
  game2048.board[row][col] = 512;
  game2048.newTile = { row, col };
  game2048.over = false;
  updateGameStatus();
  renderGame();
}

function handleGameCellClick(row, col) {
  if (!game2048.deleteMode) return;
  const value = game2048.board[row][col];
  if (!value) return;
  if (game2048.deleteLeft <= 0) {
    game2048.deleteMode = false;
    renderGame();
    return;
  }
  if (!confirm(`确定摧毁 ${gameTileText(value)} 方块？`)) return;
  pushGameUndo();
  game2048.board[row][col] = 0;
  game2048.deleteLeft -= 1;
  game2048.deleteMode = false;
  updateGameStatus();
  renderGame();
}

function handleOptionClick(key) {
  const question = currentList()[currentIndex()];
  if (!question || answered) return;

  if (question.type !== "multiple") {
    revealAnswer([key]);
    return;
  }

  if (selectedAnswers.has(key)) {
    selectedAnswers.delete(key);
  } else {
    selectedAnswers.add(key);
  }

  const option = els.options.querySelector(`.option[data-key="${key}"]`);
  option?.classList.toggle("selected", selectedAnswers.has(key));
  els.showAnswerBtn.disabled = selectedAnswers.size === 0;
}

function revealAnswer(selected = null) {
  if (answered) return;
  answered = true;

  const list = currentList();
  const question = list[currentIndex()];
  if (!question) return;

  const correctSet = new Set(question.correctAnswers);
  const selectedList = Array.isArray(selected) ? selected : [];
  const isCorrect = selected === null ? null : sameAnswers(selectedList, question.correctAnswers);

  for (const option of els.options.querySelectorAll(".option")) {
    const key = option.dataset.key;
    option.disabled = true;
    if (correctSet.has(key)) option.classList.add("correct");
    if (selectedList.includes(key) && !correctSet.has(key)) option.classList.add("wrong");
    if (selectedList.includes(key)) option.classList.add("selected");
  }

  if (selected === null) {
    els.resultLine.textContent = "已显示答案";
    els.resultLine.className = "result-line";
    logAnswer(question, [], null, "show");
  } else if (isCorrect) {
    els.resultLine.textContent = "答对了";
    els.resultLine.className = "result-line good";
    logAnswer(question, selectedList, true, "answer");
    if (mode === "wrong" && state.wrongBook[question.id]) {
      delete state.wrongBook[question.id];
      setCurrentIndex(currentIndex());
      window.setTimeout(render, 650);
    }
  } else {
    els.resultLine.textContent = "答错了，已加入错题本";
    els.resultLine.className = "result-line bad";
    logAnswer(question, selectedList, false, "answer");
    state.wrongBook[question.id] = {
      count: (state.wrongBook[question.id]?.count ?? 0) + 1,
      lastSelected: selectedList,
      lastWrongAt: Date.now(),
    };
  }

  els.correctLine.textContent = `正确答案：${answerText(question)}`;
  els.answerPanel.classList.remove("hidden");
  saveState();
  els.wrongCount.textContent = Object.keys(state.wrongBook).length;
  els.logCount.textContent = state.answerLog.length;
}

function move(delta) {
  const list = currentList();
  if (list.length === 0) return;
  const index = currentIndex();

  if (mode !== "wrong" && index === list.length - 1 && delta > 0) {
    setCurrentIndex(0);
  } else {
    setCurrentIndex(index + delta);
  }

  render();
}

function switchMode(nextMode) {
  if (nextMode !== "special") activeSpecialty = null;
  if (nextMode !== "exam") examViewActive = false;
  mode = nextMode;
  render();
}

function startSpecialtyTraining(module, subtopic = null) {
  activeSpecialty = { module, subtopic: subtopic || null };
  state.specialIndex = 0;
  mode = "special";
  saveState();
  render();
}

function startSelectedGraphTraining() {
  if (!selectedGraphNode) return;
  startSpecialtyTraining(selectedGraphNode.module, selectedGraphNode.subtopic);
}

els.backHomeBtn.addEventListener("click", () => switchMode("home"));
els.appMenuBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleAppMenu();
});
els.appMenu.addEventListener("click", (event) => {
  event.stopPropagation();
});
for (const button of els.themeChoices) {
  button.addEventListener("click", () => applyTheme(button.dataset.themeChoice));
}
els.clearStudyDataBtn.addEventListener("click", clearStudyData);
els.showStudyTimerBtn.addEventListener("click", () => {
  state.studyTimer.enabled = true;
  state.studyTimer.running = true;
  saveState();
  updateThemeMenu();
  updateStudyTimer();
  startStudyTimerIfNeeded();
});
els.normalMode.addEventListener("click", () => switchMode("single"));
els.homeMode.addEventListener("click", () => switchMode("home"));
els.multipleMode.addEventListener("click", () => switchMode("multiple"));
els.wrongMode.addEventListener("click", () => switchMode("wrong"));
els.examMode.addEventListener("click", () => switchMode("exam"));
els.graphMode.addEventListener("click", () => switchMode("graph"));
els.analyticsMode.addEventListener("click", () => switchMode("analytics"));
els.relaxMode.addEventListener("click", () => switchMode("relax"));
for (const card of document.querySelectorAll(".feature-card")) {
  card.addEventListener("click", () => switchMode(card.dataset.mode));
}
for (const button of [...els.railActions, ...els.bottomTabs]) {
  button.addEventListener("click", () => switchMode(button.dataset.mode));
}
els.prevBtn.addEventListener("click", () => move(-1));
els.nextBtn.addEventListener("click", () => move(1));
els.practiceSheetToggle?.addEventListener("click", () => {
  practiceSheetExpanded = !practiceSheetExpanded;
  els.practicePanel.classList.toggle("sheet-expanded", practiceSheetExpanded);
  els.practiceSheetToggle.setAttribute("aria-expanded", String(practiceSheetExpanded));
});
els.card.addEventListener("touchstart", (event) => beginTouch(event, "practice"), { passive: true });
els.card.addEventListener("touchend", endTouch, { passive: false });
els.examPrevBtn.addEventListener("click", () => moveExam(-1));
els.examNextBtn.addEventListener("click", () => moveExam(1));
els.examQuestionNo.closest(".exam-question").addEventListener("touchstart", (event) => beginTouch(event, "exam"), { passive: true });
els.examQuestionNo.closest(".exam-question").addEventListener("touchend", endTouch, { passive: false });
els.gameBoard.addEventListener("touchstart", (event) => beginTouch(event, "game"), { passive: true });
els.gameBoard.addEventListener("touchmove", (event) => {
  if (touchStart?.area === "game") event.preventDefault();
}, { passive: false });
els.gameBoard.addEventListener("touchend", endTouch, { passive: false });
els.gameRestartBtn.addEventListener("click", restartGame);
els.gameHomeBtn.addEventListener("click", () => switchMode("home"));
els.gameAgainBtn.addEventListener("click", restartGameDirect);
els.gameUndoBtn.addEventListener("click", undoGame);
els.gameEasyBtn.addEventListener("click", addEasyTile);
els.gameDeleteBtn.addEventListener("click", () => {
  if (game2048.deleteLeft <= 0) return;
  game2048.deleteMode = !game2048.deleteMode;
  renderGame();
});
els.startExamBtn.addEventListener("click", () => {
  const hasUnsubmitted = hasActiveExam();
  const message = hasUnsubmitted
    ? "当前有一场未完成考试。开始新考试会放弃这场考试，确定继续？"
    : "确定开始模拟考试？开始后立即计时。";
  if (!confirm(message)) return;
  startNewExam();
  render();
});
els.resumeExamBtn.addEventListener("click", () => {
  if (!hasActiveExam()) return;
  examViewActive = true;
  render();
});
els.newExamBtn.addEventListener("click", () => {
  if (!state.exam.submitted && state.exam.questionIds.length && !confirm("当前考试还未交卷，确定重新抽题？")) {
    return;
  }
  startNewExam();
  render();
});
els.submitExamBtn.addEventListener("click", () => {
  if (state.exam.submitted) return;
  if (!confirm("确定交卷？交卷后不能修改答案。")) return;
  submitExam("manual");
});
els.graphSearchBtn.addEventListener("click", () => renderGraphResult());
els.graphSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") renderGraphResult();
});
els.specialTrainingBtn.addEventListener("click", startSelectedGraphTraining);
els.studyTimerToggle.addEventListener("click", () => {
  state.studyTimer.running = !state.studyTimer.running;
  saveState();
  updateStudyTimer();
  startStudyTimerIfNeeded();
});
els.studyTimerReset.addEventListener("click", () => {
  state.studyTimer.seconds = 0;
  saveState();
  updateStudyTimer();
});
els.studyTimerClose.addEventListener("click", () => {
  state.studyTimer.enabled = false;
  state.studyTimer.running = false;
  stopStudyTimer();
  saveState();
  updateThemeMenu();
  updateStudyTimer();
});
els.showAnswerBtn.addEventListener("click", () => {
  const question = currentList()[currentIndex()];
  if (question?.type === "multiple") {
    revealAnswer([...selectedAnswers]);
  } else {
    revealAnswer(null);
  }
});
window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
    return;
  }

  if (mode === "relax") {
    const keyMap = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down",
    };
    if (keyMap[event.key]) {
      event.preventDefault();
      moveGame(keyMap[event.key]);
    } else if (event.key.toLowerCase() === "z") {
      event.preventDefault();
      undoGame();
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      if (game2048.deleteLeft > 0) {
        game2048.deleteMode = !game2048.deleteMode;
        renderGame();
      }
    }
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    if (mode === "exam") moveExam(-1);
    else move(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    if (mode === "exam") moveExam(1);
    else move(1);
  }
});
window.addEventListener("click", () => toggleAppMenu(false));
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") toggleAppMenu(false);
});
els.resetWrong.addEventListener("click", () => {
  if (!Object.keys(state.wrongBook).length) return;
  if (!confirm("确定清空所有错题记录？")) return;
  state.wrongBook = {};
  state.wrongIndex = 0;
  saveState();
  render();
});

fetch("./questions.json")
  .then((response) => {
    if (!response.ok) throw new Error(`题库加载失败：${response.status}`);
    return response.json();
  })
  .then((data) => {
    questions = Array.isArray(data) ? data : [];
    knowledge = buildKnowledgeModel();
    state.normalIndex = Math.min(state.normalIndex, Math.max(0, questions.length - 1));
    migrateIndexes();
    saveState();
    render();
  })
  .catch((error) => {
    els.homePanel.classList.add("hidden");
    els.relaxPanel.classList.add("hidden");
    els.examPanel.classList.add("hidden");
    els.studyPanel.classList.add("hidden");
    els.practicePanel.classList.remove("hidden");
    els.card.classList.remove("hidden");
    els.stem.textContent = error.message;
    els.options.innerHTML = "";
    els.showAnswerBtn.disabled = true;
    els.prevBtn.disabled = true;
    els.nextBtn.disabled = true;
  });
