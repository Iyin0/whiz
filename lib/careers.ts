export type CareerRole = {
  id: string;
  position: string;
  title: string;
  type: string;
  location: string;
  requiresCv: boolean;
  overview: string[];
  responsibilities: {
    title: string;
    items: string[];
  }[];
  modules?: string[];
  workingPattern: string[];
  essential: string[];
  desirable: string[];
  benefits: string[];
};

export const careerMeta = {
  headline: "Join Whiz Academy's year-round learning team.",
  subheading: "Help Bridge Nigeria's Digital Divide",
  deadline: '31 August 2026',
  applicationClosesAt: '2026-08-31T23:59:59+01:00',
  startDate: 'October 2026',
  email: 'whizacademy4all@gmail.com',
};

export const careerRoles: CareerRole[] = [
  {
    id: 'digital-literacy-instructor',
    position: 'Position 1',
    title: 'Digital Literacy Instructor',
    type: 'Paid - Full-Time / Part-Time / Contract',
    location: 'Offa, Kwara State',
    requiresCv: true,
    overview: [
      "Facilitate engaging, practical, and learner-centred training sessions for children, teenagers, and adults enrolled in Whiz Academy's Digital Literacy Cohort Programme and Bootcamps.",
      'Inspire learners, simplify technology concepts, and contribute to curriculum improvement while helping build digitally empowered rural communities.',
    ],
    responsibilities: [
      {
        title: 'Training & Instruction',
        items: [
          'Deliver high-quality digital literacy training.',
          'Teach using practical, project-based methods.',
          'Adapt lessons for different age groups and skill levels.',
          'Create an engaging and inclusive classroom environment.',
        ],
      },
      {
        title: 'Learner Support',
        items: [
          'Assess learner progress.',
          'Provide constructive feedback.',
          'Support struggling learners.',
          'Mentor learners throughout the programme.',
        ],
      },
      {
        title: 'Programme Support',
        items: [
          'Prepare lesson plans.',
          'Maintain attendance records.',
          'Submit weekly reports.',
          'Participate in instructor meetings.',
          'Support outreach activities where required.',
        ],
      },
    ],
    modules: [
      'Computer Fundamentals',
      'Microsoft Office',
      'Google Workspace',
      'Internet & Email',
      'Digital Safety',
      'AI Fundamentals',
      'Digital Productivity',
      'Online Collaboration',
      'Basic Graphic Design (Canva)',
      'Introduction to Coding',
    ],
    workingPattern: [
      'Approximately 10 to 20 hours per week.',
      'Primarily weekday evenings and Saturdays.',
      'Additional hours during Bootcamps and holiday programmes.',
      'Hybrid planning meetings with in-person teaching.',
      'Flexible scheduling based on the cohort timetable.',
      'Occasional travel to nearby rural communities may be required.',
    ],
    essential: [
      'Diploma or Bachelor\'s degree in Computer Science, ICT, Education, Information Systems, or a related field, or equivalent practical experience.',
      'Strong digital skills and excellent communication skills.',
      'Comfortable speaking before groups and passionate about teaching.',
      'Good interpersonal skills and the ability to simplify technical concepts.',
      'Strong organisational skills, reliability, and professionalism.',
    ],
    desirable: [
      'Previous teaching or facilitation experience.',
      'Experience working with children or young people.',
      'Experience delivering community training.',
      'Knowledge of Canva, Scratch, HTML/CSS, Python, or AI tools.',
      'Experience with Google Classroom or Learning Management Systems.',
    ],
    benefits: [
      'Competitive instructor remuneration.',
      'Flexible working arrangements.',
      'Continuous professional development.',
      'Instructor training and certification opportunities.',
      'Leadership opportunities as the organisation grows.',
      'Opportunity to shape digital education in rural Nigeria.',
      'Networking with education and technology professionals.',
      'Meaningful social impact.',
    ],
  },
  {
    id: 'training-community-support-volunteer',
    position: 'Position 2',
    title: 'Training & Community Support Volunteer',
    type: 'Volunteer - Flexible, Part-Time',
    location: 'Offa, Kwara State / Remote for selected roles',
    requiresCv: false,
    overview: [
      'Volunteers are the heartbeat of Whiz Academy.',
      'This opportunity is for enthusiastic people who care about education, technology, youth development, and community impact. Technology expertise is welcome, but not required.',
    ],
    responsibilities: [
      {
        title: 'Teaching Assistant',
        items: [
          'Support instructors during classes.',
          'Assist learners with practical activities.',
          'Help prepare training materials.',
        ],
      },
      {
        title: 'Community Mobilisation',
        items: [
          'Promote programmes within communities.',
          'Support learner registration.',
          'Engage schools and parents.',
        ],
      },
      {
        title: 'Media & Communications',
        items: [
          'Photography.',
          'Videography.',
          'Social media.',
          'Graphic design.',
          'Content creation.',
        ],
      },
      {
        title: 'Technical Support',
        items: [
          'Set up laptops.',
          'Troubleshoot devices.',
          'Prepare learning equipment.',
        ],
      },
      {
        title: 'Administration & Logistics',
        items: [
          'Registration.',
          'Attendance.',
          'Documentation.',
          'Logistics.',
        ],
      },
      {
        title: 'Mentorship',
        items: [
          'Career guidance.',
          'Motivation.',
          'Academic encouragement.',
          'Project feedback.',
        ],
      },
    ],
    workingPattern: [
      'Flexible part-time volunteering.',
      'Most volunteers contribute between 4 and 10 hours weekly.',
      'Support may happen during Bootcamps, community outreach events, or weekend training sessions.',
      'Remote volunteering opportunities are available for selected roles.',
    ],
    essential: [
      'Minimum age of 18. Applicants aged 16-17 may be considered for selected youth volunteer roles with appropriate supervision.',
      'Passion for community development and a positive attitude.',
      'Willingness to learn and good communication skills.',
      'Dependable, committed, and able to work in a team.',
    ],
    desirable: [
      'Digital skills.',
      'Event planning experience.',
      'Photography or media skills.',
      'Teaching experience.',
      'Graphic design.',
      'Coding.',
      'Public speaking.',
      'Community engagement.',
    ],
    benefits: [
      'Volunteer Certificate.',
      'Recommendation Letter, subject to satisfactory service.',
      'Free training and professional development sessions.',
      'Mentorship opportunities.',
      'Networking with technology professionals.',
      'Leadership development.',
      'Opportunity to transition into future paid roles.',
      'Opportunity to make a lasting impact in rural communities.',
    ],
  },
];

export const selectionProcess = [
  {
    stage: 'Stage 1',
    title: 'Online Application',
    description: 'Complete the application form and provide any required documents or links.',
  },
  {
    stage: 'Stage 2',
    title: 'Application Review',
    description: 'Applications are assessed against the role requirements.',
  },
  {
    stage: 'Stage 3',
    title: 'Interview',
    description: 'Shortlisted candidates are invited for a virtual or physical interview.',
  },
  {
    stage: 'Stage 4',
    title: 'Practical Assessment',
    description: 'Instructor applicants may complete a 10-15 minute micro-teaching session or digital skills demonstration.',
  },
  {
    stage: 'Stage 5',
    title: 'Reference & Background Checks',
    description: 'Successful candidates may be asked to provide one or two referees.',
  },
  {
    stage: 'Stage 6',
    title: 'Onboarding',
    description: 'Successful applicants receive orientation and training before programme delivery.',
  },
];
