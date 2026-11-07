import os
import json
import xml.sax.saxutils as saxutils

def escape_xml(s):
    return saxutils.escape(str(s or ""), {'"': '&quot;', "'": '&apos;'})

# 1. Ensure directory tree
dirs = [
    'unit3/assets/images',
    'unit3/assets/images_v2',
    'unit3/assets/audio/words',
    'unit3/assets/audio/definitions',
    'unit3/assets/audio/examples',
    'unit3/assets/audio_neural/words',
    'unit3/assets/audio_neural/definitions',
    'unit3/assets/audio_neural/examples',
    'unit3/assets/audio_v2/stories',
    'unit3/assets/audio_v2/grammar',
    'unit3/data'
]
for d in dirs:
    os.makedirs(d, exist_ok=True)

# 2. Story Illustration 1: The Place We Live In (London, Athens & Marseilles)
svg1 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgSky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E8"/>
      <stop offset="100%" stop-color="#FFE8C2"/>
    </linearGradient>
    <linearGradient id="coralBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF6B47"/>
      <stop offset="100%" stop-color="#FF8A65"/>
    </linearGradient>
    <filter id="comicDrop" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="4" stdDeviation="0" flood-color="#0F172A" flood-opacity="1"/>
    </filter>
  </defs>

  <rect width="800" height="500" fill="#F1F5F9"/>
  <rect x="20" y="20" width="760" height="460" rx="14" fill="url(#bgSky)" stroke="#0F172A" stroke-width="3.5" filter="url(#comicDrop)"/>

  <!-- Masthead -->
  <rect x="40" y="36" width="720" height="56" rx="8" fill="url(#coralBar)" stroke="#0F172A" stroke-width="3"/>
  <text x="400" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">THE PLACE WE LIVE IN: THREE CITIES, THREE COMMUTES</text>
  <text x="400" y="85" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#FFF8E8" text-anchor="middle">LONDON (ON FOOT) • ATHENS (BY CAR &amp; METRO) • MARSEILLES (BY BUS)</text>

  <!-- Panel 1: London (Mark) -->
  <g transform="translate(50, 110)">
    <rect width="210" height="340" rx="10" fill="#FFFFFF" stroke="#0F172A" stroke-width="3" filter="url(#comicDrop)"/>
    <rect width="210" height="34" rx="8" fill="#3B82F6" stroke="#0F172A" stroke-width="2"/>
    <text x="105" y="22" font-family="'Outfit', sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">🇬🇧 LONDON • MARK</text>
    <!-- Big Ben & Bookstore Graphic -->
    <rect x="20" y="50" width="170" height="150" rx="6" fill="#EFF6FF" stroke="#0F172A" stroke-width="2"/>
    <!-- Buildings & Clock Tower Silhouette -->
    <polygon points="105,65 95,85 115,85" fill="#F59E0B" stroke="#0F172A" stroke-width="2"/>
    <rect x="95" y="85" width="20" height="70" fill="#FCD34D" stroke="#0F172A" stroke-width="2"/>
    <circle cx="105" cy="100" r="5" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>
    <rect x="35" y="115" width="55" height="70" fill="#93C5FD" stroke="#0F172A" stroke-width="2"/>
    <rect x="120" y="125" width="55" height="60" fill="#BFDBFE" stroke="#0F172A" stroke-width="2"/>
    <!-- Mark walking on foot -->
    <circle cx="105" cy="180" r="10" fill="#FDE68A" stroke="#0F172A" stroke-width="2"/>
    <line x1="105" y1="190" x2="105" y2="215" stroke="#0F172A" stroke-width="3"/>
    <line x1="105" y1="215" x2="95" y2="235" stroke="#0F172A" stroke-width="3"/>
    <line x1="105" y1="215" x2="118" y2="235" stroke="#0F172A" stroke-width="3"/>
    <!-- Note -->
    <rect x="14" y="245" width="182" height="75" rx="6" fill="#FFFBEB" stroke="#0F172A" stroke-width="2"/>
    <text x="24" y="268" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#0F172A">Father: Bookstore owner</text>
    <text x="24" y="288" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#2563EB">Commute: On foot</text>
    <text x="24" y="306" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#4B5563">"Bookstore in our neighbourhood!"</text>
  </g>

  <!-- Panel 2: Athens (Kostas) -->
  <g transform="translate(295, 110)">
    <rect width="210" height="340" rx="10" fill="#FFFFFF" stroke="#0F172A" stroke-width="3" filter="url(#comicDrop)"/>
    <rect width="210" height="34" rx="8" fill="#10B981" stroke="#0F172A" stroke-width="2"/>
    <text x="105" y="22" font-family="'Outfit', sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">🇬🇷 ATHENS • KOSTAS</text>
    <!-- Parthenon & Traffic Graphic -->
    <rect x="20" y="50" width="170" height="150" rx="6" fill="#ECFDF5" stroke="#0F172A" stroke-width="2"/>
    <!-- Acropolis Pillars -->
    <polygon points="50,75 160,75 105,60" fill="#FDE68A" stroke="#0F172A" stroke-width="2"/>
    <line x1="60" y1="75" x2="60" y2="105" stroke="#0F172A" stroke-width="3"/>
    <line x1="80" y1="75" x2="80" y2="105" stroke="#0F172A" stroke-width="3"/>
    <line x1="105" y1="75" x2="105" y2="105" stroke="#0F172A" stroke-width="3"/>
    <line x1="130" y1="75" x2="130" y2="105" stroke="#0F172A" stroke-width="3"/>
    <line x1="150" y1="75" x2="150" y2="105" stroke="#0F172A" stroke-width="3"/>
    <!-- Car in traffic -->
    <g transform="translate(60, 135)">
      <rect x="0" y="10" width="90" height="32" rx="6" fill="#EF4444" stroke="#0F172A" stroke-width="2.5"/>
      <polygon points="18,10 32,-4 65,-4 75,10" fill="#93C5FD" stroke="#0F172A" stroke-width="2"/>
      <circle cx="22" cy="42" r="10" fill="#1F2937" stroke="#0F172A" stroke-width="2"/>
      <circle cx="68" cy="42" r="10" fill="#1F2937" stroke="#0F172A" stroke-width="2"/>
    </g>
    <!-- Note -->
    <rect x="14" y="245" width="182" height="75" rx="6" fill="#ECFDF5" stroke="#0F172A" stroke-width="2"/>
    <text x="24" y="268" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#0F172A">Mother: Bank clerk in centre</text>
    <text x="24" y="288" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#DC2626">Commute: By car (heavy traffic!)</text>
    <text x="24" y="306" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#4B5563">"Huge parking problems every day!"</text>
  </g>

  <!-- Panel 3: Marseilles (Nadine) -->
  <g transform="translate(540, 110)">
    <rect width="210" height="340" rx="10" fill="#FFFFFF" stroke="#0F172A" stroke-width="3" filter="url(#comicDrop)"/>
    <rect width="210" height="34" rx="8" fill="#F59E0B" stroke="#0F172A" stroke-width="2"/>
    <text x="105" y="22" font-family="'Outfit', sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">🇫🇷 MARSEILLES • NADINE</text>
    <!-- Factory & Public Bus Graphic -->
    <rect x="20" y="50" width="170" height="150" rx="6" fill="#FFFBEB" stroke="#0F172A" stroke-width="2"/>
    <!-- Factory Roof -->
    <polygon points="35,100 65,75 65,100 95,75 95,100 125,75 125,120 35,120" fill="#9CA3AF" stroke="#0F172A" stroke-width="2"/>
    <rect x="135" y="65" width="18" height="55" fill="#D1D5DB" stroke="#0F172A" stroke-width="2"/>
    <!-- Public Bus -->
    <g transform="translate(45, 135)">
      <rect x="0" y="0" width="120" height="42" rx="6" fill="#F59E0B" stroke="#0F172A" stroke-width="2.5"/>
      <rect x="10" y="8" width="22" height="16" rx="2" fill="#E0F2FE" stroke="#0F172A" stroke-width="1.5"/>
      <rect x="40" y="8" width="22" height="16" rx="2" fill="#E0F2FE" stroke="#0F172A" stroke-width="1.5"/>
      <rect x="70" y="8" width="22" height="16" rx="2" fill="#E0F2FE" stroke="#0F172A" stroke-width="1.5"/>
      <circle cx="28" cy="42" r="10" fill="#1F2937" stroke="#0F172A" stroke-width="2"/>
      <circle cx="92" cy="42" r="10" fill="#1F2937" stroke="#0F172A" stroke-width="2"/>
    </g>
    <!-- Note -->
    <rect x="14" y="245" width="182" height="75" rx="6" fill="#FEF3C7" stroke="#0F172A" stroke-width="2"/>
    <text x="24" y="268" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#0F172A">Parents: Factory workers</text>
    <text x="24" y="288" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#D97706">Commute: By public bus</text>
    <text x="24" y="306" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#4B5563">"Better to take the bus – traffic is heavy!"</text>
  </g>
