"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Loader2, Navigation, Phone, Globe, MapPinIcon, ExternalLink } from "lucide-react"
import {
  Brain,
  Code,
  Heart,
  Leaf,
  Wrench,
  Calculator,
  GraduationCap,
  Clock,
  TrendingUp,
  Users,
  MapPin,
  DollarSign,
  Star,
  ArrowLeft,
  RotateCcw,
  Briefcase,
  Building,
  BookOpen,
  Award,
  CheckCircle,
  Palette,
  Scale,
  Sprout,
} from "lucide-react"

declare global {
  interface Window {
    google: any
  }
}

// Question data structure based on the CSV
const questionData = {
  Q1: {
    question: "Are you fascinated by solving mathematical or logical problems?",
    nextYes: "Q2",
    nextNo: "Q3",
    suggestion: "",
  },
  Q2: {
    question: "Do you enjoy studying theoretical concepts like quantum mechanics or calculus?",
    nextYes: "Q7",
    nextNo: "Q3",
    suggestion: "",
  },
  Q3: {
    question: "Are you interested in biological processes like cell functions or ecosystems?",
    nextYes: "Q8",
    nextNo: "Q4",
    suggestion: "",
  },
  Q4: {
    question: "Do you like working with computers, programming, or data analysis?",
    nextYes: "Q9",
    nextNo: "Q5",
    suggestion: "",
  },
  Q5: {
    question: "Are you passionate about healthcare or medical treatment?",
    nextYes: "Q10",
    nextNo: "Q6",
    suggestion: "",
  },
  Q6: {
    question: "Do you enjoy learning about agriculture, plants, or animal sciences?",
    nextYes: "Q11",
    nextNo: "Q12",
    suggestion: "",
  },
  Q7: {
    question: "Are you interested in studying atomic structures, mechanics, or astrophysics?",
    nextYes: "Q42",
    nextNo: "Q13",
    suggestion: "B.Sc. Physics",
  },
  Q8: {
    question: "Are you curious about molecular biology, genetics, or microbes?",
    nextYes: "Q15",
    nextNo: "Q16",
    suggestion: "",
  },
  Q9: {
    question: "Are you excited about coding or developing software applications?",
    nextYes: "Q45",
    nextNo: "Q17",
    suggestion: "B.Sc. Computer Science",
  },
  Q10: {
    question: "Do you want to become a medical doctor or dentist?",
    nextYes: "Q48",
    nextNo: "Q18",
    suggestion: "MBBS",
  },
  Q11: {
    question: "Are you interested in farming, crop science, or soil management?",
    nextYes: "Q51",
    nextNo: "Q19",
    suggestion: "B.Sc. Agriculture",
  },
  Q12: {
    question: "Do you want to apply science to solve crimes, like analyzing evidence?",
    nextYes: "Q20",
    nextNo: "Q23",
    suggestion: "",
  },
  Q13: {
    question: "Are you passionate about abstract mathematics, like algebra or number theory?",
    nextYes: "Q21",
    nextNo: "Q14",
    suggestion: "B.Sc. Mathematics",
  },
  Q14: {
    question: "Do you enjoy conducting chemical experiments or studying reactions?",
    nextYes: "Q22",
    nextNo: "Q26",
    suggestion: "B.Sc. Chemistry",
  },
  Q15: {
    question: "Are you interested in genetic engineering or biotech applications?",
    nextYes: "Q24",
    nextNo: "Q25",
    suggestion: "",
  },
  Q16: {
    question: "Are you passionate about conservation or environmental sustainability?",
    nextYes: "Q27",
    nextNo: "Q28",
    suggestion: "B.Sc. Environmental Science",
  },
  Q17: {
    question: "Are you interested in analyzing large datasets or artificial intelligence?",
    nextYes: "Q29",
    nextNo: "Q30",
    suggestion: "B.Sc. Data Science",
  },
  Q18: {
    question: "Are you drawn to patient care roles like nursing or physiotherapy?",
    nextYes: "Q31",
    nextNo: "Q32",
    suggestion: "",
  },
  Q19: {
    question: "Are you fascinated by forestry or aquatic ecosystems?",
    nextYes: "Q33",
    nextNo: "Q34",
    suggestion: "",
  },
  Q20: {
    question: "Are you interested in forensic analysis or crime scene investigation?",
    nextYes: "Q41",
    nextNo: "Q23",
    suggestion: "B.Sc. Forensic Science",
  },
  Q21: {
    question: "Do you enjoy solving complex equations or proofs?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Mathematics",
  },
  Q22: {
    question: "Are you curious about chemical synthesis or material properties?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Chemistry",
  },
  Q23: {
    question: "Are you interested in designing machines, circuits, or software systems?",
    nextYes: "Q54",
    nextNo: "Q41",
    suggestion: "B.E./B.Tech",
  },
  Q24: {
    question: "Do you want to develop new biotechnologies or medical treatments?",
    nextYes: "Q41",
    nextNo: "Q35",
    suggestion: "B.Sc. Biotechnology",
  },
  Q25: {
    question: "Are you fascinated by microorganisms or infectious diseases?",
    nextYes: "Q41",
    nextNo: "Q36",
    suggestion: "B.Sc. Microbiology",
  },
  Q26: { question: "Are you interested in animal biology or wildlife?", nextYes: "Q37", nextNo: "Q38", suggestion: "" },
  Q27: {
    question: "Do you want to work on climate change or ecological restoration?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Environmental Science",
  },
  Q28: {
    question: "Are you curious about biochemical processes in living organisms?",
    nextYes: "Q41",
    nextNo: "Q39",
    suggestion: "B.Sc. Biochemistry",
  },
  Q29: {
    question: "Do you enjoy working with big data or machine learning?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Data Science",
  },
  Q30: {
    question: "Do you want to manage IT systems or cybersecurity?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Information Technology",
  },
  Q31: {
    question: "Are you interested in nutrition or dietary health?",
    nextYes: "Q40",
    nextNo: "Q41",
    suggestion: "B.Sc. Nutrition & Dietetics",
  },
  Q32: {
    question: "Are you drawn to alternative medicine like Ayurveda or homeopathy?",
    nextYes: "Q42",
    nextNo: "Q43",
    suggestion: "",
  },
  Q33: {
    question: "Are you passionate about forest conservation or management?",
    nextYes: "Q41",
    nextNo: "Q44",
    suggestion: "B.Sc. Forestry",
  },
  Q34: {
    question: "Are you interested in fisheries or aquatic biology?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Fisheries Science",
  },
  Q35: {
    question: "Are you curious about genetic inheritance or DNA analysis?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Genetics",
  },
  Q36: {
    question: "Are you interested in studying plant biology or botany?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Botany",
  },
  Q37: {
    question: "Are you fascinated by zoology or animal behavior?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Zoology",
  },
  Q38: {
    question: "Do you enjoy studying broad biological concepts?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Biology",
  },
  Q39: {
    question: "Do you want to work on drug development or pharmacology?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Pharm",
  },
  Q40: {
    question: "Are you interested in rehabilitation or physical therapy?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "BPT",
  },
  Q41: {
    question: "Please try the quiz again or consult a counselor for personalized guidance.",
    nextYes: "",
    nextNo: "",
    suggestion: "No clear match",
  },
  Q42: {
    question: "Are you excited about exploring quantum mechanics or relativity?",
    nextYes: "Q43",
    nextNo: "Q43",
    suggestion: "",
  },
  Q43: {
    question: "Do you enjoy conducting experiments on forces, optics, or electricity?",
    nextYes: "Q44",
    nextNo: "Q44",
    suggestion: "",
  },
  Q44: {
    question: "Are you interested in a career in physics research or astrophysics?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Physics",
  },
  Q45: {
    question: "Do you enjoy building software or mobile applications?",
    nextYes: "Q46",
    nextNo: "Q46",
    suggestion: "",
  },
  Q46: {
    question: "Are you interested in algorithms or computer system design?",
    nextYes: "Q47",
    nextNo: "Q47",
    suggestion: "",
  },
  Q47: {
    question: "Do you want a career in software development or IT consulting?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Computer Science",
  },
  Q48: {
    question: "Are you prepared for a long medical degree with clinical training?",
    nextYes: "Q49",
    nextNo: "Q49",
    suggestion: "",
  },
  Q49: {
    question: "Do you enjoy studying human anatomy or performing surgeries?",
    nextYes: "Q50",
    nextNo: "Q50",
    suggestion: "",
  },
  Q50: {
    question: "Are you committed to a career as a doctor in hospitals or clinics?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "MBBS",
  },
  Q51: {
    question: "Do you enjoy working on crop improvement or sustainable farming?",
    nextYes: "Q52",
    nextNo: "Q52",
    suggestion: "",
  },
  Q52: {
    question: "Are you interested in agricultural technology or soil science?",
    nextYes: "Q53",
    nextNo: "Q53",
    suggestion: "",
  },
  Q53: {
    question: "Do you want a career in agribusiness or agricultural research?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.Sc. Agriculture",
  },
  Q54: {
    question: "Are you excited about designing robots, circuits, or structures?",
    nextYes: "Q55",
    nextNo: "Q55",
    suggestion: "",
  },
  Q55: {
    question: "Do you enjoy hands-on engineering projects or prototyping?",
    nextYes: "Q56",
    nextNo: "Q56",
    suggestion: "",
  },
  Q56: {
    question: "Are you interested in a career in engineering or technology innovation?",
    nextYes: "Q41",
    nextNo: "Q41",
    suggestion: "B.E./B.Tech",
  },
}

