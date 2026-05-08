export type DiaryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Painting = {
  title: string;
  year: string;
  medium: string;
  image: DiaryImage;
};

export type DiaryDay = {
  day: number;
  date: string;
  location: string;
  title: string;
  summary: string;
  story: string[];
  people: string[];
  places: string[];
  activities: string[];
  paintings: Painting[];
  images: DiaryImage[];
};

const placeholder = (folder: string, name: string) => `/images/${folder}/${name}.svg`;

export const featuredPaintings: Painting[] = [
  {
    title: "Pilgrim Light",
    year: "2026",
    medium: "Acrylic and mixed media on canvas",
    image: {
      src: placeholder("paintings", "pilgrim-light"),
      alt: "Abstract painting placeholder for Pilgrim Light",
      caption: "A luminous canvas from the Spain exhibition selection."
    }
  },
  {
    title: "Rooms Remembered",
    year: "2026",
    medium: "Oil and pigment on canvas",
    image: {
      src: placeholder("paintings", "rooms-remembered"),
      alt: "Abstract painting placeholder for Rooms Remembered",
      caption: "Interior memory translated into layered color."
    }
  },
  {
    title: "The Blue Crossing",
    year: "2026",
    medium: "Acrylic on linen",
    image: {
      src: placeholder("paintings", "blue-crossing"),
      alt: "Abstract painting placeholder for The Blue Crossing",
      caption: "A work shaped by travel, distance, and arrival."
    }
  }
];

