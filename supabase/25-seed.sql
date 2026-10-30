-- Safarnama seed data - mirrors the content shipped with the frontend.
-- Run AFTER schema.sql. Safe to re-run: it clears and re-inserts the demo content.
-- Prices in here are dated examples checked 30 Oct 2026, not live quotes.

delete from getting_there;
delete from destinations;
delete from fares;
delete from state_guides;

insert into destinations
  (id, name, state, region, vibes, blurb, photo, alt, credit, best, months, festival_name, festival_when, festival_note, ideal, places, sort_order)
values
  ('agra', 'Agra', 'Uttar Pradesh', 'north', '{"heritage","culture"}', 'Home of the Taj Mahal - marble at sunrise, Mughal forts, and a city built around wonder.', 'photos/agra.jpg', 'The Taj Mahal in Agra', NULL, 'Oct - Mar', '{9,10,11,0,1,2}', 'Taj Mahotsav', '18 - 27 Feb every year', 'Ten days of crafts, food, dance and music at Shilpgram, by the Taj (incredibleindia.gov.in).', '2 days', '{"Taj Mahal at sunrise","Agra Fort","Mehtab Bagh across the Yamuna","Fatehpur Sikri day trip"}', 0),
  ('jaipur', 'Jaipur', 'Rajasthan', 'north', '{"heritage","culture"}', 'The Pink City - hilltop forts, palace facades, bazaars of gems and block prints.', 'photos/jaipur.jpg', 'Amber Fort, Jaipur', NULL, 'Oct - Mar', '{9,10,11,0,1,2}', 'Jaipur Literature Festival', 'January', 'Five days of authors and ideas at Diggi Palace, billed as the world''s largest free literary festival.', '3 days', '{"Amber Fort","Hawa Mahal","City Palace and Jantar Mantar","Nahargarh Fort at sunset"}', 1),
  ('udaipur', 'Udaipur', 'Rajasthan', 'west', '{"heritage","culture"}', 'Lakes, white palaces and rooftop dinners - Rajasthan at its most romantic.', 'photos/udaipur.jpg', 'City Palace of Udaipur', 'Photo: Hirumon, Wikimedia Commons', 'Sep - Mar', '{8,9,10,11,0,1,2}', 'Mewar Festival (Gangaur)', 'Mar - Apr', 'Processions, song and decorated boats welcoming spring on Lake Pichola.', '3 days', '{"City Palace","Lake Pichola boat ride","Jag Mandir island","Saheliyon ki Bari"}', 2),
  ('amritsar', 'Amritsar', 'Punjab', 'north', '{"culture","heritage"}', 'The Golden Temple shimmering at dusk, langar for all, and the beating retreat at Wagah.', 'photos/amritsar.jpg', 'The Golden Temple in Amritsar', NULL, 'Oct - Mar', '{9,10,11,0,1,2}', 'Baisakhi', '13 - 14 Apr', 'Punjab''s harvest festival - the Golden Temple glows, the city dances.', '2 days', '{"Golden Temple at dawn and dusk","Jallianwala Bagh","Wagah border ceremony","Partition Museum"}', 3),
  ('varanasi', 'Varanasi', 'Uttar Pradesh', 'north', '{"culture","heritage"}', 'One of the world''s oldest living cities - ghats, aarti flames and dawn boats on the Ganga.', 'photos/varanasi.jpg', 'Ghats of Varanasi on the Ganga', NULL, 'Nov - Feb', '{10,11,0,1}', 'Dev Deepawali', 'Nov, 15 days after Diwali', 'A million lamps line every ghat - Varanasi''s most photographed night.', '2 - 3 days', '{"Ganga aarti at Dashashwamedh Ghat","Sunrise boat ride past the ghats","Kashi Vishwanath corridor","Sarnath, where Buddha first taught"}', 4),
  ('leh', 'Leh & Ladakh', 'Ladakh', 'north', '{"mountains","adventure"}', 'High desert passes, turquoise lakes and monasteries above the clouds.', 'photos/ladakh.jpg', 'Mountains of Ladakh', NULL, 'May - Sep', '{4,5,6,7,8}', 'Hemis Tsechu', 'Jun - Jul', 'Masked cham dances at Hemis Monastery, Ladakh''s grandest monastic festival (incredibleindia.gov.in).', '5 - 7 days', '{"Pangong Lake","Nubra Valley and the dunes at Hunder","Shanti Stupa at sunset","Hemis and Thiksey monasteries"}', 5),
  ('manali', 'Manali', 'Himachal Pradesh', 'north', '{"mountains","adventure"}', 'Cedar forests, snow points and café-lined old town lanes in the Kullu valley.', 'photos/manali.jpg', 'Mountains near Manali', 'Photo: Shameer Thajudeen, Wikimedia Commons', 'Oct - Jun', '{9,10,11,0,1,2,3,4,5}', 'International Kullu Dussehra', 'October each year', 'A week of deities, drums and fairs in nearby Kullu; the 2026 edition ran 21 - 27 Oct (hpkullu.nic.in).', '3 - 4 days', '{"Solang Valley","Hidimba Devi Temple","Old Manali lanes and cafes","Rohtang Pass (permit needed)"}', 6),
  ('goa', 'Goa', 'Goa', 'west', '{"beaches","culture"}', 'Portuguese lanes, palm-backed beaches and long golden evenings on the Arabian Sea.', 'photos/goa.jpg', 'A beach in Goa', NULL, 'Nov - Feb', '{10,11,0,1}', 'Goa Carnival', 'February', 'Four days of parades and music before Lent, a Portuguese-era legacy.', '4 - 5 days', '{"Palolem and the southern beaches","Fontainhas, the Latin quarter","Fort Aguada","Old Goa churches"}', 7),
  ('kerala', 'Kerala', 'Kerala', 'south', '{"beaches","culture"}', 'Backwater houseboats, tea-green hills and some of India''s gentlest coastlines.', 'photos/kerala.jpg', 'Backwaters of Kerala', NULL, 'Sep - Mar', '{8,9,10,11,0,1,2}', 'Onam', 'Aug - Sep, ten days', 'Flower carpets, snake-boat races and the grand Onasadya feast (keralatourism.org).', '5 - 7 days', '{"Alleppey houseboat night","Fort Kochi''s Chinese fishing nets","Munnar tea estates","Kumarakom bird sanctuary"}', 8),
  ('mumbai', 'Mumbai', 'Maharashtra', 'west', '{"city","culture"}', 'The maximum city - art deco sea fronts, street food, studios and impossible energy.', 'photos/mumbai.jpg', 'Gateway of India and the Taj Palace, Mumbai', 'Photo: Mahesh I., Wikimedia Commons', 'Nov - Feb', '{10,11,0,1}', 'Ganesh Chaturthi', 'Aug - Sep', 'Ten days of idols, drums and seaside immersions - Mumbai at full volume.', '2 - 3 days', '{"Gateway of India and Colaba","Marine Drive after dark","Elephanta Caves","Bandra''s street art and cafes"}', 9),
  ('darjeeling', 'Darjeeling', 'West Bengal', 'east', '{"mountains","culture"}', 'Tea gardens, toy trains and Kanchenjunga filling the morning sky.', 'photos/darjeeling.jpg', 'Tea garden in Darjeeling', 'Photo: Sourabh Biswas, Wikimedia Commons', 'Mar - May, Oct - Dec', '{2,3,4,9,10,11}', 'Darjeeling Carnival', 'November', 'Ten days of music, food and tea ceremonies started by local youth (Wikipedia).', '3 - 4 days', '{"Tiger Hill sunrise over Kanchenjunga","Darjeeling Himalayan Railway","Happy Valley tea estate","Batasia Loop"}', 10),
  ('andaman', 'Andaman Islands', 'Andaman & Nicobar', 'islands', '{"beaches","adventure"}', 'Glass-clear water, coral reefs and Radhanagar, often called Asia''s best beach.', 'photos/andaman.jpg', 'Radhanagar Beach, Havelock Island', 'Photo: Vyacheslav Argenberg, Wikimedia Commons', 'Oct - May', '{9,10,11,0,1,2,3,4}', 'Island Tourism Festival', '10 days from 5 Jan', 'Music, food stalls and island culture at Port Blair (andamantourism.gov.in).', '5 - 6 days', '{"Radhanagar Beach, Havelock","Cellular Jail light-and-sound show","Snorkelling at Elephant Beach","Neil Island''s natural bridge"}', 11);