const careerQuestionnaires = {
  "Data Analyst": [
    {
      question: "Do you enjoy working with spreadsheets and organizing data?",
      weight: 3,
    },
    {
      question: "Are you comfortable with basic statistics and mathematics?",
      weight: 3,
    },
    {
      question: "Do you like creating charts and visualizations to tell stories with data?",
      weight: 4,
    },
    {
      question: "Are you interested in business intelligence and helping companies make decisions?",
      weight: 4,
    },
    {
      question: "Do you enjoy using tools like Excel, Power BI, or Tableau?",
      weight: 3,
    },
    {
      question: "Are you good at identifying patterns and trends in information?",
      weight: 4,
    },
    {
      question: "Do you prefer working with structured data and databases?",
      weight: 3,
    },
    {
      question: "Are you interested in SQL and database querying?",
      weight: 3,
    },
    {
      question: "Do you enjoy presenting findings to business stakeholders?",
      weight: 3,
    },
    {
      question: "Are you detail-oriented and enjoy ensuring data accuracy?",
      weight: 4,
    },
  ],
  "Data Scientist": [
    {
      question: "Do you have strong mathematical and statistical knowledge?",
      weight: 4,
    },
    {
      question: "Are you comfortable with programming languages like Python or R?",
      weight: 4,
    },
    {
      question: "Do you enjoy building predictive models and machine learning algorithms?",
      weight: 4,
    },
    {
      question: "Are you interested in extracting insights from complex, unstructured data?",
      weight: 4,
    },
    {
      question: "Do you like conducting experiments and hypothesis testing?",
      weight: 3,
    },
    {
      question: "Are you comfortable with advanced statistics and probability?",
      weight: 4,
    },
    {
      question: "Do you enjoy working on research-oriented projects?",
      weight: 3,
    },
    {
      question: "Are you interested in artificial intelligence and deep learning?",
      weight: 3,
    },
    {
      question: "Do you like working with big data and distributed computing?",
      weight: 3,
    },
    {
      question: "Are you passionate about solving complex business problems with data?",
      weight: 4,
    },
  ],
  "AI Engineer": [
    {
      question: "Do you have strong programming skills in Python, Java, or C++?",
      weight: 4,
    },
    {
      question: "Are you interested in machine learning algorithms and neural networks?",
      weight: 4,
    },
    {
      question: "Do you enjoy working with computer vision or natural language processing?",
      weight: 3,
    },
    {
      question: "Are you comfortable with software engineering and system design?",
      weight: 4,
    },
    {
      question: "Do you like building and deploying AI models in production?",
      weight: 4,
    },
    {
      question: "Are you interested in robotics and autonomous systems?",
      weight: 3,
    },
    {
      question: "Do you enjoy working with cloud platforms and MLOps?",
      weight: 3,
    },
    {
      question: "Are you passionate about cutting-edge AI research and development?",
      weight: 4,
    },
    {
      question: "Do you like optimizing algorithms for performance and scalability?",
      weight: 3,
    },
    {
      question: "Are you interested in ethical AI and responsible machine learning?",
      weight: 3,
    },
  ],
}

