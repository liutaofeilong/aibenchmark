<template>
  <div class="min-h-screen bg-white">
    <!-- 导航栏 -->
    <nav class="border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          <div class="flex items-center">
            <img src="/logo.svg" alt="AIBenchmark Logo" class="h-10 w-10" />
            <div class="ml-3">
              <span class="text-xl font-bold text-blue-600">AIBenchmark</span>
              <span class="ml-2 text-gray-500">Competitive Analysis</span>
            </div>
          </div>
          <div class="flex-1 ml-8">
            <input 
              v-model="search" 
              @keyup.enter="analyzeCompany"
              type="text"
              placeholder="Search for a company..."
              class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </nav>

    <!-- 免费分析提示 -->
    <div class="text-center py-4 border-b">
      <p>First analysis is free. Subscribe for $10/month for unlimited analyses.</p>
    </div>

    <!-- 分类标签 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div class="flex space-x-2">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-1 border rounded',
            selectedCategory === category
              ? 'bg-gray-100 border-gray-400'
              : 'bg-white border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 公司卡片区域 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CompanyCard
          v-for="company in filteredCompanies"
          :key="company.id"
          :company="company"
        />
      </div>
    </div>

    <!-- 分析结果 -->
    <div v-if="analysisResult" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Analysis Result</h2>
          <button @click="analysisResult = ''" class="text-gray-500 hover:text-gray-700">×</button>
        </div>
        <pre class="text-sm whitespace-pre-wrap">{{ analysisResult }}</pre>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="mt-auto py-6 text-center text-gray-500 text-sm">
      <p>&copy; 2024 AIBenchmark.it.com - Competitive Analysis Platform</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CompanyCard from '~/components/CompanyCard.vue'

const search = ref('')
const analysisResult = ref('')
const selectedCategory = ref('All')