insert into getting_there (destination_id, text, fare, source, url, sort_order)
values
  ('agra', 'Gatimaan Express, New Delhi to Agra - about 100 min', 'check current fare', 'IRCTC', 'https://www.irctc.co.in', 0),
  ('agra', 'Yamuna Expressway from Delhi by road', 'about 3.5 hrs drive', NULL, NULL, 1),
  ('jaipur', 'Vande Bharat, Delhi to Jaipur', '3 hrs 37 min', 'DNA India', NULL, 0),
  ('jaipur', 'By road from Delhi via NH48', 'about 5 hrs drive', NULL, NULL, 1),
  ('udaipur', 'Flight, New Delhi to Udaipur', 'check live fares', 'Google Flights', 'https://www.google.com/travel/flights?q=flights+from+New+Delhi+to+Udaipur', 0),
  ('udaipur', 'Flight, Mumbai to Udaipur', 'check live fares', 'Google Flights', 'https://www.google.com/travel/flights?q=flights+from+Mumbai+to+Udaipur', 1),
  ('amritsar', 'Vande Bharat, Delhi to Amritsar Jn', 'daily service', 'erail.in', NULL, 0),
  ('amritsar', 'By road from Delhi via NH44', 'about 8 hrs drive', NULL, NULL, 1),
  ('varanasi', 'Flight, New Delhi to Varanasi', 'check live fares', 'Google Flights', 'https://www.google.com/travel/flights?q=flights+from+New+Delhi+to+Varanasi', 0),
  ('varanasi', 'Vande Bharat, Delhi to Varanasi', 'day train', 'vBooking', NULL, 1),
  ('leh', 'Flight, New Delhi to Leh - one-way economy, 28 Nov 2026', 'from $77.60', 'Duffel live quote, 30 Oct', NULL, 0),
  ('leh', 'Flight, Mumbai to Leh', 'check live fares', 'Google Flights', 'https://www.google.com/travel/flights?q=flights+from+Mumbai+to+Leh', 1),
  ('manali', 'Flight, New Delhi to Kullu (Bhuntar, 50 km away)', 'check live fares', 'Google Flights', 'https://www.google.com/travel/flights?q=flights+from+New+Delhi+to+Kullu', 0),
  ('manali', 'Overnight Volvo bus from Delhi', 'about 12 - 14 hrs', NULL, NULL, 1),
  ('goa', 'Flight, New Delhi to Goa - one-way economy, 28 Nov 2026', 'from $115.80', 'Duffel live quote, 30 Oct', NULL, 0),
  ('goa', 'Flight, Mumbai to Goa', 'check live fares', 'Google Flights', 'https://www.google.com/travel/flights?q=flights+from+Mumbai+to+Goa', 1),
  ('kerala', 'Flight, New Delhi to Kochi - one-way economy, 28 Nov 2026', 'from $148.40', 'Duffel live quote, 30 Oct', NULL, 0),
  ('kerala', 'Flight, Mumbai to Kochi', 'check live fares', 'Google Flights', 'https://www.google.com/travel/flights?q=flights+from+Mumbai+to+Kochi', 1),
  ('mumbai', 'India''s busiest hub', 'direct flights from every major city', NULL, NULL, 0),
  ('mumbai', 'Trains from Delhi, Goa, the south and the north', 'all classes daily', NULL, NULL, 1),
  ('darjeeling', 'Flight, New Delhi to Bagdogra (about 70 km away)', 'check live fares', 'Google Flights', 'https://www.google.com/travel/flights?q=flights+from+New+Delhi+to+Bagdogra', 0),
  ('darjeeling', 'Toy train, New Jalpaiguri to Darjeeling', 'heritage ride', NULL, NULL, 1),
  ('andaman', 'Flight, New Delhi to Port Blair - one-way economy, 28 Nov 2026', 'from $187.50', 'Duffel live quote, 30 Oct', NULL, 0),
  ('andaman', 'Flight, Mumbai to Port Blair', 'check live fares', 'Google Flights', 'https://www.google.com/travel/flights?q=flights+from+Mumbai+to+Port+Blair', 1);