export const fallbackDiaryDays: DiaryDay[] = [
  {
    day: 1,
    date: "Day 01",
    location: "Arrival in Madrid",
    title: "First Light After Landing",
    summary: "A quiet arrival, a new sky, and the first notes of the journey.",
    story: [
      "Omkar arrived in Spain carrying canvases, sketchbooks, and the anticipation of seeing his work live in a new cultural room. The first day moved slowly: airport light, stone streets, coffee, and the sense that every wall might become a future painting."
    ],
    people: ["Gallery coordinator", "Local host"],
    places: ["Madrid airport", "Old city streets"],
    activities: ["Arrival", "Travel notes", "First walk"],
    paintings: [featuredPaintings[0]],
    images: [
      {
        src: placeholder("journey", "day-01"),
        alt: "Madrid arrival diary image placeholder",
        caption: "Arrival notes from the first day in Spain."
      }
    ]
  },
  {
    day: 2,
    date: "Day 02",
    location: "Madrid",
    title: "Streets That Hold Color",
    summary: "Walking through plazas, museums, and surfaces that changed the palette.",
    story: [
      "The second day became a study of walls, balconies, shadows, and the human rhythm of public squares. Omkar gathered fragments for later work: ochre facades, tiled thresholds, passing conversations, and the discipline of looking without rushing."
    ],
    people: ["Museum visitor", "Street musician"],
    places: ["Plaza Mayor", "Museum quarter"],
    activities: ["Museum visit", "Sketching", "Photography"],
    paintings: [],
    images: [
      {
        src: placeholder("journey", "day-02"),
        alt: "Madrid street diary image placeholder",
        caption: "A walk through Madrid's textured public life."
      }
    ]
  },
  {
    day: 3,
    date: "Day 03",
    location: "Toledo",
    title: "Stone, Gold, And Silence",
    summary: "A day shaped by old city light and the patience of historic spaces.",
    story: [
      "Toledo offered a different tempo. Narrow lanes, cathedral interiors, and the meeting of cultures gave the journey a reflective depth. The day became less about movement and more about absorbing how history sits inside color."
    ],
    people: ["Local guide", "Fellow artist"],
    places: ["Toledo old town", "Cathedral district"],
    activities: ["Day trip", "Architectural study", "Journal writing"],
    paintings: [],
    images: [
      {
        src: placeholder("journey", "day-03"),
        alt: "Toledo diary image placeholder",
        caption: "Historic streets and warm stone in Toledo."
      }
    ]
  },
  {
    day: 4,
    date: "Day 04",
    location: "Gallery Preparation",
    title: "The Work Meets The Room",
    summary: "Unpacking, placement, scale, and the first conversation between canvas and wall.",
    story: [
      "The exhibition began to take physical form. Paintings were unwrapped, leaned, measured, and moved until the room started to speak. Omkar watched how each canvas changed under Spanish light and how the sequence affected the emotional temperature of the show."
    ],
    people: ["Curator", "Gallery installation team"],
    places: ["Exhibition venue", "Back room"],
    activities: ["Unpacking artworks", "Curation", "Installation planning"],
    paintings: [featuredPaintings[0], featuredPaintings[1]],
    images: [
      {
        src: placeholder("places", "gallery-room"),
        alt: "Gallery room placeholder",
        caption: "The gallery before opening, with the exhibition taking shape."
      }
    ]
  },
  {
    day: 5,
    date: "Day 05",
    location: "Exhibition Opening",
    title: "A Room Full Of Witnesses",
    summary: "Opening night brought viewers, questions, pauses, and the work's public life.",
    story: [
      "The paintings entered conversation. Visitors stopped before surfaces, asked about memory and place, and brought their own readings into the room. The opening turned the journey outward, from private studio labor into shared experience."
    ],
    people: ["Collectors", "Art students", "Gallery guests"],
    places: ["Main gallery", "Opening reception"],
    activities: ["Opening night", "Artist conversations", "Painting walkthrough"],
    paintings: featuredPaintings,
    images: [
      {
        src: placeholder("people", "opening-night"),
        alt: "Opening night people placeholder",
        caption: "Visitors gathering around the exhibited works."
      }
    ]
  },
  {
    day: 6,
    date: "Day 06",
    location: "Barcelona",
    title: "A City In Curves",
    summary: "Architecture, movement, and ornament shifted the diary into another register.",
    story: [
      "Barcelona opened through curves, mosaics, sea air, and a visual energy different from Madrid. Omkar followed details across buildings and streets, noticing how decoration could feel both disciplined and alive."
    ],
    people: ["Architectural guide", "Cafe owner"],
    places: ["Eixample", "Gothic Quarter"],
    activities: ["City walk", "Architecture study", "Cafe notes"],
    paintings: [],
    images: [
      {
        src: placeholder("journey", "day-06"),
        alt: "Barcelona diary image placeholder",
        caption: "Barcelona's lines, corners, and ornamental rhythm."
      }
    ]
  },
  {
    day: 7,
    date: "Day 07",
    location: "Barcelona",
    title: "Meeting Other Practices",
    summary: "Studio visits and conversations with artists widened the trip's vocabulary.",
    story: [
      "The seventh day centered on exchange. Omkar met artists working across media and listened to how they spoke about discipline, place, and audience. The conversations returned him to his own work with sharper questions."
    ],
    people: ["Spanish artists", "Studio assistant"],
    places: ["Artist studio", "Independent gallery"],
    activities: ["Studio visit", "Peer conversations", "Notebook reflections"],
    paintings: [],
    images: [
      {
        src: placeholder("people", "studio-visit"),
        alt: "Studio visit people placeholder",
        caption: "A studio exchange with local artists."
      }
    ]
  },
  {
    day: 8,
    date: "Day 08",
    location: "Valencia",
    title: "Between Market And Sea",
    summary: "Food, ceramics, sunlight, and the nearness of water shaped the middle of the journey.",
    story: [
      "Valencia brought sensory abundance: market color, ceramic patterns, citrus, and sea wind. Omkar's diary widened beyond museums into daily life, where texture and gesture appeared without announcement."
    ],
    people: ["Market vendor", "Ceramic artisan"],
    places: ["Central market", "Old town", "Seafront"],
    activities: ["Market visit", "Material study", "Evening walk"],
    paintings: [],
    images: [
      {
        src: placeholder("journey", "day-08"),
        alt: "Valencia diary image placeholder",
        caption: "Color studies from Valencia's market and coast."
      }
    ]
  },
  {
    day: 9,
    date: "Day 09",
    location: "Valencia",
    title: "Sketches In Transit",
    summary: "A quieter day of trains, drawings, and thoughts between destinations.",
    story: [
      "Travel time became studio time. In stations and moving seats, Omkar sketched quickly and wrote about the difference between planned looking and accidental seeing. The diary held small observations that might later become large paintings."
    ],
    people: ["Train passenger", "Station attendant"],
    places: ["Rail station", "Train carriage"],
    activities: ["Transit", "Sketching", "Voice notes"],
    paintings: [],
    images: [
      {
        src: placeholder("journey", "day-09"),
        alt: "Transit sketch diary placeholder",
        caption: "Sketches and notes made between cities."
      }
    ]
  },
  {
    day: 10,
    date: "Day 10",
    location: "Seville",
    title: "Heat, Rhythm, And Courtyards",
    summary: "Southern Spain brought sound, pattern, and a different emotional temperature.",
    story: [
      "Seville felt theatrical without needing a stage. Courtyards, tiles, late light, and music in the street introduced a warmer intensity. Omkar's notes turned toward rhythm: repetition, interruption, and the body moving through space."
    ],
    people: ["Performer", "Local family"],
    places: ["Santa Cruz", "Courtyard house"],
    activities: ["Neighborhood walk", "Pattern photography", "Music listening"],
    paintings: [],
    images: [
      {
        src: placeholder("journey", "day-10"),
        alt: "Seville diary image placeholder",
        caption: "Seville's courtyards and patterned surfaces."
      }
    ]
  },
  {
    day: 11,
    date: "Day 11",
    location: "Seville",
    title: "Conversations After The Show",
    summary: "Messages, meetings, and reflections followed the exhibition's first responses.",
    story: [
      "Feedback from the exhibition continued to arrive. Some viewers spoke of memory, some of landscape, others of prayer and migration. Omkar collected these responses carefully, treating them as part of the work's life beyond the studio."
    ],
    people: ["Curator", "Writer", "Gallery visitor"],
    places: ["Cafe table", "Gallery office"],
    activities: ["Follow-up meetings", "Interview notes", "Reflection"],
    paintings: [featuredPaintings[1]],
    images: [
      {
        src: placeholder("people", "conversation"),
        alt: "Conversation diary placeholder",
        caption: "Post-exhibition conversations and written responses."
      }
    ]
  },
  {
    day: 12,
    date: "Day 12",
    location: "Granada",
    title: "Gardens Of Memory",
    summary: "A day of gardens, water, and the geometry of remembrance.",
    story: [
      "Granada added another layer to the diary: water sounds, garden paths, carved surfaces, and long views. Omkar traced how repetition can soften into meditation when held by architecture and landscape."
    ],
    people: ["Garden guide", "Student traveler"],
    places: ["Historic gardens", "Hilltop view"],
    activities: ["Garden walk", "Sound notes", "Color study"],
    paintings: [],
    images: [
      {
        src: placeholder("journey", "day-12"),
        alt: "Granada diary image placeholder",
        caption: "Gardens, water, and layered memory in Granada."
      }
    ]
  },
  {
    day: 13,
    date: "Day 13",
    location: "Granada",
    title: "A Small Table Of Drawings",
    summary: "The journey folded inward through sketches, sorting, and private review.",
    story: [
      "Omkar laid out drawings, tickets, photos, and written scraps like a temporary archive. Patterns emerged across the days: thresholds, hands, windows, blue distances, and the repeated surprise of being hosted by strangers."
    ],
    people: ["Travel companion", "Hotel host"],
    places: ["Guest room", "Nearby square"],
    activities: ["Archive sorting", "Drawing review", "Diary editing"],
    paintings: [],
    images: [
      {
        src: placeholder("journey", "day-13"),
        alt: "Diary table image placeholder",
        caption: "A table of sketches, receipts, and daily fragments."
      }
    ]
  },
  {
    day: 14,
    date: "Day 14",
    location: "Return To Madrid",
    title: "The Last Full Day",
    summary: "Returning to the beginning with a changed eye and a fuller notebook.",
    story: [
      "Back in Madrid, the first city no longer felt like an introduction. Omkar moved through it with accumulated attention, carrying traces of every place visited. The day became a rehearsal for return: what to carry home, what to leave open."
    ],
    people: ["Bookshop owner", "Gallery friend"],
    places: ["Bookshop", "Evening plaza"],
    activities: ["Book browsing", "Final walk", "Packing artworks"],
    paintings: [featuredPaintings[2]],
    images: [
      {
        src: placeholder("journey", "day-14"),
        alt: "Return to Madrid diary placeholder",
        caption: "Madrid seen again after two weeks of travel."
      }
    ]
  },
  {
    day: 15,
    date: "Day 15",
    location: "Departure",
    title: "What Travels Back",
    summary: "The journey closed with packed canvases, full notebooks, and unfinished questions.",
    story: [
      "The final day was not an ending as much as a compression. Paintings, photographs, voices, and landscapes travelled back with Omkar. The Spain diary became a record of exhibition, encounter, and the quiet ways a journey keeps working after it is over."
    ],
    people: ["Airport staff", "Farewell host"],
    places: ["Madrid airport", "Departure gate"],
    activities: ["Departure", "Final notes", "Archive backup"],
    paintings: featuredPaintings,
    images: [
      {
        src: placeholder("journey", "day-15"),
        alt: "Departure diary image placeholder",
        caption: "The journey returning home as image, text, and memory."
      }
    ]
  }
];
