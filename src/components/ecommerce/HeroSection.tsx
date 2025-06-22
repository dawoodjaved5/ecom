
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([textRef.current, buttonsRef.current, sparklesRef.current], { opacity: 0, y: 50 });
      
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5
      });

      gsap.to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.2
      });

      gsap.to(sparklesRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.8
      });

      // Floating animation for sparkles
      gsap.to(sparklesRef.current, {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&h=1080&fit=crop&crop=center')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-ping opacity-70"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-pulse opacity-50"></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div ref={textRef}>
          <div className="mb-6">
            <span className="inline-block text-sm font-semibold tracking-wider text-gray-300 uppercase border border-white/30 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              Premium Fashion
            </span>
          </div>
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white">
              CLOTHORA
            </span>
          </h1>
          <p className="text-2xl md:text-4xl mb-4 font-light tracking-wide text-gray-200">
            Elevate Your Everyday Style
          </p>
          <p className="text-lg md:text-xl mb-12 font-light text-gray-300 max-w-2xl mx-auto">
            Discover premium fashion that speaks to your individuality
          </p>
        </div>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100 font-bold px-10 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 group"
          >
            Shop Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-10 py-6 text-lg rounded-full backdrop-blur-sm bg-white/10 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Explore Collection
          </Button>
        </div>

        <div ref={sparklesRef} className="flex justify-center">
          <Sparkles className="text-yellow-400" size={32} />
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <div className="w-6 h-12 border-2 border-white rounded-full flex justify-center bg-white/10 backdrop-blur-sm">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs mt-2 text-gray-300 font-medium">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
