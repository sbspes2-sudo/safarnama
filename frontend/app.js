/* Safarnama - front-end travel concept. All rates are dated examples from
   named sources, checked 30 Oct 2026 - not live quotes. No bookings happen here. */
(function () {
  'use strict';

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  var DESTINATIONS = [
    {
      id: 'agra', name: 'Agra', state: 'Uttar Pradesh', region: 'north',
      vibes: ['heritage', 'culture'],
      blurb: 'Home of the Taj Mahal - marble at sunrise, Mughal forts, and a city built around wonder.',
      photo: 'photos/agra.jpg', alt: 'The Taj Mahal in Agra',
      best: 'Oct - Mar', months: [9, 10, 11, 0, 1, 2],
      festival: { name: 'Taj Mahotsav', when: '18 - 27 Feb every year', note: 'Ten days of crafts, food, dance and music at Shilpgram, by the Taj (incredibleindia.gov.in).' },
      ideal: '2 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Gatimaan Express, New Delhi to Agra - about 100 min', fare: 'check current fare', source: 'IRCTC', url: 'https://www.irctc.co.in' },
        { text: 'Yamuna Expressway from Delhi by road', fare: 'about 3.5 hrs drive' }
      ],
      places: ['Taj Mahal at sunrise', 'Agra Fort', 'Mehtab Bagh across the Yamuna', 'Fatehpur Sikri day trip']
    },
    {
      id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', region: 'north',
      vibes: ['heritage', 'culture'],
      blurb: 'The Pink City - hilltop forts, palace facades, bazaars of gems and block prints.',
      photo: 'photos/jaipur.jpg', alt: 'Amber Fort, Jaipur',
      best: 'Oct - Mar', months: [9, 10, 11, 0, 1, 2],
      festival: { name: 'Jaipur Literature Festival', when: 'January', note: 'Five days of authors and ideas at Diggi Palace, billed as the world\'s largest free literary festival.' },
      ideal: '3 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Vande Bharat, Delhi to Jaipur', fare: '3 hrs 37 min', source: 'DNA India' },
        { text: 'By road from Delhi via NH48', fare: 'about 5 hrs drive' }
      ],
      places: ['Amber Fort', 'Hawa Mahal', 'City Palace and Jantar Mantar', 'Nahargarh Fort at sunset']
    },
    {
      id: 'udaipur', name: 'Udaipur', state: 'Rajasthan', region: 'west',
      vibes: ['heritage', 'culture'],
      blurb: 'Lakes, white palaces and rooftop dinners - Rajasthan at its most romantic.',
      photo: 'photos/udaipur.jpg', alt: 'City Palace of Udaipur',
      credit: 'Photo: Hirumon, Wikimedia Commons',
      best: 'Sep - Mar', months: [8, 9, 10, 11, 0, 1, 2],
      festival: { name: 'Mewar Festival (Gangaur)', when: 'Mar - Apr', note: 'Processions, song and decorated boats welcoming spring on Lake Pichola.' },
      ideal: '3 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Flight, New Delhi to Udaipur', fare: 'check live fares', source: 'Google Flights', url: 'https://www.google.com/travel/flights?q=flights+from+New+Delhi+to+Udaipur' },
        { text: 'Flight, Mumbai to Udaipur', fare: 'check live fares', source: 'Google Flights', url: 'https://www.google.com/travel/flights?q=flights+from+Mumbai+to+Udaipur' }
      ],
      places: ['City Palace', 'Lake Pichola boat ride', 'Jag Mandir island', 'Saheliyon ki Bari']
    },
    {
      id: 'amritsar', name: 'Amritsar', state: 'Punjab', region: 'north',
      vibes: ['culture', 'heritage'],
      blurb: 'The Golden Temple shimmering at dusk, langar for all, and the beating retreat at Wagah.',
      photo: 'photos/amritsar.jpg', alt: 'The Golden Temple in Amritsar',
      best: 'Oct - Mar', months: [9, 10, 11, 0, 1, 2],
      festival: { name: 'Baisakhi', when: '13 - 14 Apr', note: 'Punjab\'s harvest festival - the Golden Temple glows, the city dances.' },
      ideal: '2 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Vande Bharat, Delhi to Amritsar Jn', fare: 'daily service', source: 'erail.in' },
        { text: 'By road from Delhi via NH44', fare: 'about 8 hrs drive' }
      ],
      places: ['Golden Temple at dawn and dusk', 'Jallianwala Bagh', 'Wagah border ceremony', 'Partition Museum']
    },
    {
      id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', region: 'north',
      vibes: ['culture', 'heritage'],
      blurb: 'One of the world\'s oldest living cities - ghats, aarti flames and dawn boats on the Ganga.',
      photo: 'photos/varanasi.jpg', alt: 'Ghats of Varanasi on the Ganga',
      best: 'Nov - Feb', months: [10, 11, 0, 1],
      festival: { name: 'Dev Deepawali', when: 'Nov, 15 days after Diwali', note: 'A million lamps line every ghat - Varanasi\'s most photographed night.' },
      ideal: '2 - 3 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Flight, New Delhi to Varanasi', fare: 'check live fares', source: 'Google Flights', url: 'https://www.google.com/travel/flights?q=flights+from+New+Delhi+to+Varanasi' },
        { text: 'Vande Bharat, Delhi to Varanasi', fare: 'day train', source: 'vBooking' }
      ],
      places: ['Ganga aarti at Dashashwamedh Ghat', 'Sunrise boat ride past the ghats', 'Kashi Vishwanath corridor', 'Sarnath, where Buddha first taught']
    },
    {
      id: 'leh', name: 'Leh & Ladakh', state: 'Ladakh', region: 'north',
      vibes: ['mountains', 'adventure'],
      blurb: 'High desert passes, turquoise lakes and monasteries above the clouds.',
      photo: 'photos/ladakh.jpg', alt: 'Mountains of Ladakh',
      best: 'May - Sep', months: [4, 5, 6, 7, 8],
      festival: { name: 'Hemis Tsechu', when: 'Jun - Jul', note: 'Masked cham dances at Hemis Monastery, Ladakh\'s grandest monastic festival (incredibleindia.gov.in).' },
      ideal: '5 - 7 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Flight, New Delhi to Leh - one-way economy, 28 Nov 2026', fare: 'from $77.60', source: 'Duffel live quote, 30 Oct' },
        { text: 'Flight, Mumbai to Leh', fare: 'check live fares', source: 'Google Flights', url: 'https://www.google.com/travel/flights?q=flights+from+Mumbai+to+Leh' }
      ],
      places: ['Pangong Lake', 'Nubra Valley and the dunes at Hunder', 'Shanti Stupa at sunset', 'Hemis and Thiksey monasteries']
    },
    {
      id: 'manali', name: 'Manali', state: 'Himachal Pradesh', region: 'north',
      vibes: ['mountains', 'adventure'],
      blurb: 'Cedar forests, snow points and café-lined old town lanes in the Kullu valley.',
      photo: 'photos/manali.jpg', alt: 'Mountains near Manali',
      credit: 'Photo: Shameer Thajudeen, Wikimedia Commons',
      best: 'Oct - Jun', months: [9, 10, 11, 0, 1, 2, 3, 4, 5],
      festival: { name: 'International Kullu Dussehra', when: 'October each year', note: 'A week of deities, drums and fairs in nearby Kullu; the 2026 edition ran 21 - 27 Oct (hpkullu.nic.in).' },
      ideal: '3 - 4 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Flight, New Delhi to Kullu (Bhuntar, 50 km away)', fare: 'check live fares', source: 'Google Flights', url: 'https://www.google.com/travel/flights?q=flights+from+New+Delhi+to+Kullu' },
        { text: 'Overnight Volvo bus from Delhi', fare: 'about 12 - 14 hrs' }
      ],
      places: ['Solang Valley', 'Hidimba Devi Temple', 'Old Manali lanes and cafes', 'Rohtang Pass (permit needed)']
    },
    {
      id: 'goa', name: 'Goa', state: 'Goa', region: 'west',
      vibes: ['beaches', 'culture'],
      blurb: 'Portuguese lanes, palm-backed beaches and long golden evenings on the Arabian Sea.',
      photo: 'photos/goa.jpg', alt: 'A beach in Goa',
      best: 'Nov - Feb', months: [10, 11, 0, 1],
      festival: { name: 'Goa Carnival', when: 'February', note: 'Four days of parades and music before Lent, a Portuguese-era legacy.' },
      ideal: '4 - 5 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Flight, New Delhi to Goa - one-way economy, 28 Nov 2026', fare: 'from $115.80', source: 'Duffel live quote, 30 Oct' },
        { text: 'Flight, Mumbai to Goa', fare: 'check live fares', source: 'Google Flights', url: 'https://www.google.com/travel/flights?q=flights+from+Mumbai+to+Goa' }
      ],
      places: ['Palolem and the southern beaches', 'Fontainhas, the Latin quarter', 'Fort Aguada', 'Old Goa churches']
    },
    {
      id: 'kerala', name: 'Kerala', state: 'Kerala', region: 'south',
      vibes: ['beaches', 'culture'],
      blurb: 'Backwater houseboats, tea-green hills and some of India\'s gentlest coastlines.',
      photo: 'photos/kerala.jpg', alt: 'Backwaters of Kerala',
      best: 'Sep - Mar', months: [8, 9, 10, 11, 0, 1, 2],
      festival: { name: 'Onam', when: 'Aug - Sep, ten days', note: 'Flower carpets, snake-boat races and the grand Onasadya feast (keralatourism.org).' },
      ideal: '5 - 7 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Flight, New Delhi to Kochi - one-way economy, 28 Nov 2026', fare: 'from $148.40', source: 'Duffel live quote, 30 Oct' },
        { text: 'Flight, Mumbai to Kochi', fare: 'check live fares', source: 'Google Flights', url: 'https://www.google.com/travel/flights?q=flights+from+Mumbai+to+Kochi' }
      ],
      places: ['Alleppey houseboat night', 'Fort Kochi\'s Chinese fishing nets', 'Munnar tea estates', 'Kumarakom bird sanctuary']
    },
    {
      id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', region: 'west',
      vibes: ['city', 'culture'],
      blurb: 'The maximum city - art deco sea fronts, street food, studios and impossible energy.',
      photo: 'photos/mumbai.jpg', alt: 'Gateway of India and the Taj Palace, Mumbai',
      credit: 'Photo: Mahesh I., Wikimedia Commons',
      best: 'Nov - Feb', months: [10, 11, 0, 1],
      festival: { name: 'Ganesh Chaturthi', when: 'Aug - Sep', note: 'Ten days of idols, drums and seaside immersions - Mumbai at full volume.' },
      ideal: '2 - 3 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'India\'s busiest hub', fare: 'direct flights from every major city' },
        { text: 'Trains from Delhi, Goa, the south and the north', fare: 'all classes daily' }
      ],
      places: ['Gateway of India and Colaba', 'Marine Drive after dark', 'Elephanta Caves', 'Bandra\'s street art and cafes']
    },
    {
      id: 'darjeeling', name: 'Darjeeling', state: 'West Bengal', region: 'east',
      vibes: ['mountains', 'culture'],
      blurb: 'Tea gardens, toy trains and Kanchenjunga filling the morning sky.',
      photo: 'photos/darjeeling.jpg', alt: 'Tea garden in Darjeeling',
      credit: 'Photo: Sourabh Biswas, Wikimedia Commons',
      best: 'Mar - May, Oct - Dec', months: [2, 3, 4, 9, 10, 11],
      festival: { name: 'Darjeeling Carnival', when: 'November', note: 'Ten days of music, food and tea ceremonies started by local youth (Wikipedia).' },
      ideal: '3 - 4 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Flight, New Delhi to Bagdogra (about 70 km away)', fare: 'check live fares', source: 'Google Flights', url: 'https://www.google.com/travel/flights?q=flights+from+New+Delhi+to+Bagdogra' },
        { text: 'Toy train, New Jalpaiguri to Darjeeling', fare: 'heritage ride' }
      ],
      places: ['Tiger Hill sunrise over Kanchenjunga', 'Darjeeling Himalayan Railway', 'Happy Valley tea estate', 'Batasia Loop']
    },
    {
      id: 'andaman', name: 'Andaman Islands', state: 'Andaman & Nicobar', region: 'islands',
      vibes: ['beaches', 'adventure'],
      blurb: 'Glass-clear water, coral reefs and Radhanagar, often called Asia\'s best beach.',
      photo: 'photos/andaman.jpg', alt: 'Radhanagar Beach, Havelock Island',
      credit: 'Photo: Vyacheslav Argenberg, Wikimedia Commons',
      best: 'Oct - May', months: [9, 10, 11, 0, 1, 2, 3, 4],
      festival: { name: 'Island Tourism Festival', when: '10 days from 5 Jan', note: 'Music, food stalls and island culture at Port Blair (andamantourism.gov.in).' },
      ideal: '5 - 6 days',
      stayFrom: '', staySource: '',
      getting: [
        { text: 'Flight, New Delhi to Port Blair - one-way economy, 28 Nov 2026', fare: 'from $187.50', source: 'Duffel live quote, 30 Oct' },
        { text: 'Flight, Mumbai to Port Blair', fare: 'check live fares', source: 'Google Flights', url: 'https://www.google.com/travel/flights?q=flights+from+Mumbai+to+Port+Blair' }
      ],
      places: ['Radhanagar Beach, Havelock', 'Cellular Jail light-and-sound show', 'Snorkelling at Elephant Beach', 'Neil Island\'s natural bridge']
    }
  ];

  // Live quotes pulled from Duffel on 30 Oct 2026: one-way economy, 28 Nov 2026.
  var FARES = [
    { route: 'New Delhi to Goa', fare: 'from $115.80' },
    { route: 'New Delhi to Leh', fare: 'from $77.60' },
    { route: 'New Delhi to Kochi (for Kerala)', fare: 'from $148.40' },
    { route: 'New Delhi to Port Blair (for Andaman)', fare: 'from $187.50' }
  ];


  var REGIONS = [['all', 'All India'], ['north', 'North'], ['west', 'West'], ['south', 'South'], ['east', 'East'], ['islands', 'Islands']];
  var VIBES = [['all', 'Every mood'], ['mountains', 'Mountains'], ['beaches', 'Beaches'], ['heritage', 'Heritage'], ['culture', 'Culture'], ['city', 'City'], ['adventure', 'Adventure']];

  var state = { region: 'all', vibe: 'all', month: null, query: '' };
  var $ = function (s) { return document.querySelector(s); };
  // In the hosted preview, bundled asset URLs are provided for the relative
  // photo paths; standalone, the photos/ folder next to index.html is used.
  var PHOTO_URLS = window.__SAFARNAMA_PHOTOS__ || {};
  function photoUrl(p) { return PHOTO_URLS[p] || p; }

  // All 28 states + 8 UTs: recurring season and festival guidance (festival
  // timing mostly follows the lunar calendar; confirm exact dates per year).
  var STATES = [
    ['Andhra Pradesh', 'Nov - Feb', 'Sankranti', 'January', 'https://utsav.gov.in/view-event/sankranti-festival-1'],
    ['Arunachal Pradesh', 'Oct - Apr', 'Ziro Festival of Music', 'September', 'https://zirofestival.com'],
    ['Assam', 'Oct - Apr', 'Bohag Bihu', 'April', 'https://assamtourism.gov.in/april.php'],
    ['Bihar', 'Oct - Mar', 'Chhath Puja', 'Oct - Nov', 'https://www.incredibleindia.gov.in/en/festivals-and-events/chhath-puja'],
    ['Chhattisgarh', 'Oct - Mar', 'Bastar Dussehra', 'Sep - Oct', 'https://www.incredibleindia.gov.in/en/festivals-and-events/chhattisgarh/bastar-dussehra'],
    ['Goa', 'Nov - Feb', 'Goa Carnival', 'February', 'https://www.incredibleindia.gov.in/en/festivals-and-events/goa/carnaval'],
    ['Gujarat', 'Nov - Feb', 'Rann Utsav', 'Nov - Feb', 'https://www.rannutsavgujarat.in/'],
    ['Haryana', 'Oct - Mar', 'Surajkund Crafts Mela', 'February', 'https://haryanatourism.gov.in/fair-and-festivals/surajkund-international-craft-mela/'],
    ['Himachal Pradesh', 'Oct - Jun', 'Kullu Dussehra', 'October', 'https://hpkullu.nic.in/whats-new/fairs-festivals/'],
    ['Jharkhand', 'Oct - Mar', 'Sarhul', 'Mar - Apr', 'https://tourism.jharkhand.gov.in/festivals'],
    ['Karnataka', 'Oct - Feb', 'Mysuru Dasara', 'Sep - Oct', 'https://mysurudasara.org/about'],
    ['Kerala', 'Sep - Mar', 'Onam', 'Aug - Sep', 'https://www.keralatourism.org/onam-festival'],
    ['Madhya Pradesh', 'Oct - Mar', 'Khajuraho Dance Festival', 'February', 'https://www.mptourism.com/khajuraho-dance-festival.htm'],
    ['Maharashtra', 'Nov - Feb', 'Ganesh Chaturthi', 'Aug - Sep', 'https://www.incredibleindia.gov.in/en/maharashtra/mumbai/experiencing-the-essence-of-ganesh-chaturthi'],
    ['Manipur', 'Oct - Mar', 'Sangai Festival', '21 - 30 Nov', 'https://www.utsav.gov.in/view-event/manipur-sangai-festival-2025'],
    ['Meghalaya', 'Oct - May', 'Wangala', 'November', 'https://www.meghalaya.gov.in/wangala'],
    ['Mizoram', 'Oct - Mar', 'Chapchar Kut', 'March', 'https://aizawl.nic.in/festival/chapchar-kut-festival/'],
    ['Nagaland', 'Oct - May', 'Hornbill Festival', '1 - 10 Dec', 'https://tourism.nagaland.gov.in/events/hornbill-festival/'],
    ['Odisha', 'Oct - Feb', 'Konark Festival', 'December', 'https://odishatourism.gov.in/en/konark-festival'],
    ['Punjab', 'Oct - Mar', 'Baisakhi', '13 - 14 Apr', 'https://punjabtourism.punjab.gov.in/baisakhi.php'],
    ['Rajasthan', 'Oct - Mar', 'Pushkar Camel Fair', 'Oct - Nov', 'https://www.incredibleindia.gov.in/en/festivals-and-events/pushkar-camel-fair'],
    ['Sikkim', 'Mar - Jun, Oct - Dec', 'Saga Dawa', 'May - Jun', 'http://sikkimtourism.gov.in/Public/ExperienceSikkim/FairsAndFestivalDetails/FF20A077?type=Festival'],
    ['Tamil Nadu', 'Nov - Feb', 'Pongal', 'January', 'https://en.wikipedia.org/wiki/Pongal_(festival)'],
    ['Telangana', 'Nov - Feb', 'Bathukamma', 'Sep - Oct', 'https://www.incredibleindia.gov.in/en/festivals-and-events/telangana/bathukamma'],
    ['Tripura', 'Oct - Mar', 'Durga Puja', 'October', 'https://ich.unesco.org/en/RL/durga-puja-in-kolkata-00703'],
    ['Uttar Pradesh', 'Oct - Mar', 'Taj Mahotsav, Agra', '18 - 27 Feb', 'https://www.incredibleindia.gov.in/en/festivals-and-events/taj-mahotsav'],
    ['Uttarakhand', 'Mar - Jun, Sep - Nov', 'Char Dham yatra season', 'May - Oct', 'https://www.triptochardham.in/which-month-is-best-for-char-dham-yatra'],
    ['West Bengal', 'Oct - Feb', 'Durga Puja', 'October', 'https://ich.unesco.org/en/RL/durga-puja-in-kolkata-00703']
  ];
  var UTS = [
    ['Andaman & Nicobar', 'Oct - May', 'Island Tourism Festival', 'from 5 Jan', 'https://andamantourism.gov.in/festivel.php?id=MFVHNzg2T3NpTkpvbFJod0tOYTNOS3k0UWdnN1RHaXJIRitNKzFEenN6Yz0='],
    ['Chandigarh', 'Oct - Mar', 'Rose Festival', 'February', 'https://chandigarhtourism.gov.in/pages/event/52'],
    ['Dadra & Nagar Haveli and Daman & Diu', 'Nov - Feb', 'Nariyal Poornima', 'August', 'https://dded.gov.in/detail.php?id=27'],
    ['Delhi', 'Oct - Mar', 'Diwali season', 'Oct - Nov', 'https://delhitourism.gov.in/dt/festivals/diwali.html'],
    ['Jammu & Kashmir', 'Mar - Oct', 'Tulip Festival, Srinagar', 'April', 'https://srinagar.nic.in/tourist-place/tulip-garden/'],
    ['Ladakh', 'May - Sep', 'Hemis Tsechu', 'Jun - Jul', 'https://www.incredibleindia.gov.in/en/festivals-and-events/ladakh/hemis-festival'],
    ['Lakshadweep', 'Oct - May', 'Eid celebrations', 'varies by year', 'https://lakshadweep.gov.in/about-lakshadweep/culture-heritage/'],
    ['Puducherry', 'Oct - Mar', 'Pongal', 'January', 'https://www.py.gov.in/home-holiday-orders-declaration-holiday-14-01-2026-bhogi-puducherry-karaikal-and-yanam-regions-union']
  ];

  function renderStates(list, el) {
    el.innerHTML = list.map(function (s) {
      return '<div class="state-row"><span class="st-name">' + s[0] + '</span>' +
        '<span class="st-best">Best: ' + s[1] + '</span>' +
        '<span class="st-fest"><b>' + s[2] + '</b> - ' + s[3] + ' <a class="st-src" href="' + s[4] + '" target="_blank" rel="noopener">source</a></span></div>';
    }).join('');
  }
  var statesList = $('#statesList'), utsList = $('#utsList'), statesCount = $('#statesCount');
  renderStates(STATES, statesList);
  renderStates(UTS, utsList);
  statesCount.textContent = STATES.length + ' states';
  $('#stateSearch').addEventListener('input', function (e) {
    var q = e.target.value.trim().toLowerCase();
    var filtered = q ? STATES.filter(function (s) { return (s[0] + ' ' + s[2]).toLowerCase().indexOf(q) !== -1; }) : STATES;
    var filteredUts = q ? UTS.filter(function (s) { return (s[0] + ' ' + s[2]).toLowerCase().indexOf(q) !== -1; }) : UTS;
    renderStates(filtered, statesList);
    renderStates(filteredUts, utsList);
    statesCount.textContent = filtered.length + ' of ' + STATES.length + ' states' + (filteredUts.length !== UTS.length ? ' + ' + filteredUts.length + ' UTs' : '');
  });



  /* ---------- nav ---------- */
  var nav = $('#nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('is-scrolled', window.scrollY > 10);
  }, { passive: true });
  var navToggle = $('#navToggle'), navLinks = $('#navLinks');
  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { navLinks.classList.remove('is-open'); navToggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- chips ---------- */
  function buildChips(el, items, key) {
    items.forEach(function (pair) {
      var b = document.createElement('button');
      b.className = 'chip' + (pair[0] === 'all' ? ' is-active' : '');
      b.textContent = pair[1];
      b.dataset.value = pair[0];
      b.addEventListener('click', function () {
        state[key] = pair[0];
        el.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('is-active', c === b); });
        renderGrid();
      });
      el.appendChild(b);
    });
  }
  buildChips($('#regionFilters'), REGIONS, 'region');
  buildChips($('#vibeFilters'), VIBES, 'vibe');

  /* ---------- month bar ---------- */
  var monthBar = $('#monthBar'), monthNote = $('#monthNote');
  MONTHS.forEach(function (m, i) {
    var b = document.createElement('button');
    b.className = 'chip';
    b.textContent = m;
    b.addEventListener('click', function () {
      state.month = state.month === i ? null : i;
      monthBar.querySelectorAll('.chip').forEach(function (c, ci) { c.classList.toggle('is-active', ci === state.month); });
      monthNote.textContent = state.month === null
        ? ''
        : 'In ' + MONTHS[state.month] + ', the season favours the highlighted places - the rest are dimmed, not ruled out.';
      renderGrid();
    });
    monthBar.appendChild(b);
  });

  /* ---------- grid ---------- */
  function inSeason(d) { return state.month === null || d.months.indexOf(state.month) !== -1; }
  function matches(d) {
    if (state.region !== 'all' && d.region !== state.region) return false;
    if (state.vibe !== 'all' && d.vibes.indexOf(state.vibe) === -1) return false;
    if (state.query) {
      var q = state.query.toLowerCase();
      return (d.name + ' ' + d.state + ' ' + d.blurb + ' ' + d.vibes.join(' ')).toLowerCase().indexOf(q) !== -1;
    }
    return true;
  }

  var grid = $('#grid'), resultCount = $('#resultCount'), emptyState = $('#emptyState');
  function renderGrid() {
    grid.innerHTML = '';
    var shown = 0;
    DESTINATIONS.forEach(function (d) {
      if (!matches(d)) return;
      shown++;
      var card = document.createElement('button');
      card.className = 'card reveal' + (inSeason(d) ? '' : ' is-offseason');
      card.setAttribute('aria-label', d.name + ', ' + d.state);
      card.innerHTML =
        '<div class="card-media"><img src="' + photoUrl(d.photo) + '" alt="' + d.alt + '" loading="lazy">' +
        '<span class="card-best">Best: ' + d.best + '</span></div>' +
        '<div class="card-body">' +
        '<p class="card-state">' + d.state + '</p>' +
        '<h3 class="card-name">' + d.name + '</h3>' +
        '<p class="card-blurb">' + d.blurb + '</p>' +
        '<div class="card-meta">' +
        d.vibes.map(function (v) { return '<span class="card-tag">' + v + '</span>'; }).join('') +
        (d.stayFrom ? '<span class="card-price">Stays from ' + d.stayFrom + '</span>' : '<span class="card-price">Hotel prices online</span>') +
        '</div></div>';
      card.addEventListener('click', function () { openModal(d); });
      grid.appendChild(card);
      requestAnimationFrame(function () { card.classList.add('is-visible'); });
    });
    resultCount.textContent = shown + ' of ' + DESTINATIONS.length + ' destinations';
    emptyState.hidden = shown !== 0;
  }

  /* ---------- search ---------- */
  $('#searchInput').addEventListener('input', function (e) {
    state.query = e.target.value.trim();
    renderGrid();
    if (state.query) $('#destinations').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ---------- fare table (dated live quotes) ---------- */
  var fareBody = $('#fareBody');
  fareBody.innerHTML = FARES.map(function (f) {
    return '<tr><td>' + f.route + '</td><td>' + f.fare + '</td></tr>';
  }).join('');

  /* ---------- destination detail (in-flow, works in any embed) ---------- */
  var detail = $('#detail');
  var browseBits = ['#seasons', '.filter-bar', '#grid', '#resultCount', '#emptyState', '#flights', '#about'];
  function openModal(d) {
    $('#modalImg').src = photoUrl(d.photo);
    $('#modalImg').alt = d.alt;
    $('#modalState').textContent = d.state;
    $('#modalTitle').textContent = d.name;
    $('#modalBlurb').textContent = d.blurb;
    $('#modalFacts').innerHTML =
      fact('Best months', d.best) +
      fact('Festival', d.festival.name + ' - ' + d.festival.when) +
      fact('Ideal stay', d.ideal) +
      fact('Stays', 'varies widely - <a class="stay-link" href="https://www.google.com/travel/hotels?q=' + encodeURIComponent(d.name + ' hotels') + '" target="_blank" rel="noopener">check live hotel prices</a>');
    $('#modalPlaces').innerHTML = d.places.map(function (p) { return '<li>' + p + '</li>'; }).join('');
    $('#modalGetting').innerHTML = d.getting.map(function (g) {
      var fare = g.url
        ? '<a class="fare fare-link" href="' + g.url + '" target="_blank" rel="noopener">' + g.fare + ' &nearr;</a>'
        : '<span class="fare">' + g.fare + '</span>';
      return '<div class="modal-getting-row"><span>' + g.text +
        (g.source ? '<span class="src">' + g.source + '</span>' : '') +
        '</span>' + fare + '</div>';
    }).join('');
    browseBits.forEach(function (s) { var el = document.querySelector(s); if (el) el.hidden = true; });
    document.querySelector('#destinations .section-eyebrow').hidden = true;
    document.querySelector('#destinations .section-title').hidden = true;
    detail.hidden = false;
    detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function fact(k, v) { return '<div class="modal-fact"><b>' + k + '</b><span>' + v + '</span></div>'; }
  function closeModal() {
    detail.hidden = true;
    browseBits.forEach(function (s) { var el = document.querySelector(s); if (el) el.hidden = false; });
    document.querySelector('#destinations .section-eyebrow').hidden = false;
    document.querySelector('#destinations .section-title').hidden = false;
    $('#grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  $('#detailBack').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !detail.hidden) closeModal(); });

  /* ---------- source downloads (hosted view provides the globals) ---------- */
  var src = window.__SAFARNAMA_SOURCE__;
  var sourceButtons = $('#sourceButtons'), sourceNote = $('#sourceNote');
  if (src) {
    var files = { html: ['index.html', src.html], css: ['styles.css', src.css], js: ['app.js', src.js] };
    sourceButtons.addEventListener('click', function (e) {
      var key = e.target.dataset && e.target.dataset.source;
      if (!key) return;
      var blob = new Blob([files[key][1]], { type: 'text/plain' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = files[key][0];
      a.click();
      URL.revokeObjectURL(a.href);
    });
  } else {
    sourceButtons.hidden = true;
    sourceNote.hidden = false;
  }

  /* ---------- optional live content from the Node.js + Supabase backend ----------
     If config.js sets SAFARNAMA_API_URL, replace the bundled data below with
     whatever the API returns, then re-render. On any failure (offline, API
     down, URL unset) the bundled data stays and the site works standalone. */
  (function loadFromBackend() {
    var api = (window.SAFARNAMA_API_URL || '').replace(/\/+$/, '');
    if (!api || !window.fetch) return;
    fetch(api + '/api/bootstrap')
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        if (!data || !data.destinations || !data.destinations.length) return;
        DESTINATIONS.length = 0;
        data.destinations.forEach(function (d) { DESTINATIONS.push(d); });
        FARES.length = 0;
        (data.fares || []).forEach(function (f) { FARES.push(f); });
        STATES.length = 0;
        (data.states || []).forEach(function (row) { STATES.push(row); });
        UTS.length = 0;
        (data.uts || []).forEach(function (row) { UTS.push(row); });
        renderGrid();
        renderStates(STATES, statesList);
        renderStates(UTS, utsList);
        statesCount.textContent = STATES.length + ' states';
        fareBody.innerHTML = FARES.map(function (f) {
          return '<tr><td>' + f.route + '</td><td>' + f.fare + '</td></tr>';
        }).join('');
      })
      .catch(function () { showBackendNote(); });

  /* Slim bottom notice shown only when a backend is configured but could not
     be reached, so nobody mistakes the bundled copy for live database data. */
  function showBackendNote() {
    if (document.querySelector('.backend-note')) return;
    var note = document.createElement('div');
    note.className = 'backend-note';
    note.setAttribute('role', 'status');
    note.innerHTML = '<span><b>Backend not reachable.</b> Showing the site\'s built-in copy - ' +
      'changes saved in Supabase will appear once the API is back.</span>';
    var dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.setAttribute('aria-label', 'Dismiss notice');
    dismiss.textContent = '\u00d7';
    dismiss.addEventListener('click', function () { note.remove(); });
    note.appendChild(dismiss);
    document.body.appendChild(note);
  }
  })();

  renderGrid();
})();