const careerRoadmaps = {
  "Data Analyst": {
    duration: "3-6 Months",
    description:
      "Data Analysts transform raw data into actionable business insights through visualization, statistical analysis, and reporting. They bridge the gap between raw data and business decision-making.",
    keySkills: ["Excel", "SQL", "Power BI/Tableau", "Statistics", "Python/Pandas", "Business Intelligence"],
    careerPaths: [
      "Business Analyst",
      "Data Analyst",
      "BI Developer",
      "Marketing Analyst",
      "Financial Analyst",
      "Operations Analyst",
      "Product Analyst",
    ],
    averageSalary: "$45,000 - $95,000",
    industryDemand: "High - Growing 25% faster than average",
    workEnvironment: "Office/Remote - Collaborative with business teams",
    dailyTasks: [
      "Create dashboards and reports",
      "Analyze business metrics and KPIs",
      "Present insights to stakeholders",
      "Clean and prepare data for analysis",
      "Identify trends and patterns in data",
    ],
    industryApplications: [
      "E-commerce: Customer behavior analysis",
      "Finance: Risk assessment and fraud detection",
      "Healthcare: Patient outcome analysis",
      "Marketing: Campaign performance optimization",
      "Supply Chain: Inventory and logistics optimization",
    ],
    learningResources: {
      free: [
        "Codebasics YouTube Channel",
        "Khan Academy Statistics",
        "Microsoft Learn (Power BI)",
        "W3Schools SQL Tutorial",
        "Kaggle Learn",
      ],
      paid: ["Codebasics Data Analyst Bootcamp", "Power BI Data Analysis Course", "SQL for Data Professionals"],
    },
    certifications: [
      "Microsoft PL-300 (Power BI Data Analyst)",
      "Tableau Desktop Specialist",
      "Google Data Analytics Certificate",
      "Microsoft Excel Expert",
    ],
    roadmap: {
      weeks: [
        {
          title: "Week 0: Foundation & Research",
          topics: ["Market research", "Scam awareness", "Mind & body preparation", "Career suitability test"],
          deliverables: ["Research report", "Learning plan", "LinkedIn profile setup"],
        },
        {
          title: "Week 1-2: Excel & Business Math",
          topics: [
            "Basic & Advanced Excel formulas",
            "Pivot Tables & Power Query",
            "Business statistics & percentages",
            "YoY growth calculations",
            "Market share analysis",
          ],
          deliverables: ["Personal budget tracker", "Business math exercises", "Excel project portfolio"],
        },
        {
          title: "Week 3-5: BI Tools & Domain Knowledge",
          topics: [
            "Power BI/Tableau fundamentals",
            "Data modeling & DAX",
            "Dashboard design principles",
            "Business domains (Finance, Marketing, Operations)",
            "P&L statement analysis",
          ],
          deliverables: ["Sales insights dashboard", "Hospitality analytics project", "Domain knowledge summary"],
        },
        {
          title: "Week 6-8: SQL & Portfolio Development",
          topics: [
            "Database fundamentals",
            "Complex queries & joins",
            "Window functions",
            "ATS resume creation",
            "Portfolio website",
          ],
          deliverables: ["SQL resume project", "Professional portfolio", "GitHub repository"],
        },
        {
          title: "Week 9-10: Python & Advanced Analytics",
          topics: [
            "Python basics",
            "Pandas for data analysis",
            "Data visualization",
            "AI tools integration",
            "Statistical analysis",
          ],
          deliverables: ["Python data analysis project", "Automated reporting system"],
        },
        {
          title: "Week 11-12: Interview Preparation & Job Search",
          topics: [
            "Technical interview prep",
            "Case study practice",
            "Presentation skills",
            "Job application strategy",
            "Networking",
          ],
          deliverables: ["Mock interview completion", "Job applications", "Professional network expansion"],
        },
      ],
      projects: [
        "Personal Finance Dashboard with Excel",
        "Sales Performance Analytics with Power BI",
        "Customer Segmentation Analysis with SQL",
        "Marketing Campaign ROI Analysis",
        "Supply Chain Optimization Dashboard",
      ],
    },
  },
  "Data Scientist": {
    duration: "6 Months",
    description:
      "Data Scientists use advanced analytics, machine learning, and statistical methods to solve complex business problems and predict future trends. They combine domain expertise with programming skills to extract insights from large datasets.",
    keySkills: [
      "Python/R",
      "Machine Learning",
      "Statistics",
      "SQL",
      "Deep Learning",
      "Data Visualization",
      "A/B Testing",
    ],
    careerPaths: [
      "Data Scientist",
      "ML Engineer",
      "Research Scientist",
      "AI Consultant",
      "Product Data Scientist",
      "Quantitative Analyst",
      "Data Science Manager",
    ],
    averageSalary: "$70,000 - $150,000",
    industryDemand: "Very High - Fastest growing tech role",
    workEnvironment: "Tech companies, startups, research labs",
    dailyTasks: [
      "Build predictive models and algorithms",
      "Conduct statistical analysis and hypothesis testing",
      "Design and analyze A/B tests",
      "Collaborate with engineering teams",
      "Present findings to executive leadership",
    ],
    industryApplications: [
      "Tech: Recommendation systems and user behavior",
      "Finance: Algorithmic trading and risk modeling",
      "Healthcare: Drug discovery and diagnostic tools",
      "Retail: Demand forecasting and pricing optimization",
      "Transportation: Route optimization and autonomous systems",
    ],
    learningResources: {
      free: [
        "Codebasics Machine Learning Playlist",
        "StatQuest YouTube Channel",
        "Kaggle Learn & Competitions",
        "Khan Academy Statistics",
        "3Blue1Brown Linear Algebra",
      ],
      paid: [
        "Codebasics Data Science Bootcamp",
        "Machine Learning for Data Science Course",
        "Deep Learning Specialization",
      ],
    },
    certifications: [
      "Google Professional Data Scientist",
      "IBM Data Science Professional Certificate",
      "Microsoft Azure Data Scientist Associate",
      "AWS Certified Machine Learning",
    ],
    roadmap: {
      weeks: [
        {
          title: "Week 0: Research & Foundation",
          topics: ["Industry research", "Scam awareness", "Career planning", "Learning path selection"],
          deliverables: ["Career research report", "Learning strategy", "Professional profile setup"],
        },
        {
          title: "Week 1-2: Python Programming",
          topics: ["Python fundamentals", "Data structures", "Object-oriented programming", "Libraries ecosystem"],
          deliverables: ["Python programming exercises", "Mini projects", "Code portfolio"],
        },
        {
          title: "Week 3: Data Science Libraries",
          topics: [
            "NumPy for numerical computing",
            "Pandas for data manipulation",
            "Matplotlib & Seaborn visualization",
            "Jupyter notebooks",
          ],
          deliverables: ["Data analysis notebooks", "Visualization portfolio"],
        },
        {
          title: "Week 4-7: Statistics & Mathematics",
          topics: [
            "Descriptive & inferential statistics",
            "Probability distributions",
            "Hypothesis testing",
            "Bayesian thinking",
            "Linear algebra basics",
          ],
          deliverables: ["Statistical analysis projects", "Math foundations assessment"],
        },
        {
          title: "Week 8: Exploratory Data Analysis",
          topics: [
            "Data cleaning techniques",
            "Pattern recognition",
            "Statistical storytelling",
            "Kaggle competitions",
          ],
          deliverables: ["EDA projects on multiple datasets", "Kaggle submissions"],
        },
        {
          title: "Week 9-10: SQL & Database Management",
          topics: ["Advanced SQL queries", "Database optimization", "Data warehousing concepts", "ETL processes"],
          deliverables: ["SQL portfolio projects", "Database design project"],
        },
        {
          title: "Week 11-15: Machine Learning",
          topics: [
            "Supervised learning algorithms",
            "Unsupervised learning",
            "Model evaluation & selection",
            "Feature engineering",
            "Cross-validation",
          ],
          deliverables: ["ML model portfolio", "Kaggle competition entries", "Research paper reviews"],
        },
        {
          title: "Week 16-18: Advanced ML & Deployment",
          topics: ["Ensemble methods", "Model deployment", "MLOps basics", "API development", "Cloud platforms"],
          deliverables: ["Deployed ML applications", "End-to-end ML pipeline"],
        },
        {
          title: "Week 19-21: Deep Learning",
          topics: ["Neural network fundamentals", "CNN for computer vision", "RNN for sequences", "Transfer learning"],
          deliverables: ["Deep learning projects", "Computer vision applications"],
        },
        {
          title: "Week 22-24: Specialization & Portfolio",
          topics: [
            "NLP or Computer Vision specialization",
            "Advanced projects",
            "Research methodologies",
            "Industry case studies",
          ],
          deliverables: ["Specialized project portfolio", "Technical blog posts", "Professional presentations"],
        },
      ],
      projects: [
        "Customer Churn Prediction Model",
        "Recommendation System for E-commerce",
        "Time Series Forecasting for Sales",
        "Computer Vision for Medical Diagnosis",
        "Natural Language Processing for Sentiment Analysis",
        "A/B Testing Framework Development",
      ],
    },
  },
  "AI Engineer": {
    duration: "8 Months",
    description:
      "AI Engineers combine data science expertise with software engineering skills to build, deploy, and maintain AI systems at scale. They focus on productionizing machine learning models and creating robust AI infrastructure.",
    keySkills: [
      "Python/Java/C++",
      "Machine Learning",
      "Software Engineering",
      "MLOps",
      "Cloud Platforms",
      "System Design",
      "DevOps",
    ],
    careerPaths: [
      "AI Engineer",
      "ML Engineer",
      "AI Architect",
      "Robotics Engineer",
      "AI Research Engineer",
      "Platform Engineer",
      "AI Product Manager",
    ],
    averageSalary: "$80,000 - $180,000",
    industryDemand: "Extremely High - Critical for AI transformation",
    workEnvironment: "Tech giants, AI startups, research institutions",
    dailyTasks: [
      "Design and implement ML pipelines",
      "Optimize model performance and scalability",
      "Build AI-powered applications and APIs",
      "Manage ML infrastructure and deployment",
      "Collaborate with research and product teams",
    ],
    industryApplications: [
      "Autonomous Vehicles: Self-driving car systems",
      "Robotics: Industrial automation and service robots",
      "Healthcare: AI-powered diagnostic tools",
      "Finance: Algorithmic trading and fraud detection",
      "Gaming: AI opponents and procedural generation",
      "Smart Cities: Traffic optimization and resource management",
    ],
    learningResources: {
      free: [
        "Codebasics AI/ML Playlists",
        "Fast.ai Practical Deep Learning",
        "CS231n Stanford Course",
        "MIT OpenCourseWare AI",
        "Papers With Code",
      ],
      paid: [
        "Codebasics AI Bootcamp",
        "Deep Learning Specialization",
        "MLOps Engineering Course",
        "System Design for ML",
      ],
    },
    certifications: [
      "Google Professional ML Engineer",
      "AWS Certified Machine Learning",
      "Microsoft Azure AI Engineer",
      "NVIDIA Deep Learning Institute",
      "Kubernetes Application Developer",
    ],
    roadmap: {
      weeks: [
        {
          title: "Week 0: Research & Career Planning",
          topics: ["AI industry landscape", "Scam awareness", "Career trajectory planning", "Skill gap analysis"],
          deliverables: ["Industry research report", "Personal development plan"],
        },
        {
          title: "Week 1-2: Computer Science Fundamentals",
          topics: [
            "Data structures & algorithms",
            "Computer systems",
            "Network protocols",
            "Software engineering principles",
          ],
          deliverables: ["CS fundamentals assessment", "Programming challenges"],
        },
        {
          title: "Week 3-4: Advanced Python Programming",
          topics: ["Object-oriented design", "Design patterns", "Concurrent programming", "Code optimization"],
          deliverables: ["Advanced Python projects", "Code review portfolio"],
        },
        {
          title: "Week 5-6: Data Structures & Algorithms",
          topics: ["Algorithm complexity", "Advanced data structures", "Graph algorithms", "Dynamic programming"],
          deliverables: ["Algorithm implementation portfolio", "Coding interview preparation"],
        },
        {
          title: "Week 7-8: Software Engineering Practices",
          topics: ["Version control mastery", "Testing frameworks", "Code documentation", "Agile methodologies"],
          deliverables: ["Open source contributions", "Software project portfolio"],
        },
        {
          title: "Week 9: DevOps & Infrastructure",
          topics: ["Git workflows", "CI/CD pipelines", "Containerization", "Infrastructure as code"],
          deliverables: ["DevOps project setup", "Automated deployment pipeline"],
        },
        {
          title: "Week 10-11: Database Systems",
          topics: ["Database design", "Query optimization", "NoSQL databases", "Data warehousing"],
          deliverables: ["Database projects", "Performance optimization case studies"],
        },
        {
          title: "Week 12: Data Science Foundation",
          topics: ["Statistical computing", "Data visualization", "Exploratory analysis", "Scientific computing"],
          deliverables: ["Data science toolkit", "Analysis projects"],
        },
        {
          title: "Week 13-16: Mathematics for AI",
          topics: ["Linear algebra", "Calculus", "Probability theory", "Optimization methods", "Information theory"],
          deliverables: ["Mathematical foundations portfolio", "Algorithm implementations"],
        },
        {
          title: "Week 17: Advanced Data Analysis",
          topics: ["Feature engineering", "Dimensionality reduction", "Time series analysis", "Causal inference"],
          deliverables: ["Advanced analytics projects", "Research implementations"],
        },
        {
          title: "Week 18-21: Machine Learning Engineering",
          topics: ["ML algorithms", "Model selection", "Hyperparameter optimization", "Ensemble methods", "AutoML"],
          deliverables: ["ML engineering projects", "Model comparison studies"],
        },
        {
          title: "Week 22: MLOps & Production Systems",
          topics: ["Model deployment", "Monitoring & logging", "A/B testing", "Model versioning", "Scalability"],
          deliverables: ["Production ML system", "MLOps pipeline"],
        },
        {
          title: "Week 23-24: End-to-End ML Projects",
          topics: ["Project architecture", "System integration", "Performance optimization", "User interface design"],
          deliverables: ["Complete ML applications", "Technical documentation"],
        },
        {
          title: "Week 25-27: Deep Learning & Neural Networks",
          topics: ["Neural architectures", "Training optimization", "Transfer learning", "Model compression"],
          deliverables: ["Deep learning applications", "Research implementations"],
        },
        {
          title: "Week 28-30: AI Specialization",
          topics: ["Computer vision", "Natural language processing", "Reinforcement learning", "Generative AI"],
          deliverables: ["Specialized AI applications", "Research contributions"],
        },
        {
          title: "Week 31-32: Advanced AI Systems",
          topics: ["Large language models", "Vector databases", "RAG systems", "AI agents", "Multimodal AI"],
          deliverables: ["Advanced AI systems", "Innovation projects"],
        },
      ],
      projects: [
        "Scalable Image Classification System",
        "Real-time Recommendation Engine",
        "Autonomous Drone Navigation System",
        "Conversational AI Chatbot with RAG",
        "Computer Vision for Quality Control",
        "Distributed ML Training Pipeline",
        "AI-Powered Code Generation Tool",
      ],
    },
  },
}

