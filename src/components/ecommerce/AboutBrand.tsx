
const AboutBrand = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <img
              src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=700&fit=crop&crop=center"
              alt="Behind the scenes"
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-2xl"
            />
          </div>

          <div className="fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Clothora, we believe that fashion should be both timeless and contemporary. 
              Founded on the principles of minimalist design and sustainable practices, 
              we create clothing that speaks to the modern individual.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Every piece in our collection is thoughtfully designed and ethically produced, 
              ensuring that you not only look good but feel good about your choices.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our commitment to quality and sustainability drives us to use only the finest 
              materials and work with partners who share our values.
            </p>
            
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
                <p className="text-gray-600">Sustainable</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
                <p className="text-gray-600">Countries</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;
