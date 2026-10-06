/**
 * Cyber-Tech Computer Parts Application Logic
 * Integrates Explorer Dictionary, Audio Hunt, Word Matrix, Memory Match,
 * and real-time gamification progression with Web Audio effects.
 */

class CyberDictionaryApp {
  constructor() {
    this.vocab = VOCABULARY_DATA;
    this.currentMode = "explorer";
    this.selectedCategory = "all";
    this.searchQuery = "";
    this.showGreek = true;

    // Gamification State
    this.state = this.loadState();
    
    // Game Modes State
    this.hunt = {
      active: false,
      currentRound: 0,
      totalRounds: 8,
      targetItem: null,
      options: [],
      timer: null,
      timeLeft: 15,
      maxTime: 15,
      score: 0
    };

    this.spelling = {
      itemIndex: 0,
      shuffledPool: [],
      targetItem: null,
      placedLetters: [],
      availableChips: [],
      hintUsed: false
    };

    this.memory = {
      difficulty: "medium", // easy (4), medium (6), hard (8), all (14)
      cards: [],
      flippedCards: [],
      matchedPairs: 0,
      totalPairs: 6,
      moves: 0,
      timerInterval: null,
      seconds: 0,
      locked: false
    };

    this.init();
  }

  /* ------------------- INITIALIZATION ------------------- */
  init() {
    this.initCanvasBackground();
    this.bindEvents();
    this.updateHUD();
    this.renderExplorerCards();
    this.initSpellingPool();
    this.initAudioStateListeners();
  }

  loadState() {
    const defaultState = {
      xp: 0,
      level: 1,
      streak: 0,
      maxStreak: 0,
      discoveredIds: [],
      unlockedBadges: [],
      correctSpells: 0,
      huntsPlayed: 0
    };
    try {
      const saved = localStorage.getItem("cyber_dict_state");
      return saved ? Object.assign(defaultState, JSON.parse(saved)) : defaultState;
    } catch (e) {
      return defaultState;
    }
  }

  saveState() {
    try {
      localStorage.setItem("cyber_dict_state", JSON.stringify(this.state));
    } catch (e) {}
  }

  addXP(amount, reason = "") {
    this.state.xp += amount;
    const nextLevelXP = this.state.level * 250;
    
    if (this.state.xp >= nextLevelXP && this.state.level < 5) {
      this.state.level++;
      this.showToast(`🚀 LEVEL UP! You are now Level ${this.state.level}: ${this.getLevelTitle()}`);
      if (window.cyberAudio) window.cyberAudio.playFanfare();
    } else {
      if (reason) this.showToast(`+${amount} XP: ${reason}`);
    }
    
    this.saveState();
    this.updateHUD();
  }

  getLevelTitle() {
    const titles = ["Novice Cadet", "Cyber Scripter", "Hardware Hacker", "Netrunner Elite", "Cyber Architect"];
    return titles[Math.min(this.state.level - 1, titles.length - 1)];
  }

  unlockBadge(badgeId, title, icon) {
    if (!this.state.unlockedBadges.includes(badgeId)) {
      this.state.unlockedBadges.push(badgeId);
      this.saveState();
      this.showToast(`🏆 BADGE UNLOCKED: ${icon} ${title}!`);
      if (window.cyberAudio) window.cyberAudio.playFanfare();
    }
  }

  updateHUD() {
    const xpEl = document.getElementById("hud-xp");
    const streakEl = document.getElementById("hud-streak");
    const rankEl = document.getElementById("hud-rank");

    if (xpEl) xpEl.textContent = `${this.state.xp} XP`;
    if (streakEl) streakEl.textContent = `${this.state.streak}x`;
    if (rankEl) rankEl.textContent = `Lvl ${this.state.level} ${this.getLevelTitle()}`;
  }

