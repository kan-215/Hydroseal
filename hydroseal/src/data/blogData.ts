export interface BlogPost {
  id: string;
  title: string;
  image: string;
  images?: string[]; // Multiple images for galleries
  excerpt: string;
  content: string[];
  date: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'cleaning-services',
    title: 'Why Regular Water Tank Cleaning is Non-Negotiable in Kenya – A Complete Guide by Hydroseal Innovations',
    image: '/blog 1.1.png',
    images: ['/blog 1.1.png', '/blog 1.2.png'],
    excerpt: 'Sediment, algae and biofilm can turn your water tank into a health hazard. Here’s how Hydroseal’s professional cleaning restores safety and clarity.',
    date: 'March 25, 2026',
    author: 'Hydroseal Team',
    content: [
      'In Kenya, where water is stored for weeks or months, unclean tanks become breeding grounds for bacteria, algae and sediment. At Hydroseal Innovations we have cleaned hundreds of plastic, concrete and steel tanks nationwide, and the difference is immediate: clearer water, longer tank life and peace of mind for families and businesses.',
      'Our proven cleaning process includes:',
      '1. Thorough inspection and debris removal',
      '2. Eco-friendly scrubbing of walls and floor',
      '3. High-pressure rinsing',
      '4. Final disinfection and water-quality testing',
      'Regular cleaning (every 6–12 months) prevents costly repairs and complies with WASREB standards. Contact us today for a free tank assessment.'
    ]
  },
  {
    id: 'kajiado-cisterns',
    title: 'Hydroseal Innovations Completes Construction of 10 × 16,000L Cisterns in Kajiado County – Delivering Water Security to Arid Communities',
    image: '/blog 2.1.jpeg',
    images: ['/blog 2.1.jpeg', '/blog 2.2.jpeg', '/blog 2.3.jpeg'],
    excerpt: 'From design to completion, Hydroseal Innovations built ten 16,000-litre concrete cisterns in Kajiado County, bringing reliable water storage to drought-prone areas.',
    date: 'March 15, 2026',
    author: 'Hydroseal Team',
    content: [
      'Kajiado County faces severe water scarcity. In partnership with local schools and community groups, Hydroseal Innovations successfully constructed ten 16,000-litre underground cisterns using reinforced concrete and advanced waterproofing.',
      'Key highlights:',
      '1. Custom design for high water table and soil conditions',
      '2. Full waterproofing high quality waterproofing materials',
      '3. Elevated platforms for gravity-fed distribution',
      '4. Completed on schedule and within budget',
      'The project now supplies clean water to over 2,500 residents daily. The cisterns provides an estimated 140,000–160,000 litres of harvested rainwater annually per school, directly supporting vegetable production and poultry activities while reducing operational costs and environmental strain. This is another example of how Hydroseal turns challenges into sustainable solutions across Kenya.'
    ]
  },
  {
    id: 'steel-tank-rehabilitation',
    title: 'Steel Tank Rehabilitation Success in Nairobi & Kiambu – How Hydroseal Restored Critical Water Infrastructure',
    image: '/blog 3.1.jpeg',
    images: ['/blog 3.1.jpeg', '/blog 3.2.jpeg', '/blog 3.3.jpeg', '/blog 3.4.jpeg'],
    excerpt: 'Corrosion and leaks threatened water supply in Nairobi and Kiambu. Hydroseal Innovations rehabilitated multiple steel tanks, extending their life by 15+ years.',
    date: 'March 5, 2026',
    author: 'Hydroseal Team',
    content: [
      'Steel tanks in urban Kenya suffer from rust and weld failures. Hydroseal Innovations recently completed rehabilitation works on several large steel tanks in Nairobi and Kiambu Counties.',
      'Our rehabilitation process included:',
      '1. Thorough rust removal and surface preparation',
      '2. Welding repairs and anti-corrosion coatings',
      '3. Internal waterproofing and neutralizing',
      '4. Final disinfection and water-quality certification',
      'Clients now enjoy leak-free, safe water storage with significantly reduced maintenance costs. Whether you manage residential estates, schools or commercial properties, Hydroseal’s steel tank rehabilitation services deliver lasting results.'
    ]
  }
];
