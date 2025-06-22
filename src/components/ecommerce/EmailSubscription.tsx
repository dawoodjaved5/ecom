
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmailSubscription = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email subscription:", email);
    setEmail("");
  };

  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center fade-in">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Join the Style Club
        </h2>
        <p className="text-xl mb-2 text-gray-300">
          Be the first to know about new collections and exclusive offers
        </p>
        <p className="text-lg mb-8 text-yellow-400 font-semibold">
          Get 10% off your first order when you sign up!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white text-black border-0 text-lg py-6"
            required
          />
          <Button 
            type="submit"
            className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-6 text-lg whitespace-nowrap"
          >
            Subscribe Now
          </Button>
        </form>

        <p className="text-sm text-gray-400 mt-4">
          No spam, unsubscribe at any time
        </p>
      </div>
    </section>
  );
};

export default EmailSubscription;
