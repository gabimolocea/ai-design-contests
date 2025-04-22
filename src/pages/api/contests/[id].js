export default function handler(req, res) {
  const { id } = req.query;

  // Mock contest data
  const contests = [
    {
      id: '1',
      title: 'Logo Design for Tech Startup',
      description: 'We need a modern logo for our new tech startup.',
      prize: '$500',
      deadline: '2025-05-01',
      entries: 25,
    },
    {
      id: '2',
      title: 'Website Redesign for E-commerce',
      description: 'Redesign our e-commerce website for a better user experience.',
      prize: '$1,000',
      deadline: '2025-05-10',
      entries: 40,
    },
    {
      id: '3',
      title: 'Business Card Design',
      description: 'Create a professional business card for our company.',
      prize: '$200',
      deadline: '2025-04-30',
      entries: 15,
    },
  ];

  const contest = contests.find((contest) => contest.id === String(id));

  if (contest) {
    res.status(200).json(contest);
  } else {
    res.status(404).json({ message: 'Contest not found' });
  }
}