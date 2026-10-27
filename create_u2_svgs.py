import os

os.makedirs('unit2/assets/images_v2', exist_ok=True)
os.makedirs('unit2/data', exist_ok=True)
os.makedirs('unit2/assets/audio/words', exist_ok=True)
os.makedirs('unit2/assets/audio/definitions', exist_ok=True)
os.makedirs('unit2/assets/audio/examples', exist_ok=True)
os.makedirs('unit2/assets/audio_neural/words', exist_ok=True)
os.makedirs('unit2/assets/audio_neural/definitions', exist_ok=True)
os.makedirs('unit2/assets/audio_neural/examples', exist_ok=True)
os.makedirs('unit2/assets/audio_v2/stories', exist_ok=True)
os.makedirs('unit2/assets/audio_v2/grammar', exist_ok=True)

# 1. school_newspaper.svg
svg1 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="paperBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffaf0"/>
      <stop offset="100%" stop-color="#feebc8"/>
    </linearGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2c7a7b"/>
      <stop offset="100%" stop-color="#319795"/>
    </linearGradient>
    <linearGradient id="canteenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#dd6b20"/>
      <stop offset="100%" stop-color="#c05621"/>
    </linearGradient>
    <linearGradient id="partyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#553c9a"/>
      <stop offset="100%" stop-color="#44337a"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Desk Background -->
  <rect width="800" height="500" fill="#edf2f7"/>
  <rect x="20" y="20" width="760" height="460" rx="12" fill="url(#paperBg)" filter="url(#cardShadow)"/>

  <!-- Newspaper Masthead -->
  <rect x="40" y="35" width="720" height="60" rx="6" fill="url(#headerGrad)"/>
  <text x="400" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="2">WEST WIMBLEDON'S SCHOOL NEWSPAPER</text>
  <text x="400" y="85" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#e6fffa" text-anchor="middle">NEWS FROM OUR SMALL WORLD • PRIMARY 5 ISSUE • AUTUMN TERM</text>

  <!-- Panel A: Nadine's Email from France (Left) -->
  <rect x="50" y="115" width="350" height="230" rx="8" fill="#ffffff" stroke="#cbd5e0" stroke-width="2" filter="url(#cardShadow)"/>
  <rect x="50" y="115" width="350" height="32" rx="8" fill="#e2e8f0"/>
  <circle cx="70" cy="131" r="5" fill="#e53e3e"/>
  <circle cx="85" cy="131" r="5" fill="#ecc94b"/>
  <circle cx="100" cy="131" r="5" fill="#48bb78"/>
  <text x="120" y="136" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4a5568">✉️ Email: Trip to Eurodisney (Nadine, Marseilles)</text>

  <!-- Email Body -->
  <text x="65" y="165" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748">Dear Mark,</text>
  <text x="65" y="188" font-family="sans-serif" font-size="11" fill="#4a5568">I'm really excited about going to Eurodisney!</text>
  <text x="65" y="206" font-family="sans-serif" font-size="11" fill="#4a5568">I'm going with my class by TGV straight from Marseilles.</text>
  <text x="65" y="224" font-family="sans-serif" font-size="11" fill="#4a5568">We are staying at one of the theme hotels.</text>
  <text x="65" y="242" font-family="sans-serif" font-size="11" fill="#e53e3e">I'm sad my best friend can't come; she's ill.</text>
  <text x="65" y="260" font-family="sans-serif" font-size="11" fill="#4a5568">We don't want to be bored on the train, so I'll</text>
  <text x="65" y="278" font-family="sans-serif" font-size="11" fill="#4a5568">bring my book. I will send you a postcard!</text>
  <text x="65" y="302" font-family="sans-serif" font-size="11" font-weight="bold" fill="#2c7a7b">Bye, Nadine 🇫🇷</text>
  <rect x="290" y="270" width="90" height="60" rx="4" fill="#ebf8ff" stroke="#bee3f8"/>
  <text x="335" y="305" font-size="28" text-anchor="middle">🚄</text>

  <!-- Panel B: School Canteen Menu (Right Top) -->
  <rect x="420" y="115" width="340" height="180" rx="8" fill="#ffffff" stroke="#cbd5e0" stroke-width="2" filter="url(#cardShadow)"/>
  <rect x="420" y="115" width="340" height="32" rx="8" fill="url(#canteenGrad)"/>
  <text x="590" y="136" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">🍽️ THE SCHOOL CANTEEN MENU</text>

  <!-- Canteen Items -->
  <text x="435" y="168" font-family="sans-serif" font-size="11" font-weight="600" fill="#2d3748">🧁 Muffin .............................................. 70p</text>
  <text x="435" y="188" font-family="sans-serif" font-size="11" font-weight="600" fill="#2d3748">🥧 Apple pie ........................................ 70p</text>
  <text x="435" y="208" font-family="sans-serif" font-size="11" font-weight="600" fill="#2d3748">🥐 Croissant ........................................ 50p</text>
  <text x="435" y="228" font-family="sans-serif" font-size="11" font-weight="600" fill="#2d3748">🍩 Doughnut ........................................ 50p</text>
  <text x="435" y="248" font-family="sans-serif" font-size="11" font-weight="600" fill="#2d3748">🍊 Orange juice ................................... 60p</text>
  <text x="435" y="268" font-family="sans-serif" font-size="11" font-weight="600" fill="#2d3748">💧 Bottled water ................................. 30p</text>

  <!-- Panel C: Halloween Party Invitation (Bottom Full Width) -->
  <rect x="50" y="360" width="710" height="105" rx="8" fill="url(#partyGrad)" filter="url(#cardShadow)"/>
  <text x="405" y="388" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="bold" fill="#fbd38d" text-anchor="middle">🎃 SCHOOL HALLOWEEN PARTY INVITATION 🎃</text>
  <text x="405" y="410" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Mrs Clark, the school headmistress, invites all parents and children to this year's party!</text>
  <text x="405" y="430" font-family="sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">Free light snacks &amp; soft drinks by PTA • Date: Tuesday, October 31st at 6:00 pm</text>
  <text x="405" y="448" font-family="sans-serif" font-size="11" font-weight="bold" fill="#feebc8" text-anchor="middle">📍 Place: The School Playground &amp; Assembly Hall</text>
  <circle cx="85" cy="412" r="22" fill="#dd6b20" opacity="0.8"/>
  <text x="85" y="420" font-size="22" text-anchor="middle">🎃</text>
  <circle cx="725" cy="412" r="22" fill="#dd6b20" opacity="0.8"/>
  <text x="725" y="420" font-size="22" text-anchor="middle">👻</text>