  /* ------------------- AUDIO EVENTS ------------------- */
  initAudioStateListeners() {
    if (!window.cyberAudio) return;
    window.cyberAudio.onVoiceStateChange = ({ isPlaying, id }) => {
      document.querySelectorAll(".btn-card-audio, .btn-big-speaker, .btn-modal-audio").forEach(btn => {
        btn.classList.remove("playing");
      });

      if (isPlaying && id) {
        const activeBtn = document.querySelector(`[data-audio-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add("playing");
        
        const bigSpeaker = document.getElementById("btn-prompt-speaker");
        if (bigSpeaker) bigSpeaker.classList.add("playing");
      }
    };
  }

  /* ------------------- NAVIGATION & MODES ------------------- */
  switchMode(newMode) {
    if (this.currentMode === newMode) return;
    if (window.cyberAudio) window.cyberAudio.playClick();

    this.currentMode = newMode;

    // Update Tab Buttons
    document.querySelectorAll(".mode-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.mode === newMode);
    });

    // Update Mode Panels
    document.querySelectorAll(".mode-panel").forEach(panel => {
      panel.classList.toggle("active", panel.id === `panel-${newMode}`);
    });

    // Initialize Mode-Specific Logic
    if (newMode === "listen-tap") {
      this.startAudioHunt();
    } else if (newMode === "spelling") {
      this.loadSpellingQuestion();
    } else if (newMode === "memory") {
      this.startMemoryGame();
    }
  }

  /* ------------------- MODE 1: EXPLORER ------------------- */
  renderExplorerCards() {
    const grid = document.getElementById("vocab-cards-grid");
    if (!grid) return;

    const filtered = this.vocab.filter(item => {
      const matchCat = (this.selectedCategory === "all") || 
        (this.selectedCategory === "input" && item.type === "input") ||
        (this.selectedCategory === "output" && item.type === "output") ||
        (this.selectedCategory === "core" && item.type === "processing") ||
        (this.selectedCategory === "storage" && item.type === "storage") ||
        (this.selectedCategory === "accessory" && (item.type === "accessory" || item.type === "hybrid"));

      const q = this.searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        item.name.toLowerCase().includes(q) || 
        item.greek.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <p>No computer parts found matching "${this.searchQuery}".</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="vocab-card" data-id="${item.id}" onclick="app.inspectWord('${item.id}')">
        <div class="vocab-card-img-wrapper">
          <img class="vocab-card-img" src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="vocab-card-badges">
            <span class="category-tag">${item.category}</span>
            <button class="btn-card-audio" data-audio-id="${item.id}" title="Pronounce ${item.name}" onclick="event.stopPropagation(); app.playItemAudio('${item.id}')">
              🔊
            </button>
          </div>
        </div>
        <div class="vocab-card-body">
          <div class="vocab-card-title-row">
            <h3 class="vocab-card-name">${item.name}</h3>
            <span class="vocab-card-phonetic">${item.phonetic}</span>
          </div>
          ${this.showGreek ? `<div class="vocab-card-greek">${item.greek}</div>` : ''}
          <p class="vocab-card-desc">${item.description}</p>
          <div class="vocab-card-footer">
            <span class="btn-inspect-hint">Explore Specs ⚡</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${item.tags[0]}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  playItemAudio(id) {
    const item = this.vocab.find(v => v.id === id);
    if (!item || !window.cyberAudio) return;

    window.cyberAudio.playVoice(item.audio, item.id);

    // Track discovery
    if (!this.state.discoveredIds.includes(id)) {
      this.state.discoveredIds.push(id);
      this.addXP(15, `Discovered "${item.name}"`);
      this.unlockBadge("first_listen", "Audio Explorer", "🎧");

      if (this.state.discoveredIds.length === this.vocab.length) {
        this.unlockBadge("all_discovered", "Hardware Master", "💻");
      }
    }
  }

  inspectWord(id) {
    const item = this.vocab.find(v => v.id === id);
    if (!item) return;
    if (window.cyberAudio) window.cyberAudio.playClick();

    const modal = document.getElementById("word-modal");
    const titleEl = document.getElementById("modal-word-title");
    const bodyEl = document.getElementById("modal-word-body");

    titleEl.innerHTML = `💻 ${item.name} <span style="font-size: 0.9rem; color: var(--neon-cyan); font-weight: normal;">${item.phonetic}</span>`;
    
    let isShowingClassic = false;

    bodyEl.innerHTML = `
      <div class="modal-preview-row">
        <div class="modal-preview-img-box">
          <img id="modal-item-img" src="${item.image}" alt="${item.name}" />
        </div>
        <div class="modal-info-box">
          <div class="modal-pronunciation-bar">
            <button class="btn-modal-audio" data-audio-id="modal-${item.id}" onclick="app.playItemAudio('${item.id}')">
              🔊 Pronounce English
            </button>
            <span style="font-size: 0.85rem; color: var(--text-muted);">${item.category}</span>
          </div>
          <div style="font-size: 1.1rem; color: #d8b4fe; font-weight: 600;">
            🇬🇷 ${item.greek}
          </div>
          <p style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.5;">
            ${item.description}
          </p>
          <button class="btn-toggle-classic" id="btn-toggle-classic">
            🔄 Toggle Original Photodentro Graphic
          </button>
        </div>
      </div>
      <div class="modal-fact-card">
        <strong>💡 Cyber Tech Fact</strong>
        ${item.funFact}
      </div>
    `;

    document.getElementById("btn-toggle-classic").addEventListener("click", () => {
      const img = document.getElementById("modal-item-img");
      isShowingClassic = !isShowingClassic;
      img.src = isShowingClassic ? item.legacyImage : item.image;
      document.getElementById("btn-toggle-classic").textContent = isShowingClassic 
        ? "🔄 Switch to 3D Cyber Visual" 
        : "🔄 Toggle Original Photodentro Graphic";
    });

    modal.classList.add("active");
  }

  closeModal() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  }

  /* ------------------- MODE 2: LISTEN & TAP (AUDIO HUNT) ------------------- */
  startAudioHunt() {
    this.hunt.active = true;
    this.hunt.currentRound = 0;
    this.hunt.score = 0;
    this.loadNextHuntRound();
  }

  loadNextHuntRound() {
    if (this.hunt.currentRound >= this.hunt.totalRounds) {
      this.finishAudioHunt();
      return;
    }

    this.hunt.currentRound++;
    document.getElementById("hunt-round-counter").textContent = `${this.hunt.currentRound}/${this.hunt.totalRounds}`;
    document.getElementById("hunt-score-counter").textContent = this.hunt.score;

    // Pick target randomly
    const target = this.vocab[Math.floor(Math.random() * this.vocab.length)];
    this.hunt.targetItem = target;

    // Pick 3 distractors
    const distractors = this.vocab.filter(v => v.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [target, ...distractors].sort(() => 0.5 - Math.random());
    this.hunt.options = options;

    // Render Options
    const grid = document.getElementById("hunt-options-grid");
    grid.innerHTML = options.map(opt => `
      <div class="listen-tap-card" data-id="${opt.id}" onclick="app.checkHuntAnswer('${opt.id}', this)">
        <img class="listen-tap-thumb" src="${opt.image}" alt="${opt.name}" />
        <div class="listen-tap-info">
          <span class="listen-tap-name">${opt.name}</span>
          ${this.showGreek ? `<span class="listen-tap-greek">${opt.greek}</span>` : ''}
        </div>
      </div>
    `).join("");

    // Play Audio Prompt
    setTimeout(() => {
      if (window.cyberAudio) window.cyberAudio.playVoice(target.audio, "hunt-prompt");
    }, 300);

    this.startHuntTimer();
  }

  replayHuntAudio() {
    if (this.hunt.targetItem && window.cyberAudio) {
      window.cyberAudio.playVoice(this.hunt.targetItem.audio, "hunt-prompt");
    }
  }

  startHuntTimer() {
    clearInterval(this.hunt.timer);
    this.hunt.timeLeft = this.hunt.maxTime;
    const bar = document.getElementById("hunt-timer-fill");
    if (bar) bar.style.width = "100%";

    this.hunt.timer = setInterval(() => {
      this.hunt.timeLeft -= 0.1;
      const pct = Math.max(0, (this.hunt.timeLeft / this.hunt.maxTime) * 100);
      if (bar) bar.style.width = `${pct}%`;

      if (this.hunt.timeLeft <= 3.0 && this.hunt.timeLeft > 0) {
        if (Math.floor(this.hunt.timeLeft * 10) % 10 === 0 && window.cyberAudio) {
          window.cyberAudio.playTick();
        }
      }

      if (this.hunt.timeLeft <= 0) {
        clearInterval(this.hunt.timer);
        this.handleHuntTimeout();
      }
    }, 100);
  }

  checkHuntAnswer(selectedId, cardEl) {
    if (!this.hunt.active || this.hunt.timeLeft <= 0) return;
    clearInterval(this.hunt.timer);

    const isCorrect = selectedId === this.hunt.targetItem.id;
    const cards = document.querySelectorAll(".listen-tap-card");
    cards.forEach(c => c.style.pointerEvents = "none");

    if (isCorrect) {
      cardEl.classList.add("correct");
      if (window.cyberAudio) window.cyberAudio.playSuccess();

      this.state.streak++;
      if (this.state.streak > this.state.maxStreak) this.state.maxStreak = this.state.streak;
      if (window.cyberAudio && this.state.streak > 1) {
        setTimeout(() => window.cyberAudio.playStreak(this.state.streak), 250);
      }

      const speedBonus = Math.floor(this.hunt.timeLeft * 8);
      const points = 100 + speedBonus;
      this.hunt.score += points;
      this.addXP(25, `Correct Audio Tap (+${points} pts)`);

      if (this.state.streak >= 5) {
        this.unlockBadge("streak_5", "Cyber Streak", "🔥");
      }
    } else {
      cardEl.classList.add("wrong");
      if (window.cyberAudio) window.cyberAudio.playError();
      this.state.streak = 0;

      // Reveal correct card
      cards.forEach(c => {
        if (c.dataset.id === this.hunt.targetItem.id) c.classList.add("correct");
      });
    }

    this.updateHUD();

    setTimeout(() => {
      this.loadNextHuntRound();
    }, 1400);
  }

  handleHuntTimeout() {
    this.state.streak = 0;
    this.updateHUD();
    if (window.cyberAudio) window.cyberAudio.playError();

    const cards = document.querySelectorAll(".listen-tap-card");
    cards.forEach(c => {
      if (c.dataset.id === this.hunt.targetItem.id) c.classList.add("correct");
      c.style.pointerEvents = "none";
    });

    this.showToast("⏰ Time's up!");
    setTimeout(() => this.loadNextHuntRound(), 1400);
  }

  finishAudioHunt() {
    this.hunt.active = false;
    clearInterval(this.hunt.timer);
    this.state.huntsPlayed++;
    this.saveState();

    if (window.cyberAudio) window.cyberAudio.playFanfare();

    const grid = document.getElementById("hunt-options-grid");
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; background: rgba(0,243,255,0.06); border-radius: var(--radius-lg); border: 1px solid var(--border-neon);">
        <h3 style="font-family: var(--font-display); font-size: 1.8rem; color: var(--neon-cyan); margin-bottom: 0.5rem;">
          🎉 Challenge Complete!
        </h3>
        <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1.5rem;">
          Final Score: <strong>${this.hunt.score} Points</strong> | Max Streak: <strong>${this.state.maxStreak}x</strong>
        </p>
        <button class="btn-cyber-outline" style="margin: 0 auto; padding: 0.75rem 2rem; font-size: 1rem;" onclick="app.startAudioHunt()">
          ⚡ Play Again
        </button>
      </div>
    `;
  }

  /* ------------------- MODE 3: WORD MATRIX (SPELLING BEE) ------------------- */
  initSpellingPool() {
    this.spelling.shuffledPool = [...this.vocab].sort(() => 0.5 - Math.random());
    this.spelling.itemIndex = 0;
  }

  loadSpellingQuestion() {
    if (this.spelling.itemIndex >= this.spelling.shuffledPool.length) {
      this.initSpellingPool();
    }

    const item = this.spelling.shuffledPool[this.spelling.itemIndex];
    this.spelling.targetItem = item;
    this.spelling.placedLetters = [];
    this.spelling.hintUsed = false;

    // Display image & hint
    const imgEl = document.getElementById("spelling-img");
    if (imgEl) imgEl.src = item.image;

    const greekEl = document.getElementById("spelling-greek-hint");
    if (greekEl) greekEl.textContent = this.showGreek ? item.greek : "";

    // Prepare letter slots
    const targetWord = item.name.toUpperCase();
    const slotsContainer = document.getElementById("spelling-slots");
    slotsContainer.innerHTML = targetWord.split("").map((char, idx) => {
      if (char === " ") {
        return `<div class="letter-slot space-slot" data-index="${idx}"></div>`;
      }
      return `<div class="letter-slot" data-index="${idx}"></div>`;
    }).join("");

    // Prepare scrambled chips (letters in word + 2 random letters)
    const letters = targetWord.replace(/\s+/g, "").split("");
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 2; i++) {
      letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    const shuffledChips = letters.sort(() => 0.5 - Math.random()).map((char, idx) => ({
      id: `chip-${idx}`,
      char: char,
      used: false
    }));
    this.spelling.availableChips = shuffledChips;

    this.renderLetterChips();

    // Auto play audio prompt
    setTimeout(() => {
      if (window.cyberAudio) window.cyberAudio.playVoice(item.audio, "spelling-prompt");
    }, 400);
  }

  renderLetterChips() {
    const chipsContainer = document.getElementById("spelling-chips");
    chipsContainer.innerHTML = this.spelling.availableChips.map(chip => `
      <div class="cyber-letter-chip ${chip.used ? 'used' : ''}" data-chip-id="${chip.id}" onclick="app.clickLetterChip('${chip.id}')">
        ${chip.char}
      </div>
    `).join("");
  }

  clickLetterChip(chipId) {
    const chip = this.spelling.availableChips.find(c => c.id === chipId);
    if (!chip || chip.used) return;
    if (window.cyberAudio) window.cyberAudio.playClick();

    const targetWord = this.spelling.targetItem.name.toUpperCase();
    
    // Find next empty non-space slot
    let nextSlotIdx = -1;
    for (let i = 0; i < targetWord.length; i++) {
      if (targetWord[i] === " ") continue;
      const alreadyPlaced = this.spelling.placedLetters.find(p => p.slotIndex === i);
      if (!alreadyPlaced) {
        nextSlotIdx = i;
        break;
      }
    }

    if (nextSlotIdx === -1) return;

    chip.used = true;
    this.spelling.placedLetters.push({
      slotIndex: nextSlotIdx,
      char: chip.char,
      chipId: chip.id
    });

    this.updateSpellingSlotsUI();
    this.renderLetterChips();
    this.checkSpellingCompletion();
  }

  updateSpellingSlotsUI() {
    const targetWord = this.spelling.targetItem.name.toUpperCase();
    document.querySelectorAll(".letter-slot").forEach(slot => {
      const idx = parseInt(slot.dataset.index);
      if (targetWord[idx] === " ") return;

      const placed = this.spelling.placedLetters.find(p => p.slotIndex === idx);
      if (placed) {
        slot.textContent = placed.char;
        slot.classList.add("filled");
        slot.onclick = () => this.removePlacedLetter(idx);
      } else {
        slot.textContent = "";
        slot.classList.remove("filled");
        slot.onclick = null;
      }
    });
  }

  removePlacedLetter(slotIndex) {
    const idx = this.spelling.placedLetters.findIndex(p => p.slotIndex === slotIndex);
    if (idx === -1) return;

    const removed = this.spelling.placedLetters.splice(idx, 1)[0];
    const chip = this.spelling.availableChips.find(c => c.id === removed.chipId);
    if (chip) chip.used = false;

    if (window.cyberAudio) window.cyberAudio.playClick();
    this.updateSpellingSlotsUI();
    this.renderLetterChips();
  }

  clearSpelling() {
    this.spelling.placedLetters.forEach(p => {
      const chip = this.spelling.availableChips.find(c => c.id === p.chipId);
      if (chip) chip.used = false;
    });
    this.spelling.placedLetters = [];
    if (window.cyberAudio) window.cyberAudio.playClick();
    this.updateSpellingSlotsUI();
    this.renderLetterChips();
  }

  giveSpellingHint() {
    this.spelling.hintUsed = true;
    const targetWord = this.spelling.targetItem.name.toUpperCase();

    // Find first incorrectly placed or empty slot
    let targetSlotIdx = -1;
    for (let i = 0; i < targetWord.length; i++) {
      if (targetWord[i] === " ") continue;
      const placed = this.spelling.placedLetters.find(p => p.slotIndex === i);
      if (!placed || placed.char !== targetWord[i]) {
        targetSlotIdx = i;
        break;
      }
    }

    if (targetSlotIdx === -1) return;

    // Clear any wrong letter at this slot
    this.removePlacedLetter(targetSlotIdx);

    const neededChar = targetWord[targetSlotIdx];
    const availableChip = this.spelling.availableChips.find(c => c.char === neededChar && !c.used);

    if (availableChip) {
      this.clickLetterChip(availableChip.id);
      this.showToast(`Hint added: '${neededChar}'`);
    }
  }

  checkSpellingCompletion() {
    const targetWord = this.spelling.targetItem.name.toUpperCase();
    const cleanTarget = targetWord.replace(/\s+/g, "");
    
    if (this.spelling.placedLetters.length === cleanTarget.length) {
      // Reconstruct word in slot order
      const sorted = [...this.spelling.placedLetters].sort((a, b) => a.slotIndex - b.slotIndex);
      let spelled = "";
      let placedIdx = 0;
      for (let i = 0; i < targetWord.length; i++) {
        if (targetWord[i] === " ") {
          spelled += " ";
        } else {
          spelled += sorted[placedIdx].char;
          placedIdx++;
        }
      }

      if (spelled === targetWord) {
        if (window.cyberAudio) window.cyberAudio.playSuccess();
        this.addXP(35, `Correctly spelled "${this.spelling.targetItem.name}"`);
        this.state.correctSpells++;
        
        if (this.state.correctSpells >= 5 && !this.spelling.hintUsed) {
          this.unlockBadge("speller_pro", "Code Typist", "🔤");
        }

        // Highlight all slots green
        document.querySelectorAll(".letter-slot.filled").forEach(slot => {
          slot.style.borderColor = "var(--neon-green)";
          slot.style.boxShadow = "var(--glow-box-green)";
        });

        setTimeout(() => {
          this.spelling.itemIndex++;
          this.loadSpellingQuestion();
        }, 1400);
      } else {
        if (window.cyberAudio) window.cyberAudio.playError();
        this.showToast("Try again! Check your letter order.");
      }
    }
  }

  /* ------------------- MODE 4: NEURAL MEMORY MATCH ------------------- */
  startMemoryGame(difficulty = this.memory.difficulty) {
    this.memory.difficulty = difficulty;
    clearInterval(this.memory.timerInterval);
    this.memory.seconds = 0;
    this.memory.moves = 0;
    this.memory.matchedPairs = 0;
    this.memory.flippedCards = [];
    this.memory.locked = false;

    const counts = { easy: 4, medium: 6, hard: 8, all: 14 };
    const pairCount = counts[difficulty] || 6;
    this.memory.totalPairs = pairCount;

    document.getElementById("memory-moves").textContent = "0";
    document.getElementById("memory-pairs").textContent = `0/${pairCount}`;
    document.getElementById("memory-time").textContent = "00:00";

    // Select random vocabulary items
    const selected = [...this.vocab].sort(() => 0.5 - Math.random()).slice(0, pairCount);

    // Create cards: 1 visual card + 1 audio/word card per item
    const deck = [];
    selected.forEach(item => {
      deck.push({
        uid: `${item.id}-img`,
        itemId: item.id,
        type: "image",
        item: item
      });
      deck.push({
        uid: `${item.id}-word`,
        itemId: item.id,
        type: "word",
        item: item
      });
    });

    this.memory.cards = deck.sort(() => 0.5 - Math.random());
    this.renderMemoryGrid();

    // Start timer
    this.memory.timerInterval = setInterval(() => {
      this.memory.seconds++;
      const mins = String(Math.floor(this.memory.seconds / 60)).padStart(2, "0");
      const secs = String(this.memory.seconds % 60).padStart(2, "0");
      document.getElementById("memory-time").textContent = `${mins}:${secs}`;
    }, 1000);
  }

  renderMemoryGrid() {
    const grid = document.getElementById("memory-grid");
    grid.innerHTML = this.memory.cards.map((card, idx) => `
      <div class="memory-card" data-card-idx="${idx}" onclick="app.flipMemoryCard(${idx})">
        <div class="card-face card-back">
          <div class="card-back-icon">⚡</div>
        </div>
        <div class="card-face card-front">
          ${card.type === "image" ? `
            <img src="${card.item.image}" alt="${card.item.name}" />
          ` : `
            <div class="card-front-word">
              <span class="sound-icon">🔊</span>
              <span class="word-text">${card.item.name}</span>
            </div>
          `}
        </div>
      </div>
    `).join("");
  }

  flipMemoryCard(idx) {
    if (this.memory.locked) return;
    const cardData = this.memory.cards[idx];
    const cardEl = document.querySelector(`.memory-card[data-card-idx="${idx}"]`);

    if (!cardEl || cardEl.classList.contains("flipped") || cardEl.classList.contains("matched")) return;

    if (window.cyberAudio) {
      window.cyberAudio.playCardFlip();
      window.cyberAudio.playVoice(cardData.item.audio, `mem-${cardData.uid}`);
    }

    cardEl.classList.add("flipped");
    this.memory.flippedCards.push({ idx, data: cardData, el: cardEl });

    if (this.memory.flippedCards.length === 2) {
      this.memory.moves++;
      document.getElementById("memory-moves").textContent = this.memory.moves;
      this.checkMemoryMatch();
    }
  }

  checkMemoryMatch() {
    this.memory.locked = true;
    const [c1, c2] = this.memory.flippedCards;

    const isMatch = c1.data.itemId === c2.data.itemId;

    if (isMatch) {
      setTimeout(() => {
        c1.el.classList.add("matched");
        c2.el.classList.add("matched");
        if (window.cyberAudio) window.cyberAudio.playSuccess();

        this.memory.matchedPairs++;
        document.getElementById("memory-pairs").textContent = `${this.memory.matchedPairs}/${this.memory.totalPairs}`;
        this.addXP(30, `Matched "${c1.data.item.name}"`);

        this.memory.flippedCards = [];
        this.memory.locked = false;

        if (this.memory.matchedPairs === this.memory.totalPairs) {
          this.finishMemoryGame();
        }
      }, 400);
    } else {
      setTimeout(() => {
        c1.el.classList.remove("flipped");
        c2.el.classList.remove("flipped");
        this.memory.flippedCards = [];
        this.memory.locked = false;
      }, 1000);
    }
  }

  finishMemoryGame() {
    clearInterval(this.memory.timerInterval);
    if (window.cyberAudio) window.cyberAudio.playFanfare();

    this.addXP(100, `Memory Matrix Cleared in ${this.memory.moves} moves`);
    if (this.memory.moves <= 20) {
      this.unlockBadge("memory_ace", "Neural Champion", "🧠");
    }

    this.showToast(`🎉 Level Cleared in ${document.getElementById("memory-time").textContent}!`);
  }

  /* ------------------- BADGES MODAL ------------------- */
  openBadgesModal() {
    const modal = document.getElementById("badges-modal");
    const grid = document.getElementById("badges-grid");

    const ALL_BADGES = [
      { id: "first_listen", title: "Audio Explorer", icon: "🎧", desc: "Listen to your first computer component pronunciation." },
      { id: "all_discovered", title: "Hardware Master", icon: "💻", desc: "Explore and discover all 14 computer components." },
      { id: "streak_5", title: "Cyber Streak", icon: "🔥", desc: "Achieve a 5x streak in the Audio Hunt challenge." },
      { id: "speller_pro", title: "Code Typist", icon: "🔤", desc: "Successfully spell 5 components in the Word Matrix." },
      { id: "memory_ace", title: "Neural Champion", icon: "🧠", desc: "Complete the Memory Match game under 20 moves." },
      { id: "tech_scholar", title: "Bilingual Brain", icon: "🇬🇷", desc: "Practice with both English and Greek terminology." }
    ];

    grid.innerHTML = ALL_BADGES.map(b => {
      const unlocked = this.state.unlockedBadges.includes(b.id);
      return `
        <div class="badge-item ${unlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-title">${b.title}</div>
          <div class="badge-desc">${b.desc}</div>
          <div style="font-size: 0.75rem; color: ${unlocked ? 'var(--neon-green)' : 'var(--text-muted)'}; font-weight: 600;">
            ${unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
          </div>
        </div>
      `;
    }).join("");

    modal.classList.add("active");
  }

  /* ------------------- TOAST NOTIFICATIONS ------------------- */
  showToast(msg) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>⚡</span> <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 20);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  /* ------------------- PARTICLES CANVAS BACKGROUND ------------------- */
  initCanvasBackground() {
    const canvas = document.getElementById("cyber-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(width > 768 ? 45 : 22, 60);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "rgba(0, 243, 255, " : "rgba(157, 0, 255, "
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `${p.color}0.6)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby points
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 243, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* ------------------- EVENT BINDINGS ------------------- */
  bindEvents() {
    // Mode tabs
    document.querySelectorAll(".mode-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => this.switchMode(btn.dataset.mode));
    });

    // Category chips
    document.querySelectorAll(".chip-btn").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip-btn").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.selectedCategory = chip.dataset.category;
        if (window.cyberAudio) window.cyberAudio.playClick();
        this.renderExplorerCards();
      });
    });

    // Search input
    const searchInput = document.getElementById("search-vocab");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderExplorerCards();
      });
    }

    // Toggle Greek Language helper
    const toggleGreekBtn = document.getElementById("btn-toggle-greek");
    if (toggleGreekBtn) {
      toggleGreekBtn.addEventListener("click", () => {
        this.showGreek = !this.showGreek;
        toggleGreekBtn.classList.toggle("active", this.showGreek);
        if (window.cyberAudio) window.cyberAudio.playClick();
        this.renderExplorerCards();
        this.unlockBadge("tech_scholar", "Bilingual Brain", "🇬🇷");
        this.showToast(this.showGreek ? "Greek translations enabled" : "Greek translations hidden");
      });
    }

    // SFX toggle
    const toggleSfxBtn = document.getElementById("btn-toggle-sfx");
    if (toggleSfxBtn && window.cyberAudio) {
      toggleSfxBtn.addEventListener("click", () => {
        const enabled = !window.cyberAudio.sfxEnabled;
        window.cyberAudio.setSfxEnabled(enabled);
        toggleSfxBtn.classList.toggle("active", enabled);
        toggleSfxBtn.textContent = enabled ? "🔔" : "🔕";
        this.showToast(enabled ? "Sound effects on" : "Sound effects muted");
      });
    }

    // Welcome Intro audio play
    const welcomeBtn = document.getElementById("btn-welcome-audio");
    if (welcomeBtn && window.cyberAudio) {
      welcomeBtn.addEventListener("click", () => {
        window.cyberAudio.playVoice(SYSTEM_AUDIO.welcome, "welcome-intro");
      });
    }

    // Badges modal button
    const badgesBtn = document.getElementById("btn-view-badges");
    if (badgesBtn) {
      badgesBtn.addEventListener("click", () => this.openBadgesModal());
    }

    // Physical Keyboard listener for Word Matrix
    window.addEventListener("keydown", (e) => {
      if (this.currentMode === "spelling") {
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
          const available = this.spelling.availableChips.find(c => c.char === key && !c.used);
          if (available) this.clickLetterChip(available.id);
        } else if (e.key === "Backspace") {
          if (this.spelling.placedLetters.length > 0) {
            const last = this.spelling.placedLetters[this.spelling.placedLetters.length - 1];
            this.removePlacedLetter(last.slotIndex);
          }
        }
      }
    });
  }
}

// Global initialization
window.addEventListener("DOMContentLoaded", () => {
  window.app = new CyberDictionaryApp();
});
