const ROUND_LENGTH = 12;
const QUESTION_TIME = 15;
const NEXT_QUESTION_DELAY = 2000;
const DING_FILE = "ding.mp3";
const BUZZ_FILE = "buzz.mp3";
const LEADERBOARD_KEY = "the-rewind-leaderboard";

function question(song, artist, lyric, answer, options) {
  return { song, artist, lyric, answer, options };
}

const gameData = {
  pop: {
    label: "Pop Classics",
    questions: [
      question("...Baby One More Time", "Britney Spears", "Hit me baby one more ___", "time", ["chance", "night", "time", "dance"]),
      question("I Wanna Dance with Somebody", "Whitney Houston", "I wanna dance with ___", "somebody", ["fire", "somebody", "feeling", "music"]),
      question("Sweet Dreams (Are Made of This)", "Eurythmics", "Sweet dreams are made of ___", "this", ["gold", "love", "this", "beats"]),
      question("Wake Me Up Before You Go-Go", "Wham!", "Wake me up before you go-___", "go", ["home", "now", "go", "slow"]),
      question("Girls Just Want to Have Fun", "Cyndi Lauper", "Girls just want to have ___", "fun", ["fun", "faith", "time", "love"]),
      question("Like a Virgin", "Madonna", "Like a virgin, touched for the very first ___", "time", ["night", "time", "kiss", "song"]),
      question("Don't Stop Believin'", "Journey", "Don't stop believin', hold on to that ___", "feeling", ["moment", "dream", "rhythm", "feeling"]),
      question("Every Breath You Take", "The Police", "Every breath you take, every move you ___", "make", ["make", "see", "know", "try"]),
      question("Billie Jean", "Michael Jackson", "Billie Jean is not my ___", "lover", ["lover", "fever", "answer", "number"]),
      question("Thriller", "Michael Jackson", "Cause this is thriller, thriller ___", "night", ["time", "night", "light", "sound"]),
      question("I Will Survive", "Gloria Gaynor", "At first I was afraid, I was ___", "petrified", ["alone", "petrified", "frozen", "surprised"]),
      question("Dancing Queen", "ABBA", "You can dance, you can jive, having the time of your ___", "life", ["night", "show", "life", "mind"])
    ]
  },
  rnb: {
    label: "2000's R&B Hits",
    questions: [
      question("We Belong Together", "Mariah Carey", "We belong together, who else am I gon' ___", "call", ["call", "lean", "need", "love"]),
      question("My Boo", "Usher and Alicia Keys", "My boo, my boo, my boo, my ___", "boo", ["boo", "baby", "truth", "one"]),
      question("Burn", "Usher", "Gotta let it burn, deep down you know it's ___", "best", ["real", "best", "gone", "late"]),
      question("Can We Talk", "Tevin Campbell", "Can we talk for a minute, girl I want to ___", "know", ["stay", "know", "shine", "go"]),
      question("Say My Name", "Destiny's Child", "Say my name, say my name, if no one is around you, say baby I ___", "love", ["know", "love", "need", "call"]),
      question("Confessions Part II", "Usher", "Confessions on the floor, man I didn't know what to ___", "do", ["say", "do", "mean", "choose"]),
      question("So Sick", "Ne-Yo", "So sick of love songs, so tired of ___", "tears", ["calls", "games", "tears", "rain"]),
      question("I Should Have Cheated", "Keyshia Cole", "I should have cheated, I should have done you ___", "wrong", ["good", "wrong", "first", "cold"]),
      question("Let Me Love You", "Mario", "Let me love you until you learn to love ___", "yourself", ["again", "me", "yourself", "right"]),
      question("Yeah!", "Usher ft. Lil Jon and Ludacris", "Yeah, yeah, yeah, yeah, yeah, yeah, ___", "yeah", ["hey", "yeah", "now", "uh"]),
      question("Foolish", "Ashanti", "See my days are cold without you, but I'm hurting while I'm with ___", "you", ["time", "truth", "you", "him"]),
      question("U Got It Bad", "Usher", "When you feel it in your body, you found somebody who makes you change your ___", "ways", ["mind", "ways", "plans", "days"])
    ]
  },
  hits2010: {
    label: "2010's Popular Hits",
    questions: [
      question("Firework", "Katy Perry", "Cause baby you're a ___", "firework", ["dreamer", "star", "firework", "fighter"]),
      question("The Edge of Glory", "Lady Gaga", "I'm on the edge of ___", "glory", ["reason", "glory", "heaven", "change"]),
      question("Hello", "Adele", "Hello from the other ___", "side", ["night", "time", "side", "line"]),
      question("22", "Taylor Swift", "We're happy, free, confused, and lonely at the same ___", "time", ["light", "time", "place", "beat"]),
      question("Diamonds", "Rihanna", "Shine bright like a ___", "diamond", ["diamond", "city", "record", "mirror"]),
      question("Sorry", "Justin Bieber", "Is it too late now to say ___", "sorry", ["hello", "maybe", "sorry", "goodbye"]),
      question("Chandelier", "Sia", "I'm gonna swing from the chandelier, from the chandelier ___", "tonight", ["inside", "tonight", "all night", "alive"]),
      question("Stronger", "Kelly Clarkson", "What doesn't kill you makes you ___", "stronger", ["warmer", "louder", "stronger", "better"]),
      question("Count on Me", "Bruno Mars", "You can count on me like one two ___", "three", ["four", "free", "three", "see"]),
      question("Watch Me", "Silento", "Watch me whip, now watch me ___", "nae nae", ["slide", "sing", "nae nae", "dance"]),
      question("Started From the Bottom", "Drake", "Started from the bottom now we're ___", "here", ["home", "there", "stars", "here"]),
      question("Love the Way You Lie", "Eminem ft. Rihanna", "Just gonna stand there and watch me ___", "burn", ["run", "shine", "burn", "learn"])
    ]
  },
  beyonce: {
    label: "Beyonce Discography",
    questions: [
      question("Crazy in Love", "Beyonce ft. Jay-Z", "Got me looking so crazy right ___", "now", ["slow", "high", "now", "down"]),
      question("Baby Boy", "Beyonce ft. Sean Paul", "Baby boy, you stay on my ___", "mind", ["mind", "side", "line", "heart"]),
      question("Naughty Girl", "Beyonce", "Tonight I'll be a naughty ___", "girl", ["girl", "queen", "one", "star"]),
      question("Me, Myself and I", "Beyonce", "Me, myself and ___", "I", ["you", "I", "mine", "me"]),
      question("Deja Vu", "Beyonce ft. Jay-Z", "Baby, it seems like everywhere I go I see ___", "you", ["me", "you", "us", "light"]),
      question("Irreplaceable", "Beyonce", "To the left, to the left, everything you own in the box to the ___", "left", ["side", "left", "door", "back"]),
      question("Upgrade U", "Beyonce ft. Jay-Z", "Let me upgrade ___", "you", ["me", "you", "us", "it"]),
      question("If I Were a Boy", "Beyonce", "If I were a ___", "boy", ["man", "boy", "star", "king"]),
      question("Halo", "Beyonce", "I can see your halo, halo, halo, I can see your ___", "halo", ["halo", "shadow", "glow", "face"]),
      question("Single Ladies (Put a Ring on It)", "Beyonce", "If you liked it then you should have put a ___ on it", "ring", ["ring", "crown", "name", "shine"]),
      question("Sweet Dreams", "Beyonce", "You could be a sweet dream or a beautiful ___", "nightmare", ["picture", "nightmare", "fire", "story"]),
      question("Why Don't You Love Me", "Beyonce", "Why don't you love ___", "me", ["us", "her", "me", "you"]),
      question("Run the World (Girls)", "Beyonce", "Who run the world? ___", "girls", ["queens", "girls", "dreams", "stars"]),
      question("Best Thing I Never Had", "Beyonce", "Thank God I found the ___", "goodbye", ["answer", "goodbye", "truth", "reason"]),
      question("Countdown", "Beyonce", "My baby is a ___", "10", ["4", "6", "8", "10"]),
      question("Love On Top", "Beyonce", "Baby it's you, you're the one I ___", "love", ["need", "see", "love", "know"]),
      question("Party", "Beyonce ft. Andre 3000", "Cause we be all night", "party", ["ready", "gold", "party", "steady"]),
      question("End of Time", "Beyonce", "Come take my hand, I won't let you ___", "go", ["cry", "hide", "go", "down"]),
      question("I Was Here", "Beyonce", "I wanna leave my footprints on the sands of ___", "time", ["gold", "love", "life", "time"]),
      question("XO", "Beyonce", "Your love is bright as ever, even in the ___", "shadows", ["distance", "shadows", "moonlight", "silence"]),
      question("***Flawless", "Beyonce", "I woke up like this, we ___", "flawless", ["fearless", "glowing", "flawless", "shining"]),
      question("Drunk in Love", "Beyonce ft. Jay-Z", "I've been drinkin', I've been drinkin', I get filthy when that liquor get into ___", "me", ["place", "me", "air", "view"]),
      question("Partition", "Beyonce", "Driver roll up the ___ please", "partition", ["windows", "partition", "music", "curtain"]),
      question("Pretty Hurts", "Beyonce", "Perfection is a disease of a ___", "nation", ["person", "dream", "nation", "lifetime"]),
      question("Mine", "Beyonce ft. Drake", "I've been watching for the signs, took a trip to clear my ___", "mind", ["head", "mind", "heart", "time"]),
      question("7/11", "Beyonce", "Shoulders sideways, smack it, smack it in the ___", "air", ["spot", "room", "air", "night"]),
      question("Formation", "Beyonce", "Okay ladies, now let's get in ___", "formation", ["motion", "formation", "line", "position"]),
      question("Sorry", "Beyonce", "Middle fingers up, put them hands high, wave it in his face, tell him ___", "boy", ["gone", "boy", "bye", "now"]),
      question("Hold Up", "Beyonce", "What's worse, lookin' jealous or crazy?", "crazy", ["lonely", "crazy", "restless", "reckless"]),
      question("Freedom", "Beyonce ft. Kendrick Lamar", "Freedom, freedom, I can't move, freedom cut me ___", "loose", ["free", "loose", "off", "down"]),
      question("Daddy Lessons", "Beyonce", "Daddy made me fight, it wasn't always ___", "right", ["fun", "right", "easy", "safe"]),
      question("Sandcastles", "Beyonce", "We built sandcastles that washed ___", "away", ["away", "down", "out", "off"]),
      question("Spirit", "Beyonce", "Spirit, watch the heavens ___", "open", ["glow", "open", "dance", "rise"]),
      question("Black Parade", "Beyonce", "I'm going back to the ___", "South", ["North", "city", "South", "roots"]),
      question("Break My Soul", "Beyonce", "You won't break my ___", "soul", ["heart", "mind", "soul", "love"]),
      question("Cuff It", "Beyonce", "I feel like falling in ___", "love", ["place", "light", "love", "motion"]),
      question("Alien Superstar", "Beyonce", "I'm too classy for this ___", "world", ["show", "town", "world", "glow"]),
      question("Virgo's Groove", "Beyonce", "Baby come over, come be alone with ___", "me", ["us", "me", "you", "time"]),
      question("Heated", "Beyonce", "Never met a girl with a mind like ___", "this", ["mine", "hers", "this", "that"]),
      question("Texas Hold 'Em", "Beyonce", "This ain't Texas, ain't no hold '___", "em", ["up", "em", "on", "back"]),
      question("16 Carriages", "Beyonce", "Sixteen carriages driving ___", "away", ["slow", "away", "home", "out"]),
      question("Bodyguard", "Beyonce", "I could be your body___", "guard", ["guard", "line", "light", "song"]),
      question("Jolene", "Beyonce", "Jolene, I'm warning ___", "you", ["now", "you", "girl", "once"]),
      question("II Most Wanted", "Beyonce ft. Miley Cyrus", "I'll be your shotgun ___", "rider", ["lover", "rider", "driver", "partner"]),
      question("Ya Ya", "Beyonce", "Whole lotta red in that white and ___", "blue", ["gold", "blue", "black", "green"])
    ]
  }
};

