export const headerNavLinks = [
  { href: "#competitions", id: "competitions", label: "Competitions" },
  { href: "#sponsors", id: "sponsors", label: "Sponsors" },
  { href: "#team", id: "team", label: "Team" },
  { href: "#join", id: "join", label: "Join Us" },
] as const;

export const progressionSections = [
  { id: "hero", label: "Home" },
  { id: "testimonials", label: "Vision" },
  { id: "team", label: "Team" },
] as const;

export const competitions = [
  {
    id: "01",
    name: "SUAS Competition",
    organizer: "RoboNation",
    date: "Sep 14–17, 2026",
    location: "Tulsa, Oklahoma",
    description:
      "The Student Unmanned Aerial Systems Competition challenges teams to design, build, and fly fully autonomous drones. WATFlight will compete in autonomous navigation, obstacle avoidance, object detection, and payload delivery — putting our engineering to the test against top university teams.",
    tags: ["Autonomous Flight", "Obstacle Avoidance", "Payload Delivery"],
    href: "https://suas-competition.org/",
  },
  {
    id: "02",
    name: "Fly Your Ideas",
    organizer: "Airbus",
    date: "Finals June 25, 2026",
    location: "Remote · Farnborough Airshow",
    description:
      "Airbus's global student innovation challenge asks teams to tackle real aerospace industry problems. The 2026 theme focuses on innovative digital technologies to secure tomorrow's connected aerospace systems. Finalists earn guaranteed Airbus internships and pitch live to industry leaders.",
    tags: ["Innovation", "Digital Technology", "Aerospace Security"],
    href: "https://www.airbus.com/en/flyyourideas",
  },
] as const;

export const sponsorshipTiers = [
  {
    rank: "Captain",
    price: "$2,500+",
    badge: "star",
    color: "oklch(0.78 0.14 75)",
    borderColor: "oklch(0.78 0.14 75 / 0.5)",
    perks: [
      "Large logo on ALL aircraft made by WATFlight",
      "Logo on the wall of our workshop",
      "Logo featured on our website in the Captain Tier",
      "Priority access to internal recruitment and networking events",
      "DIY team logo mechanism (3D-printed), designed by the WATFlight Engineering Team",
    ],
  },
  {
    rank: "First Officer",
    price: "$1,000+",
    badge: "01",
    color: "oklch(0.78 0.10 220)",
    borderColor: "oklch(0.78 0.10 220 / 0.4)",
    perks: [
      "Large logo on competition aircraft made by WATFlight",
      "Logo featured on our website in the First Officer Tier",
      "Access to internal recruitment events",
      "3D-printed WATFlight Logo with white LED lighting, designed by the Engineering Team",
    ],
  },
  {
    rank: "Second Officer",
    price: "$500+",
    badge: "02",
    color: "oklch(0.65 0.05 220)",
    borderColor: "oklch(0.65 0.05 220 / 0.3)",
    perks: [
      "Small logo on competition aircraft made by WATFlight",
      "Logo featured on our website in the Second Officer Tier",
      "3D-printed WATFlight Logo gifted by the Engineering Team",
    ],
  },
] as const;

export const sponsors = [
  {
    name: "Waterloo Institute for Sustainable Aeronautics",
    logo: "/images/wisa-logo.png",
    url: "https://uwaterloo.ca/sustainable-aeronautics/",
  },
  {
    name: "Microchip Technology",
    logo: "/images/microchip-logo.png",
    url: "https://www.microchip.com/",
  },
] as const;

export const teamMembers = [
  {
    name: "Jackie",
    title: "Team Lead",
    linkedIn: "https://www.linkedin.com/in/jingkai-shao3/",
    email: "j66shao@uwaterloo.ca",
  },
  {
    name: "Shaofu",
    title: "Mechanical Lead",
    linkedIn: "https://www.linkedin.com/in/shaofuwang/",
    email: "shaofu.wang@uwaterloo.ca",
  },
  {
    name: "Hiram",
    title: "Electrical Lead",
    linkedIn: "https://www.linkedin.com/in/hiram-xu-97821832a/",
    email: "h457xu@uwaterloo.ca",
  },
  {
    name: "Molly",
    title: "Software Lead",
    linkedIn: "https://www.linkedin.com/in/molly-xie-uw",
    email: "z95xie@uwaterloo.ca",
  },
] as const;

export const subteams = [
  {
    id: "01",
    name: "Mechanical Team",
    description:
      "Turns an autonomous glider concept into a flight-ready aircraft. The team develops the airframe, aerodynamic surfaces, and lightweight structures, then validates each design through manufacturing and ground testing.",
    tags: ["Airframe", "Aerodynamics", "Fabrication"],
    image: "/images/team-mechanical.jpg",
    imageAlt: "Hands assembling a precision mechanical component in a workshop",
  },
  {
    id: "02",
    name: "Electrical Team",
    description:
      "Builds the aircraft's nervous system: avionics, power distribution, sensors, wiring, and flight-computer integration. Every connection is designed for dependable sensing, control, and data collection in the air.",
    tags: ["Avionics", "Sensors", "Power Systems"],
    image: "/images/team-electrical.jpg",
    imageAlt: "Flight electronics and a microcontroller on an engineering workbench",
  },
  {
    id: "03",
    name: "Software Team",
    description:
      "Develops the strategic layer for autonomous thermal soaring. Live weather becomes a map of likely lift, the best reachable hotspot is selected, and MAVLink guides the glider there before ArduSoar takes over to centre the thermal and climb.",
    tags: ["Weather Intelligence", "MAVLink", "SITL"],
    image: "/images/team-software.jpg",
    imageAlt: "Software and data visualizations displayed on an engineering laptop",
  },
  {
    id: "04",
    name: "Business Team",
    description:
      "Keeps the mission moving beyond the workshop. The team builds sponsor relationships, manages operations and finances, leads recruitment, and shares WATFlight's work with the Waterloo and aviation communities.",
    tags: ["Partnerships", "Operations", "Outreach"],
    image: "/images/team-business.jpg",
    imageAlt: "A team collaborating on plans around a whiteboard",
  },
] as const;

export const joinSteps = [
  {
    id: "01",
    title: "Email a Lead",
    description:
      "Reach out directly to any of our team leads above. Tell us about yourself, your skills, and what you're excited to work on.",
  },
  {
    id: "02",
    title: "Join our Discord",
    description:
      "Join the WATFlight Discord server and send a message to the leads. Introduce yourself and we'll get back to you shortly.",
  },
  {
    id: "03",
    title: "Visit Us in Person",
    description:
      "Come find us at EC4, Room 1047 at the University of Waterloo. Notify Jackie beforehand so we can be ready for you.",
    emphasis: "EC4, Room 1047",
  },
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/watflight", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com/watflight", icon: "instagram" },
  { label: "Discord", href: "https://discord.gg/dhVNt6fkwj", icon: "discord" },
  { label: "GitHub", href: "https://github.com/WATFlight", icon: "github" },
] as const;
