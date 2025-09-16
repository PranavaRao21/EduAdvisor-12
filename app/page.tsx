"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Loader2, Navigation, Phone, Globe, MapPinIcon, ExternalLink } from "lucide-react"
import {
  BookOpen,
  Brain,
  Microscope,
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

const careerFields = [
  {
    icon: Calculator,
    title: "Pure Sciences",
    description: "Mathematics, Physics, Chemistry",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Microscope,
    title: "Biological Sciences",
    description: "Biology, Genetics, Microbiology",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Code,
    title: "Computer Sciences",
    description: "Programming, Data Science, AI",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: Heart,
    title: "Medical Sciences",
    description: "Medicine, Nursing, Pharmacy",
    color: "bg-red-100 text-red-700",
  },
  {
    icon: Leaf,
    title: "Agricultural Sciences",
    description: "Agriculture, Forestry, Environment",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Wrench,
    title: "Engineering",
    description: "Mechanical, Civil, Electronics",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: Brain,
    title: "Applied Sciences",
    description: "Forensics, Biotechnology",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    icon: BookOpen,
    title: "Specialized Fields",
    description: "Research, Academia, Innovation",
    color: "bg-pink-100 text-pink-700",
  },
]

const degreeInfo = {
  "B.Sc. Physics": {
    duration: "3-4 years",
    difficulty: "High",
    careerProspects: "Excellent",
    averageSalary: "$65,000 - $120,000",
    description:
      "Physics explores the fundamental laws governing the universe, from subatomic particles to cosmic phenomena.",
    careerPaths: ["Research Scientist", "Data Analyst", "Engineering Physicist", "Astrophysicist", "Medical Physicist"],
    skills: ["Mathematical modeling", "Problem-solving", "Laboratory techniques", "Data analysis", "Critical thinking"],
    industries: ["Research & Development", "Technology", "Healthcare", "Energy", "Aerospace"],
    topUniversities: ["MIT", "Stanford", "Harvard", "Caltech", "Princeton"],
  },
  "B.Sc. Computer Science": {
    duration: "3-4 years",
    difficulty: "Medium-High",
    careerProspects: "Excellent",
    averageSalary: "$70,000 - $150,000",
    description:
      "Computer Science combines mathematical rigor with creative problem-solving to develop software solutions and advance technology.",
    careerPaths: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cybersecurity Analyst", "Product Manager"],
    skills: ["Programming", "Algorithm design", "System architecture", "Database management", "Software testing"],
    industries: ["Technology", "Finance", "Healthcare", "Gaming", "E-commerce"],
    topUniversities: ["MIT", "Stanford", "Carnegie Mellon", "UC Berkeley", "Georgia Tech"],
  },
  MBBS: {
    duration: "5.5-6 years",
    difficulty: "Very High",
    careerProspects: "Excellent",
    averageSalary: "$200,000 - $400,000",
    description:
      "Medicine is a noble profession focused on diagnosing, treating, and preventing human diseases and injuries.",
    careerPaths: ["General Practitioner", "Specialist Doctor", "Surgeon", "Researcher", "Public Health Officer"],
    skills: ["Clinical diagnosis", "Patient care", "Medical procedures", "Communication", "Empathy"],
    industries: ["Healthcare", "Hospitals", "Research", "Public Health", "Pharmaceuticals"],
    topUniversities: ["Harvard Medical", "Johns Hopkins", "UCSF", "Mayo Clinic", "Stanford Medicine"],
  },
  "B.Sc. Agriculture": {
    duration: "4 years",
    difficulty: "Medium",
    careerProspects: "Good",
    averageSalary: "$45,000 - $85,000",
    description:
      "Agriculture science focuses on sustainable food production, crop management, and agricultural innovation.",
    careerPaths: [
      "Agricultural Scientist",
      "Farm Manager",
      "Agricultural Consultant",
      "Food Technologist",
      "Extension Officer",
    ],
    skills: ["Crop science", "Soil management", "Pest control", "Agricultural technology", "Sustainability practices"],
    industries: ["Agriculture", "Food Processing", "Biotechnology", "Government", "Research"],
    topUniversities: ["UC Davis", "Cornell", "Iowa State", "Texas A&M", "Purdue"],
  },
  "B.Sc. Mathematics": {
    duration: "3-4 years",
    difficulty: "High",
    careerProspects: "Very Good",
    averageSalary: "$60,000 - $130,000",
    description:
      "Mathematics provides the foundation for logical reasoning and quantitative analysis across all sciences.",
    careerPaths: ["Data Analyst", "Actuary", "Financial Analyst", "Research Mathematician", "Statistics Consultant"],
    skills: [
      "Abstract thinking",
      "Logical reasoning",
      "Statistical analysis",
      "Mathematical modeling",
      "Problem-solving",
    ],
    industries: ["Finance", "Insurance", "Technology", "Research", "Education"],
    topUniversities: ["MIT", "Harvard", "Princeton", "Stanford", "Cambridge"],
  },
  "B.Sc. Chemistry": {
    duration: "3-4 years",
    difficulty: "Medium-High",
    careerProspects: "Good",
    averageSalary: "$50,000 - $95,000",
    description:
      "Chemistry studies matter, its properties, composition, and the changes it undergoes during chemical reactions.",
    careerPaths: [
      "Research Chemist",
      "Quality Control Analyst",
      "Pharmaceutical Scientist",
      "Environmental Chemist",
      "Materials Scientist",
    ],
    skills: [
      "Laboratory techniques",
      "Chemical analysis",
      "Research methodology",
      "Safety protocols",
      "Data interpretation",
    ],
    industries: ["Pharmaceuticals", "Chemical Manufacturing", "Environmental", "Materials", "Food & Beverage"],
    topUniversities: ["MIT", "Caltech", "Harvard", "Stanford", "UC Berkeley"],
  },
  "B.E./B.Tech": {
    duration: "4 years",
    difficulty: "Medium-High",
    careerProspects: "Excellent",
    averageSalary: "$65,000 - $140,000",
    description:
      "Engineering applies scientific and mathematical principles to design, build, and maintain structures, machines, and systems.",
    careerPaths: ["Design Engineer", "Project Manager", "Systems Engineer", "R&D Engineer", "Technical Consultant"],
    skills: ["Technical design", "Problem-solving", "Project management", "CAD software", "Systems thinking"],
    industries: ["Manufacturing", "Construction", "Technology", "Automotive", "Aerospace"],
    topUniversities: ["MIT", "Stanford", "Caltech", "Georgia Tech", "Carnegie Mellon"],
  },
  "B.Sc. Data Science": {
    duration: "3-4 years",
    difficulty: "Medium-High",
    careerProspects: "Excellent",
    averageSalary: "$75,000 - $160,000",
    description:
      "Data Science combines statistics, programming, and domain expertise to extract insights from complex datasets.",
    careerPaths: ["Data Scientist", "Machine Learning Engineer", "Business Analyst", "Data Engineer", "AI Researcher"],
    skills: ["Statistical analysis", "Programming", "Machine learning", "Data visualization", "Business intelligence"],
    industries: ["Technology", "Finance", "Healthcare", "E-commerce", "Consulting"],
    topUniversities: ["MIT", "Stanford", "Carnegie Mellon", "UC Berkeley", "Harvard"],
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

export default function EduAdvisor() {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "quiz" | "result" | "colleges">("welcome")
  const [currentQuestion, setCurrentQuestion] = useState("Q1")
  const [questionCount, setQuestionCount] = useState(0)
  const [result, setResult] = useState("")
  const [confirmationCount, setConfirmationCount] = useState(0)
  const [confirmationDegree, setConfirmationDegree] = useState("")

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
      setCurrentScreen("result")
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

  const resetQuiz = () => {
    setCurrentScreen("welcome")
    setCurrentQuestion("Q1")
    setQuestionCount(0)
    setResult("")
    setConfirmationCount(0)
    setConfirmationDegree("")
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