const state = {
  selectedGenre: "pop",
  gameMode: "single",
  playerName: "Player 1",
  roomCode: "",
  questions: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  timeLeft: QUESTION_TIME,
  answerLocked: false,
  timerId: null,
  nextQuestionId: null,
  audioContext: null,
  audioEnabled: false,
  leaderboard: []
};

const elements = {
  modeButtons: document.querySelectorAll(".mode-button"),
  genreButtons: document.querySelectorAll(".genre-button"),
  playerNameInput: document.getElementById("player-name"),
  hostCard: document.getElementById("host-card"),
  roomCode: document.getElementById("room-code"),
  leaderboardList: document.getElementById("leaderboard-list"),
  leaderboardEmpty: document.getElementById("leaderboard-empty"),
  menuView: document.getElementById("menu-view"),
  gameView: document.getElementById("game-view"),
  resultView: document.getElementById("result-view"),
  startButton: document.getElementById("start-button"),
  playAgainButton: document.getElementById("play-again-button"),
  backToMenuButton: document.getElementById("back-to-menu-button"),
  currentMode: document.getElementById("current-mode"),
  currentGenre: document.getElementById("current-genre"),
  questionNumber: document.getElementById("question-number"),
  score: document.getElementById("score"),
  streak: document.getElementById("streak"),
  timeLeft: document.getElementById("time-left"),
  timerBar: document.getElementById("timer-bar"),
  lyricLine: document.getElementById("lyric-line"),
  songCredit: document.getElementById("song-credit"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),
  resultText: document.getElementById("result-text")
};

