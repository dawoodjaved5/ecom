
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Send me a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                    required
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 resize-none"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 py-3"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's connect!</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Whether you're looking for a developer, have a project in mind, or just want to connect, 
                I'd love to hear from you. Feel free to reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700">
                <Mail size={24} className="text-blue-400" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-300">dawood.dev@example.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700">
                <MapPin size={24} className="text-teal-400" />
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-300">Available for remote work</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700">
                <Phone size={24} className="text-green-400" />
                <div>
                  <p className="text-white font-medium">Response Time</p>
                  <p className="text-gray-300">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">Follow me on social media</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:scale-110"
                >
                  <Github size={24} className="text-gray-300 hover:text-blue-400" />
                </a>
                <a 
                  href="#" 
                  className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={24} className="text-gray-300 hover:text-blue-400" />
                </a>
                <a 
                  href="#" 
                  className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:scale-110"
                >
                  <Twitter size={24} className="text-gray-300 hover:text-blue-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