interface College {
  name: string
  address: string
  rating?: number
  phone?: string
  website?: string
  distance?: string
  courses?: string[]
}

const careerFields = [
  {
    title: "Data Science",
    description: "Uncover insights from data and build predictive models.",
    icon: Brain,
    color: "bg-gradient-to-r from-blue-400 to-purple-500 text-white",
  },
  {
    title: "Engineering",
    description: "Design and build innovative solutions to real-world problems.",
    icon: Wrench,
    color: "bg-gradient-to-r from-green-400 to-blue-500 text-white",
  },
  {
    title: "Healthcare",
    description: "Provide care and improve the well-being of individuals and communities.",
    icon: Heart,
    color: "bg-gradient-to-r from-red-400 to-pink-500 text-white",
  },
  {
    title: "Environmental Science",
    description: "Protect and preserve our planet through sustainable practices.",
    icon: Leaf,
    color: "bg-gradient-to-r from-green-400 to-teal-500 text-white",
  },
  {
    title: "Business & Finance",
    description: "Drive economic growth and manage financial strategies.",
    icon: TrendingUp,
    color: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
  },
  {
    title: "Computer Science",
    description: "Create software solutions and advance technology innovation.",
    icon: Code,
    color: "bg-gradient-to-r from-indigo-400 to-purple-500 text-white",
  },
  {
    title: "Creative Arts",
    description: "Express creativity through design, media, and artistic endeavors.",
    icon: Palette,
    color: "bg-gradient-to-r from-pink-400 to-rose-500 text-white",
  },
  {
    title: "Education",
    description: "Shape minds and inspire the next generation of learners.",
    icon: GraduationCap,
    color: "bg-gradient-to-r from-cyan-400 to-blue-500 text-white",
  },
  {
    title: "Psychology",
    description: "Understand human behavior and mental processes.",
    icon: Users,
    color: "bg-gradient-to-r from-violet-400 to-purple-500 text-white",
  },
  {
    title: "Law & Justice",
    description: "Uphold justice and navigate complex legal systems.",
    icon: Scale,
    color: "bg-gradient-to-r from-slate-400 to-gray-600 text-white",
  },
  {
    title: "Agriculture",
    description: "Innovate in food production and sustainable farming practices.",
    icon: Sprout,
    color: "bg-gradient-to-r from-lime-400 to-green-500 text-white",
  },
  {
    title: "Architecture",
    description: "Design spaces that shape how people live and work.",
    icon: Building,
    color: "bg-gradient-to-r from-amber-400 to-yellow-500 text-white",
  },
]

