
import { ArrowDown, Github, Linkedin, Mail, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center shadow-2xl">
            <Code2 size={64} className="text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Dawood</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            20-year-old Full Stack Developer & Software Engineering Student
          </p>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Passionate about building modern web applications with Next.js, React.js, and Node.js. 
            Always eager to learn and create innovative solutions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button 
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
          >
            View My Work
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => scrollToSection('contact')}
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg transition-all duration-300"
          >
            Get In Touch
          </Button>
        </div>

        <div className="flex justify-center space-x-6 mt-8 animate-fade-in">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform">
            <Github size={32} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform">
            <Linkedin size={32} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform">
            <Mail size={32} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('about')}
          className="text-gray-400 hover:text-white transition-colors duration-300"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