</svg>'''

with open('unit3/assets/images_v2/the_place_we_live_in.svg', 'w', encoding='utf-8') as f:
    f.write(svg1)

# 3. Story Illustration 2: Giving Directions in Nea Ionia
svg2 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <filter id="comicDrop2" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="4" stdDeviation="0" flood-color="#0F172A" flood-opacity="1"/>
    </filter>
  </defs>

  <rect width="800" height="500" fill="#F1F5F9"/>
  <rect x="20" y="20" width="760" height="460" rx="14" fill="url(#mapBg)" stroke="#0F172A" stroke-width="3.5" filter="url(#comicDrop2)"/>

  <!-- Masthead -->
  <rect x="40" y="36" width="720" height="56" rx="8" fill="#3B82F6" stroke="#0F172A" stroke-width="3"/>
  <text x="400" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">NEA IONIA COMPASS &amp; NEIGHBOURHOOD ROUTE MAP</text>
  <text x="400" y="85" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#E0F2FE" text-anchor="middle">NAVIGATING FROM KOSTAS'S FLAT TO THE YOUTH CENTRE &amp; MUNICIPAL STADIUM</text>

  <!-- Compass Rose -->
  <g transform="translate(110, 160)">
    <circle cx="0" cy="0" r="38" fill="#FFFFFF" stroke="#0F172A" stroke-width="3" filter="url(#comicDrop2)"/>
    <polygon points="0,-32 8,-8 0,0 -8,-8" fill="#EF4444" stroke="#0F172A" stroke-width="1.5"/>
    <polygon points="0,32 8,8 0,0 -8,8" fill="#3B82F6" stroke="#0F172A" stroke-width="1.5"/>
    <polygon points="-32,0 -8,-8 0,0 -8,8" fill="#CBD5E1" stroke="#0F172A" stroke-width="1.5"/>
    <polygon points="32,0 8,-8 0,0 8,8" fill="#CBD5E1" stroke="#0F172A" stroke-width="1.5"/>
    <text x="0" y="-36" font-family="'Outfit', sans-serif" font-size="12" font-weight="900" fill="#EF4444" text-anchor="middle">N</text>
    <text x="0" y="46" font-family="'Outfit', sans-serif" font-size="12" font-weight="900" fill="#3B82F6" text-anchor="middle">S</text>
    <text x="-44" y="4" font-family="'Outfit', sans-serif" font-size="12" font-weight="900" fill="#64748B" text-anchor="middle">W</text>
    <text x="44" y="4" font-family="'Outfit', sans-serif" font-size="12" font-weight="900" fill="#64748B" text-anchor="middle">E</text>
  </g>

  <!-- Street Grid & Road Network -->
  <!-- Maditou Street (Horizontal Main) -->
  <rect x="60" y="230" width="680" height="50" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
  <line x1="70" y1="255" x2="730" y2="255" stroke="#F59E0B" stroke-width="3" stroke-dasharray="12,10"/>
  <text x="210" y="260" font-family="'Outfit', sans-serif" font-size="14" font-weight="900" fill="#0F172A">MADITOU STREET (ΟΔΟΣ ΜΑΔΥΤΟΥ)</text>

  <!-- Nigdis Street (Vertical Offshoot) -->
  <rect x="470" y="110" width="55" height="340" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
  <line x1="497" y1="120" x2="497" y2="440" stroke="#F59E0B" stroke-width="3" stroke-dasharray="12,10"/>
  <text x="492" y="380" font-family="'Outfit', sans-serif" font-size="11" font-weight="800" fill="#0F172A" transform="rotate(-90 492 380)">NIGDIS STREET (ΟΔΟΣ ΝΙΓΔΗΣ)</text>

  <!-- Landmark 1: Kostas's House (Start) -->
  <g transform="translate(80, 310)">
    <rect width="130" height="110" rx="8" fill="#ECFDF5" stroke="#0F172A" stroke-width="3" filter="url(#comicDrop2)"/>
    <text x="65" y="30" font-family="'Outfit', sans-serif" font-size="14" font-weight="900" fill="#059669" text-anchor="middle">🏠 START</text>
    <text x="65" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#0F172A" text-anchor="middle">Kostas's Flat</text>
    <text x="65" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#4B5563" text-anchor="middle">Maditou St.</text>
    <circle cx="65" cy="95" r="7" fill="#10B981" stroke="#0F172A" stroke-width="2"/>
  </g>

  <!-- Landmark 2: 7th & 20th Primary School -->
  <g transform="translate(260, 110)">
    <rect width="180" height="100" rx="8" fill="#EFF6FF" stroke="#0F172A" stroke-width="3" filter="url(#comicDrop2)"/>
    <text x="90" y="28" font-family="'Outfit', sans-serif" font-size="13" font-weight="900" fill="#2563EB" text-anchor="middle">🏫 7th &amp; 20th SCHOOL</text>
    <text x="90" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#0F172A" text-anchor="middle">Primary School</text>
    <text x="90" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#6B7280" text-anchor="middle">"On your left as you walk"</text>
  </g>

  <!-- Landmark 3: Eisodia Theotokou Church (Corner Waypoint) -->
  <g transform="translate(450, 120)">
    <rect x="-80" y="170" width="75" height="85" rx="6" fill="#FEF3C7" stroke="#0F172A" stroke-width="3"/>
    <text x="-42" y="200" font-family="'Outfit', sans-serif" font-size="11" font-weight="900" fill="#D97706" text-anchor="middle">⛪ CHURCH</text>
    <text x="-42" y="222" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#0F172A" text-anchor="middle">Eisodia</text>
    <text x="-42" y="238" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#0F172A" text-anchor="middle">Theotokou</text>
  </g>

  <!-- Landmark 4: Police Station -->
  <g transform="translate(550, 320)">
    <rect width="180" height="100" rx="8" fill="#F1F5F9" stroke="#0F172A" stroke-width="3" filter="url(#comicDrop2)"/>
    <text x="90" y="30" font-family="'Outfit', sans-serif" font-size="13" font-weight="900" fill="#475569" text-anchor="middle">👮 POLICE STATION</text>
    <text x="90" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#0F172A" text-anchor="middle">Local Station</text>
    <text x="90" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#6B7280" text-anchor="middle">Nigdis Street</text>
  </g>

  <!-- Landmark 5: Youth Centre & Stadium (Destination) -->
  <g transform="translate(545, 110)">
    <rect width="190" height="100" rx="8" fill="#FEF08A" stroke="#0F172A" stroke-width="3" filter="url(#comicDrop2)"/>
    <text x="95" y="28" font-family="'Outfit', sans-serif" font-size="13" font-weight="900" fill="#CA8A04" text-anchor="middle">🎯 DESTINATION</text>
    <text x="95" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="900" fill="#0F172A" text-anchor="middle">Youth Centre</text>
    <text x="95" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#15803D" text-anchor="middle">Opposite Municipal Stadium</text>
  </g>

  <!-- Guided Route Arrow Line -->
  <path d="M 145,255 L 497,255 L 497,160 L 545,160" fill="none" stroke="#EF4444" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10,6"/>
  <polygon points="555,160 540,152 540,168" fill="#EF4444" stroke="#0F172A" stroke-width="2"/>
</svg>'''

