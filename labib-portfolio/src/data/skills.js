// Summaries describe each topic in general terms. Add proficiency evidence, projects, or learning notes as you progress.
module.exports = [
  {
    id: "development",
    label: "Development",
    summary: "Designing and writing software, from small scripts to full applications, using clear logic, clean structure, and problem-solving.",
    color: "#c7f36b",
    skills: [
      { name: "Python", level: "Learning / practising", detail: "A readable, versatile language used for scripting, automation, data analysis, and backend development." },
      { name: "C++", level: "Learning / practising", detail: "A fast, powerful language that supports object-oriented design and gives close control over memory, common in systems software and competitive programming." },
      { name: "Java", level: "Learning / practising", detail: "A strongly typed, object-oriented language widely used for enterprise applications, Android development, and learning core software design." },
      { name: "C", level: "Learning / practising", detail: "A low-level language that teaches how programs use memory and hardware, and forms the foundation of operating systems and embedded software." },
      { name: "JavaScript", level: "Learning / practising", detail: "The language of the web, used to make pages interactive in the browser and to build servers and tools with Node.js." }
    ]
  },
  {
    id: "systems",
    label: "Systems",
    summary: "Understanding how operating systems manage hardware, processes, files, and users, and how to configure and maintain them.",
    color: "#9dd7ff",
    skills: [
      { name: "Windows", level: "Learning / practising", detail: "The most widely used desktop operating system, covering user and permission management, system settings, and everyday troubleshooting." },
      { name: "Linux", level: "Learning / practising", detail: "An open-source operating system driving most servers and security tools, worked with mainly through the command line, packages, and permissions." },
      { name: "macOS", level: "Learning / practising", detail: "Apple's Unix-based operating system, popular with developers and designers for combining a polished interface with a powerful terminal." }
    ]
  },
  {
    id: "uiux",
    label: "UI/UX",
    summary: "Designing interfaces that are clear, accessible, and easy to use, by understanding how people interact with a product.",
    color: "#ffe08a",
    skills: [
      { name: "Figma", level: "Learning / practising", detail: "A collaborative design tool for wireframes, interface mockups, and clickable prototypes before any code is written." },
      { name: "Canva", level: "Learning / practising", detail: "An easy-to-use design platform for quickly creating graphics, presentations, social posts, and simple branded layouts." }
    ]
  },
  {
    id: "networking",
    label: "Networking",
    summary: "Understanding how devices connect and exchange data, and how to configure, secure, and troubleshoot networks.",
    color: "#d2b6ff",
    skills: [
      { name: "Routing", level: "Learning / practising", detail: "How routers choose paths for data between networks, using static routes or protocols such as RIP and OSPF." },
      { name: "VLAN configuration", level: "Learning / practising", detail: "Splitting one physical switch network into separate logical networks to improve organisation, performance, and security." },
      { name: "Access control", level: "Learning / practising", detail: "Limiting who and what can reach network resources, using tools such as ACLs, permissions, and authentication rules." },
      { name: "Network troubleshooting", level: "Learning / practising", detail: "A step-by-step approach to finding and fixing connectivity problems, using tools like ping, traceroute, and device logs." }
    ]
  },
  {
    id: "security",
    label: "Cybersecurity",
    summary: "Protecting systems, networks, and data by finding weaknesses, designing secure systems, and responding to threats responsibly.",
    color: "#ffb9a7",
    skills: [
      { name: "System architecture design", level: "Learning / practising", detail: "Planning how components, networks, and data flows fit together so a system is secure, reliable, and scalable from the start." },
      { name: "Vulnerability assessment", level: "Learning / practising", detail: "Systematically scanning and reviewing systems to identify, rank, and report weaknesses before attackers can exploit them." },
      { name: "Incident response", level: "Learning / practising", detail: "A structured process for detecting, containing, investigating, and recovering from security incidents, then learning from them." },
      { name: "Penetration testing", level: "Learning / practising", detail: "Authorised, simulated attacks that test how well defences hold up, ending with a report of findings and fixes." }
    ]
  }
];