const degreeInfo = {
  "B.Sc. Physics": {
    description:
      "A degree in Physics explores the fundamental laws of the universe, from subatomic particles to galaxies.",
    duration: "3 Years",
    careerProspects: "High demand in research, technology, and education sectors.",
    difficulty: "Challenging, requires strong analytical and mathematical skills.",
    averageSalary: "$60,000 - $120,000",
    careerPaths: ["Research Scientist", "Data Analyst", "Software Developer", "Academic"],
    skills: ["Analytical Skills", "Problem-Solving", "Mathematical Modeling", "Critical Thinking"],
    industries: ["Technology", "Aerospace", "Academia", "Research"],
    topUniversities: ["MIT", "Stanford", "Cambridge", "Oxford"],
  },
  "B.Sc. Computer Science": {
    description:
      "A degree in Computer Science focuses on the theory and practice of computation and information processing.",
    duration: "3 Years",
    careerProspects: "Excellent, with high demand in virtually every industry.",
    difficulty: "Moderate to challenging, requires logical thinking and problem-solving.",
    averageSalary: "$70,000 - $150,000",
    careerPaths: ["Software Engineer", "Data Scientist", "Web Developer", "IT Consultant"],
    skills: ["Programming", "Data Analysis", "Algorithm Design", "Software Development"],
    industries: ["Technology", "Finance", "Healthcare", "Education"],
    topUniversities: ["MIT", "Stanford", "Carnegie Mellon", "UC Berkeley"],
  },
  MBBS: {
    description:
      "A Bachelor of Medicine and Bachelor of Surgery (MBBS) degree prepares you to become a medical doctor.",
    duration: "5.5 Years",
    careerProspects: "Very high, with opportunities worldwide.",
    difficulty: "Very challenging, requires dedication and long hours of study.",
    averageSalary: "$80,000 - $200,000+",
    careerPaths: ["General Practitioner", "Specialist Doctor", "Surgeon", "Medical Researcher"],
    skills: ["Clinical Skills", "Diagnostic Abilities", "Empathy", "Communication"],
    industries: ["Healthcare", "Research", "Academia", "Public Health"],
    topUniversities: ["Harvard", "Johns Hopkins", "Oxford", "Cambridge"],
  },
  "B.Sc. Agriculture": {
    description:
      "A degree in Agriculture focuses on the science, business, and technology of farming and food production.",
    duration: "4 Years",
    careerProspects: "Good, with increasing demand for sustainable agriculture practices.",
    difficulty: "Moderate, requires a blend of scientific and practical knowledge.",
    averageSalary: "$50,000 - $100,000",
    careerPaths: ["Agronomist", "Farm Manager", "Agricultural Consultant", "Researcher"],
    skills: ["Crop Management", "Soil Science", "Business Acumen", "Environmental Awareness"],
    industries: ["Agriculture", "Food Production", "Environmental Conservation", "Research"],
    topUniversities: ["Wageningen", "UC Davis", "Cornell", "Reading"],
  },
  "B.Sc. Mathematics": {
    description:
      "A degree in Mathematics develops strong analytical and problem-solving skills applicable to many fields.",
    duration: "3 Years",
    careerProspects: "Good, with opportunities in finance, technology, and education.",
    difficulty: "Challenging, requires abstract thinking and logical reasoning.",
    averageSalary: "$60,000 - $130,000",
    careerPaths: ["Data Scientist", "Actuary", "Statistician", "Financial Analyst"],
    skills: ["Analytical Skills", "Problem-Solving", "Logical Reasoning", "Mathematical Modeling"],
    industries: ["Finance", "Technology", "Insurance", "Academia"],
    topUniversities: ["MIT", "Harvard", "Cambridge", "Oxford"],
  },
  "B.Sc. Chemistry": {
    description: "A degree in Chemistry explores the composition, structure, properties, and reactions of matter.",
    duration: "3 Years",
    careerProspects: "Good, with opportunities in pharmaceuticals, materials science, and environmental science.",
    difficulty: "Moderate to challenging, requires experimental skills and attention to detail.",
    averageSalary: "$55,000 - $110,000",
    careerPaths: ["Chemist", "Pharmacist", "Materials Scientist", "Environmental Scientist"],
    skills: ["Experimental Skills", "Analytical Skills", "Problem-Solving", "Attention to Detail"],
    industries: ["Pharmaceuticals", "Chemical Manufacturing", "Environmental Science", "Research"],
    topUniversities: ["MIT", "Stanford", "Cambridge", "Oxford"],
  },
  "B.E./B.Tech": {
    description:
      "A Bachelor of Engineering/Technology provides a foundation in engineering principles and practical skills.",
    duration: "4 Years",
    careerProspects: "Excellent, with diverse opportunities across various engineering disciplines.",
    difficulty: "Challenging, requires strong mathematical and problem-solving abilities.",
    averageSalary: "$65,000 - $140,000",
    careerPaths: ["Software Engineer", "Mechanical Engineer", "Electrical Engineer", "Civil Engineer"],
    skills: ["Problem-Solving", "Technical Skills", "Design", "Project Management"],
    industries: ["Technology", "Manufacturing", "Construction", "Energy"],
    topUniversities: ["MIT", "Stanford", "UC Berkeley", "Cambridge"],
  },
  "B.Sc. Data Science": {
    description:
      "A degree in Data Science combines statistics, computer science, and business knowledge to analyze and interpret data.",
    duration: "3 Years",
    careerProspects: "Excellent, with high demand in almost every industry.",
    difficulty: "Moderate to challenging, requires analytical and programming skills.",
    averageSalary: "$75,000 - $160,000",
    careerPaths: ["Data Scientist", "Data Analyst", "Machine Learning Engineer", "Business Intelligence Analyst"],
    skills: ["Data Analysis", "Machine Learning", "Programming", "Statistical Analysis"],
    industries: ["Technology", "Finance", "Healthcare", "Marketing"],
    topUniversities: ["Stanford", "Carnegie Mellon", "UC Berkeley", "MIT"],
  },
}