with open('unit3/assets/images_v2/giving_directions_nea_ionia.svg', 'w', encoding='utf-8') as f:
    f.write(svg2)

# 4. Story Illustration 3: Ancient Athens Acropolis Tour with Pierre
svg3 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="athensSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#BAE6FD"/>
      <stop offset="100%" stop-color="#E0F2FE"/>
    </linearGradient>
    <linearGradient id="parthMarble" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF3C7"/>
      <stop offset="100%" stop-color="#FDE68A"/>
    </linearGradient>
    <filter id="comicDrop3" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="4" stdDeviation="0" flood-color="#0F172A" flood-opacity="1"/>
    </filter>
  </defs>

  <rect width="800" height="500" fill="#F1F5F9"/>
  <rect x="20" y="20" width="760" height="460" rx="14" fill="url(#athensSky)" stroke="#0F172A" stroke-width="3.5" filter="url(#comicDrop3)"/>

  <!-- Masthead -->
  <rect x="40" y="36" width="720" height="56" rx="8" fill="#0EA5E9" stroke="#0F172A" stroke-width="3"/>
  <text x="400" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">ATHENS ACROPOLIS WALKING TOUR: PIERRE'S DIRECTIONS</text>
  <text x="400" y="85" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#F0F9FF" text-anchor="middle">PARTHENON • DIONYSIOU AEROPAGITOU • TRADITIONAL TAVERNAS • METRO STATION</text>

  <!-- Acropolis Rock & Parthenon Monument -->
  <path d="M 120,240 Q 240,160 400,160 Q 560,160 680,240 L 730,340 L 70,340 Z" fill="#D6D3D1" stroke="#0F172A" stroke-width="3.5"/>
  <g transform="translate(280, 110)">
    <!-- Parthenon Pediment & Columns -->
    <polygon points="120,0 20,40 220,40" fill="url(#parthMarble)" stroke="#0F172A" stroke-width="3"/>
    <rect x="20" y="40" width="200" height="12" fill="#FCD34D" stroke="#0F172A" stroke-width="2.5"/>
    <!-- 8 Classical Columns -->
    <rect x="28" y="52" width="12" height="60" fill="url(#parthMarble)" stroke="#0F172A" stroke-width="2"/>
    <rect x="52" y="52" width="12" height="60" fill="url(#parthMarble)" stroke="#0F172A" stroke-width="2"/>
    <rect x="76" y="52" width="12" height="60" fill="url(#parthMarble)" stroke="#0F172A" stroke-width="2"/>
    <rect x="100" y="52" width="12" height="60" fill="url(#parthMarble)" stroke="#0F172A" stroke-width="2"/>
    <rect x="128" y="52" width="12" height="60" fill="url(#parthMarble)" stroke="#0F172A" stroke-width="2"/>
    <rect x="152" y="52" width="12" height="60" fill="url(#parthMarble)" stroke="#0F172A" stroke-width="2"/>
    <rect x="176" y="52" width="12" height="60" fill="url(#parthMarble)" stroke="#0F172A" stroke-width="2"/>
    <rect x="200" y="52" width="12" height="60" fill="url(#parthMarble)" stroke="#0F172A" stroke-width="2"/>
    <rect x="15" y="112" width="210" height="14" fill="#FCD34D" stroke="#0F172A" stroke-width="2.5"/>
  </g>

  <!-- Promenade (Aeropagitou) -->
  <rect x="50" y="340" width="700" height="110" rx="10" fill="#E7E5E4" stroke="#0F172A" stroke-width="3"/>
  <text x="400" y="365" font-family="'Outfit', sans-serif" font-size="13" font-weight="900" fill="#0F172A" text-anchor="middle" letter-spacing="1">DIONYSIOU AEROPAGITOU PEDESTRIAN PROMENADE</text>

  <!-- 3 Destination Waypoints for Pierre -->
  <g transform="translate(80, 380)">
    <rect width="180" height="55" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5" filter="url(#comicDrop3)"/>
    <text x="90" y="24" font-family="'Outfit', sans-serif" font-size="12" font-weight="900" fill="#D97706" text-anchor="middle">🍽️ Traditional Taverna</text>
    <text x="90" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#4B5563" text-anchor="middle">Plaka • Turn right</text>
  </g>

  <g transform="translate(310, 380)">
    <rect width="180" height="55" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5" filter="url(#comicDrop3)"/>
    <text x="90" y="24" font-family="'Outfit', sans-serif" font-size="12" font-weight="900" fill="#2563EB" text-anchor="middle">🚇 Acropolis Metro</text>
    <text x="90" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#4B5563" text-anchor="middle">Museum • Go straight</text>
  </g>

  <g transform="translate(540, 380)">
    <rect width="180" height="55" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.5" filter="url(#comicDrop3)"/>
    <text x="90" y="24" font-family="'Outfit', sans-serif" font-size="12" font-weight="900" fill="#7C3AED" text-anchor="middle">🧶 Flokati Carpets</text>
    <text x="90" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#4B5563" text-anchor="middle">Souvenir shop • Opposite</text>
  </g>
</svg>'''

with open('unit3/assets/images_v2/athens_tour_with_pierre.svg', 'w', encoding='utf-8') as f:
    f.write(svg3)

# 5. Story Illustration 4: Ioannina Lake & Medieval Castle
svg4 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="lakeWater" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="mountainSnow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <filter id="comicDrop4" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="4" stdDeviation="0" flood-color="#0F172A" flood-opacity="1"/>
    </filter>
  </defs>

  <rect width="800" height="500" fill="#F1F5F9"/>
  <rect x="20" y="20" width="760" height="460" rx="14" fill="#F0FDFA" stroke="#0F172A" stroke-width="3.5" filter="url(#comicDrop4)"/>

  <!-- Masthead -->
  <rect x="40" y="36" width="720" height="56" rx="8" fill="#0D9488" stroke="#0F172A" stroke-width="3"/>
  <text x="400" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">IOANNINA: LAKE PAMVOTIDA, SNOWY MOUNTAINS &amp; MEDIEVAL CASTLE</text>
  <text x="400" y="85" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#CCFBF1" text-anchor="middle">NORTH-WEST GREECE • 15 CENTURIES OF HISTORY • INHABITED LAKE ISLAND</text>

  <!-- Mountain Range with Snow Caps -->
  <polygon points="60,240 180,120 300,240" fill="url(#mountainSnow)" stroke="#0F172A" stroke-width="3"/>
  <polygon points="180,120 150,150 170,160 180,150 195,160 210,150" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>

  <polygon points="240,240 380,100 520,240" fill="url(#mountainSnow)" stroke="#0F172A" stroke-width="3"/>
  <polygon points="380,100 345,135 365,145 380,135 400,150 415,135" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>

  <polygon points="460,240 600,130 740,240" fill="url(#mountainSnow)" stroke="#0F172A" stroke-width="3"/>
  <polygon points="600,130 570,160 590,170 600,160 615,170 630,160" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>

  <!-- Lake Pamvotida -->
  <rect x="50" y="240" width="700" height="210" rx="10" fill="url(#lakeWater)" stroke="#0F172A" stroke-width="3.5"/>

  <!-- Inhabited Island in the Lake -->
  <g transform="translate(180, 290)">
    <ellipse cx="60" cy="30" rx="55" ry="24" fill="#15803D" stroke="#0F172A" stroke-width="3"/>
    <!-- Small Monastery & Village Houses -->
    <rect x="35" y="10" width="22" height="18" fill="#FEF08A" stroke="#0F172A" stroke-width="2"/>
    <polygon points="32,10 46,0 60,10" fill="#DC2626" stroke="#0F172A" stroke-width="2"/>
    <rect x="65" y="14" width="20" height="15" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>
    <polygon points="62,14 75,5 88,14" fill="#DC2626" stroke="#0F172A" stroke-width="2"/>
    <text x="60" y="46" font-family="'Outfit', sans-serif" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">ISLAND</text>
  </g>

  <!-- Medieval Castle Overlooking Lake -->
  <g transform="translate(460, 230)">
    <!-- Fortress Walls & Battlements -->
    <rect x="0" y="20" width="240" height="100" fill="#78716C" stroke="#0F172A" stroke-width="3.5"/>
    <!-- Battlements -->
    <rect x="0" y="5" width="25" height="20" fill="#78716C" stroke="#0F172A" stroke-width="2"/>
    <rect x="40" y="5" width="25" height="20" fill="#78716C" stroke="#0F172A" stroke-width="2"/>
    <rect x="80" y="5" width="25" height="20" fill="#78716C" stroke="#0F172A" stroke-width="2"/>
    <rect x="120" y="5" width="25" height="20" fill="#78716C" stroke="#0F172A" stroke-width="2"/>
    <rect x="160" y="5" width="25" height="20" fill="#78716C" stroke="#0F172A" stroke-width="2"/>
    <rect x="200" y="5" width="25" height="20" fill="#78716C" stroke="#0F172A" stroke-width="2"/>
    <!-- Tower Top -->
    <rect x="85" y="-30" width="55" height="50" fill="#57534E" stroke="#0F172A" stroke-width="3"/>
    <polygon points="80,-30 112,-55 145,-30" fill="#DC2626" stroke="#0F172A" stroke-width="2.5"/>
    <text x="112" y="70" font-family="'Outfit', sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">IOANNINA CASTLE</text>
    <text x="112" y="90" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#FEF08A" text-anchor="middle">15 Centuries of History</text>
  </g>

  <!-- Traditional Wooden Boat on Lake -->
  <g transform="translate(340, 360)">
    <path d="M 0,15 L 60,15 L 48,32 L 12,32 Z" fill="#92400E" stroke="#0F172A" stroke-width="2.5"/>
    <line x1="28" y1="15" x2="28" y2="-8" stroke="#0F172A" stroke-width="2.5"/>
    <polygon points="28,-8 52,4 28,12" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>
  </g>
</svg>'''

with open('unit3/assets/images_v2/ioannina_lake_castle.svg', 'w', encoding='utf-8') as f:
    f.write(svg4)

print("Generated 4 story illustrations in unit3/assets/images_v2/ [PASS]")

# 6. Generate 72 vocabulary card SVGs in unit3/assets/images/
vocab_path = 'unit3/data/vocabulary_data.json'
with open(vocab_path, 'r', encoding='utf-8') as f:
    vocab = json.load(f)

category_colors = {
    'Places in Town & Buildings': {'tag': '#3B82F6', 'bg': ['#EFF6FF', '#DBEAFE'], 'burst': '#FBBF24', 'text': 'TOWN!'},
    'Workplaces & Living Areas': {'tag': '#10B981', 'bg': ['#ECFDF5', '#D1FAE5'], 'burst': '#34D399', 'text': 'HOME!'},
    'Transport & Getting Around': {'tag': '#F59E0B', 'bg': ['#FFFBEB', '#FEF3C7'], 'burst': '#FCD34D', 'text': 'GO!'},
    'Giving Directions & Movement': {'tag': '#EF4444', 'bg': ['#FEF2F2', '#FEE2E2'], 'burst': '#F87171', 'text': 'MAP!'},
    'Geography & Landscape Features': {'tag': '#0D9488', 'bg': ['#F0FDFA', '#CCFBF1'], 'burst': '#2DD4BF', 'text': 'VIEW!'},
    'Compass Directions & Locations': {'tag': '#6366F1', 'bg': ['#EEF2FF', '#E0E7FF'], 'burst': '#818CF8', 'text': 'NORTH!'},
    'Environment, Opinions & City Life': {'tag': '#EC4899', 'bg': ['#FDF2F8', '#FCE7F3'], 'burst': '#F472B6', 'text': 'GREEN!'}
}

for item in vocab:
    pad_id = str(item['id']).zfill(2)
    safe_word = "".join(c if c.isalnum() else "_" for c in item['word'].lower())
    svg_filename = f"{pad_id}_{safe_word}.svg"
    item['image'] = f"assets/images/{svg_filename}"
    item['image_alt'] = f"Graphic novel illustration of {item['word']}"

    cat = item.get('category', 'Places in Town & Buildings')
    theme = category_colors.get(cat, {'tag': '#FF6B47', 'bg': ['#FFF8E8', '#FFE8C2'], 'burst': '#FFC800', 'text': 'CITY!'})

    safe_id = f"grad_{pad_id}_{safe_word}"

    # SVG card template
    card_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" width="320" height="220">
  <defs>
    <linearGradient id="{safe_id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{theme['bg'][0]}"/>
      <stop offset="100%" stop-color="{theme['bg'][1]}"/>
    </linearGradient>
    <pattern id="pat_{safe_id}" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" fill="{theme['tag']}" opacity="0.12"/>
    </pattern>
    <filter id="shadow_{safe_id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="4" stdDeviation="0" flood-color="#0F172A" flood-opacity="1"/>
    </filter>
  </defs>

  <!-- Outer Comic Frame -->
  <rect x="4" y="4" width="312" height="212" rx="12" fill="url(#{safe_id})" stroke="#0F172A" stroke-width="3.5"/>
  <rect x="4" y="4" width="312" height="212" rx="12" fill="url(#pat_{safe_id})"/>

  <!-- Category Badge -->
  <g transform="translate(14, 14)">
    <rect width="{len(cat)*7 + 24}" height="22" rx="6" fill="{theme['tag']}" stroke="#0F172A" stroke-width="2" filter="url(#shadow_{safe_id})"/>
    <text x="{(len(cat)*7 + 24)/2}" y="15" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">{escape_xml(cat.upper())}</text>
  </g>

  <!-- Comic Burst -->
  <g transform="translate(250, 22) rotate(10)">
    <polygon points="0,10 12,0 24,8 36,0 34,14 46,18 36,26 44,38 30,34 22,44 18,32 6,36 10,24 0,18" fill="{theme['burst']}" stroke="#0F172A" stroke-width="2"/>
    <text x="22" y="26" font-family="'Outfit', sans-serif" font-size="9" font-weight="900" fill="#0F172A" text-anchor="middle">{escape_xml(theme['text'])}</text>
  </g>

  <!-- Center Graphic Icon & Visual Element -->
  <g transform="translate(160, 102)" filter="url(#shadow_{safe_id})">
    <circle cx="0" cy="0" r="42" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
    <text x="0" y="14" font-size="40" text-anchor="middle">{item.get('emoji', '🏙️')}</text>
  </g>

  <!-- Word, IPA & Greek Gloss -->
  <text x="160" y="176" font-family="'Outfit', sans-serif" font-size="19" font-weight="900" fill="#0F172A" text-anchor="middle" letter-spacing="0.5">{escape_xml(item['word'])}</text>
  <text x="160" y="198" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#4B5563" text-anchor="middle">{escape_xml(item['ipa'] + ' • ' + item['meaning_gr'])}</text>
</svg>'''

    svg_out_path = os.path.join('unit3/assets/images', svg_filename)
    with open(svg_out_path, 'w', encoding='utf-8') as f_out:
        f_out.write(card_svg)

print(f"Generated 72 card SVGs in unit3/assets/images/ [PASS]")

# Write back updated vocabulary JSON & JS
with open(vocab_path, 'w', encoding='utf-8') as f:
    json.dump(vocab, f, indent=2, ensure_ascii=False)

with open('unit3/data/vocabulary_data.js', 'w', encoding='utf-8') as f:
    f.write('window.VOCABULARY_DATA = ' + json.dumps(vocab, indent=2, ensure_ascii=False) + ';\n')

print(f"Updated unit3/data/vocabulary_data.json and unit3/data/vocabulary_data.js with image paths [PASS]")
