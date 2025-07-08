
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ExternalLink, Github, Code } from "lucide-react";

// const Projects = () => {
//   const projects = [
//     {
//       title: "E-Commerce Platform",
//       description: "A full-stack e-commerce application with user authentication, shopping cart, and payment integration. Built with modern technologies for optimal performance.",
//       technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
//       github: "#",
//       live: "#",
//       image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop"
//     },
//     {
//       title: "Task Management App",
//       description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
//       technologies: ["React.js", "Express.js", "Socket.io", "PostgreSQL"],
//       github: "#",
//       live: "#",
//       image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop"
//     },
//     {
//       title: "Weather Dashboard",
//       description: "A responsive weather application that provides current weather conditions and forecasts using external APIs with beautiful visualizations.",
//       technologies: ["React.js", "Tailwind CSS", "Weather API", "Charts.js"],
//       github: "#",
//       live: "#",
//       image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop"
//     },
//     {
//       title: "Blog Platform",
//       description: "A modern blog platform with markdown support, comment system, and admin dashboard for content management.",
//       technologies: ["Next.js", "TypeScript", "MongoDB", "Vercel"],
//       github: "#",
//       live: "#",
//       image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop"
//     }
//   ];

//   return (
//     <section id="projects" className="py-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Projects</span>
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto mb-6"></div>
//           <p className="text-lg text-gray-300 max-w-2xl mx-auto">
//             Here are some of the projects I've worked on. Each one represents a learning journey and showcases different aspects of my skills.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {projects.map((project, index) => (
//             <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden backdrop-blur-sm group">
//               <div className="relative overflow-hidden">
//                 <img 
//                   src={project.image} 
//                   alt={project.title}
//                   className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
//               </div>
              
//               <CardHeader>
//                 <CardTitle className="text-white text-xl mb-2">{project.title}</CardTitle>
//                 <CardDescription className="text-gray-300 text-base leading-relaxed">
//                   {project.description}
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 <div className="flex flex-wrap gap-2">
//                   {project.technologies.map((tech, techIndex) => (
//                     <Badge key={techIndex} variant="secondary" className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30">
//                       {tech}
//                     </Badge>
//                   ))}
//                 </div>

//                 <div className="flex gap-3 pt-2">
//                   <Button 
//                     variant="outline" 
//                     size="sm" 
//                     className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white flex-1"
//                   >
//                     <Github size={16} className="mr-2" />
//                     Code
//                   </Button>
//                   <Button 
//                     size="sm" 
//                     className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 flex-1"
//                   >
//                     <ExternalLink size={16} className="mr-2" />
//                     Live Demo
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Button 
//             variant="outline" 
//             className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3"
//           >
//             <Code size={20} className="mr-2" />
//             View All Projects on GitHub
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;
