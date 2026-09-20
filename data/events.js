// Fictional sample events. Each record uses the same fields for a future database.
const events = [
  {
    id: 1,
    slug: 'courtyard-acoustic-night',
    title: 'Courtyard Acoustic Night',
    category: 'Music',
    description: 'Unplug for an evening of acoustic covers and original songs by student musicians.',
    day: 'Friday',
    time: '6:00 PM – 8:00 PM',
    venue: 'Student Union Courtyard',
    price: 0,
    organizer: 'Campus Music Club',
    details: 'Bring a blanket and settle in for three short sets. Seating is first come, first served. In case of rain, the session moves to the student lounge.'
  },
  {
    id: 2,
    slug: 'sunrise-trail-walk',
    title: 'Sunrise Trail Walk',
    category: 'Outdoors',
    description: 'Start your Saturday with an easy group walk, fresh air, and a scenic lookout.',
    day: 'Saturday',
    time: '7:00 AM – 9:00 AM',
    venue: 'North Gate Trailhead',
    price: 0,
    organizer: 'Outdoor Adventure Club',
    details: 'Meet at the north gate for a relaxed two-mile loop. Wear comfortable shoes and bring water. The group stays together and takes breaks along the way.'
  },
  {
    id: 3,
    slug: 'clay-and-coffee',
    title: 'Clay & Coffee',
    category: 'Creative',
    description: 'Make a small clay keepsake while sharing coffee and conversation with other beginners.',
    day: 'Saturday',
    time: '10:00 AM – 12:00 PM',
    venue: 'Arts Building Studio 2',
    price: 12,
    organizer: 'Student Arts Collective',
    details: 'The workshop includes air-dry clay, tools, and a hot drink. A student instructor demonstrates basic hand-building techniques. Bring a box to carry your creation home.'
  },
  {
    id: 4,
    slug: 'world-food-potluck',
    title: 'World Food Potluck',
    category: 'Food',
    description: 'Share a favorite dish and discover the stories behind meals from around the world.',
    day: 'Saturday',
    time: '1:00 PM – 3:00 PM',
    venue: 'International House Kitchen',
    price: 0,
    organizer: 'International Students Association',
    details: 'Bring a dish if you can, or simply join the conversation. Label ingredients and common allergens. Plates and utensils are provided; a reusable container is welcome.'
  },
  {
    id: 5,
    slug: 'board-game-social',
    title: 'Board Game Social',
    category: 'Social',
    description: 'Find your next favorite game at a relaxed afternoon of strategy, teamwork, and friendly competition.',
    day: 'Sunday',
    time: '2:00 PM – 5:00 PM',
    venue: 'Library Community Room',
    price: 0,
    organizer: 'Tabletop Society',
    details: 'Choose from quick party games and longer strategy games. Volunteers explain the rules, and solo visitors can join an open table. No experience is required.'
  },
  {
    id: 6,
    slug: 'rooftop-film-evening',
    title: 'Rooftop Film Evening',
    category: 'Film',
    description: 'Wrap up the weekend with a student short-film showcase under the evening sky.',
    day: 'Sunday',
    time: '6:30 PM – 8:30 PM',
    venue: 'Media Center Roof Terrace',
    price: 5,
    organizer: 'Campus Film Society',
    details: 'Admission includes popcorn and a selection of student-made short films followed by a filmmaker discussion. Bring a warm layer. Rain moves the screening to the media auditorium.'
  }
];

export default events;
