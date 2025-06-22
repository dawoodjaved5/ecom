
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Gift } from "lucide-react";

const EmailSubscription = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email subscription:", email);
    setEmail("");
  };

  return (
    <section className="py-32 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="max-w-4xl mx-auto text-center fade-in relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-yellow-400" size={24} />
            <span className="text-sm font-semibold tracking-wider text-gray-300 uppercase">
              Exclusive Access
            </span>
            <Sparkles className="text-yellow-400" size={24} />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Join the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Style Club
            </span>
          </h2>
          
          <p className="text-xl mb-4 text-gray-300 leading-relaxed">
            Be the first to discover new collections, exclusive drops, and styling tips
          </p>
          
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-bold text-lg mb-8">
            <Gift size={20} />
            Get 15% off your first order
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/10 backdrop-blur-sm text-white border-white/30 placeholder:text-gray-400 text-lg py-6 px-6 rounded-full focus:border-purple-400 focus:ring-purple-400"
            required
          />
          <Button 
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-6 text-lg whitespace-nowrap rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Subscribe Now
          </Button>
        </form>

        <p className="text-sm text-gray-400 mt-6">
          Join 50,000+ fashion lovers • No spam, unsubscribe anytime
        </p>
      </div>
    </section>
  );
};

export default EmailSubscription;