initialize();

function initialize() {
  state.roomCode = generateRoomCode();
  state.leaderboard = loadLeaderboard();
  elements.roomCode.textContent = state.roomCode;
  bindEvents();
  syncModeUi();
  renderLeaderboard();
}

function bindEvents() {
  elements.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      elements.modeButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.gameMode = button.dataset.mode;
      syncModeUi();
    });
  });

  elements.genreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      elements.genreButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.selectedGenre = button.dataset.genre;
    });
  });

  elements.playerNameInput.addEventListener("input", () => {
    state.playerName = getPlayerName();
  });

  elements.startButton.addEventListener("click", startGame);
  elements.playAgainButton.addEventListener("click", startGame);
  elements.backToMenuButton.addEventListener("click", showMenu);
}

function startGame() {
  resetGameTimers();
  unlockAudio();

  state.playerName = getPlayerName();
  state.roomCode = generateRoomCode();
  elements.roomCode.textContent = state.roomCode;
  state.questions = shuffleArray([...gameData[state.selectedGenre].questions]).slice(0, ROUND_LENGTH);
  state.currentIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.answerLocked = false;

  updateScoreboard();
  elements.currentMode.textContent = getModeLabel();
  elements.currentGenre.textContent = gameData[state.selectedGenre].label;
  elements.feedback.textContent = "Choose the missing word before time runs out.";
  elements.feedback.className = "feedback";

  elements.menuView.classList.add("hidden");
  elements.resultView.classList.add("hidden");
  elements.gameView.classList.remove("hidden");

  renderQuestion();
}

