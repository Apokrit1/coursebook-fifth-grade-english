import os

os.makedirs('unit1/assets/images_v2', exist_ok=True)

# 1. kostas_computer.svg
svg1 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ebf8ff"/>
      <stop offset="100%" stop-color="#bee3f8"/>
    </linearGradient>
    <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d69e2e"/>
      <stop offset="100%" stop-color="#b7791f"/>
    </linearGradient>
    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2b6cb0"/>
      <stop offset="100%" stop-color="#1a365d"/>
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background Room Wall -->
  <rect width="800" height="500" fill="url(#bgGrad)"/>

  <!-- Window with Athens view -->
  <rect x="520" y="30" width="220" height="180" rx="12" fill="#90cdf4" stroke="#4299e1" stroke-width="6"/>
  <circle cx="680" cy="70" r="28" fill="#ecc94b"/>
  <!-- Acropolis silhouette -->
  <path d="M540 180 L560 150 L610 150 L630 160 L680 155 L710 180 Z" fill="#b7791f" opacity="0.6"/>
  <rect x="625" y="30" width="6" height="180" fill="#4299e1"/>
  <rect x="520" y="115" width="220" height="6" fill="#4299e1"/>

  <!-- Poster on wall -->
  <rect x="50" y="40" width="140" height="170" rx="8" fill="#ffffff" stroke="#cbd5e0" stroke-width="3" filter="url(#dropShadow)"/>
  <rect x="60" y="50" width="120" height="60" fill="#3182ce"/>
  <!-- Greek flag in poster -->
  <rect x="60" y="50" width="40" height="40" fill="#2b6cb0"/>
  <path d="M80 50 L80 90 M60 70 L100 70" stroke="#ffffff" stroke-width="6"/>
  <text x="120" y="140" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2d3748" text-anchor="middle">GREECE</text>
  <text x="120" y="160" font-family="sans-serif" font-size="11" fill="#718096" text-anchor="middle">Athens • 5th Grade</text>

  <!-- Desk Surface -->
  <rect x="30" y="320" width="740" height="160" rx="10" fill="url(#deskGrad)" filter="url(#dropShadow)"/>
  <rect x="40" y="320" width="720" height="18" fill="#ecc94b" opacity="0.4"/>

  <!-- Computer Monitor (Screen) -->
  <rect x="240" y="130" width="300" height="190" rx="10" fill="#2d3748" filter="url(#dropShadow)"/>
  <rect x="250" y="140" width="280" height="170" rx="6" fill="url(#screenGrad)"/>
  <!-- Monitor Stand -->
  <rect x="365" y="320" width="50" height="30" fill="#4a5568"/>
  <rect x="340" y="346" width="100" height="12" rx="4" fill="#2d3748"/>

  <!-- Screen Content: Incoming Email -->
  <rect x="265" y="155" width="250" height="140" rx="6" fill="#ffffff" opacity="0.95"/>
  <rect x="265" y="155" width="250" height="30" rx="6" fill="#3182ce"/>
  <circle cx="280" cy="170" r="5" fill="#e53e3e"/>
  <circle cx="295" cy="170" r="5" fill="#ecc94b"/>
  <circle cx="310" cy="170" r="5" fill="#48bb78"/>
  <text x="330" y="174" font-family="sans-serif" font-size="11" fill="#ffffff" font-weight="bold">Inbox: Message from Connor (Ireland)</text>
  <text x="275" y="202" font-family="sans-serif" font-size="11" fill="#2d3748" font-weight="bold">Dear Kostas,</text>
  <text x="275" y="220" font-family="sans-serif" font-size="10" fill="#4a5568">I check my email after school.</text>
  <text x="275" y="236" font-family="sans-serif" font-size="10" fill="#4a5568">We use the internet to find info</text>
  <text x="275" y="252" font-family="sans-serif" font-size="10" fill="#4a5568">and play games at the weekend!</text>
  <text x="275" y="272" font-family="sans-serif" font-size="10" fill="#3182ce" font-weight="bold">Love from Connor (Dublin)</text>

  <!-- Computer Tower -->
  <rect x="580" y="190" width="100" height="160" rx="8" fill="#2d3748" filter="url(#dropShadow)"/>
  <rect x="595" y="210" width="70" height="14" rx="2" fill="#4a5568"/>
  <rect x="595" y="235" width="70" height="14" rx="2" fill="#4a5568"/>
  <circle cx="630" cy="300" r="10" fill="#3182ce"/>
  <circle cx="630" cy="300" r="4" fill="#63b3ed"/>

  <!-- Computer Keyboard -->
  <rect x="260" y="355" width="240" height="42" rx="6" fill="#2d3748" filter="url(#dropShadow)"/>
  <!-- Key rows -->
  <path d="M270 365 H490 M270 375 H490 M270 385 H490" stroke="#718096" stroke-width="3" stroke-dasharray="8 3"/>

  <!-- Optical Mouse & Mousepad -->
  <rect x="515" y="360" width="55" height="40" rx="6" fill="#4299e1"/>
  <ellipse cx="542" cy="380" rx="12" ry="16" fill="#edf2f7" stroke="#cbd5e0" stroke-width="2"/>
  <line x1="542" y1="364" x2="542" y2="376" stroke="#a0aec0" stroke-width="2"/>

  <!-- Desktop Printer -->
  <rect x="90" y="240" width="130" height="90" rx="8" fill="#e2e8f0" stroke="#cbd5e0" stroke-width="2" filter="url(#dropShadow)"/>
  <rect x="110" y="220" width="90" height="25" rx="3" fill="#ffffff" stroke="#cbd5e0"/>
  <rect x="115" y="300" width="80" height="25" rx="2" fill="#ffffff" stroke="#cbd5e0"/>
  <text x="125" y="315" font-family="sans-serif" font-size="8" fill="#3182ce" font-weight="bold">PRINT: Done!</text>
  <circle cx="195" cy="265" r="4" fill="#48bb78"/>

  <!-- Hotspot badges -->
  <circle cx="390" cy="130" r="14" fill="#dd6b20"/>
  <text x="390" y="135" font-family="sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">1</text>
  <circle cx="380" cy="375" r="14" fill="#dd6b20"/>
  <text x="380" y="380" font-family="sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">2</text>
  <circle cx="542" cy="380" r="14" fill="#dd6b20"/>
  <text x="542" y="385" font-family="sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
  <circle cx="155" cy="270" r="14" fill="#dd6b20"/>
  <text x="155" y="275" font-family="sans-serif" font-size="12" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