</svg>'''

# 2. school_life.svg
svg2 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#bee3f8"/>
      <stop offset="100%" stop-color="#ebf8ff"/>
    </linearGradient>
    <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#cbd5e0"/>
    </linearGradient>
    <linearGradient id="busGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ecc94b"/>
      <stop offset="100%" stop-color="#d69e2e"/>
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="350" fill="url(#skyGrad)"/>
  <!-- Playground Grass & Tarmac -->
  <rect y="350" width="800" height="150" fill="#48bb78"/>
  <rect y="400" width="800" height="100" fill="#718096"/>
  <line x1="0" y1="450" x2="800" y2="450" stroke="#ffffff" stroke-width="4" stroke-dasharray="20,15"/>

  <!-- School Building (Background) -->
  <rect x="80" y="60" width="640" height="290" rx="8" fill="url(#buildingGrad)" stroke="#a0aec0" stroke-width="3"/>
  <!-- Roof Triangle / Clock Tower -->
  <polygon points="400,10 320,60 480,60" fill="#9b2c2c"/>
  <circle cx="400" cy="40" r="14" fill="#ffffff" stroke="#742a2a" stroke-width="2"/>
  <line x1="400" y1="40" x2="400" y2="32" stroke="#2d3748" stroke-width="2"/>
  <line x1="400" y1="40" x2="408" y2="40" stroke="#2d3748" stroke-width="2"/>
  <text x="400" y="85" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="bold" fill="#2d3748" text-anchor="middle">WEST WIMBLEDON PRIMARY SCHOOL</text>

  <!-- School Windows (Classrooms & Library) -->
  <!-- Row 1 Windows -->
  <rect x="120" y="110" width="70" height="50" rx="4" fill="#90cdf4" stroke="#4299e1" stroke-width="2"/>
  <rect x="220" y="110" width="70" height="50" rx="4" fill="#90cdf4" stroke="#4299e1" stroke-width="2"/>
  <rect x="510" y="110" width="70" height="50" rx="4" fill="#90cdf4" stroke="#4299e1" stroke-width="2"/>
  <rect x="610" y="110" width="70" height="50" rx="4" fill="#90cdf4" stroke="#4299e1" stroke-width="2"/>
  <!-- Row 2 Windows -->
  <rect x="120" y="180" width="70" height="50" rx="4" fill="#90cdf4" stroke="#4299e1" stroke-width="2"/>
  <rect x="220" y="180" width="70" height="50" rx="4" fill="#fefcbf" stroke="#d69e2e" stroke-width="2"/>
  <text x="255" y="210" font-size="20" text-anchor="middle">📚</text>
  <text x="255" y="225" font-size="8" font-family="sans-serif" font-weight="bold" fill="#744210" text-anchor="middle">LIBRARY</text>

  <rect x="510" y="180" width="70" height="50" rx="4" fill="#e6fffa" stroke="#319795" stroke-width="2"/>
  <text x="545" y="210" font-size="20" text-anchor="middle">💻</text>
  <text x="545" y="225" font-size="8" font-family="sans-serif" font-weight="bold" fill="#234e52" text-anchor="middle">COMP LAB</text>

  <rect x="610" y="180" width="70" height="50" rx="4" fill="#feebc8" stroke="#dd6b20" stroke-width="2"/>
  <text x="645" y="210" font-size="20" text-anchor="middle">🍽️</text>
  <text x="645" y="225" font-size="8" font-family="sans-serif" font-weight="bold" fill="#7b341e" text-anchor="middle">CANTEEN</text>

  <!-- School Main Entrance -->
  <rect x="350" y="240" width="100" height="110" rx="4" fill="#7b341e"/>
  <rect x="360" y="250" width="35" height="100" fill="#9c4221"/>
  <rect x="405" y="250" width="35" height="100" fill="#9c4221"/>

  <!-- School Bus (Front-Left on tarmac) -->
  <g transform="translate(60, 360)">
    <rect x="0" y="0" width="220" height="85" rx="10" fill="url(#busGrad)" stroke="#b7791f" stroke-width="2"/>
    <rect x="15" y="12" width="40" height="32" rx="4" fill="#ebf8ff" stroke="#718096"/>
    <rect x="65" y="12" width="40" height="32" rx="4" fill="#ebf8ff" stroke="#718096"/>
    <rect x="115" y="12" width="40" height="32" rx="4" fill="#ebf8ff" stroke="#718096"/>
    <rect x="165" y="12" width="40" height="32" rx="4" fill="#ebf8ff" stroke="#718096"/>
    <text x="110" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="bold" fill="#744210" text-anchor="middle">SCHOOL BUS</text>
    <!-- Pupils faces inside bus windows -->
    <text x="35" y="34" font-size="14" text-anchor="middle">😄</text>
    <text x="85" y="34" font-size="14" text-anchor="middle">🥱</text>
    <text x="135" y="34" font-size="14" text-anchor="middle">😃</text>
    <text x="185" y="34" font-size="14" text-anchor="middle">😊</text>
    <!-- Wheels -->
    <circle cx="45" cy="85" r="16" fill="#2d3748"/>
    <circle cx="45" cy="85" r="7" fill="#cbd5e0"/>
    <circle cx="175" cy="85" r="16" fill="#2d3748"/>
    <circle cx="175" cy="85" r="7" fill="#cbd5e0"/>
  </g>

  <!-- Pupils in Playground (Right) -->
  <g transform="translate(480, 355)">
    <circle cx="20" cy="20" r="12" fill="#fbd38d"/>
    <rect x="12" y="32" width="16" height="30" rx="3" fill="#3182ce"/>
    <text x="20" y="24" font-size="10" text-anchor="middle">😊</text>
    <text x="20" y="80" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2d3748" text-anchor="middle">happy</text>

    <circle cx="80" cy="15" r="12" fill="#fbd38d"/>
    <rect x="72" y="27" width="16" height="30" rx="3" fill="#e53e3e"/>
    <text x="80" y="19" font-size="10" text-anchor="middle">🤩</text>
    <text x="80" y="75" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2d3748" text-anchor="middle">excited</text>

    <circle cx="140" cy="25" r="12" fill="#fbd38d"/>
    <rect x="132" y="37" width="16" height="30" rx="3" fill="#805ad5"/>
    <text x="140" y="29" font-size="10" text-anchor="middle">🥱</text>
    <text x="140" y="85" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2d3748" text-anchor="middle">tired</text>

    <circle cx="200" cy="18" r="12" fill="#fbd38d"/>
    <rect x="192" y="30" width="16" height="30" rx="3" fill="#38a169"/>
    <text x="200" y="22" font-size="10" text-anchor="middle">⚽</text>
    <text x="200" y="78" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2d3748" text-anchor="middle">playing</text>
  </g>
</svg>'''

