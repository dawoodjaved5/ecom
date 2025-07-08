// import { Button } from "@/components/ui/button";
// import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
// import { Link } from "react-router-dom";
// import CartIcon from "./CartIcon";

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
//       {/* Enhanced Background Pattern */}
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.08\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
      
//       {/* Animated Background Gradients */}
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 animate-pulse"></div>
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
      
//       {/* Navigation */}
//       <nav className="absolute top-0 left-0 right-0 z-20 p-6">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <Link to="/" className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-300">
//             StyleHub
//           </Link>
//           <CartIcon />
//         </div>
//       </nav>

//       {/* Enhanced Floating Elements */}
//       <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
//       <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
//       <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-500/15 to-purple-500/15 rounded-full blur-lg animate-pulse delay-500"></div>
//       <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      
//       <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
//         <div className="mb-8 animate-fade-in">
//           <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold border border-white/20 mb-6 hover:bg-white/20 transition-all duration-300 group">
//             <Sparkles size={16} className="text-yellow-400 animate-pulse" />
//             ✨ New Collection Available
//             <Zap size={16} className="text-yellow-400 group-hover:animate-bounce" />
//           </span>
//         </div>
        
//         <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight animate-fade-in delay-200">
//           Discover Your
//           <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
//             Perfect Style
//           </span>
//         </h1>
        
//         <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-400 font-medium">
//           Explore our curated collection of premium fashion pieces designed for the modern trendsetter. 
//           From casual elegance to statement luxury.
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-600">
//           <Button 
//             size="lg" 
//             className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white px-12 py-6 text-lg font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 border-0 group"
//           >
//             <span className="flex items-center gap-2">
//               Shop Collection
//               <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
//             </span>
//           </Button>
          
//           <Button 
//             variant="outline" 
//             size="lg"
//             className="border-2 border-white/30 text-white hover:bg-white hover:text-purple-900 px-12 py-6 text-lg font-bold rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
//           >
//             View Lookbook
//           </Button>
//         </div>
        
//         {/* Enhanced Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in delay-800">
//           <div className="text-center group hover:scale-105 transition-transform duration-300">
//             <div className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">500+</div>
//             <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">Premium Items</div>
//           </div>
//           <div className="text-center group hover:scale-105 transition-transform duration-300">
//             <div className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">50K+</div>
//             <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">Happy Customers</div>
//           </div>
//           <div className="text-center group hover:scale-105 transition-transform duration-300">
//             <div className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">99%</div>
//             <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">Satisfaction Rate</div>
//           </div>
//           <div className="text-center group hover:scale-105 transition-transform duration-300">
//             <div className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">24/7</div>
//             <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">Customer Support</div>
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className="flex items-center justify-center gap-8 mt-12 animate-fade-in delay-1000">
//           <div className="flex items-center gap-2 text-gray-400">
//             <Star className="text-yellow-400" size={16} />
//             <span className="text-sm font-medium">Premium Quality</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-400">
//             <Zap className="text-yellow-400" size={16} />
//             <span className="text-sm font-medium">Fast Delivery</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-400">
//             <Sparkles className="text-yellow-400" size={16} />
//             <span className="text-sm font-medium">Exclusive Designs</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Enhanced Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
//           <div className="w-1 h-3 bg-gradient-to-b from-white to-transparent rounded-full mt-2 animate-pulse"></div>
//         </div>
//       </div>

//       {/* Particle Effects */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 2}s`,
//               animationDuration: `${2 + Math.random() * 2}s`
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