function showMenu() {
  resetGameTimers();
  elements.gameView.classList.add("hidden");
  elements.resultView.classList.add("hidden");
  elements.menuView.classList.remove("hidden");
  renderLeaderboard();
}

function renderQuestion() {
  const currentQuestion = state.questions[state.currentIndex];

  if (!currentQuestion) {
    finishRound();
    return;
  }

  state.answerLocked = false;
  elements.questionNumber.textContent = String(state.currentIndex + 1);
  elements.lyricLine.textContent = currentQuestion.lyric;
  elements.songCredit.textContent = `Song: ${currentQuestion.song} | Artist: ${currentQuestion.artist}`;
  elements.feedback.textContent = "Choose the missing word before time runs out.";
  elements.feedback.className = "feedback";
  renderChoices(currentQuestion);
  startTimer(currentQuestion.answer);
}

function renderChoices(currentQuestion) {
  elements.choices.innerHTML = "";

  shuffleArray([...currentQuestion.options]).forEach((option) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => handleGuess(button, option, currentQuestion.answer));
    elements.choices.appendChild(button);
  });
}

function handleGuess(button, selectedAnswer, correctAnswer) {
  if (state.answerLocked) {
    return;
  }

  state.answerLocked = true;
  clearTimer();
  revealCorrectAnswer(correctAnswer);

  if (selectedAnswer === correctAnswer) {
    state.score += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    button.classList.add("correct");
    elements.feedback.textContent = "Correct! Next lyric is loading...";
    elements.feedback.className = "feedback correct";
    playResponseSound("correct");
  } else {
    state.streak = 0;
    button.classList.add("incorrect");
    elements.feedback.textContent = `Incorrect! The correct answer was "${correctAnswer}".`;
    elements.feedback.className = "feedback incorrect";
    playResponseSound("incorrect");
  }

  updateScoreboard();
  queueNextQuestion();
}

