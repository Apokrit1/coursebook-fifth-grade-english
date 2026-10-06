/**
 * Cyber Audio Engine
 * Handles authentic MP3 human voice recordings and synthesizes 
 * rich sci-fi interactive game sound effects via HTML5 Web Audio API.
 */

class CyberAudioEngine {
  constructor() {
    this.voiceAudio = new Audio();
    this.voiceVolume = 1.0;
    this.sfxEnabled = true;
    this.voiceEnabled = true;
    this.audioCtx = null;
    this.currentlyPlayingId = null;
    this.onVoiceStateChange = null;

    this.initAudioContext();
    this.setupVoiceAudioEvents();
  }

  initAudioContext() {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    } catch (e) {
      console.warn("Web Audio API not supported or blocked:", e);
    }
  }

  ensureContextRunning() {
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  setupVoiceAudioEvents() {
    this.voiceAudio.addEventListener("ended", () => {
      this.currentlyPlayingId = null;
      if (this.onVoiceStateChange) {
        this.onVoiceStateChange({ isPlaying: false, id: null });
      }
    });

    this.voiceAudio.addEventListener("pause", () => {
      if (this.currentlyPlayingId) {
        this.currentlyPlayingId = null;
        if (this.onVoiceStateChange) {
          this.onVoiceStateChange({ isPlaying: false, id: null });
        }
      }
    });

    this.voiceAudio.addEventListener("error", (e) => {
      console.warn("Audio playback error:", e);
      this.currentlyPlayingId = null;
      if (this.onVoiceStateChange) {
        this.onVoiceStateChange({ isPlaying: false, id: null, error: true });
      }
    });
  }

  /**
   * Play authentic human voice MP3
   * @param {string} audioSrc - path to mp3 file
   * @param {string} [id] - optional tracking id
   * @returns {Promise<boolean>}
   */
  async playVoice(audioSrc, id = null) {
    if (!this.voiceEnabled) return false;
    this.ensureContextRunning();

    try {
      if (this.currentlyPlayingId === id && !this.voiceAudio.paused) {
        // Toggle off if already playing
        this.voiceAudio.pause();
        this.voiceAudio.currentTime = 0;
        this.currentlyPlayingId = null;
        if (this.onVoiceStateChange) {
          this.onVoiceStateChange({ isPlaying: false, id: null });
        }
        return false;
      }

      this.voiceAudio.pause();
      this.voiceAudio.currentTime = 0;
      this.voiceAudio.src = audioSrc;
      this.voiceAudio.volume = this.voiceVolume;

      this.currentlyPlayingId = id;
      if (this.onVoiceStateChange) {
        this.onVoiceStateChange({ isPlaying: true, id: id });
      }

      await this.voiceAudio.play();
      return true;
    } catch (err) {
      console.warn("Playback prevented or interrupted:", err);
      this.currentlyPlayingId = null;
      if (this.onVoiceStateChange) {
        this.onVoiceStateChange({ isPlaying: false, id: null });
      }
      return false;
    }
  }

  stopVoice() {
    if (!this.voiceAudio.paused) {
      this.voiceAudio.pause();
      this.voiceAudio.currentTime = 0;
    }
    this.currentlyPlayingId = null;
    if (this.onVoiceStateChange) {
      this.onVoiceStateChange({ isPlaying: false, id: null });
    }
  }

  /* ---------------- SFX SYNTHESIZERS (Web Audio API) ---------------- */

  playClick() {
    if (!this.sfxEnabled) return;
    this.ensureContextRunning();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.sfxEnabled) return;
    this.ensureContextRunning();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const startTime = now + idx * 0.07;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.28);
      });
    } catch (e) {}
  }

  playError() {
    if (!this.sfxEnabled) return;
    this.ensureContextRunning();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  playStreak(streakCount = 1) {
    if (!this.sfxEnabled) return;
    this.ensureContextRunning();
    if (!this.audioCtx) return;

    try {
      const baseFreq = 440 * Math.pow(1.08, Math.min(streakCount, 12));
      const now = this.audioCtx.currentTime;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {}
  }

  playCardFlip() {
    if (!this.sfxEnabled) return;
    this.ensureContextRunning();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playFanfare() {
    if (!this.sfxEnabled) return;
    this.ensureContextRunning();
    if (!this.audioCtx) return;

    try {
      const chords = [
        [523.25, 659.25, 783.99],       // C Major
        [587.33, 739.99, 880.00],       // D Major
        [659.25, 830.61, 987.77],       // E Major
        [783.99, 987.77, 1174.66, 1567.98] // G Major Octave
      ];
      const now = this.audioCtx.currentTime;

      chords.forEach((chord, chordIdx) => {
        const timeOffset = now + chordIdx * 0.16;
        const duration = chordIdx === chords.length - 1 ? 0.65 : 0.15;

        chord.forEach((freq) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, timeOffset);

          gain.gain.setValueAtTime(0.15 / chord.length, timeOffset);
          gain.gain.exponentialRampToValueAtTime(0.001, timeOffset + duration);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(timeOffset);
          osc.stop(timeOffset + duration);
        });
      });
    } catch (e) {}
  }

  playTick() {
    if (!this.sfxEnabled) return;
    this.ensureContextRunning();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(900, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {}
  }

  setSfxEnabled(enabled) {
    this.sfxEnabled = enabled;
  }

  setVoiceVolume(vol) {
    this.voiceVolume = Math.max(0, Math.min(1, vol));
    this.voiceAudio.volume = this.voiceVolume;
  }
}

if (typeof window !== "undefined") {
  window.cyberAudio = new CyberAudioEngine();
}