</svg>'''

with open('unit1/assets/images_v2/kostas_computer.svg', 'w', encoding='utf-8') as f:
    f.write(svg1)

# 2. online_chat.svg
svg2 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a202c"/>
      <stop offset="100%" stop-color="#2d3748"/>
    </linearGradient>
    <filter id="shadow2">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="800" height="500" fill="url(#bgGrad2)"/>

  <!-- Header bar -->
  <rect x="30" y="20" width="740" height="50" rx="10" fill="#2b6cb0" filter="url(#shadow2)"/>
  <circle cx="60" cy="45" r="10" fill="#ecc94b"/>
  <text x="85" y="52" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff">European Video Chat: Kostas (GR) • Nadine (FR) • Mark (UK)</text>
  <rect x="680" y="32" width="70" height="26" rx="13" fill="#48bb78"/>
  <text x="715" y="49" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">LIVE 🟢</text>

  <!-- Panel 1: Kostas in Athens -->
  <g transform="translate(40, 90)">
    <rect width="220" height="280" rx="12" fill="#2c5282" stroke="#4299e1" stroke-width="3" filter="url(#shadow2)"/>
    <rect x="0" y="235" width="220" height="45" rx="10" fill="#1a365d"/>
    <circle cx="110" cy="110" r="55" fill="#fbd38d"/>
    <!-- Kostas Hair & Face -->
    <path d="M65 95 Q110 50 155 95 Q130 65 110 65 Q90 65 65 95 Z" fill="#744210"/>
    <circle cx="95" cy="110" r="5" fill="#2d3748"/>
    <circle cx="125" cy="110" r="5" fill="#2d3748"/>
    <path d="M100 130 Q110 142 120 130" stroke="#c53030" stroke-width="3" fill="none"/>
    <!-- Striped shirt -->
    <path d="M55 200 Q110 170 165 200 L170 235 L50 235 Z" fill="#3182ce"/>
    <text x="110" y="255" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Kostas, 11 (Athens 🇬🇷)</text>
    <text x="110" y="272" font-family="sans-serif" font-size="11" fill="#bee3f8" text-anchor="middle">5th Grade Primary School</text>
  </g>

  <!-- Panel 2: Nadine in Marseilles -->
  <g transform="translate(290, 90)">
    <rect width="220" height="280" rx="12" fill="#702459" stroke="#b83280" stroke-width="3" filter="url(#shadow2)"/>
    <rect x="0" y="235" width="220" height="45" rx="10" fill="#521b41"/>
    <circle cx="110" cy="110" r="55" fill="#feebc8"/>
    <!-- Nadine Blonde Hair -->
    <path d="M55 120 Q50 60 110 60 Q170 60 165 120 Q160 160 145 180 Q130 90 110 90 Q90 90 75 180 Z" fill="#d69e2e"/>
    <circle cx="95" cy="110" r="5" fill="#2d3748"/>
    <circle cx="125" cy="110" r="5" fill="#2d3748"/>
    <path d="M100 130 Q110 142 120 130" stroke="#c53030" stroke-width="3" fill="none"/>
    <!-- Red dress -->
    <path d="M55 200 Q110 170 165 200 L170 235 L50 235 Z" fill="#e53e3e"/>
    <text x="110" y="255" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Nadine, 12 (Marseilles 🇫🇷)</text>
    <text x="110" y="272" font-family="sans-serif" font-size="11" fill="#fed7e2" text-anchor="middle">2nd Year of Collège</text>
  </g>

  <!-- Panel 3: Mark in London -->
  <g transform="translate(540, 90)">
    <rect width="220" height="280" rx="12" fill="#234e52" stroke="#319795" stroke-width="3" filter="url(#shadow2)"/>
    <rect x="0" y="235" width="220" height="45" rx="10" fill="#1d4044"/>
    <circle cx="110" cy="110" r="55" fill="#fbd38d"/>
    <!-- Mark Orange Hair & Headphones -->
    <path d="M60 95 Q110 50 160 95 Q135 60 110 60 Q85 60 60 95 Z" fill="#dd6b20"/>
    <circle cx="95" cy="110" r="5" fill="#2d3748"/>
    <circle cx="125" cy="110" r="5" fill="#2d3748"/>
    <path d="M100 130 Q110 142 120 130" stroke="#c53030" stroke-width="3" fill="none"/>
    <!-- Headphones -->
    <path d="M50 110 A 60 60 0 0 1 170 110" stroke="#2d3748" stroke-width="8" fill="none"/>
    <rect x="42" y="95" width="18" height="30" rx="6" fill="#e53e3e"/>
    <rect x="160" y="95" width="18" height="30" rx="6" fill="#e53e3e"/>
    <!-- Green shirt -->
    <path d="M55 200 Q110 170 165 200 L170 235 L50 235 Z" fill="#38a169"/>
    <text x="110" y="255" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Mark, 12 (London 🇬🇧)</text>
    <text x="110" y="272" font-family="sans-serif" font-size="11" fill="#b2f5ea" text-anchor="middle">West Wimbledon Primary</text>
  </g>

  <!-- Bottom Chat Transcript Banner -->
  <rect x="40" y="390" width="720" height="85" rx="10" fill="#2d3748" stroke="#4a5568" stroke-width="2"/>
  <text x="60" y="415" font-family="sans-serif" font-size="13" fill="#63b3ed" font-weight="bold">Kostas: "The only thing I like about school is spending time on computers!"</text>
  <text x="60" y="438" font-family="sans-serif" font-size="13" fill="#f687b3" font-weight="bold">Nadine: "Actually, I like going to school and I love studying."</text>
  <text x="60" y="461" font-family="sans-serif" font-size="13" fill="#4fd1c5" font-weight="bold">Mark: "I don't mind studying, but I hate tests and homework!"</text>
</svg>'''