const categories = ['All', 'Tech', 'AI', 'Finance', 'Healthcare', 'Consumer', 'Commerce', 'Energy']

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
    useCase: 'E-commerce, cloud computing, digital streaming',
    userReviews: 'Fast delivery, vast selection, reliable cloud services',
    userAcquisition: 'Prime membership, AWS leadership, marketplace',
    revenue: '$513.98 billion (2023), Market Cap: $2.0 trillion',
    keyLearnings: 'Customer obsession drives innovation',
    challenges: 'Labor relations, marketplace quality control',
    pitch: "Earth's most customer-centric company",
    uniqueValue: 'Integrated e-commerce and cloud computing leader',
    monetization: 'Retail sales, AWS, Prime subscriptions',
    growthEngine: 'Prime ecosystem, AWS expansion, new markets',
    optimization: 'Last-mile delivery, AI integration, sustainability',
    scores: {
      innovation: 9,
      growth: 9,
      business: 9
    }
  },
  {
    id: 6,
    name: 'Saudi Aramco',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Saudi_Aramco_logo.svg/2560px-Saudi_Aramco_logo.svg.png',
    category: 'Energy',
    problem: 'Global energy supply and sustainability challenges',
    targetUser: 'Global energy markets, industrial customers',
    whyNeeded: 'Reliable energy supply for global economic growth',
    useCase: 'Oil production, refining, petrochemicals',
    userReviews: 'Reliable supplier, strong infrastructure',
    userAcquisition: 'Government partnerships, long-term contracts',
    revenue: '$604.4 billion (2023), Market Cap: $1.6 trillion',
    keyLearnings: 'Scale and efficiency in energy production',
    challenges: 'Energy transition, environmental concerns',
    pitch: "Powering the world's energy needs sustainably",
    uniqueValue: "World's largest oil producer with lowest production costs",
    monetization: 'Oil and gas sales, petrochemicals',
    growthEngine: 'Global energy demand, downstream expansion',
    optimization: 'Sustainability initiatives, technology integration',
    scores: {
      innovation: 7,
      growth: 7,
      business: 10
    }
  },
  {
    id: 7,
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png',
    category: 'Tech',
    problem: 'Digital social connection and virtual reality adoption',
    targetUser: 'Social media users, advertisers, VR enthusiasts',
    whyNeeded: 'Social connectivity, digital advertising, metaverse development',
    useCase: 'Social networking, digital advertising, VR/AR experiences',
    userReviews: 'High engagement, privacy concerns',
    userAcquisition: 'Network effects, platform integration',
    revenue: '$134.9 billion (2023), Market Cap: $1.5 trillion',
    keyLearnings: 'Network effects drive platform growth',
    challenges: 'Privacy concerns, regulatory scrutiny',
    pitch: 'Connecting the world through social and virtual experiences',
    uniqueValue: 'Largest social network with metaverse ambitions',
    monetization: 'Digital advertising, VR hardware sales',
    growthEngine: 'User engagement, metaverse development',
    optimization: 'Privacy protection, AI content moderation',
    scores: {
      innovation: 8,
      growth: 8,
      business: 9
    }
  },
  {
    id: 8,
    name: 'Berkshire Hathaway',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Berkshire_Hathaway_logo.svg/2560px-Berkshire_Hathaway_logo.svg.png',
    category: 'Finance',
    problem: 'Long-term value creation and investment efficiency',
    targetUser: 'Investors, acquired companies',
    whyNeeded: 'Stable long-term investment and business operations',
    useCase: 'Investment, insurance, industrial operations',
    userReviews: 'Strong track record, trusted management',
    userAcquisition: 'Investment performance, reputation',
    revenue: '$302.1 billion (2023), Market Cap: $1.0 trillion',
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
    id: 9,
    name: 'Broadcom',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Broadcom_Ltd_Logo.svg/2560px-Broadcom_Ltd_Logo.svg.png',
    category: 'Tech',
    problem: 'Complex semiconductor and software infrastructure needs',
    targetUser: 'Technology manufacturers, enterprise customers',
    whyNeeded: 'Advanced semiconductor solutions and enterprise software',
    useCase: 'Networking, broadband, enterprise software',
    userReviews: 'High-quality products, strong support',
    userAcquisition: 'Strategic partnerships, enterprise sales',
    revenue: '$33.2 billion (2023), Market Cap: $944 billion',
    keyLearnings: 'Strategic acquisitions in complementary markets',
    challenges: 'Integration of acquisitions, market competition',
    pitch: 'Connecting everything through innovative technology',
    uniqueValue: 'Broad portfolio of critical technology solutions',
    monetization: 'Hardware sales, software licenses',
    growthEngine: 'Strategic acquisitions, product innovation',
    optimization: 'Post-merger integration, R&D efficiency',
    scores: {
      innovation: 8,
      growth: 8,
      business: 9
    }
  },
  {
    id: 10,
    name: 'TSMC',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/TSMC_Logo.svg/2560px-TSMC_Logo.svg.png',
    category: 'Tech',
    problem: 'Advanced semiconductor manufacturing complexity',
    targetUser: 'Semiconductor designers, technology companies',
    whyNeeded: 'High-performance chip manufacturing capabilities',
    useCase: 'Advanced chip fabrication, process development',
    userReviews: 'Industry-leading technology, reliable production',
    userAcquisition: 'Technology leadership, strategic partnerships',
    revenue: '$69.3 billion (2023), Market Cap: $915 billion',
    keyLearnings: 'Process technology leadership drives growth',
    challenges: 'Geopolitical risks, massive capital requirements',
    pitch: 'Enabling innovation through advanced chip manufacturing',
    uniqueValue: "World's leading semiconductor foundry",
    monetization: 'Manufacturing services, technology licensing',
    growthEngine: 'Process technology advancement, capacity expansion',
    optimization: 'Geographic diversification, sustainability',
    scores: {
      innovation: 9,
      growth: 8,
      business: 9
    }
  },
  {
    id: 11,
    name: 'Tesla',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/2048px-Tesla_T_symbol.svg.png',
    category: 'Tech',
    problem: 'Environmental impact of transportation and energy sustainability',
    targetUser: 'Electric vehicle consumers, energy companies, automotive industry',
    whyNeeded: 'Sustainable transportation and energy solutions',
    useCase: 'Electric vehicles, renewable energy storage, autonomous driving',
    userReviews: 'Strong brand loyalty, innovative technology',
    userAcquisition: 'Direct sales model, brand reputation',
    revenue: '$96.77 billion (2023), Market Cap: $903 billion',
    keyLearnings: 'Vertical integration in manufacturing and technology',
    challenges: 'Production scalability, market competition',
    pitch: 'Accelerating the world\'s transition to sustainable energy',
    uniqueValue: 'Leading electric vehicle technology and autonomous driving capabilities',
    monetization: 'Vehicle sales, energy products, software services',
    growthEngine: 'Technology innovation, global expansion',
    optimization: 'Manufacturing efficiency, service network expansion',
    scores: {
      innovation: 10,
      growth: 9,
      business: 8
    }
  },
  {
    id: 12,
    name: 'ASML',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/ASML_Holding_N.V._logo.svg/2560px-ASML_Holding_N.V._logo.svg.png',
    category: 'Tech',
    problem: 'Advanced semiconductor manufacturing equipment needs',
    targetUser: 'Semiconductor manufacturers, chip foundries',
    whyNeeded: 'Essential equipment for producing advanced chips',
    useCase: 'EUV lithography, semiconductor manufacturing',
    userReviews: 'Industry-standard equipment, reliable support',
    userAcquisition: 'Industry partnerships, technological leadership',
    revenue: '$27.2 billion (2023), Market Cap: $269 billion',
    keyLearnings: 'Monopoly in critical semiconductor technology',
    challenges: 'Supply chain complexity, geopolitical risks',
    pitch: 'Enabling the future of microchip manufacturing',
    uniqueValue: 'Exclusive provider of EUV lithography machines',
    monetization: 'Equipment sales, service contracts',
    growthEngine: 'Semiconductor industry growth, technological advancement',
    optimization: 'Supply chain resilience, R&D efficiency',
    scores: {
      innovation: 9,
      growth: 8,
      business: 9
    }
  },
  {
    id: 16,
    name: 'Tencent',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tencent_Logo.svg/2560px-Tencent_Logo.svg.png',
    category: 'Tech',
    problem: 'Digital social connection and entertainment needs in China',
    targetUser: 'Internet users, gamers, businesses in China',
    whyNeeded: 'Integrated social, gaming, and payment solutions',
    useCase: 'Social networking, gaming, digital payments',
    userReviews: 'Comprehensive ecosystem, strong user engagement',
    userAcquisition: 'Social network effects, gaming portfolio',
    revenue: '$87.53 billion (2023), Market Cap: $580 billion',
    keyLearnings: 'Super-app strategy success in China',
    challenges: 'Regulatory environment, international expansion',
    pitch: 'Connecting billions through social and digital entertainment',
    uniqueValue: 'Comprehensive digital ecosystem in China',
    monetization: 'Gaming, advertising, fintech services',
    growthEngine: 'User base expansion, strategic investments',
    optimization: 'International growth, cloud services expansion',
    scores: {
      innovation: 8,
      growth: 8,
      business: 9
    }
  },
  {
    id: 18,
    name: 'Samsung Electronics',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png',
    category: 'Tech',
    problem: 'Consumer electronics and semiconductor manufacturing needs',
    targetUser: 'Global consumers, enterprises, device manufacturers',
    whyNeeded: 'High-quality electronics and semiconductor components',
    useCase: 'Smartphones, displays, memory chips, appliances',
    userReviews: 'Premium quality products, strong brand recognition',
    userAcquisition: 'Global retail presence, brand marketing',
    revenue: '$244.2 billion (2023), Market Cap: $261 billion',
    keyLearnings: 'Vertical integration in electronics',
    challenges: 'Market competition, technology cycles',
    pitch: 'Innovating technology for a better world',
    uniqueValue: 'Integrated electronics and semiconductor leader',
    monetization: 'Hardware sales, component supply, services',
    growthEngine: 'Product innovation, market expansion',
    optimization: 'R&D efficiency, supply chain resilience',
    scores: {
      innovation: 9,
      growth: 8,
      business: 9
    }
  },
  {
    id: 20,
    name: 'Oracle',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/2560px-Oracle_logo.svg.png',
    category: 'Tech',
    problem: 'Enterprise data management and cloud infrastructure needs',
    targetUser: 'Enterprises, developers, database administrators',
    whyNeeded: 'Reliable database and cloud solutions',
    useCase: 'Enterprise databases, cloud services, business applications',
    userReviews: 'Industry-standard databases, comprehensive solutions',
    userAcquisition: 'Enterprise sales, partner network',
    revenue: '$50.0 billion (2023), Market Cap: Significant',
    keyLearnings: 'Enterprise software leadership',
    challenges: 'Cloud market competition, legacy systems',
    pitch: 'Empowering enterprises with data and cloud solutions',
    uniqueValue: 'Leading enterprise database and applications provider',
    monetization: 'Software licenses, cloud subscriptions, support',
    growthEngine: 'Cloud adoption, database market dominance',
    optimization: 'Cloud infrastructure expansion, AI integration',
    scores: {
      innovation: 8,
      growth: 7,
      business: 9
    }
  },
  {
    id: 28,
    name: 'ICBC',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/ICBC.svg/2560px-ICBC.svg.png',
    category: 'Finance',
    problem: 'Financial services needs in China and globally',
    targetUser: 'Individual and corporate banking customers',
    whyNeeded: 'Comprehensive banking and financial services',
    useCase: 'Banking, investment, corporate finance',
    userReviews: 'Extensive network, reliable services',
    userAcquisition: 'Branch network, digital banking',
    revenue: '$208.5 billion (2023), Market Cap: $320 billion',
    keyLearnings: 'Scale advantages in banking',
    challenges: 'Digital transformation, risk management',
    pitch: 'Leading global bank with strong Chinese presence',
    uniqueValue: 'World\'s largest bank by assets',
    monetization: 'Interest income, fees, investments',
    growthEngine: 'Economic growth, international expansion',
    optimization: 'Digital services, risk control',
    scores: {
      innovation: 7,
      growth: 7,
      business: 9
    }
  },
  {
    id: 30,
    name: 'JPMorgan Chase',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/J.P._Morgan_Logo_2008_1.svg/2560px-J.P._Morgan_Logo_2008_1.svg.png',
    category: 'Finance',
    problem: 'Complex financial services and investment needs',
    targetUser: 'Retail and institutional clients',
    whyNeeded: 'Integrated financial services solutions',
    useCase: 'Banking, investment banking, asset management',
    userReviews: 'Strong reputation, comprehensive services',
    userAcquisition: 'Brand strength, institutional relationships',
    revenue: '$157.8 billion (2023), Market Cap: Significant',
    keyLearnings: 'Financial innovation leadership',
    challenges: 'Regulatory compliance, fintech competition',
    pitch: 'Global financial leadership through innovation',
    uniqueValue: 'Full-service financial powerhouse',
    monetization: 'Banking services, trading, advisory',
    growthEngine: 'Market expansion, technology adoption',
    optimization: 'Digital transformation, efficiency',
    scores: {
      innovation: 8,
      growth: 7,
      business: 9
    }
  },
  {
    id: 44,
    name: 'Agricultural Bank of China',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Agricultural_Bank_of_China_logo.svg/2560px-Agricultural_Bank_of_China_logo.svg.png',
    category: 'Finance',
    problem: 'Rural and agricultural financial services needs',
    targetUser: 'Rural communities, agricultural businesses',
    whyNeeded: 'Specialized banking for rural development',
    useCase: 'Agricultural lending, rural banking',
    userReviews: 'Strong rural presence, specialized services',
    userAcquisition: 'Rural network, government support',
    revenue: '$177.3 billion (2023), Market Cap: $257 billion',
    keyLearnings: 'Rural banking expertise',
    challenges: 'Digital transformation, NPL management',
    pitch: 'Supporting China\'s agricultural and rural development',
    uniqueValue: 'Leading agricultural and rural financial services',
    monetization: 'Interest income, rural financial services',
    growthEngine: 'Rural development, urban expansion',
    optimization: 'Digital services, risk management',
    scores: {
      innovation: 7,
      growth: 7,
      business: 8
    }
  },
  {
    id: 47,
    name: 'UnitedHealth Group',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UnitedHealth_Group_logo.svg/2560px-UnitedHealth_Group_logo.svg.png',
    category: 'Healthcare',
    problem: 'Healthcare access and cost management',
    targetUser: 'Healthcare providers, insurers, patients',
    whyNeeded: 'Integrated healthcare and insurance solutions',
    useCase: 'Health insurance, healthcare services',
    userReviews: 'Comprehensive coverage, extensive network',
    userAcquisition: 'Employer partnerships, Medicare/Medicaid',
    revenue: '$324.2 billion (2023), Market Cap: Significant',
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
    id: 32,
    name: 'Alibaba',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alibaba_Group_logo.svg/2560px-Alibaba_Group_logo.svg.png',
    category: 'Commerce',
    problem: 'E-commerce and digital infrastructure needs in China',
    targetUser: 'Consumers, merchants, enterprises',
    whyNeeded: 'Integrated e-commerce and cloud solutions',
    useCase: 'Online retail, cloud computing, digital payments',
    userReviews: 'Comprehensive ecosystem, reliable platform',
    userAcquisition: 'Marketplace network effects, cloud services',
    revenue: '$126.5 billion (2023), Market Cap: $302 billion',
    keyLearnings: 'Digital ecosystem integration',
    challenges: 'Regulatory environment, international expansion',
    pitch: 'Making it easy to do business anywhere',
    uniqueValue: 'Leading e-commerce and cloud platform in China',
    monetization: 'Commission fees, cloud services, advertising',
    growthEngine: 'Digital economy growth, cloud adoption',
    optimization: 'International expansion, technology innovation',
    scores: {
      innovation: 9,
      growth: 8,
      business: 9
    }
  },
  {
    id: 40,
    name: 'Kweichow Moutai',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Kweichow_Moutai_logo.png/2560px-Kweichow_Moutai_logo.png',
    category: 'Consumer',
    problem: 'High-end liquor market demands',
    targetUser: 'Premium consumers, corporate clients',
    whyNeeded: 'Premium Chinese spirits and status symbol',
    useCase: 'Luxury gifting, high-end consumption',
    userReviews: 'Premium quality, strong brand value',
    userAcquisition: 'Brand prestige, limited distribution',
    revenue: '$17.2 billion (2023), Market Cap: $267 billion',
    keyLearnings: 'Premium brand management',
    challenges: 'Production capacity, market expansion',
    pitch: 'China\'s most valuable spirits brand',
    uniqueValue: 'Unique brewing technique and brand heritage',
    monetization: 'Premium pricing, controlled distribution',
    growthEngine: 'Premium consumption growth, international markets',
    optimization: 'Production expansion, brand protection',
    scores: {
      innovation: 7,
      growth: 8,
      business: 10
    }
  },
  {
    id: 42,
    name: 'TikTok',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/TikTok_logo.svg/2560px-TikTok_logo.svg.png',
    category: 'Tech',
    problem: 'Short-form video content creation and consumption',
    targetUser: 'Content creators, social media users',
    whyNeeded: 'Engaging short-form video platform',
    useCase: 'Social entertainment, content creation',
    userReviews: 'Highly engaging, innovative features',
    userAcquisition: 'Viral content, algorithmic recommendations',
    revenue: 'Significant (Private Company), Brand Value: Top 10 Global',
    keyLearnings: 'AI-driven content recommendation',
    challenges: 'Regulatory scrutiny, data privacy',
    pitch: 'Inspiring creativity and bringing joy',
    uniqueValue: 'Leading short-form video platform globally',
    monetization: 'Advertising, in-app purchases',
    growthEngine: 'User engagement, creator economy',
    optimization: 'Content moderation, international relations',
    scores: {
      innovation: 10,
      growth: 9,
      business: 8
    }
  },
  {
    id: 45,
    name: 'Haier',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Haier_logo.svg/2560px-Haier_logo.svg.png',
    category: 'Consumer',
    problem: 'Smart home appliance integration',
    targetUser: 'Home owners, property developers',
    whyNeeded: 'Connected smart home solutions',
    useCase: 'Smart appliances, home automation',
    userReviews: 'Quality products, smart features',
    userAcquisition: 'Retail channels, property partnerships',
    revenue: '$47.9 billion (2023), Global Leader',
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
    id: 23,
    name: 'Walmart',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/2560px-Walmart_logo.svg.png',
    category: 'Commerce',
    problem: 'Retail accessibility and affordability',
    targetUser: 'Mass market consumers, suppliers',
    whyNeeded: 'Affordable retail and grocery solutions',
    useCase: 'Retail shopping, grocery, e-commerce',
    userReviews: 'Low prices, wide selection',
    userAcquisition: 'Price leadership, store network',
    revenue: '$611.3 billion (2023), Market Cap: Significant',
    keyLearnings: 'Supply chain efficiency',
    challenges: 'E-commerce competition, labor relations',
    pitch: 'Save money. Live better.',
    uniqueValue: 'World\'s largest retailer with lowest prices',
    monetization: 'Retail sales, marketplace fees',
    growthEngine: 'Store expansion, e-commerce growth',
    optimization: 'Digital transformation, supply chain',
    scores: {
      innovation: 7,
      growth: 7,
      business: 9
    }
  },
  {
    id: 25,
    name: 'Eli Lilly',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Eli_Lilly_and_Company.svg/2560px-Eli_Lilly_and_Company.svg.png',
    category: 'Healthcare',
    problem: 'Chronic disease treatment and weight management',
    targetUser: 'Patients, healthcare providers',
    whyNeeded: 'Innovative pharmaceutical solutions',
    useCase: 'Diabetes, obesity, oncology treatments',
    userReviews: 'Effective treatments, breakthrough innovations',
    userAcquisition: 'Healthcare provider relationships',
    revenue: '$34.1 billion (2023), Market Cap: Significant',
    keyLearnings: 'R&D focus in key therapeutic areas',
    challenges: 'Drug development costs, pricing pressure',
    pitch: 'Making life better through innovation',
    uniqueValue: 'Leader in diabetes and weight management',
    monetization: 'Pharmaceutical sales, licensing',
    growthEngine: 'Pipeline development, market expansion',
    optimization: 'R&D efficiency, market access',
    scores: {
      innovation: 9,
      growth: 8,
      business: 9
    }
  },
  {
    id: 33,
    name: 'Novo Nordisk',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Novo_Nordisk_Logo.svg/2560px-Novo_Nordisk_Logo.svg.png',
    category: 'Healthcare',
    problem: 'Diabetes and obesity treatment',
    targetUser: 'Patients with diabetes and obesity',
    whyNeeded: 'Effective metabolic disorder treatments',
    useCase: 'Diabetes management, weight loss treatment',
    userReviews: 'Highly effective medications, strong results',
    userAcquisition: 'Medical professional relationships',
    revenue: '$33.7 billion (2023), Market Cap: Significant',
    keyLearnings: 'Focus on metabolic disorders',
    challenges: 'Production capacity, market access',
    pitch: 'Driving change to defeat diabetes and obesity',
    uniqueValue: 'Leader in GLP-1 and diabetes treatments',
    monetization: 'Pharmaceutical sales, research',
    growthEngine: 'New drug development, market expansion',
    optimization: 'Manufacturing scale, accessibility',
    scores: {
      innovation: 9,
      growth: 9,
      business: 9
    }
  },
  {
    id: 38,
    name: 'Nestlé',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Nestlé_logo.svg/2560px-Nestlé_logo.svg.png',
    category: 'Consumer',
    problem: 'Global nutrition and food quality',
    targetUser: 'Global consumers, food service industry',
    whyNeeded: 'Quality food and beverage products',
    useCase: 'Food and beverage consumption',
    userReviews: 'Trusted brands, quality products',
    userAcquisition: 'Global distribution, brand portfolio',
    revenue: '$93.2 billion (2023), Market Cap: Significant',
    keyLearnings: 'Brand portfolio management',
    challenges: 'Health trends, sustainability',
    pitch: 'Good food, good life',
    uniqueValue: 'World\'s largest food and beverage company',
    monetization: 'Product sales, licensing',
    growthEngine: 'Product innovation, market expansion',
    optimization: 'Sustainability initiatives, health focus',
    scores: {
      innovation: 7,
      growth: 7,
      business: 9
    }
  }
])

const filteredCompanies = computed(() => {
  if (selectedCategory.value === 'All') return companies.value
  return companies.value.filter(company => company.category === selectedCategory.value)
})

async function analyzeCompany() {
  if (!search.value) return
  analysisResult.value = 'Analyzing...'
  try {
    const res = await fetch(`https://your-worker-url.workers.dev/?company=${encodeURIComponent(search.value)}`)
    analysisResult.value = await res.text()
  } catch (error) {
    analysisResult.value = 'Error analyzing company. Please try again.'
  }
}
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style> 