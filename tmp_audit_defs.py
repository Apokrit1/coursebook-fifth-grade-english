# Unit 1 Vocabulary Definition Auditor
vocab_items = [
    {"word": "computer", "def": "an electronic machine for working with data and the internet"},
    {"word": "screen", "def": "the glass part of a computer that shows pictures and words"},
    {"word": "mouse", "def": "a small device you move with your hand to click on a computer"},
    {"word": "keyboard", "def": "a board with letters and numbers used to write on a computer"},
    {"word": "printer", "def": "a machine that prints words and pictures on paper"},
    {"word": "scanner", "def": "a machine that copies pictures into a computer"},
    {"word": "tower", "def": "the tall box of a desktop computer with the main parts"},
    {"word": "microphone", "def": "a small tool you speak into to record your voice"},
    {"word": "headphones", "def": "a pair of small speakers you wear over your ears"},
    {"word": "speaker", "def": "a device that plays sounds from a computer"},
    {"word": "internet", "def": "a world network that connects computers together"},
    {"word": "email", "def": "a message sent through the internet from one computer to another"},
    {"word": "website", "def": "a place on the internet with pictures and information"},
    {"word": "online", "def": "connected to the internet or available on the computer network"},
    {"word": "chat", "def": "to talk in a friendly way with someone online or in person"},
    {"word": "surf the net", "def": "to look at different websites on the internet"},
    {"word": "information", "def": "facts or details about a person, place, or thing"},
    {"word": "send", "def": "to make a message or letter go to someone else"},
    {"word": "receive", "def": "to get something that someone sends to you"},
    {"word": "free time", "def": "time when you do not have to work or study"},
    {"word": "hobby", "def": "an activity you enjoy doing in your free time"},
    {"word": "prefer", "def": "to like one thing more than another thing"},
    {"word": "enjoy", "def": "to feel happy when you do an activity"},
    {"word": "hate", "def": "to dislike something very much"},
    {"word": "study", "def": "to learn about a subject at school or at home"},
    {"word": "homework", "def": "school work that pupils do at home after class"},
    {"word": "test", "def": "a set of questions to see how much you know"},
    {"word": "pupil", "def": "a child who is learning at a primary school"},
    {"word": "student", "def": "a person who studies at a school or college"},
    {"word": "primary school", "def": "a school for children aged between 5 and 11"},
    {"word": "draw", "def": "to make pictures with a pen or pencil"},
    {"word": "puzzle", "def": "a game or problem that tests your clever thinking"},
    {"word": "sport", "def": "a physical game like football or tennis that you play"},
    {"word": "housework", "def": "cleaning and cooking that people do at home"},
    {"word": "jog", "def": "to run slowly for exercise and good health"},
    {"word": "paint", "def": "to make a picture using liquid colors and a brush"},
    {"word": "country", "def": "an area of land with its own people and government"},
    {"word": "nationality", "def": "the country that a person belongs to by law"},
    {"word": "capital", "def": "the main city where the government of a country works"},
    {"word": "flag", "def": "a piece of cloth with special colors that represents a country"},
    {"word": "island", "def": "a piece of land with water all around it"},
    {"word": "population", "def": "the total number of people living in a place"},
    {"word": "border", "def": "to touch the edge of another country on a map"},
    {"word": "symbol", "def": "a sign or object that represents an idea or country"},
    {"word": "national flower", "def": "a special flower that represents a nation"},
    {"word": "rose", "def": "a sweet-smelling flower that is the symbol of England"},
    {"word": "daffodil", "def": "a yellow spring flower that is the symbol of Wales"},
    {"word": "thistle", "def": "a prickly purple plant that is the symbol of Scotland"},
    {"word": "shamrock", "def": "a small plant with three green leaves that represents Ireland"},
    {"word": "United Kingdom", "def": "the country of England, Scotland, Wales, and Northern Ireland"},
    {"word": "Great Britain", "def": "the large island with England, Scotland, and Wales"},
    {"word": "British", "def": "relating to Great Britain and its people"},
    {"word": "Greek", "def": "relating to Greece, its people, or its language"},
    {"word": "French", "def": "relating to France, its people, or its language"},
    {"word": "Spanish", "def": "relating to Spain, its people, or its language"},
    {"word": "Italian", "def": "relating to Italy, its people, or its language"},
    {"word": "German", "def": "relating to Germany, its people, or its language"},
    {"word": "Dutch", "def": "relating to Holland, its people, or its language"},
    {"word": "Russian", "def": "relating to Russia, its people, or its language"},
    {"word": "Swiss", "def": "relating to Switzerland, its people, or its language"},
    {"word": "Albanian", "def": "relating to Albania, its people, or its language"},
    {"word": "Portuguese", "def": "relating to Portugal, its people, or its language"}
]

max_len = 0
over_14 = []
for item in vocab_items:
    words = item['def'].split()
    if len(words) > 14:
        over_14.append((item['word'], len(words), item['def']))
    if len(words) > max_len:
        max_len = len(words)

print(f"Total vocabulary items: {len(vocab_items)}")
print(f"Max word count: {max_len}")
print(f"Definitions > 14 words: {len(over_14)}")
if over_14:
    for w, c, d in over_14:
        print(f"  {w}: {c} words -> '{d}'")
else:
    print("ALL DEFINITIONS PASS THE <= 14 WORD RULE!")
