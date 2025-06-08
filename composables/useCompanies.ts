import { ref } from 'vue'

export const useCompanies = () => {
  const companies = ref([
    {
      id: 1,
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
      category: 'Tech',
      problem: 'Complex digital transformation needs for businesses and individuals',
      targetUser: 'Enterprises, developers, consumers, and educational institutions',
      whyNeeded: 'Comprehensive software solutions for productivity, cloud computing, and AI integration',
      useCase: 'Business operations, software development, cloud infrastructure, AI services',
      userReviews: 'Highly trusted for enterprise solutions, strong developer community',
      userAcquisition: 'Enterprise partnerships, developer ecosystem, bundled software',
      revenue: '$211.9 billion (2023), Market Cap: $3.2 trillion',
      keyLearnings: 'Successful transition from PC software to cloud and AI services',
      challenges: 'Balancing innovation with backward compatibility',
      pitch: "Empowering every person and organization to achieve more",
      uniqueValue: 'Integrated ecosystem of enterprise software, cloud, and AI solutions',
      monetization: 'Software licenses, cloud services, enterprise contracts',
      growthEngine: 'Cloud services (Azure), AI integration, enterprise partnerships',
      optimization: 'Enhanced AI integration, improved cloud services reliability',
      scores: {
        innovation: 9,
        growth: 9,
        business: 10
      }
    },
    {
      id: 2,
      name: 'Apple',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
      category: 'Tech',
      problem: 'Complex technology needs to be made simple and elegant for consumers',
      targetUser: 'Premium consumers, creative professionals, tech enthusiasts',
      whyNeeded: 'Seamless integration of hardware and software for better user experience',
      useCase: 'Personal computing, mobile communication, digital entertainment',
      userReviews: 'High customer satisfaction, strong brand loyalty',
      userAcquisition: 'Premium brand positioning, retail stores, ecosystem lock-in',
      revenue: '$383.3 billion (2023), Market Cap: $3.0 trillion',
      keyLearnings: 'Design and user experience drive premium pricing',
      challenges: 'Maintaining innovation while scaling production',
      pitch: 'Think Different - Premium technology that just works',
      uniqueValue: 'Seamless integration of hardware, software, and services',
      monetization: 'Hardware sales, services, app store revenue',
      growthEngine: 'Ecosystem lock-in, brand loyalty, service expansion',
      optimization: 'Supply chain diversification, service portfolio expansion',
      scores: {
        innovation: 9,
        growth: 8,
        business: 10
      }
    },
    {
      id: 3,
      name: 'NVIDIA',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png',
      category: 'AI',
      problem: 'Need for high-performance computing and AI processing capabilities',
      targetUser: 'AI researchers, data centers, gamers, autonomous vehicle developers',
      whyNeeded: 'Accelerated computing for AI, gaming, and scientific research',
      useCase: 'AI training, gaming, scientific simulation, autonomous vehicles',
      userReviews: 'Industry-leading performance, strong developer tools',
      userAcquisition: 'Technology leadership, developer relations, gaming community',
      revenue: '$26.97 billion (2023), Market Cap: $2.8 trillion',
      keyLearnings: 'Early AI focus led to market dominance',
      challenges: 'Meeting explosive demand for AI chips',
      pitch: 'Powering the AI revolution through accelerated computing',
      uniqueValue: 'Superior AI chip architecture and software ecosystem',
      monetization: 'Hardware sales, licensing, enterprise solutions',
      growthEngine: 'AI boom, gaming market, data center expansion',
      optimization: 'Production capacity, software ecosystem expansion',
      scores: {
        innovation: 10,
        growth: 10,
        business: 9
      }
    },
    {
      id: 4,
      name: 'Alphabet',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
      category: 'Tech',
      problem: 'Information accessibility and digital advertising efficiency',
      targetUser: 'Internet users, advertisers, enterprises',
      whyNeeded: 'Search, advertising, cloud services, and innovation in AI',
      useCase: 'Web search, online advertising, cloud computing, AI research',
      userReviews: 'Dominant in search, strong cloud growth',
      userAcquisition: 'Search monopoly, Android ecosystem, YouTube platform',
      revenue: '$282.8 billion (2023), Market Cap: $2.0 trillion',
      keyLearnings: 'Data-driven advertising model success',
      challenges: 'Privacy concerns, regulatory pressure',
      pitch: "Organizing the world's information and making it universally accessible",
      uniqueValue: 'Unmatched search and advertising technology',
      monetization: 'Digital advertising, cloud services, hardware',
      growthEngine: 'AI integration, cloud services, YouTube growth',
      optimization: 'Privacy enhancement, AI ethics, cloud competitiveness',
      scores: {
        innovation: 9,
        growth: 8,
        business: 9
      }
    },
    {
      id: 5,
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
      category: 'Commerce',
      problem: 'Retail inefficiency and cloud computing accessibility',
      targetUser: 'Consumers, enterprises, developers',
      whyNeeded: 'Convenient shopping, cloud infrastructure, logistics',
      useCase: 'E-commerce, cloud services, digital streaming',
      userReviews: 'Fast delivery, vast selection, reliable cloud services',
      userAcquisition: 'Competitive pricing, Prime membership, AWS leadership',
      revenue: '$574.8 billion (2023), Market Cap: $1.9 trillion',
      keyLearnings: 'Customer obsession drives loyalty',
      challenges: 'Labor relations, marketplace quality control',
      pitch: "Earth's most customer-centric company",
      uniqueValue: 'Integrated e-commerce and cloud computing ecosystem',
      monetization: 'Retail sales, Prime subscriptions, AWS services',
      growthEngine: 'Prime ecosystem, AWS expansion, international growth',
      optimization: 'Automation, last-mile delivery, AI integration',
      scores: {
        innovation: 9,
        growth: 8,
        business: 9
      }
    },
    {
      id: 6,
      name: 'Berkshire Hathaway',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Berkshire_Hathaway_logo.svg/2560px-Berkshire_Hathaway_logo.svg.png',
      category: 'Finance',
      problem: 'Long-term value creation and investment efficiency',
      targetUser: 'Investors, acquired companies',
      whyNeeded: 'Stable long-term investment and business operations',
      useCase: 'Investment, insurance, industrial operations',
      userReviews: 'Strong track record, trusted management',
      userAcquisition: 'Investment performance, reputation',
      revenue: '$302.1 billion (2023), Market Cap: $785.7 billion',
      keyLearnings: 'Value investing principles at scale',
      challenges: 'Succession planning, finding large acquisitions',
      pitch: 'Creating lasting value through patient investment',
      uniqueValue: 'Unique investment philosophy and operational expertise',
      monetization: 'Business operations, investment returns',
      growthEngine: 'Strategic acquisitions, business performance',
      optimization: 'Digital transformation, succession execution',
      scores: {
        innovation: 6,
        growth: 7,
        business: 10
      }
    },
    {
      id: 7,
      name: 'UnitedHealth Group',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UnitedHealth_Group_logo.svg/2560px-UnitedHealth_Group_logo.svg.png',
      category: 'Healthcare',
      problem: 'Healthcare access and cost management',
      targetUser: 'Healthcare providers, insurers, patients',
      whyNeeded: 'Integrated healthcare and insurance solutions',
      useCase: 'Health insurance, healthcare services',
      userReviews: 'Comprehensive coverage, extensive network',
      userAcquisition: 'Employer partnerships, Medicare/Medicaid',
      revenue: '$324.2 billion (2023), Market Cap: $454.3 billion',
      keyLearnings: 'Healthcare ecosystem integration',
      challenges: 'Healthcare policy changes, cost management',
      pitch: 'Transforming healthcare through technology and innovation',
      uniqueValue: 'Integrated healthcare delivery and insurance',
      monetization: 'Insurance premiums, healthcare services',
      growthEngine: 'Population aging, healthcare digitization',
      optimization: 'Technology integration, cost efficiency',
      scores: {
        innovation: 8,
        growth: 8,
        business: 9
      }
    },
    {
      id: 8,
      name: 'Haier',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Haier_logo.svg/2560px-Haier_logo.svg.png',
      category: 'Consumer',
      problem: 'Smart home appliance integration',
      targetUser: 'Home owners, property developers',
      whyNeeded: 'Connected smart home solutions',
      useCase: 'Smart appliances, home automation',
      userReviews: 'Quality products, smart features',
      userAcquisition: 'Retail channels, property partnerships',
      revenue: '$47.9 billion (2023), Market Cap: $24.5 billion',
      keyLearnings: 'Smart home ecosystem development',
      challenges: 'Technology integration, market competition',
      pitch: 'Leading the smart home revolution',
      uniqueValue: 'Integrated smart home ecosystem',
      monetization: 'Appliance sales, smart services',
      growthEngine: 'Smart home adoption, global expansion',
      optimization: 'IoT integration, service expansion',
      scores: {
        innovation: 8,
        growth: 8,
        business: 8
      }
    },
    {
      id: 9,
      name: 'Nestlé',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Nestlé_logo.svg/2560px-Nestlé_logo.svg.png',
      category: 'Consumer',
      problem: 'Global nutrition and food quality',
      targetUser: 'Global consumers, food service industry',
      whyNeeded: 'Quality food and beverage products',
      useCase: 'Food and beverage consumption',
      userReviews: 'Trusted brands, quality products',
      userAcquisition: 'Global distribution, brand portfolio',
      revenue: '$93.2 billion (2023), Market Cap: $313.4 billion',
      keyLearnings: 'Brand portfolio management',
      challenges: 'Health trends, sustainability',
      pitch: 'Good food, good life',
      uniqueValue: "World's largest food and beverage company",
      monetization: 'Product sales, licensing',
      growthEngine: 'Product innovation, market expansion',
      optimization: 'Sustainability initiatives, health focus',
      scores: {
        innovation: 7,
        growth: 7,
        business: 9
      }
    },
    {
      id: 10,
      name: 'Spotify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png',
      category: 'Entertainment',
      problem: 'Limited access to music and discovery of new content',
      targetUser: 'Music lovers, artists, and podcast creators',
      whyNeeded: 'Easy access to vast music library and content discovery',
      useCase: 'Commuting, working out, relaxing, parties',
      userReviews: 'Highly rated for personalization but criticized for artist compensation',
      userAcquisition: 'Freemium model, social sharing, device partnerships',
      revenue: 'Subscription fees and advertising to free users',
      keyLearnings: 'Personalization algorithms create stickiness',
      challenges: 'Balancing artist compensation with profitability',
      pitch: 'Your entire music world in one app with personalized recommendations',
      uniqueValue: 'Personalized music recommendations and extensive library',
      monetization: 'Freemium model with premium subscription tiers',
      growthEngine: 'Social sharing, algorithmic recommendations, exclusive content',
      optimization: 'Better artist compensation, enhanced social features',
      scores: {
        innovation: 9,
        growth: 8,
        business: 8
      }
    }
  ])

  const addCompany = (company) => {
    companies.value.push({
      id: companies.value.length + 1,
      ...company
    })
  }

  const getCompanyById = (id) => {
    return companies.value.find(company => company.id === id)
  }

  return {
    companies,
    addCompany,
    getCompanyById
  }
} 