function handleTimeExpired(correctAnswer) {
  if (state.answerLocked) {
    return;
  }

  state.answerLocked = true;
  clearTimer();
  state.streak = 0;
  revealCorrectAnswer(correctAnswer);
  elements.feedback.textContent = `Time's up! The correct answer was "${correctAnswer}".`;
  elements.feedback.className = "feedback incorrect";
  updateScoreboard();
  playResponseSound("incorrect");
  queueNextQuestion();
}

function revealCorrectAnswer(correctAnswer) {
  elements.choices.querySelectorAll(".choice-button").forEach((choice) => {
    choice.disabled = true;
    if (choice.textContent === correctAnswer) {
      choice.classList.add("correct");
    }
  });
}

function startTimer(correctAnswer) {
  clearTimer();
  state.timeLeft = QUESTION_TIME;
  updateTimerDisplay();

  state.timerId = window.setInterval(() => {
    state.timeLeft -= 1;
    updateTimerDisplay();

    if (state.timeLeft <= 0) {
      handleTimeExpired(correctAnswer);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const percent = Math.max((state.timeLeft / QUESTION_TIME) * 100, 0);
  elements.timeLeft.textContent = String(Math.max(state.timeLeft, 0));
  elements.timerBar.style.width = `${percent}%`;
  elements.timerBar.classList.remove("warning", "danger");

  if (state.timeLeft <= 8) {
    elements.timerBar.classList.add("warning");
  }

  if (state.timeLeft <= 4) {
    elements.timerBar.classList.add("danger");
  }
}

function queueNextQuestion() {
  state.nextQuestionId = window.setTimeout(() => {
    state.currentIndex += 1;
    renderQuestion();
  }, NEXT_QUESTION_DELAY);
}

function finishRound() {
  resetGameTimers();
  saveLeaderboardEntry();
  renderLeaderboard();

  elements.gameView.classList.add("hidden");
  elements.resultView.classList.remove("hidden");

  const genreLabel = gameData[state.selectedGenre].label;
  const roomSummary = state.gameMode === "host" ? ` Room code: ${state.roomCode}.` : "";
  elements.resultText.textContent =
    `${state.playerName} finished the ${genreLabel} round with ${state.score} out of ${ROUND_LENGTH} correct. ` +
    `Best streak: ${state.bestStreak}.${roomSummary} The score is now saved on the main-menu leaderboard.`;
}

function updateScoreboard() {
  elements.score.textContent = String(state.score);
  elements.streak.textContent = String(state.streak);
}

function saveLeaderboardEntry() {
  const entry = {
    name: state.playerName,
    mode: getModeLabel(),
    genre: gameData[state.selectedGenre].label,
    score: state.score,
    streak: state.bestStreak,
    roomCode: state.gameMode === "host" ? state.roomCode : "",
    createdAt: Date.now()
  };

  state.leaderboard = [...state.leaderboard, entry]
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (right.streak !== left.streak) {
        return right.streak - left.streak;
      }

      return right.createdAt - left.createdAt;
    })
    .slice(0, 8);

  window.localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(state.leaderboard));
}