# 3. sports_habits.svg
svg3 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="gymFloor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#dd6b20"/>
      <stop offset="100%" stop-color="#c05621"/>
    </linearGradient>
    <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2d3748"/>
      <stop offset="100%" stop-color="#1a202c"/>
    </linearGradient>
    <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3182ce"/>
      <stop offset="100%" stop-color="#2b6cb0"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Gym Wall & Floor -->
  <rect width="800" height="280" fill="url(#wallGrad)"/>
  <rect y="280" width="800" height="220" fill="url(#gymFloor)"/>

  <!-- Basketball Court Lines -->
  <line x1="50" y1="360" x2="750" y2="360" stroke="#ffffff" stroke-width="3" opacity="0.7"/>
  <ellipse cx="400" cy="380" rx="120" ry="60" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.7"/>
  <circle cx="400" cy="380" r="8" fill="#ffffff" opacity="0.8"/>

  <!-- Top Banner: Athlete Interview -->
  <rect x="60" y="25" width="680" height="60" rx="8" fill="url(#bannerGrad)" filter="url(#shadow)"/>
  <text x="400" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">TALKING ABOUT HABITS: GOOD &amp; BAD</text>
  <text x="400" y="73" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#bee3f8" text-anchor="middle">Interview with a Star Basketball Player • Healthy Living &amp; Training</text>

  <!-- Left Card: Good Habits -->
  <rect x="60" y="105" width="220" height="155" rx="8" fill="#ffffff" filter="url(#shadow)"/>
  <rect x="60" y="105" width="220" height="28" rx="8" fill="#38a169"/>
  <text x="170" y="124" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">✓ GOOD HABITS</text>
  <text x="75" y="152" font-family="sans-serif" font-size="11" fill="#2d3748">😴 Sleep 8-9 hours every night</text>
  <text x="75" y="174" font-family="sans-serif" font-size="11" fill="#2d3748">🥗 Eat healthy food &amp; fruit</text>
  <text x="75" y="196" font-family="sans-serif" font-size="11" fill="#2d3748">💧 Drink plenty of fresh water</text>
  <text x="75" y="218" font-family="sans-serif" font-size="11" fill="#2d3748">🏃 Practise 6 hours to keep fit</text>
  <text x="75" y="240" font-family="sans-serif" font-size="11" fill="#2d3748">🤝 Always follow coach's advice</text>

  <!-- Right Card: Bad Habits -->
  <rect x="520" y="105" width="220" height="155" rx="8" fill="#ffffff" filter="url(#shadow)"/>
  <rect x="520" y="105" width="220" height="28" rx="8" fill="#e53e3e"/>
  <text x="630" y="124" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">✗ BAD HABITS</text>
  <text x="535" y="152" font-family="sans-serif" font-size="11" fill="#2d3748">📱 Stay up late on screens</text>
  <text x="535" y="174" font-family="sans-serif" font-size="11" fill="#2d3748">🍟 Eat too much junk food</text>
  <text x="535" y="196" font-family="sans-serif" font-size="11" fill="#2d3748">🥤 Drink sugary soft drinks</text>
  <text x="535" y="218" font-family="sans-serif" font-size="11" fill="#2d3748">🛋️ Never exercise or do sports</text>
  <text x="535" y="240" font-family="sans-serif" font-size="11" fill="#2d3748">⏰ Always arrive late for class</text>

  <!-- Basketball Player Illustration (Center) -->
  <g transform="translate(350, 110)">
    <!-- Basketball Hoop on Wall -->
    <rect x="25" y="0" width="50" height="40" rx="3" fill="#ffffff" stroke="#e53e3e" stroke-width="3"/>
    <ellipse cx="50" cy="40" rx="20" ry="6" fill="none" stroke="#e53e3e" stroke-width="4"/>
    <path d="M30 40 L45 70 M70 40 L55 70 M40 40 L50 70 M60 40 L50 70" stroke="#ffffff" stroke-width="2"/>

    <!-- Basketball Ball in Air -->
    <circle cx="50" cy="85" r="16" fill="#dd6b20" stroke="#7b341e" stroke-width="2"/>
    <path d="M36 85 Q50 70 64 85 M36 85 Q50 100 64 85 M50 69 L50 101" fill="none" stroke="#7b341e" stroke-width="1.5"/>

    <!-- Player Body -->
    <circle cx="50" cy="140" r="16" fill="#fbd38d"/>
    <text x="50" y="145" font-size="14" text-anchor="middle">⛹️</text>
    <rect x="36" y="158" width="28" height="42" rx="4" fill="#3182ce"/>
    <text x="50" y="184" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle">7</text>
    <!-- Legs -->
    <rect x="38" y="200" width="10" height="35" rx="2" fill="#2b6cb0"/>
    <rect x="52" y="200" width="10" height="35" rx="2" fill="#2b6cb0"/>
    <!-- Shoes -->
    <rect x="34" y="232" width="16" height="8" rx="2" fill="#ffffff"/>
    <rect x="52" y="232" width="16" height="8" rx="2" fill="#ffffff"/>
  </g>

  <!-- Equipment Items (Cones, Water, Fruit) -->
  <g transform="translate(140, 370)">
    <!-- Cones -->
    <polygon points="30,50 15,90 45,90" fill="#ed8936"/>
    <rect x="10" y="90" width="40" height="6" rx="2" fill="#c05621"/>
    <polygon points="90,50 75,90 105,90" fill="#ed8936"/>
    <rect x="70" y="90" width="40" height="6" rx="2" fill="#c05621"/>
  </g>

  <g transform="translate(560, 365)">
    <!-- Water bottle -->
    <rect x="20" y="30" width="22" height="45" rx="4" fill="#63b3ed" stroke="#3182ce" stroke-width="2"/>
    <rect x="26" y="20" width="10" height="10" rx="2" fill="#2b6cb0"/>
    <text x="31" y="55" font-size="12" text-anchor="middle">💧</text>
    <!-- Fruit basket -->
    <ellipse cx="90" cy="70" rx="35" ry="15" fill="#d69e2e"/>
    <circle cx="80" cy="55" r="10" fill="#e53e3e"/>
    <circle cx="95" cy="52" r="11" fill="#ed8936"/>
    <circle cx="108" cy="56" r="9" fill="#48bb78"/>
    <text x="90" y="95" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">healthy snacks</text>
  </g>
