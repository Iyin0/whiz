export default function Overview() {

  const content = [
    {
      heading: '',
      body: 'In today’s world, digital skills aren’t just an advantage they’re a necessity. Yet, in many communities, access to quality digital education remains a challenge. That’s where ODLP comes in. At the Offa Digital Literacy Program (ODLP), we’re on a mission to ensure that everyone regardless of age or background has the opportunity to become digitally empowered. With a bold goal of achieving 75% digital literacy in Offa, Kwara State, we’re making quality digital education accessible, inclusive, and impactful.', 
    },
    {
      heading: 'What We’ve Achieved So Far',
      body: 'Since 2022, we’ve successfully organized three digital literacy workshops, reaching over 300 secondary school students. These workshops, held every August for two weeks, have been the foundation of our movement introducing young minds to the power of digital skills and preparing them for the future.\nBut we’re not stopping there. We’re expanding. New initiatives are on the horizon, designed to equip adults, youths, and other community members with essential digital skills.',
    },
    {
      heading: 'Why It Matters',
      body: 'Digital Enlightenment – Understanding the digital world and how it impacts daily life.\nNew & Sharpened Skills – Hands-on training in essential digital tools.\nOpportunities for Growth – Access to resources that can change careers and futures.',
    },
  ];

  return (
    <div>
      {content.map((item, index) => (
        <div key={index} className="mt-10">
          <h3 className="text-lg font-bold mb-4">{item.heading}</h3>
          <p className="text-base whitespace-pre-line">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
