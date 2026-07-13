export default function Overview() {

  const content = [
    {
      heading: 'Program mission',
      body: 'Digital skills are no longer optional. ODLP exists to make practical technology education accessible, culturally aware, and useful for learners in Offa, Kwara State.',
    },
    {
      heading: 'What we have achieved so far',
      body: 'Since 2021, Whiz Academy has led digital literacy workshops and community outreach, reaching over 500 secondary school students. The work has introduced young people to useful digital tools, responsible technology habits, and future-ready skills with local participation at the center.',
    },
    {
      heading: 'Why it matters',
      body: 'When communities have the skills and confidence to use technology on their own terms, digital access becomes more than exposure. It becomes a path to education, livelihoods, and everyday problem-solving.',
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {content.map((item, index) => (
        <div key={index} className="border-l-2 border-primary/20 pl-5">
          <h3 className="text-lg font-bold text-foreground">{item.heading}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