insert into fares (route, fare, sort_order)
values
  ('New Delhi to Goa', 'from $115.80', 0),
  ('New Delhi to Leh', 'from $77.60', 1),
  ('New Delhi to Kochi (for Kerala)', 'from $148.40', 2),
  ('New Delhi to Port Blair (for Andaman)', 'from $187.50', 3);

insert into state_guides (name, kind, best_months, festival, festival_when, source_url, sort_order)
values
  ('Andhra Pradesh', 'state', 'Nov - Feb', 'Sankranti', 'January', 'https://utsav.gov.in/view-event/sankranti-festival-1', 0),
  ('Arunachal Pradesh', 'state', 'Oct - Apr', 'Ziro Festival of Music', 'September', 'https://zirofestival.com', 1),
  ('Assam', 'state', 'Oct - Apr', 'Bohag Bihu', 'April', 'https://assamtourism.gov.in/april.php', 2),
  ('Bihar', 'state', 'Oct - Mar', 'Chhath Puja', 'Oct - Nov', 'https://www.incredibleindia.gov.in/en/festivals-and-events/chhath-puja', 3),
  ('Chhattisgarh', 'state', 'Oct - Mar', 'Bastar Dussehra', 'Sep - Oct', 'https://www.incredibleindia.gov.in/en/festivals-and-events/chhattisgarh/bastar-dussehra', 4),
  ('Goa', 'state', 'Nov - Feb', 'Goa Carnival', 'February', 'https://www.incredibleindia.gov.in/en/festivals-and-events/goa/carnaval', 5),
  ('Gujarat', 'state', 'Nov - Feb', 'Rann Utsav', 'Nov - Feb', 'https://www.rannutsavgujarat.in/', 6),
  ('Haryana', 'state', 'Oct - Mar', 'Surajkund Crafts Mela', 'February', 'https://haryanatourism.gov.in/fair-and-festivals/surajkund-international-craft-mela/', 7),
  ('Himachal Pradesh', 'state', 'Oct - Jun', 'Kullu Dussehra', 'October', 'https://hpkullu.nic.in/whats-new/fairs-festivals/', 8),
  ('Jharkhand', 'state', 'Oct - Mar', 'Sarhul', 'Mar - Apr', 'https://tourism.jharkhand.gov.in/festivals', 9),
  ('Karnataka', 'state', 'Oct - Feb', 'Mysuru Dasara', 'Sep - Oct', 'https://mysurudasara.org/about', 10),
  ('Kerala', 'state', 'Sep - Mar', 'Onam', 'Aug - Sep', 'https://www.keralatourism.org/onam-festival', 11),
  ('Madhya Pradesh', 'state', 'Oct - Mar', 'Khajuraho Dance Festival', 'February', 'https://www.mptourism.com/khajuraho-dance-festival.htm', 12),
  ('Maharashtra', 'state', 'Nov - Feb', 'Ganesh Chaturthi', 'Aug - Sep', 'https://www.incredibleindia.gov.in/en/maharashtra/mumbai/experiencing-the-essence-of-ganesh-chaturthi', 13),
  ('Manipur', 'state', 'Oct - Mar', 'Sangai Festival', '21 - 30 Nov', 'https://www.utsav.gov.in/view-event/manipur-sangai-festival-2025', 14),
  ('Meghalaya', 'state', 'Oct - May', 'Wangala', 'November', 'https://www.meghalaya.gov.in/wangala', 15),
  ('Mizoram', 'state', 'Oct - Mar', 'Chapchar Kut', 'March', 'https://aizawl.nic.in/festival/chapchar-kut-festival/', 16),
  ('Nagaland', 'state', 'Oct - May', 'Hornbill Festival', '1 - 10 Dec', 'https://tourism.nagaland.gov.in/events/hornbill-festival/', 17),
  ('Odisha', 'state', 'Oct - Feb', 'Konark Festival', 'December', 'https://odishatourism.gov.in/en/konark-festival', 18),
  ('Punjab', 'state', 'Oct - Mar', 'Baisakhi', '13 - 14 Apr', 'https://punjabtourism.punjab.gov.in/baisakhi.php', 19),
  ('Rajasthan', 'state', 'Oct - Mar', 'Pushkar Camel Fair', 'Oct - Nov', 'https://www.incredibleindia.gov.in/en/festivals-and-events/pushkar-camel-fair', 20),
  ('Sikkim', 'state', 'Mar - Jun, Oct - Dec', 'Saga Dawa', 'May - Jun', 'http://sikkimtourism.gov.in/Public/ExperienceSikkim/FairsAndFestivalDetails/FF20A077?type=Festival', 21),
  ('Tamil Nadu', 'state', 'Nov - Feb', 'Pongal', 'January', 'https://en.wikipedia.org/wiki/Pongal_(festival)', 22),
  ('Telangana', 'state', 'Nov - Feb', 'Bathukamma', 'Sep - Oct', 'https://www.incredibleindia.gov.in/en/festivals-and-events/telangana/bathukamma', 23),
  ('Tripura', 'state', 'Oct - Mar', 'Durga Puja', 'October', 'https://ich.unesco.org/en/RL/durga-puja-in-kolkata-00703', 24),
  ('Uttar Pradesh', 'state', 'Oct - Mar', 'Taj Mahotsav, Agra', '18 - 27 Feb', 'https://www.incredibleindia.gov.in/en/festivals-and-events/taj-mahotsav', 25),
  ('Uttarakhand', 'state', 'Mar - Jun, Sep - Nov', 'Char Dham yatra season', 'May - Oct', 'https://www.triptochardham.in/which-month-is-best-for-char-dham-yatra', 26),
  ('West Bengal', 'state', 'Oct - Feb', 'Durga Puja', 'October', 'https://ich.unesco.org/en/RL/durga-puja-in-kolkata-00703', 27),
  ('Andaman & Nicobar', 'ut', 'Oct - May', 'Island Tourism Festival', 'from 5 Jan', 'https://andamantourism.gov.in/festivel.php?id=MFVHNzg2T3NpTkpvbFJod0tOYTNOS3k0UWdnN1RHaXJIRitNKzFEenN6Yz0=', 0),
  ('Chandigarh', 'ut', 'Oct - Mar', 'Rose Festival', 'February', 'https://chandigarhtourism.gov.in/pages/event/52', 1),
  ('Dadra & Nagar Haveli and Daman & Diu', 'ut', 'Nov - Feb', 'Nariyal Poornima', 'August', 'https://dded.gov.in/detail.php?id=27', 2),
  ('Delhi', 'ut', 'Oct - Mar', 'Diwali season', 'Oct - Nov', 'https://delhitourism.gov.in/dt/festivals/diwali.html', 3),
  ('Jammu & Kashmir', 'ut', 'Mar - Oct', 'Tulip Festival, Srinagar', 'April', 'https://srinagar.nic.in/tourist-place/tulip-garden/', 4),
  ('Ladakh', 'ut', 'May - Sep', 'Hemis Tsechu', 'Jun - Jul', 'https://www.incredibleindia.gov.in/en/festivals-and-events/ladakh/hemis-festival', 5),
  ('Lakshadweep', 'ut', 'Oct - May', 'Eid celebrations', 'varies by year', 'https://lakshadweep.gov.in/about-lakshadweep/culture-heritage/', 6),
  ('Puducherry', 'ut', 'Oct - Mar', 'Pongal', 'January', 'https://www.py.gov.in/home-holiday-orders-declaration-holiday-14-01-2026-bhogi-puducherry-karaikal-and-yanam-regions-union', 7);
