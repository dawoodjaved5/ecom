
import { GraduationCap, Code, Zap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate 20-year-old software engineering student with a love for creating 
              innovative web applications. My journey in programming started with curiosity and 
              has evolved into a deep passion for full-stack development.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Currently pursuing my degree in Software Engineering while continuously learning 
              and working on exciting projects. I believe in writing clean, efficient code and 
              staying up-to-date with the latest technologies and best practices.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center space-x-2 text-blue-400">
                <GraduationCap size={20} />
                <span>Software Engineering Student</span>
              </div>
              <div className="flex items-center space-x-2 text-teal-400">
                <Code size={20} />
                <span>Full Stack Developer</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Zap size={20} />
                <span>Quick Learner</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">20</h3>
              <p className="text-gray-300">Years Old</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-teal-500 transition-all duration-300">
              <h3 className="text-2xl font-bold text-teal-400 mb-2">3+</h3>
              <p className="text-gray-300">Technologies</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-green-500 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-400 mb-2">∞</h3>
              <p className="text-gray-300">Enthusiasm</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-2xl font-bold text-purple-400 mb-2">24/7</h3>
              <p className="text-gray-300">Learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