with open('unit1/assets/images_v2/online_chat.svg', 'w', encoding='utf-8') as f:
    f.write(svg2)

# 3. european_friends.svg
svg3 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ebf8ff"/>
      <stop offset="100%" stop-color="#c3dafe"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" fill="url(#mapBg)"/>

  <!-- Title -->
  <text x="400" y="45" font-family="sans-serif" font-size="24" font-weight="bold" fill="#2b6cb0" text-anchor="middle">Friends and Flags Around Europe</text>
  <text x="400" y="70" font-family="sans-serif" font-size="13" fill="#4a5568" text-anchor="middle">Unit 1 • Lesson 2: Countries, Nationalities &amp; Multilingual Greetings</text>

  <!-- Europe Stylized Map Silhouette Background -->
  <path d="M120 180 Q200 130 320 140 Q400 100 500 120 Q650 100 700 200 Q650 350 550 400 Q450 420 350 410 Q250 440 180 390 Q120 300 120 180 Z" fill="#e2e8f0" stroke="#cbd5e0" stroke-width="4"/>

  <!-- Friend Cards Grid -->
  <!-- 1. Pablo (Portugal) -->
  <g transform="translate(60, 100)">
    <rect width="150" height="80" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="10" y="15" width="30" height="20" fill="#38a169"/>
    <rect x="25" y="15" width="15" height="20" fill="#e53e3e"/>
    <text x="50" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748">Pablo</text>
    <text x="50" y="40" font-family="sans-serif" font-size="10" fill="#718096">Portugal 🇵🇹</text>
    <text x="10" y="65" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3182ce">"Bom dia!"</text>
  </g>

  <!-- 2. Svetlana (Russia) -->
  <g transform="translate(580, 100)">
    <rect width="160" height="80" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="10" y="15" width="30" height="7" fill="#ffffff" stroke="#cbd5e0"/>
    <rect x="10" y="22" width="30" height="7" fill="#3182ce"/>
    <rect x="10" y="29" width="30" height="7" fill="#e53e3e"/>
    <text x="50" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748">Svetlana</text>
    <text x="50" y="40" font-family="sans-serif" font-size="10" fill="#718096">Russia 🇷🇺 (Moscow)</text>
    <text x="10" y="65" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3182ce">"Dobroye utro!"</text>
  </g>

  <!-- 3. Hans (Holland) -->
  <g transform="translate(240, 110)">
    <rect width="150" height="80" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="10" y="15" width="30" height="7" fill="#e53e3e"/>
    <rect x="10" y="22" width="30" height="7" fill="#ffffff" stroke="#cbd5e0"/>
    <rect x="10" y="29" width="30" height="7" fill="#3182ce"/>
    <text x="50" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748">Hans</text>
    <text x="50" y="40" font-family="sans-serif" font-size="10" fill="#718096">Holland 🇳🇱</text>
    <text x="10" y="65" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3182ce">"Goedemorgen!"</text>
  </g>

  <!-- 4. Carmen (Spain) -->
  <g transform="translate(80, 240)">
    <rect width="150" height="80" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="10" y="15" width="30" height="6" fill="#e53e3e"/>
    <rect x="10" y="21" width="30" height="8" fill="#ecc94b"/>
    <rect x="10" y="29" width="30" height="6" fill="#e53e3e"/>
    <text x="50" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748">Carmen</text>
    <text x="50" y="40" font-family="sans-serif" font-size="10" fill="#718096">Spain 🇪🇸</text>
    <text x="10" y="65" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3182ce">"Buenos días!"</text>
  </g>

  <!-- 5. Gunther (Germany) -->
  <g transform="translate(420, 110)">
    <rect width="150" height="80" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="10" y="15" width="30" height="7" fill="#1a202c"/>
    <rect x="10" y="22" width="30" height="7" fill="#e53e3e"/>
    <rect x="10" y="29" width="30" height="7" fill="#ecc94b"/>
    <text x="50" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748">Gunther</text>
    <text x="50" y="40" font-family="sans-serif" font-size="10" fill="#718096">Germany 🇩🇪</text>
    <text x="10" y="65" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3182ce">"Guten Morgen!"</text>
  </g>

  <!-- 6. Isabella (Italy) -->
  <g transform="translate(320, 270)">
    <rect width="150" height="80" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="10" y="15" width="10" height="20" fill="#38a169"/>
    <rect x="20" y="15" width="10" height="20" fill="#ffffff" stroke="#cbd5e0"/>
    <rect x="30" y="15" width="10" height="20" fill="#e53e3e"/>
    <text x="50" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748">Isabella</text>
    <text x="50" y="40" font-family="sans-serif" font-size="10" fill="#718096">Italy 🇮🇹 (Rome)</text>
    <text x="10" y="65" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3182ce">"Buon giorno!"</text>
  </g>

  <!-- 7. Kostas (Greece) -->
  <g transform="translate(540, 270)">
    <rect width="160" height="80" rx="8" fill="#ffffff" stroke="#3182ce" stroke-width="3"/>
    <rect x="10" y="15" width="30" height="20" fill="#3182ce"/>
    <path d="M25 15 L25 35 M10 25 L40 25" stroke="#ffffff" stroke-width="3"/>
    <text x="50" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748">Kostas</text>
    <text x="50" y="40" font-family="sans-serif" font-size="10" fill="#718096">Greece 🇬🇷 (Athens)</text>
    <text x="10" y="65" font-family="sans-serif" font-size="11" font-weight="bold" fill="#3182ce">"Καλημέρα!" (Kalimera)</text>
  </g>

  <!-- Connecting Stars Motif -->
  <circle cx="400" cy="440" r="16" fill="#ecc94b"/>
  <text x="400" y="445" font-family="sans-serif" font-size="18" fill="#744210" text-anchor="middle">★</text>
  <text x="400" y="475" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2d3748" text-anchor="middle">Unity in Diversity • Council of Europe</text>
</svg>'''

with open('unit1/assets/images_v2/european_friends.svg', 'w', encoding='utf-8') as f:
    f.write(svg3)

# 4. british_isles.svg
svg4 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ebf8ff"/>
      <stop offset="100%" stop-color="#bee3f8"/>
    </linearGradient>
    <filter id="shadow4">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-opacity="0.15"/>
    </filter>
  </defs>

  <rect width="800" height="500" fill="url(#seaGrad)"/>

  <!-- Left Map: The British Isles -->
  <g transform="translate(40, 40)">
    <!-- Ireland island -->
    <path d="M70 180 Q90 120 120 160 Q150 220 130 300 Q90 350 60 280 Z" fill="#68d391" stroke="#38a169" stroke-width="3" filter="url(#shadow4)"/>
    <text x="95" y="240" font-family="sans-serif" font-size="13" font-weight="bold" fill="#22543d" text-anchor="middle">Ireland</text>
    <text x="95" y="255" font-family="sans-serif" font-size="10" fill="#276749" text-anchor="middle">Dublin</text>

    <!-- Great Britain island -->
    <!-- Scotland (top) -->
    <path d="M220 50 Q280 40 290 110 Q260 140 210 140 Q190 90 220 50 Z" fill="#90cdf4" stroke="#3182ce" stroke-width="3"/>
    <text x="245" y="100" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2c5282">Scotland</text>

    <!-- England & Wales (bottom) -->
    <path d="M210 140 Q260 140 290 200 Q320 280 270 360 Q180 370 170 310 Q160 230 210 140 Z" fill="#feb2b2" stroke="#e53e3e" stroke-width="3"/>
    <!-- Wales notch -->
    <path d="M175 230 Q210 240 200 290 Q160 290 175 230 Z" fill="#faf089" stroke="#d69e2e" stroke-width="2"/>
    <text x="180" y="265" font-family="sans-serif" font-size="10" font-weight="bold" fill="#744210">Wales</text>
    <text x="250" y="240" font-family="sans-serif" font-size="14" font-weight="bold" fill="#9b2c2c">England</text>
    <circle cx="280" cy="305" r="5" fill="#e53e3e"/>
    <text x="270" y="325" font-family="sans-serif" font-size="11" font-weight="bold" fill="#2d3748">London</text>

    <text x="200" y="400" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2b6cb0" text-anchor="middle">THE BRITISH ISLES</text>
    <text x="200" y="420" font-family="sans-serif" font-size="11" fill="#718096" text-anchor="middle">Population: ~59 million (UK)</text>
  </g>

  <!-- Right Side: Four National Floral Emblems -->
  <g transform="translate(420, 40)">
    <!-- Box Title -->
    <rect width="340" height="420" rx="14" fill="#ffffff" stroke="#cbd5e0" stroke-width="2" filter="url(#shadow4)"/>
    <rect width="340" height="45" rx="14" fill="#2b6cb0"/>
    <text x="170" y="28" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">National Floral Emblems &amp; Symbols</text>

    <!-- 1. England: Rose -->
    <g transform="translate(20, 60)">
      <circle cx="30" cy="30" r="24" fill="#fed7d7"/>
      <text x="30" y="38" font-size="24" text-anchor="middle">🌹</text>
      <text x="70" y="26" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2d3748">The Red Rose</text>
      <text x="70" y="44" font-family="sans-serif" font-size="11" fill="#718096">National flower of England</text>
    </g>

    <!-- 2. Wales: Daffodil -->
    <g transform="translate(20, 130)">
      <circle cx="30" cy="30" r="24" fill="#fefcbf"/>
      <text x="30" y="38" font-size="24" text-anchor="middle">🌼</text>
      <text x="70" y="26" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2d3748">The Daffodil</text>
      <text x="70" y="44" font-family="sans-serif" font-size="11" fill="#718096">National flower of Wales</text>
    </g>

    <!-- 3. Scotland: Thistle -->
    <g transform="translate(20, 200)">
      <circle cx="30" cy="30" r="24" fill="#e9d8fd"/>
      <text x="30" y="38" font-size="24" text-anchor="middle">🪻</text>
      <text x="70" y="26" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2d3748">The Thistle</text>
      <text x="70" y="44" font-family="sans-serif" font-size="11" fill="#718096">National flower of Scotland</text>
    </g>

    <!-- 4. Ireland: Shamrock -->
    <g transform="translate(20, 270)">
      <circle cx="30" cy="30" r="24" fill="#c6f6d5"/>
      <text x="30" y="38" font-size="24" text-anchor="middle">☘️</text>
      <text x="70" y="26" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2d3748">The Shamrock</text>
      <text x="70" y="44" font-family="sans-serif" font-size="11" fill="#718096">National plant of Ireland</text>
    </g>

    <!-- 5. Realia Symbol: London Black Cab -->
    <g transform="translate(20, 340)">
      <rect width="300" height="55" rx="8" fill="#edf2f7"/>
      <text x="25" y="36" font-size="24">🚕</text>
      <text x="65" y="25" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1a202c">London Black Cab</text>
      <text x="65" y="42" font-family="sans-serif" font-size="10" fill="#4a5568">Classic taxi symbol of London (PB p. 134)</text>
    </g>
  </g>
</svg>'''

with open('unit1/assets/images_v2/british_isles.svg', 'w', encoding='utf-8') as f:
    f.write(svg4)

print("Successfully generated all 4 SVG artwork files in unit1/assets/images_v2/")
