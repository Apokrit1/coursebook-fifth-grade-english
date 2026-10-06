/**
 * Photodentro Computer Parts Picture Dictionary
 * Vocabulary Data with authentic MP3 audio mappings, regenerated 3D cyber visuals, 
 * phonetic pronunciations, Greek educational translations, and hardware facts.
 */

const VOCABULARY_DATA = [
  {
    id: "tower",
    name: "Tower",
    phonetic: "/ˈtaʊ.ər/",
    category: "Core Unit",
    categoryGreek: "Κεντρική Μονάδα",
    greek: "Κεντρική Μονάδα / Πύργος",
    description: "The main metal and plastic case that holds the computer's CPU (brain), memory, hard drive, and motherboard.",
    funFact: "Also called the computer case or chassis. Everything inside is cooled by high-speed fans!",
    audio: "story_content/5feOKpDaoHm_22050_48_0.mp3",
    image: "assets/images/tower.jpg",
    legacyImage: "mobile/6061bIW6R2e_X_80_DX256_DY256_CX128_CY128.png",
    type: "processing",
    tags: ["hardware", "cpu", "case", "core"]
  },
  {
    id: "screen",
    name: "Screen",
    phonetic: "/skriːn/",
    category: "Output Device",
    categoryGreek: "Συσκευή Εξόδου",
    greek: "Οθόνη",
    description: "The display monitor that shows text, pictures, videos, and games using millions of tiny colored pixels.",
    funFact: "A modern screen can refresh up to 240 times every single second to make animations ultra smooth!",
    audio: "story_content/6MorzrFgnh2_22050_48_0.mp3",
    image: "assets/images/screen.jpg",
    legacyImage: "mobile/5hw3LW46And_80_DX256_DY256_CX128_CY128.png",
    type: "output",
    tags: ["display", "monitor", "visuals", "output"]
  },
  {
    id: "keyboard",
    name: "Keyboard",
    phonetic: "/ˈkiː.bɔːd/",
    category: "Input Device",
    categoryGreek: "Συσκευή Εισόδου",
    greek: "Πληκτρολόγιο",
    description: "The input panel with alphabet letters, numbers, and function keys used to type text and send commands to the computer.",
    funFact: "The standard letter arrangement is called QWERTY, originally created for mechanical typewriters in 1873!",
    audio: "story_content/6TC52fcHbXl_22050_48_0.mp3",
    image: "assets/images/keyboard.jpg",
    legacyImage: "mobile/5YCWsiwKwVf_80_DX256_DY256_CX128_CY128.png",
    type: "input",
    tags: ["typing", "input", "keys", "qwerty"]
  },
  {
    id: "mouse",
    name: "Mouse",
    phonetic: "/maʊs/",
    category: "Input Device",
    categoryGreek: "Συσκευή Εισόδου",
    greek: "Ποντίκι",
    description: "A hand-held pointing tool that lets you move the digital cursor on your screen, click icons, and drag files.",
    funFact: "The very first computer mouse was invented in 1964 by Douglas Engelbart and was carved out of wood!",
    audio: "story_content/6Cqq2Hv3D0Z_22050_48_0.mp3",
    image: "assets/images/mouse.jpg",
    legacyImage: "mobile/6E7MznAWmNX_80_DX160_DY160_CX120_CY120.png",
    type: "input",
    tags: ["click", "cursor", "pointer", "input"]
  },
  {
    id: "mousepad",
    name: "Mouse pad",
    phonetic: "/ˈmaʊs ˌpæd/",
    category: "Accessory",
    categoryGreek: "Αξεσουάρ",
    greek: "Επιφάνεια Ποντικιού (Mousepad)",
    description: "A smooth, non-slip mat placed under your mouse for fluid, precise optical sensor movement and desk protection.",
    funFact: "Gaming mouse pads often feature micro-textured cloth surfaces and RGB neon illumination around the edge!",
    audio: "story_content/61b8iaBQB6U_22050_48_0.mp3",
    image: "assets/images/mousepad.jpg",
    legacyImage: "mobile/5V7J9x6f98N_FFFFFF_80_DX270_DY270_CX202_CY120.png",
    type: "accessory",
    tags: ["mat", "desk", "precision", "accessory"]
  },
  {
    id: "speaker",
    name: "Speaker",
    phonetic: "/ˈspiː.kər/",
    category: "Output Device",
    categoryGreek: "Συσκευή Εξόδου",
    greek: "Ηχείο",
    description: "An audio device that converts digital audio signals from the computer into clear sound, music, and voice.",
    funFact: "Stereo speakers create a 3D soundstage by playing different audio frequencies into your left and right ears.",
    audio: "story_content/6hs1TMo0hOv_22050_48_0.mp3",
    image: "assets/images/speaker.jpg",
    legacyImage: "mobile/6IX8t8TuqlJ_X_80_DX188_DY188_CX128_CY128.png",
    type: "output",
    tags: ["audio", "sound", "music", "output"]
  },
  {
    id: "camera",
    name: "Camera",
    phonetic: "/ˈkæm.rə/",
    category: "Input Device",
    categoryGreek: "Συσκευή Εισόδου",
    greek: "Κάμερα (Webcam)",
    description: "A compact digital video camera attached to your computer to capture live video for school calls, streams, and photos.",
    funFact: "The first webcam was installed at Cambridge University in 1991 to monitor if the lab's coffee pot was empty!",
    audio: "story_content/6FQ8NnUTJVp_22050_48_0.mp3",
    image: "assets/images/camera.jpg",
    legacyImage: "mobile/5jkvyErZnDL_X_80_DX160_DY160_CX120_CY120.png",
    type: "input",
    tags: ["webcam", "video", "calling", "input"]
  },
  {
    id: "microphone",
    name: "Microphone",
    phonetic: "/ˈmaɪ.krə.fəʊn/",
    category: "Input Device",
    categoryGreek: "Συσκευή Εισόδου",
    greek: "Μικρόφωνο",
    description: "An audio input device that captures acoustic sound waves from your voice and transforms them into digital speech.",
    funFact: "Microphones use tiny vibrating diaphragms just like your human eardrum to capture sound vibrations!",
    audio: "story_content/5b4oBfFeOU9_22050_48_0.mp3",
    image: "assets/images/microphone.jpg",
    legacyImage: "mobile/6guugxgFBI6_80_DX186_DY186_CX128_CY128.png",
    type: "input",
    tags: ["mic", "voice", "recording", "input"]
  },
  {
    id: "headset",
    name: "Headset",
    phonetic: "/ˈhed.set/",
    category: "Input & Output",
    categoryGreek: "Είσοδος & Έξοδος",
    greek: "Σετ Ακουστικών με Μικρόφωνο",
    description: "A combination of headphones and a boom microphone in a single wearable unit, ideal for interactive communication.",
    funFact: "Air traffic controllers, pilots, gamers, and online students all rely on headsets for hands-free talk and listen.",
    audio: "story_content/5mOGO1aVTMV_22050_48_0.mp3",
    image: "assets/images/headset.jpg",
    legacyImage: "mobile/5fzOejNDsGQ_80_DX448_DY448_CX256_CY256.png",
    type: "hybrid",
    tags: ["communication", "gaming", "calls", "audio"]
  },
  {
    id: "scanner",
    name: "Scanner",
    phonetic: "/ˈskæn.ər/",
    category: "Input Device",
    categoryGreek: "Συσκευή Εισόδου",
    greek: "Σαρωτής",
    description: "An optical input device that scans physical paper documents, drawings, or photos into digital computer images.",
    funFact: "A scanner shines a bright beam of light across the page and measures reflected light using a sensor array!",
    audio: "story_content/5ngEzpStQf9_22050_48_0.mp3",
    image: "assets/images/scanner.jpg",
    legacyImage: "mobile/5ehwNd7wUbT_80_DX256_DY256_CX128_CY128.png",
    type: "input",
    tags: ["documents", "photos", "digitize", "input"]
  },
  {
    id: "printer",
    name: "Printer",
    phonetic: "/ˈprɪn.tər/",
    category: "Output Device",
    categoryGreek: "Συσκευή Εξόδου",
    greek: "Εκτυπωτής",
    description: "An output machine that transfers computer text and graphics onto physical paper sheets using ink or laser toner.",
    funFact: "Laser printers use static electricity and powdered toner melted at over 200°C to print crisp pages in seconds!",
    audio: "story_content/61MFEolQFwT_22050_48_0.mp3",
    image: "assets/images/printer.jpg",
    legacyImage: "mobile/6MvOkn1rUSt_80_DX256_DY256_CX128_CY128.png",
    type: "output",
    tags: ["paper", "ink", "laser", "output"]
  },
  {
    id: "headphones",
    name: "Headphones",
    phonetic: "/ˈhed.fəʊnz/",
    category: "Output Device",
    categoryGreek: "Συσκευή Εξόδου",
    greek: "Ακουστικά",
    description: "A pair of cushioned audio speakers worn over or inside your ears for private, immersive sound and music enjoyment.",
    funFact: "Active noise-cancelling headphones generate inverted sound waves to cancel out background airplane and traffic drone!",
    audio: "story_content/64m6IRHVkFb_22050_48_0.mp3",
    image: "assets/images/headphones.jpg",
    legacyImage: "mobile/6ejDMofbSOB_80_DX256_DY256_CX128_CY128.png",
    type: "output",
    tags: ["listening", "audio", "music", "output"]
  },
  {
    id: "cd",
    name: "CD",
    phonetic: "/ˌsiːˈdiː/",
    category: "Storage Media",
    categoryGreek: "Μέσο Αποθήκευσης",
    greek: "Οπτικός Δίσκος (CD / DVD)",
    description: "A shiny optical disc that stores digital data and music read by an infrared laser beam in a computer disc drive.",
    funFact: "A standard CD holds about 700 MB of data, which equals roughly 80 minutes of uncompressed stereo music!",
    audio: "story_content/5wEj3oTOVSp_22050_48_0.mp3",
    image: "assets/images/cd.jpg",
    legacyImage: "mobile/6MirRvMRxiP_80_DX272_DY272_CX204_CY204.png",
    type: "storage",
    tags: ["disc", "optical", "laser", "storage"]
  },
  {
    id: "usbstick",
    name: "USB stick",
    phonetic: "/ˌjuː.esˈbiː stɪk/",
    category: "Storage Media",
    categoryGreek: "Μέσο Αποθήκευσης",
    greek: "Μνήμη USB (Flash drive / Flashάκι)",
    description: "A portable, pocket-sized flash storage drive that plugs directly into a computer USB port to carry and transfer files.",
    funFact: "USB stands for Universal Serial Bus! Flash memory has no moving parts and keeps data safe for decades.",
    audio: "story_content/5xcmVPXlzS2_22050_48_0.mp3",
    image: "assets/images/usbstick.jpg",
    legacyImage: "mobile/6ZlFOhRkQ9N_80_DX134_DY134_CX100_CY100.png",
    type: "storage",
    tags: ["flash", "drive", "portable", "storage"]
  }
];

const SYSTEM_AUDIO = {
  welcome: "story_content/6GniNyvnfAi_22050_48_0.mp3",
  title: "story_content/6XMZWLSQXV9_22050_48_0.mp3"
};

const CATEGORIES = [
  { id: "all", label: "All Items", labelGreek: "Όλα" },
  { id: "input", label: "Input Devices", labelGreek: "Συσκευές Εισόδου" },
  { id: "output", label: "Output Devices", labelGreek: "Συσκευές Εξόδου" },
  { id: "core", label: "Core Processing", labelGreek: "Κεντρική Μονάδα" },
  { id: "storage", label: "Storage Media", labelGreek: "Μέσα Αποθήκευσης" },
  { id: "accessory", label: "Accessories", labelGreek: "Αξεσουάρ" }
];

if (typeof window !== "undefined") {
  window.VOCABULARY_DATA = VOCABULARY_DATA;
  window.SYSTEM_AUDIO = SYSTEM_AUDIO;
  window.CATEGORIES = CATEGORIES;
}