function renderLeaderboard() {
  elements.leaderboardList.innerHTML = "";

  if (state.leaderboard.length === 0) {
    elements.leaderboardEmpty.classList.remove("hidden");
    return;
  }

  elements.leaderboardEmpty.classList.add("hidden");

  state.leaderboard.forEach((entry, index) => {
    const item = document.createElement("li");
    const roomText = entry.roomCode ? ` | Room ${entry.roomCode}` : "";

    item.innerHTML =
      `<div class="leaderboard-row">` +
      `<div>` +
      `<div class="leaderboard-name">#${index + 1} ${entry.name}</div>` +
      `<div class="leaderboard-meta">${entry.mode} | ${entry.genre} | Streak ${entry.streak}${roomText}</div>` +
      `</div>` +
      `<div class="leaderboard-score">${entry.score}/${ROUND_LENGTH}</div>` +
      `</div>`;

    elements.leaderboardList.appendChild(item);
  });
}

function loadLeaderboard() {
  try {
    const raw = window.localStorage.getItem(LEADERBOARD_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function syncModeUi() {
  elements.hostCard.classList.toggle("hidden", state.gameMode !== "host");
}

function getPlayerName() {
  const value = elements.playerNameInput.value.trim();
  return value || "Player 1";
}

function getModeLabel() {
  return state.gameMode === "host" ? "Host Game Room" : "Single Player";
}

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "PHL-";

  for (let index = 0; index < 4; index += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}

function resetGameTimers() {
  clearTimer();
  clearNextQuestion();
}

function clearTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function clearNextQuestion() {
  if (state.nextQuestionId) {
    window.clearTimeout(state.nextQuestionId);
    state.nextQuestionId = null;
  }
}

function unlockAudio() {
  ensureAudioContext();

  if (!state.audioContext) {
    return;
  }

  if (state.audioContext.state === "suspended") {
    state.audioContext.resume();
  }

  state.audioEnabled = state.audioContext.state === "running";
}

function ensureAudioContext() {
  if (state.audioContext) {
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (AudioContextClass) {
    state.audioContext = new AudioContextClass();
  }
}

function playResponseSound(type) {
  const file = type === "correct" ? DING_FILE : BUZZ_FILE;
  const effect = new Audio(file);

  effect.play().catch(() => {
    playFallbackTone(type);
  });
}

function playFallbackTone(type) {
  unlockAudio();

  if (!state.audioContext || !state.audioEnabled) {
    return;
  }

  if (type === "correct") {
    playTone(880, 0, 0.11, "triangle", 0.22);
    playTone(1320, 0.12, 0.14, "triangle", 0.18);
    return;
  }

  playTone(240, 0, 0.14, "sawtooth", 0.24);
  playTone(150, 0.15, 0.18, "square", 0.18);
}

function playTone(frequency, startOffset, duration, waveType, volume) {
  const oscillator = state.audioContext.createOscillator();
  const gainNode = state.audioContext.createGain();
  const startTime = state.audioContext.currentTime + startOffset;
  const endTime = startTime + duration;

  oscillator.type = waveType;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  oscillator.connect(gainNode);
  gainNode.connect(state.audioContext.destination);

  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);

  oscillator.start(startTime);
  oscillator.stop(endTime + 0.01);
}

function shuffleArray(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }

  return items;
}
