
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skills = [
    { name: "Next.js", level: "Advanced", color: "bg-gray-800 text-white" },
    { name: "React.js", level: "Advanced", color: "bg-blue-600 text-white" },
    { name: "Node.js", level: "Intermediate", color: "bg-green-600 text-white" },
    { name: "JavaScript", level: "Advanced", color: "bg-yellow-500 text-black" },
    { name: "TypeScript", level: "Intermediate", color: "bg-blue-500 text-white" },
    { name: "MongoDB", level: "Intermediate", color: "bg-green-500 text-white" },
    { name: "Express.js", level: "Intermediate", color: "bg-gray-700 text-white" },
    { name: "Tailwind CSS", level: "Advanced", color: "bg-cyan-500 text-white" },
    { name: "Git", level: "Intermediate", color: "bg-orange-500 text-white" },
    { name: "REST APIs", level: "Advanced", color: "bg-purple-600 text-white" },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Frontend</h3>
            <div className="space-y-4">
              {skills.filter(skill => ["Next.js", "React.js", "JavaScript", "TypeScript", "Tailwind CSS"].includes(skill.name)).map((skill, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <Badge className={skill.color}>{skill.level}</Badge>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${skill.level === 'Advanced' ? 'w-5/6 bg-green-500' : 'w-3/4 bg-yellow-500'}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-teal-400 mb-4">Backend</h3>
            <div className="space-y-4">
              {skills.filter(skill => ["Node.js", "Express.js", "MongoDB", "REST APIs"].includes(skill.name)).map((skill, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-teal-500 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <Badge className={skill.color}>{skill.level}</Badge>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${skill.level === 'Advanced' ? 'w-5/6 bg-green-500' : 'w-3/4 bg-yellow-500'}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Tools & Others</h3>
            <div className="space-y-4">
              {skills.filter(skill => ["Git"].includes(skill.name)).map((skill, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-green-500 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <Badge className={skill.color}>{skill.level}</Badge>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${skill.level === 'Advanced' ? 'w-5/6 bg-green-500' : 'w-3/4 bg-yellow-500'}`}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-3">Currently Learning</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-purple-400 text-purple-400">Docker</Badge>
                  <Badge variant="outline" className="border-purple-400 text-purple-400">AWS</Badge>
                  <Badge variant="outline" className="border-purple-400 text-purple-400">GraphQL</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