export default function EduAdvisor() {
  const [currentScreen, setCurrentScreen] = useState<
    "welcome" | "quiz" | "result" | "colleges" | "career-selection" | "career-quiz" | "career-roadmap"
  >("welcome")
  const [currentQuestion, setCurrentQuestion] = useState("Q1")
  const [questionCount, setQuestionCount] = useState(0)
  const [result, setResult] = useState("")
  const [confirmationCount, setConfirmationCount] = useState(0)
  const [confirmationDegree, setConfirmationDegree] = useState("")

  const [selectedCareer, setSelectedCareer] = useState<"Data Analyst" | "Data Scientist" | "AI Engineer" | "">("")
  const [careerQuestionIndex, setCareerQuestionIndex] = useState(0)
  const [careerAnswers, setCareerAnswers] = useState<boolean[]>([])
  const [careerScore, setCareerScore] = useState(0)

  const [colleges, setColleges] = useState<College[]>([])
  const [isLoadingColleges, setIsLoadingColleges] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState("")

  const handleAnswer = (answer: "yes" | "no") => {
    const current = questionData[currentQuestion as keyof typeof questionData]
    if (!current) return

    // Check for stream suggestion
    if (current.suggestion && current.suggestion !== "" && answer === "yes") {
      setConfirmationDegree(current.suggestion)
      setConfirmationCount((prev) => prev + 1)
    }

    // If we have a confirmation, show result
    if (confirmationDegree && confirmationCount >= 1) {
      setResult(confirmationDegree)
      if (confirmationDegree === "B.E./B.Tech") {
        setCurrentScreen("career-selection")
      } else {
        setCurrentScreen("result")
      }
      return
    }

    // Get next question
    const nextId = answer === "yes" ? current.nextYes : current.nextNo

    if (!nextId || nextId === "Q41" || questionCount >= 20) {
      setResult("No clear match. Please try again or consult a counselor.")
      setCurrentScreen("result")
      return
    }

    setCurrentQuestion(nextId)
    setQuestionCount((prev) => prev + 1)
  }

  const handleCareerSelection = (career: "Data Analyst" | "Data Scientist" | "AI Engineer") => {
    setSelectedCareer(career)
    setCareerQuestionIndex(0)
    setCareerAnswers([])
    setCareerScore(0)
    setCurrentScreen("career-quiz")
  }

  const handleCareerAnswer = (answer: boolean) => {
    const questions = careerQuestionnaires[selectedCareer]
    const currentQ = questions[careerQuestionIndex]

    const newAnswers = [...careerAnswers, answer]
    setCareerAnswers(newAnswers)

    if (answer) {
      setCareerScore((prev) => prev + currentQ.weight)
    }

    if (careerQuestionIndex < questions.length - 1) {
      setCareerQuestionIndex((prev) => prev + 1)
    } else {
      // Quiz completed, show roadmap
      setCurrentScreen("career-roadmap")
    }
  }

  const resetQuiz = () => {
    setCurrentScreen("welcome")
    setCurrentQuestion("Q1")
    setQuestionCount(0)
    setResult("")
    setConfirmationCount(0)
    setConfirmationDegree("")
    setSelectedCareer("")
    setCareerQuestionIndex(0)
    setCareerAnswers([])
    setCareerScore(0)
  }

  const startQuiz = () => {
    setCurrentScreen("quiz")
  }

  const progress = Math.min((questionCount / 20) * 100, 100)

  const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          reject(new Error("Unable to retrieve your location"))
        },
        { timeout: 10000, enableHighAccuracy: true },
      )
    })
  }

  const searchColleges = async () => {
    setIsLoadingColleges(true)
    setLocationError("")

    try {
      // Get user location
      let location = userLocation
      if (!location) {
        location = await getUserLocation()
        setUserLocation(location)
      }

      // Initialize Google Maps if not already loaded
      if (!window.google) {
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA6-PfWD2XPmAUnheDODUyp42vnaPZ9hQ4&libraries=places`
        script.async = true
        document.head.appendChild(script)

        await new Promise((resolve) => {
          script.onload = resolve
        })
      }

      // Create a temporary map element for the Places service
      const mapDiv = document.createElement("div")
      const map = new window.google.maps.Map(mapDiv, {
        center: location,
        zoom: 10,
      })

      const service = new window.google.maps.places.PlacesService(map)

      // Search for government colleges
      const request = {
        query: `government colleges ${result}`,
        fields: ["name", "formatted_address", "rating", "geometry", "place_id"],
        locationBias: {
          center: new window.google.maps.LatLng(location.lat, location.lng),
          radius: 70000, // 70km radius
        },
      }

      service.findPlaceFromQuery(request, (results: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          // Get additional details for each place
          const collegePromises = results.slice(0, 10).map((place: any) => {
            return new Promise<College>((resolve) => {
              const detailsRequest = {
                placeId: place.place_id!,
                fields: ["name", "formatted_address", "rating", "formatted_phone_number", "website", "geometry"],
              }

              service.getDetails(detailsRequest, (details: any, detailsStatus: any) => {
                if (detailsStatus === window.google.maps.places.PlacesServiceStatus.OK && details) {
                  // Calculate distance
                  const distance = calculateDistance(
                    location!.lat,
                    location!.lng,
                    details.geometry!.location!.lat(),
                    details.geometry!.location!.lng(),
                  )

                  resolve({
                    name: details.name || "Unknown College",
                    address: details.formatted_address || "Address not available",
                    rating: details.rating,
                    phone: details.formatted_phone_number,
                    website: details.website,
                    distance: `${distance.toFixed(1)} km`,
                    courses: getCoursesForDegree(result),
                  })
                } else {
                  resolve({
                    name: place.name || "Unknown College",
                    address: "Address not available",
                    distance: "Unknown",
                    courses: getCoursesForDegree(result),
                  })
                }
              })
            })
          })

          Promise.all(collegePromises).then((collegeData) => {
            // Sort by distance
            collegeData.sort((a, b) => {
              const distA = Number.parseFloat(a.distance?.split(" ")[0] || "999")
              const distB = Number.parseFloat(b.distance?.split(" ")[0] || "999")
              return distA - distB
            })

            setColleges(collegeData)
            setCurrentScreen("colleges")
          })
        } else {
          setLocationError("No government colleges found in your area. Please try a different location.")
        }
        setIsLoadingColleges(false)
      })
    } catch (error) {
      setLocationError("Unable to get your location. Please enable location services.")
      setIsLoadingColleges(false)
    }
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371 // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const getCoursesForDegree = (degree: string): string[] => {
    const courseMap: { [key: string]: string[] } = {
      "B.Sc. Physics": ["Physics", "Applied Physics", "Mathematical Physics", "Astrophysics"],
      "B.Sc. Computer Science": ["Computer Science", "Information Technology", "Software Engineering", "Data Science"],
      MBBS: ["Medicine", "Medical Sciences", "Pre-Medical", "Health Sciences"],
      "B.Sc. Agriculture": ["Agriculture", "Agricultural Sciences", "Horticulture", "Agricultural Engineering"],
      "B.Sc. Mathematics": ["Mathematics", "Applied Mathematics", "Statistics", "Mathematical Sciences"],
      "B.Sc. Chemistry": ["Chemistry", "Applied Chemistry", "Chemical Sciences", "Biochemistry"],
      "B.E./B.Tech": ["Engineering", "Technology", "Applied Sciences", "Technical Education"],
      "B.Sc. Data Science": ["Data Science", "Computer Science", "Statistics", "Information Technology"],
    }
    return courseMap[degree] || ["General Sciences", "Applied Sciences"]
  }

  if (currentScreen === "career-selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-lg mb-8 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
              <CardHeader className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 animate-in zoom-in-0 duration-700 delay-200">
                  <Code className="w-10 h-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl mb-2 animate-in fade-in-0 duration-500 delay-400">
                  Engineering Career Specialization
                </CardTitle>
                <CardDescription className="text-lg text-balance animate-in fade-in-0 duration-500 delay-600">
                  Since you're interested in B.E./B.Tech, let's find your perfect tech specialization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {(["Data Analyst", "Data Scientist", "AI Engineer"] as const).map((career, index) => (
                    <Card
                      key={career}
                      className="group cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/40 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
                      style={{ animationDelay: `${(index + 1) * 200}ms` }}
                      onClick={() => handleCareerSelection(career)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                          {career === "Data Analyst" && <Calculator className="w-8 h-8 text-white" />}
                          {career === "Data Scientist" && <Brain className="w-8 h-8 text-white" />}
                          {career === "AI Engineer" && <Code className="w-8 h-8 text-white" />}
                        </div>
                        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                          {career}
                        </h3>
                        <p className="text-sm text-muted-foreground text-balance mb-4">
                          {career === "Data Analyst" &&
                            "Transform data into business insights through visualization and analysis"}
                          {career === "Data Scientist" &&
                            "Build predictive models and extract insights from complex data"}
                          {career === "AI Engineer" && "Develop and deploy AI systems and machine learning solutions"}
                        </p>
                        <Badge
                          variant="secondary"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                        >
                          Take Assessment
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button onClick={() => setCurrentScreen("result")} variant="outline" className="mr-4">
                    Skip Specialization
                  </Button>
                  <Button onClick={resetQuiz} variant="ghost">
                    Start Over
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "career-quiz") {
    const questions = careerQuestionnaires[selectedCareer]
    const currentQ = questions[careerQuestionIndex]
    const progress = ((careerQuestionIndex + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">{selectedCareer} Assessment</h2>
              <Badge variant="outline" className="text-sm animate-pulse">
                Question {careerQuestionIndex + 1} of {questions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-3 bg-muted transition-all duration-500" />
            <p className="text-sm text-muted-foreground mt-2 text-center">{Math.round(progress)}% Complete</p>
          </div>

          <Card className="max-w-2xl mx-auto border-2 border-primary/20 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-balance leading-relaxed">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-400">
                <Button
                  onClick={() => handleCareerAnswer(true)}
                  size="lg"
                  className="flex-1 max-w-xs bg-primary hover:bg-primary/90 text-lg py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleCareerAnswer(false)}
                  variant="outline"
                  size="lg"
                  className="flex-1 max-w-xs border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  No
                </Button>
              </div>

              <Button
                onClick={() => setCurrentScreen("career-selection")}
                variant="ghost"
                className="mt-6 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                Back to Selection
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentScreen === "career-roadmap") {
    const roadmap = careerRoadmaps[selectedCareer]
    const maxScore = careerQuestionnaires[selectedCareer].reduce((sum, q) => sum + q.weight, 0)
    const scorePercentage = (careerScore / maxScore) * 100
    const suitabilityLevel =
      scorePercentage >= 80
        ? "Excellent"
        : scorePercentage >= 60
          ? "Good"
          : scorePercentage >= 40
            ? "Fair"
            : "Consider Other Options"

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header */}
            <Card className="border-2 border-primary/20 shadow-xl mb-8 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader className="text-center pb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-6 animate-in zoom-in-0 duration-700 delay-200 shadow-lg">
                  {selectedCareer === "Data Analyst" && <Calculator className="w-12 h-12 text-white" />}
                  {selectedCareer === "Data Scientist" && <Brain className="w-12 h-12 text-white" />}
                  {selectedCareer === "AI Engineer" && <Code className="w-12 h-12 text-white" />}
                </div>
                <CardTitle className="text-4xl mb-4 animate-in fade-in-0 duration-500 delay-400 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {selectedCareer} Career Path
                </CardTitle>
                <CardDescription className="text-xl text-balance animate-in fade-in-0 duration-500 delay-600 max-w-4xl mx-auto leading-relaxed">
                  {roadmap.description}
                </CardDescription>

                {/* Enhanced Suitability Score */}
                <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl animate-in fade-in-0 duration-500 delay-800 border border-primary/20">
                  <h3 className="text-xl font-semibold mb-4">Your Career Suitability Assessment</h3>
                  <div className="flex items-center justify-center gap-6">
                    <Progress value={scorePercentage} className="flex-1 max-w-md h-4" />
                    <Badge
                      variant={scorePercentage >= 60 ? "default" : "secondary"}
                      className="text-lg px-6 py-3 font-semibold"
                    >
                      {Math.round(scorePercentage)}% - {suitabilityLevel}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Based on your responses to our specialized questionnaire
                  </p>
                </div>
              </CardHeader>
            </Card>

            {/* Enhanced Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-1000 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-blue-800 text-lg">Duration</span>
                </div>
                <p className="text-blue-700 text-xl font-bold">{roadmap.duration}</p>
                <p className="text-blue-600 text-sm mt-1">Intensive Learning</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-1100 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-800 text-lg">Salary Range</span>
                </div>
                <p className="text-green-700 text-lg font-bold">{roadmap.averageSalary}</p>
                <p className="text-green-600 text-sm mt-1">{roadmap.industryDemand}</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 animate-in fade-in-0 slide-in-from-right-4 duration-700 delay-1200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <span className="font-semibold text-purple-800 text-lg">Core Skills</span>
                </div>
                <p className="text-purple-700 font-semibold">{roadmap.keySkills.slice(0, 2).join(", ")}</p>
                <p className="text-purple-600 text-sm mt-1">+{roadmap.keySkills.length - 2} more skills</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 animate-in fade-in-0 slide-in-from-right-4 duration-700 delay-1300 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-orange-600" />
                  <span className="font-semibold text-orange-800 text-lg">Career Paths</span>
                </div>
                <p className="text-orange-700 text-xl font-bold">{roadmap.careerPaths.length}+</p>
                <p className="text-orange-600 text-sm mt-1">Career Opportunities</p>
              </Card>
            </div>

            {/* New: Daily Work & Industry Applications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <Card className="p-8 animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-1400 bg-gradient-to-br from-slate-50 to-slate-100">
                <h4 className="font-semibold text-2xl mb-6 flex items-center gap-3">
                  <Briefcase className="w-7 h-7 text-primary" />
                  What You'll Do Daily
                </h4>
                <div className="space-y-4">
                  {roadmap.dailyTasks.map((task, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary font-semibold text-xs">{index + 1}</span>
                      </div>
                      <p className="text-slate-700 font-medium">{task}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-primary font-semibold">Work Environment: {roadmap.workEnvironment}</p>
                </div>
              </Card>

              <Card className="p-8 animate-in fade-in-0 slide-in-from-right-8 duration-700 delay-1500 bg-gradient-to-br from-indigo-50 to-indigo-100">
                <h4 className="font-semibold text-2xl mb-6 flex items-center gap-3">
                  <Building className="w-7 h-7 text-primary" />
                  Industry Applications
                </h4>
                <div className="space-y-4">
                  {roadmap.industryApplications.map((application, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-l-indigo-400">
                      <p className="text-indigo-800 font-semibold text-sm">{application}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Enhanced Skills & Career Paths */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <Card className="p-8 animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-1600">
                <h4 className="font-semibold text-2xl mb-6 flex items-center gap-3">
                  <Users className="w-7 h-7 text-primary" />
                  Career Opportunities
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {roadmap.careerPaths.map((career, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20 hover:shadow-md transition-all"
                    >
                      <p className="font-semibold text-primary">{career}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 animate-in fade-in-0 slide-in-from-right-8 duration-700 delay-1700">
                <h4 className="font-semibold text-2xl mb-6 flex items-center gap-3">
                  <Brain className="w-7 h-7 text-primary" />
                  Essential Skills
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {roadmap.keySkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="p-3 text-center justify-center font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* New: Learning Resources & Certifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <Card className="p-8 animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-1800">
                <h4 className="font-semibold text-2xl mb-6 flex items-center gap-3">
                  <BookOpen className="w-7 h-7 text-primary" />
                  Learning Resources
                </h4>
                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold text-lg mb-3 text-green-700">Free Resources</h5>
                    <div className="space-y-2">
                      {roadmap.learningResources.free.map((resource, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-green-800 font-medium">{resource}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg mb-3 text-blue-700">Premium Courses</h5>
                    <div className="space-y-2">
                      {roadmap.learningResources.paid.map((resource, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-blue-800 font-medium">{resource}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 animate-in fade-in-0 slide-in-from-right-8 duration-700 delay-1900">
                <h4 className="font-semibold text-2xl mb-6 flex items-center gap-3">
                  <Award className="w-7 h-7 text-primary" />
                  Industry Certifications
                </h4>
                <div className="space-y-4">
                  {roadmap.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <p className="font-semibold text-yellow-800">{cert}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Enhanced Learning Roadmap */}
            <Card className="p-8 mb-10 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-2000">
              <h4 className="font-semibold text-3xl mb-8 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-primary" />
                Complete Learning Roadmap
              </h4>
              <div className="space-y-6">
                {roadmap.roadmap.weeks.map((week, index) => (
                  <Card
                    key={index}
                    className="p-6 border-l-4 border-l-primary/50 hover:border-l-primary transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-primary/2 to-accent/2"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h5 className="font-semibold text-xl text-primary">{week.title}</h5>
                      {week.deliverables && (
                        <Badge variant="secondary" className="ml-4">
                          {week.deliverables.length} Deliverables
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-medium text-sm text-muted-foreground mb-2">TOPICS TO LEARN</h6>
                        <div className="flex flex-wrap gap-2">
                          {week.topics.map((topic, topicIndex) => (
                            <Badge key={topicIndex} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {week.deliverables && (
                        <div>
                          <h6 className="font-medium text-sm text-muted-foreground mb-2">DELIVERABLES</h6>
                          <div className="space-y-1">
                            {week.deliverables.map((deliverable, delIndex) => (
                              <div key={delIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <span className="text-xs text-slate-600">{deliverable}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Enhanced Projects Section */}
            <Card className="p-8 mb-10 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-2100">
              <h4 className="font-semibold text-3xl mb-8 flex items-center gap-3">
                <Wrench className="w-8 h-8 text-primary" />
                Portfolio Projects You'll Build
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmap.roadmap.projects.map((project, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-lg mb-2">{project}</p>
                        <Badge variant="secondary" className="text-xs">
                          Portfolio Project
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-2200">
              <Button
                onClick={() => setCurrentScreen("career-selection")}
                variant="outline"
                size="lg"
                className="transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Explore Other Careers
              </Button>
              <Button
                onClick={resetQuiz}
                size="lg"
                className="transition-all duration-300 hover:scale-105 px-8 py-4 text-lg bg-gradient-to-r from-primary to-accent"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Start New Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12 animate-in fade-in-0 duration-1000">
            <h1 className="text-5xl font-bold text-balance mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-in slide-in-from-top-4 duration-1000 delay-200">
              EduAdvisor
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto animate-in slide-in-from-top-4 duration-1000 delay-400">
              Discover your perfect degree path through our intelligent questionnaire system
            </p>
          </div>

          {/* Career Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
            {careerFields.map((field, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${field.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}
                  >
                    <field.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-balance group-hover:text-primary transition-colors duration-300">
                    {field.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-balance">{field.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="max-w-2xl mx-auto border-2 border-primary/20 bg-gradient-to-r from-card to-muted/50 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-balance">Ready to Find Your Path?</CardTitle>
              <CardDescription className="text-lg text-balance">
                Answer a series of questions about your interests and preferences to discover the degree that matches
                your passion
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Badge variant="secondary" className="text-sm px-4 py-2 animate-pulse">
                  📊 Smart Algorithm
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-sm px-4 py-2 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                >
                  ⚡ Quick Results
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2 animate-pulse" style={{ animationDelay: "1s" }}>
                  🎯 Personalized
                </Badge>
              </div>
              <Button
                onClick={startQuiz}
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-500 transform hover:scale-110 hover:shadow-xl animate-bounce"
              >
                Start Your Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentScreen === "quiz") {
    const current = questionData[currentQuestion as keyof typeof questionData]

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Header */}
          <div className="max-w-2xl mx-auto mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Career Discovery Quiz</h2>
              <Badge variant="outline" className="text-sm animate-pulse">
                Question {questionCount + 1}
              </Badge>
            </div>
            <Progress value={progress} className="h-3 bg-muted transition-all duration-500" />
            <p className="text-sm text-muted-foreground mt-2 text-center">{Math.round(progress)}% Complete</p>
          </div>

          {/* Question Card */}
          <Card className="max-w-2xl mx-auto border-2 border-primary/20 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <CardHeader className="text-center pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl text-balance leading-relaxed group-hover:text-primary transition-colors duration-500 delay-200">
                    {current?.question}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-400">
                <Button
                  onClick={() => handleAnswer("yes")}
                  size="lg"
                  className="flex-1 max-w-xs bg-primary hover:bg-primary/90 text-lg py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleAnswer("no")}
                  variant="outline"
                  size="lg"
                  className="flex-1 max-w-xs border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  No
                </Button>
              </div>

              <Button
                onClick={resetQuiz}
                variant="ghost"
                className="mt-6 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                Start Over
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentScreen === "result") {
    const isSuccess = result !== "No clear match. Please try again or consult a counselor."
    const degreeDetails = isSuccess ? degreeInfo[result as keyof typeof degreeInfo] : null

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Main Result Card */}
            <Card className="border-2 border-primary/20 shadow-lg mb-8 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
              <CardHeader className="text-center">
                <div
                  className={`w-20 h-20 rounded-full ${isSuccess ? "bg-primary" : "bg-muted"} flex items-center justify-center mx-auto mb-4 animate-in zoom-in-0 duration-700 delay-200`}
                >
                  {isSuccess ? (
                    <GraduationCap className="w-10 h-10 text-primary-foreground" />
                  ) : (
                    <Brain className="w-10 h-10 text-muted-foreground" />
                  )}
                </div>
                <CardTitle className="text-2xl mb-2 animate-in fade-in-0 duration-500 delay-400">
                  {isSuccess ? "Your Recommended Degree" : "Need More Guidance?"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {isSuccess && degreeDetails ? (
                  <>
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-600">
                      <h3 className="text-3xl font-bold text-primary mb-2">{result}</h3>
                      <p className="text-muted-foreground text-balance">{degreeDetails.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <Card className="p-4 bg-blue-50 border-blue-200 animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-800">Duration</span>
                        </div>
                        <p className="text-blue-700">{degreeDetails.duration}</p>
                      </Card>

                      <Card className="p-4 bg-green-50 border-green-200 animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-900">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-800">Career Prospects</span>
                        </div>
                        <p className="text-green-700">{degreeDetails.careerProspects}</p>
                      </Card>

                      <Card className="p-4 bg-purple-50 border-purple-200 animate-in fade-in-0 slide-in-from-right-4 duration-700 delay-1000">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-purple-600" />
                          <span className="font-semibold text-purple-800">Difficulty</span>
                        </div>
                        <p className="text-purple-700">{degreeDetails.difficulty}</p>
                      </Card>

                      <Card className="p-4 bg-orange-50 border-orange-200 animate-in fade-in-0 slide-in-from-right-4 duration-700 delay-1100">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-orange-600" />
                          <span className="font-semibold text-orange-800">Avg. Salary</span>
                        </div>
                        <p className="text-orange-700 text-sm">{degreeDetails.averageSalary}</p>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      <Card className="p-6 animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-1200">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          Career Paths
                        </h4>
                        <div className="space-y-2">
                          {degreeDetails.careerPaths.map((career, index) => (
                            <Badge key={index} variant="secondary" className="mr-2 mb-2">
                              {career}
                            </Badge>
                          ))}
                        </div>
                      </Card>

                      <Card className="p-6 animate-in fade-in-0 slide-in-from-right-8 duration-700 delay-1300">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <Brain className="w-5 h-5 text-primary" />
                          Key Skills
                        </h4>
                        <div className="space-y-2">
                          {degreeDetails.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-2">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </Card>

                      <Card className="p-6 animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-1400">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <Wrench className="w-5 h-5 text-primary" />
                          Industries
                        </h4>
                        <div className="space-y-2">
                          {degreeDetails.industries.map((industry, index) => (
                            <Badge key={index} variant="secondary" className="mr-2 mb-2 bg-primary/10 text-primary">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </Card>

                      <Card className="p-6 animate-in fade-in-0 slide-in-from-right-8 duration-700 delay-1500">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          Top Universities
                        </h4>
                        <div className="space-y-2">
                          {degreeDetails.topUniversities.map((university, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-2 border-primary text-primary">
                              {university}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-1600">
                      <Button
                        onClick={resetQuiz}
                        size="lg"
                        className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                      >
                        Take Quiz Again
                      </Button>
                      <Button
                        onClick={searchColleges}
                        disabled={isLoadingColleges}
                        size="lg"
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent transition-all duration-300 hover:scale-105"
                      >
                        {isLoadingColleges ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Finding Colleges...
                          </>
                        ) : (
                          <>
                            <Navigation className="w-4 h-4 mr-2" />
                            Find Nearby Colleges
                          </>
                        )}
                      </Button>
                    </div>

                    {locationError && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg animate-in fade-in-0 duration-500">
                        <p className="text-red-700 text-sm">{locationError}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="bg-muted rounded-lg p-6 mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-600">
                      <p className="text-lg text-muted-foreground text-balance">
                        We couldn't find a clear match based on your responses. Consider speaking with a career
                        counselor for personalized guidance.
                      </p>
                    </div>
                    <Button
                      onClick={resetQuiz}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 animate-in fade-in-0 duration-500 delay-800"
                    >
                      Try Again
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "colleges") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 animate-in fade-in-0 duration-1000">
              <h1 className="text-4xl font-bold text-balance mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Government Colleges Near You
              </h1>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Colleges offering {result} within 70km radius
              </p>
              <Badge variant="secondary" className="mt-4 px-4 py-2">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {colleges.length} colleges found
              </Badge>
            </div>

            {/* Colleges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {colleges.map((college, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/30 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-balance leading-tight group-hover:text-primary transition-colors duration-300">
                          {college.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          {college.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{college.rating}</span>
                            </div>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {college.distance}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground text-balance">{college.address}</p>
                    </div>

                    {college.courses && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-primary">Available Courses:</h4>
                        <div className="flex flex-wrap gap-1">
                          {college.courses.slice(0, 3).map((course, courseIndex) => (
                            <Badge key={courseIndex} variant="secondary" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                          {college.courses.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{college.courses.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-2 pt-2">
                      {college.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{college.phone}</span>
                        </div>
                      )}

                      {college.website && (
                        <a
                          href={college.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                          <Globe className="w-4 h-4" />
                          <span className="text-sm">Visit Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <Button
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent"
                      variant="outline"
                      onClick={() => {
                        const query = encodeURIComponent(college.name + " " + college.address)
                        window.open(`https://www.google.com/maps/search/${query}`, "_blank")
                      }}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Back Button */}
            <div className="text-center animate-in fade-in-0 duration-700 delay-1000">
              <Button
                onClick={() => setCurrentScreen("result")}
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Back to Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