</svg>'''

# 4. world_customs.svg
svg4 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ebf8ff"/>
      <stop offset="100%" stop-color="#e6fffa"/>
    </linearGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2c7a7b"/>
      <stop offset="100%" stop-color="#285e61"/>
    </linearGradient>
    <filter id="tileShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" fill="url(#mapBg)"/>

  <!-- Top Title -->
  <rect x="60" y="25" width="680" height="55" rx="8" fill="url(#titleGrad)" filter="url(#tileShadow)"/>
  <text x="400" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">CUSTOMS &amp; BREAKFASTS AROUND THE WORLD</text>
  <text x="400" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#b2f5ea" text-anchor="middle">Lesson 3: Daily habits, morning routines, international foods and etiquette</text>

  <!-- 3 Regional Breakfast Panels -->
  <!-- Card 1: United Kingdom (Full English Breakfast) -->
  <rect x="50" y="105" width="220" height="230" rx="8" fill="#ffffff" stroke="#cbd5e0" stroke-width="2" filter="url(#tileShadow)"/>
  <rect x="50" y="105" width="220" height="32" rx="8" fill="#3182ce"/>
  <text x="160" y="126" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">🇬🇧 UNITED KINGDOM</text>
  <!-- Illustration Plate -->
  <circle cx="160" cy="185" r="42" fill="#edf2f7" stroke="#cbd5e0" stroke-width="3"/>
  <ellipse cx="145" cy="180" rx="14" ry="10" fill="#ecc94b"/>
  <circle cx="145" cy="180" r="5" fill="#dd6b20"/>
  <rect x="160" y="172" width="22" height="8" rx="2" fill="#c53030"/>
  <rect x="155" y="185" width="26" height="8" rx="2" fill="#dd6b20"/>
  <circle cx="185" cy="170" r="6" fill="#e53e3e"/>
  <!-- Details -->
  <text x="160" y="245" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748" text-anchor="middle">Traditional Breakfast</text>
  <text x="160" y="265" font-family="sans-serif" font-size="10" fill="#4a5568" text-anchor="middle">Eggs, bacon, toast &amp; tea</text>
  <text x="160" y="283" font-family="sans-serif" font-size="10" fill="#4a5568" text-anchor="middle">Cereal with cold milk</text>
  <text x="160" y="310" font-family="sans-serif" font-size="10" font-weight="bold" fill="#2b6cb0" text-anchor="middle">Custom: Shake hands 🤝</text>

  <!-- Card 2: Japan (Traditional Morning Meal) -->
  <rect x="290" y="105" width="220" height="230" rx="8" fill="#ffffff" stroke="#cbd5e0" stroke-width="2" filter="url(#tileShadow)"/>
  <rect x="290" y="105" width="220" height="32" rx="8" fill="#e53e3e"/>
  <text x="400" y="126" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">🇯🇵 JAPAN</text>
  <!-- Illustration Bowl & Chopsticks -->
  <ellipse cx="400" cy="190" rx="38" ry="20" fill="#4a5568"/>
  <ellipse cx="400" cy="185" rx="35" ry="16" fill="#ffffff"/>
  <text x="400" y="190" font-size="20" text-anchor="middle">🍚</text>
  <!-- Chopsticks -->
  <line x1="365" y1="160" x2="435" y2="215" stroke="#744210" stroke-width="3" stroke-linecap="round"/>
  <line x1="375" y1="155" x2="445" y2="210" stroke="#744210" stroke-width="3" stroke-linecap="round"/>
  <!-- Details -->
  <text x="400" y="245" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748" text-anchor="middle">Rice, Fish &amp; Soup</text>
  <text x="400" y="265" font-family="sans-serif" font-size="10" fill="#4a5568" text-anchor="middle">Miso soup &amp; green tea</text>
  <text x="400" y="283" font-family="sans-serif" font-size="10" fill="#4a5568" text-anchor="middle">Eat using chopsticks</text>
  <text x="400" y="310" font-family="sans-serif" font-size="10" font-weight="bold" fill="#c53030" text-anchor="middle">Custom: Bow politely 🙇</text>

  <!-- Card 3: Greece & Mediterranean -->
  <rect x="530" y="105" width="220" height="230" rx="8" fill="#ffffff" stroke="#cbd5e0" stroke-width="2" filter="url(#tileShadow)"/>
  <rect x="530" y="105" width="220" height="32" rx="8" fill="#2c7a7b"/>
  <text x="640" y="126" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">🇬🇷 GREECE</text>
  <!-- Illustration Plate -->
  <circle cx="640" cy="185" r="42" fill="#edf2f7" stroke="#cbd5e0" stroke-width="3"/>
  <rect x="620" y="170" width="30" height="15" rx="3" fill="#ecc94b"/>
  <ellipse cx="655" cy="185" rx="6" ry="9" fill="#234e52"/>
  <ellipse cx="645" cy="195" rx="6" ry="8" fill="#234e52"/>
  <circle cx="625" cy="192" r="8" fill="#dd6b20"/>
  <!-- Details -->
  <text x="640" y="245" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748" text-anchor="middle">Mediterranean Morning</text>
  <text x="640" y="265" font-family="sans-serif" font-size="10" fill="#4a5568" text-anchor="middle">Bread, honey, olives &amp; milk</text>
  <text x="640" y="283" font-family="sans-serif" font-size="10" fill="#4a5568" text-anchor="middle">Fresh orange juice &amp; yogurt</text>
  <text x="640" y="310" font-family="sans-serif" font-size="10" font-weight="bold" fill="#2c7a7b" text-anchor="middle">Custom: Friendly greeting 👋</text>

  <!-- Bottom Banner: Etiquette & Manners Summary -->
  <rect x="50" y="355" width="700" height="110" rx="8" fill="#ffffff" stroke="#cbd5e0" stroke-width="2" filter="url(#tileShadow)"/>
  <text x="400" y="385" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="bold" fill="#2d3748" text-anchor="middle">💡 ETIQUETTE &amp; GOOD MANNERS AROUND THE WORLD</text>
  <text x="180" y="415" font-family="sans-serif" font-size="11" fill="#4a5568">👞 <strong>Take off shoes:</strong> Inside homes in Japan</text>
  <text x="180" y="440" font-family="sans-serif" font-size="11" fill="#4a5568">⏰ <strong>Be on time:</strong> For school &amp; lessons always</text>
  <text x="460" y="415" font-family="sans-serif" font-size="11" fill="#4a5568">🥢 <strong>Chopsticks:</strong> Never leave upright in rice bowl</text>
  <text x="460" y="440" font-family="sans-serif" font-size="11" fill="#4a5568">🗣️ <strong>Say please &amp; thank you:</strong> Good manners everywhere</text>
</svg>'''

with open('unit2/assets/images_v2/school_newspaper.svg', 'w', encoding='utf-8') as f:
    f.write(svg1)
with open('unit2/assets/images_v2/school_life.svg', 'w', encoding='utf-8') as f:
    f.write(svg2)
with open('unit2/assets/images_v2/sports_habits.svg', 'w', encoding='utf-8') as f:
    f.write(svg3)
with open('unit2/assets/images_v2/world_customs.svg', 'w', encoding='utf-8') as f:
    f.write(svg4)

print("Unit 2 Vector SVGs successfully generated!")
