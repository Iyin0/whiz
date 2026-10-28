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
  successCriteria?: string[];
  applicationGuidance?: string;
};

export const careerMeta = {
  headline: "Join Whiz Academy's year-round learning team.",
  subheading: "Help Bridge Nigeria's Digital Divide",
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
  {
    "id": "volunteer-social-media-manager",
    "position": "Position 3",
    "title": "Volunteer Social Media Manager",
    "type": "Volunteer (unpaid)",
    "location": "Remote",
    "requiresCv": false,
    "overview": [
      "We are looking for a creative, organised Volunteer Social Media Manager to strengthen our online presence and communicate the value and impact of our work.",
      "Whiz Academy has five years of programme resources, including photographs, videos, learning materials, and stories. You will turn these resources into relevant, engaging social media content while helping us document and share new activities.",
      "You will also review and optimise our social media pages to improve discoverability, engagement, and connection with our target audiences: individuals, potential partners and sponsors, and government agencies."
    ],
    "responsibilities": [
      {
        "title": "Content Review and Repurposing",
        "items": [
          "Review and organise existing resources into a usable content archive.",
          "Identify programme highlights, participant stories, milestones, and educational resources that can be repurposed.",
          "Create captions, carousels, short videos, reels, and other suitable content from existing materials.",
          "Clearly distinguish past activities from current programmes and upcoming opportunities.",
          "Maintain accuracy, brand consistency, and appropriate permissions when using photographs, testimonials, and participant information."
        ]
      },
      {
        "title": "Content Planning and Publishing",
        "items": [
          "Develop and maintain a realistic content calendar.",
          "Create a balanced mix of educational content, impact stories, programme updates, volunteer opportunities, and partnership messages.",
          "Adapt content to the audience and format of each platform.",
          "Schedule and publish approved content consistently.",
          "Coordinate with the team to gather information and materials from new activities."
        ]
      },
      {
        "title": "Page Optimisation and Audience Growth",
        "items": [
          "Audit our social media pages and recommend improvements to profile names, biographies, descriptions, links, contact details, pinned posts, and highlights.",
          "Ensure visitors can quickly understand our mission, programmes, impact, and how to get involved.",
          "Use relevant keywords, hashtags, accessible captions, and platform features to support discoverability.",
          "Develop approaches to reach learners, parents, volunteers, supporters, potential partners, sponsors, and relevant government agencies.",
          "Make partnership and sponsorship information easy to find, with clear calls to action."
        ]
      },
      {
        "title": "Community Engagement and Reporting",
        "items": [
          "Respond to routine comments and messages using agreed guidance, referring sensitive enquiries and partnership discussions to the appropriate team member.",
          "Encourage meaningful engagement and build relationships with relevant online communities.",
          "Monitor content performance, audience growth, engagement, profile visits, and enquiries.",
          "Provide a concise monthly report explaining what is working and what should improve."
        ]
      }
    ],
    "workingPattern": [
      "5–10 hours per week.",
      "Remote, with occasional programme participation where feasible."
    ],
    "essential": [
      "Can demonstrate experience managing social media through professional, personal, student, community, or volunteer projects.",
      "Writes clear, engaging captions and can turn existing resources into compelling stories.",
      "Can use Canva or similar design tools and basic video-editing tools.",
      "Understands content planning, page optimisation, scheduling, and social media analytics.",
      "Is organised, dependable, receptive to feedback, and comfortable working independently.",
      "Has an interest in education, digital inclusion, youth development, and community impact.",
      "Exercises care when sharing content involving children and young people."
    ],
    "desirable": [
      "Experience communicating nonprofit impact or reaching institutional audiences."
    ],
    "successCriteria": [
      "A well-organised archive and a sustainable content calendar.",
      "Clear, complete social media profiles that communicate our work effectively.",
      "Consistent, engaging content that makes good use of five years of resources.",
      "Improved reach and meaningful engagement among our priority audiences.",
      "More relevant enquiries about programmes, volunteering, partnerships, and sponsorship.",
      "Regular reporting that helps the team make informed content decisions."
    ],
    "benefits": [
      "Practical experience in social media management and nonprofit communications.",
      "Opportunities to build a portfolio using approved work.",
      "Collaboration with a team working to improve access to digital education.",
      "Recognition of your contribution and a reference based on satisfactory service."
    ],
    "applicationGuidance": "Include a brief statement of interest, your availability, and links or samples of social media pages, captions, designs, or videos you have worked on. Use the portfolio link field to share your samples."
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
