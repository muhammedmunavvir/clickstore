import React from "react";

export const Heropage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-8 tracking-tight leading-none">
              clickstore
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Discover everything you need in one seamless shopping experience
            </p>
            <a
              href="/Allproducts"
              className="inline-flex items-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-purple-500"
            >
              <span>Explore Now</span>
              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Floating product cards - Adjusted positions */}
          <div className="hidden lg:block">
            <div className="relative max-w-6xl mx-auto h-96">
              {/* Electronics card - adjusted position */}
              <div className="absolute top-0 left-0 transform -rotate-12 hover:rotate-0 transition-transform duration-500 hover:scale-110">
                <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30 hover:shadow-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                  <img
                    src="https://m.media-amazon.com/images/I/71hlbslxrAL.jpg"
                    alt="Electronics Product"
                    className="w-36 h-36 object-cover rounded-xl"
                  />
                  <p className="text-white text-sm mt-3 font-semibold text-center">Electronics</p>
                </div>
              </div>

              {/* Grocery card - adjusted position */}
              <div className="absolute top-0 right-0 transform rotate-12 hover:rotate-0 transition-transform duration-500 hover:scale-110">
                <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30 hover:shadow-green-500/30 hover:border-green-400/50 transition-all duration-300">
                  <img
                    src="https://img.freepik.com/premium-photo/bee-taking-nectar-from-flower_934877-2679.jpg"
                    alt="Grocery Product"
                    className="w-36 h-36 object-cover rounded-xl"
                  />
                  <p className="text-white text-sm mt-3 font-semibold text-center">Grocery</p>
                </div>
              </div>

              {/* Books card - adjusted position */}
              <div className="absolute bottom-0 left-1/4 transform -rotate-6 hover:rotate-0 transition-transform duration-500 hover:scale-110">
                <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30 hover:shadow-orange-500/30 hover:border-orange-400/50 transition-all duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center"
                    alt="Books Product"
                    className="w-36 h-36 object-cover rounded-xl"
                  />
                  <p className="text-white text-sm mt-3 font-semibold text-center">Books</p>
                </div>
              </div>

              {/* Fashion card - adjusted position */}
              <div className="absolute bottom-0 right-1/4 transform rotate-6 hover:rotate-0 transition-transform duration-500 hover:scale-110">
                <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30 hover:shadow-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&crop=center"
                    alt="Fashion Product"
                    className="w-36 h-36 object-cover rounded-xl"
                  />
                  <p className="text-white text-sm mt-3 font-semibold text-center">Fashion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Category</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our curated collections designed for your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {/* Grocery Category */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden ring-4 ring-green-400/30 group-hover:ring-green-400/60 transition-all duration-300">
                    <img
                      src="https://img.freepik.com/premium-photo/bee-taking-nectar-from-flower_934877-2679.jpg"
                      alt="Grocery Category"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Grocery</h3>
                <p className="text-gray-400 text-center mb-6">Fresh produce and daily essentials</p>
                <a
                  href="/products/grocery"
                  className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 rounded-xl hover:from-green-400 hover:to-emerald-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                >
                  Shop Grocery
                </a>
              </div>
            </div>

            {/* Electronics Category */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden ring-4 ring-blue-400/30 group-hover:ring-blue-400/60 transition-all duration-300">
                    <img
                      src="/WhatsApp Image 2025-07-13 at 19.32.32_40ef9798.jpg"
                      alt="Electronics Category"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Electronics</h3>
                <p className="text-gray-400 text-center mb-6">Latest gadgets and tech</p>
                <a
                  href="/products/electronics"
                  className="block w-full text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:from-blue-400 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Shop Electronics
                </a>
              </div>
            </div>

            {/* Fashion Category */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden ring-4 ring-purple-400/30 group-hover:ring-purple-400/60 transition-all duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&crop=center"
                      alt="Fashion Category"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Fashion</h3>
                <p className="text-gray-400 text-center mb-6">Trendy clothes and accessories</p>
                <a
                  href="/products/garments"
                  className="block w-full text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:from-purple-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Shop Fashion
                </a>
              </div>
            </div>

            {/* Books Category */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden ring-4 ring-orange-400/30 group-hover:ring-orange-400/60 transition-all duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center"
                      alt="Books Category"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Books</h3>
                <p className="text-gray-400 text-center mb-6">Knowledge and entertainment</p>
                <a
                  href="/products/Books"
                  className="block w-full text-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-xl hover:from-orange-400 hover:to-red-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
                >
                  Shop Books
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};