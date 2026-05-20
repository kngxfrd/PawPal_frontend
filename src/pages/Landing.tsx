import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LuPawPrint, 
  LuHeart, 
  LuCalendar, 
  LuShieldCheck, 
  LuStar, 
  LuArrowRight, 
  LuMapPin,
  LuPhone,
  LuMail
} from "react-icons/lu";
import dogPic5 from "../assets/dog_pic5.webp";
import dogPic1 from "../assets/dog_pic1.webp";
import catPic3 from "../assets/cat_pic3.webp";
import dogPicture from "../assets/dog_picture.webp";
import homeImg from "../assets/homeimg.jpg";

function Landing() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <LuPawPrint size={24} className="text-[#155dfc]" />,
      title: "Premium Grooming",
      desc: "Top-tier breed-specific styling, detangling, relaxing bubble baths, and stress-free nail care by certified specialists.",
      bg: "bg-blue-50/50",
      border: "hover:border-blue-200"
    },
    {
      icon: <LuHeart size={24} className="text-[#ef4444]" />,
      title: "Wellness Dashboard",
      desc: "An all-in-one health tracker. Manage vaccinations, developmental charts, allergy records, and professional grooming history.",
      bg: "bg-red-50/50",
      border: "hover:border-red-200"
    },
    {
      icon: <LuCalendar size={24} className="text-[#f59e0b]" />,
      title: "Seamless Scheduling",
      desc: "Instant real-time booking. Reschedule or modify appointments with local groomers in just a few taps.",
      bg: "bg-amber-50/50",
      border: "hover:border-amber-200"
    },
    {
      icon: <LuShieldCheck size={24} className="text-[#10b981]" />,
      title: "Vetted Professionals",
      desc: "Every groomer is thoroughly background-checked, certified, and rated by local pet owners for absolute peace of mind.",
      bg: "bg-emerald-50/50",
      border: "hover:border-emerald-200"
    }
  ];

  const testimonials = [
    {
      name: "Gifty",
      role: "Dog Mom ",
      quote: "PawPal changed how I schedule Snowy's grooming and our groomer is exceptional!",
      stars: 5,
    },
    {
      name: "Kingsford",
      role: "Cat Owner",
      quote: "Milo is usually terrified of grooming, but PawPal's certified groomer handled him with incredible patience and love. Outstanding service.",
      stars: 5,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white text-gray-800 antialiased font-sans">
      
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-blue-50 p-2 rounded-xl border border-blue-100 flex items-center justify-center transition-all duration-300 hover:scale-105">
              <LuPawPrint size={26} color="#155dfc" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900">
              PAWPAL <span className="text-[#155dfc]">GH</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-semibold text-gray-600 hover:text-[#155dfc] transition-colors">Services</a>
            <a href="#gallery" className="text-sm font-semibold text-gray-600 hover:text-[#155dfc] transition-colors">Gallery</a>
            <a href="#about" className="text-sm font-semibold text-gray-600 hover:text-[#155dfc] transition-colors">About Us</a>
            <a href="#testimonials" className="text-sm font-semibold text-gray-600 hover:text-[#155dfc] transition-colors">Testimonials</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 rounded-full text-gray-600 hover:text-[#155dfc] font-semibold text-sm transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2.5 rounded-full text-white bg-[#155dfc] hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-sm"
            >
              Register
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg px-6 py-5 flex flex-col gap-4 shadow-xl">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-gray-600 py-1.5"
            >
              Services
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-gray-600 py-1.5"
            >
              Gallery
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-gray-600 py-1.5"
            >
              About Us
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-gray-600 py-1.5"
            >
              Testimonials
            </a>
            <hr className="border-gray-100 my-1" />
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full py-3 rounded-xl text-center border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/signup");
                }}
                className="w-full py-3 rounded-xl text-center text-white bg-[#155dfc] font-semibold text-sm shadow-md"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden pt-12 pb-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-6 flex flex-col text-left">
            
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
              The Premium Care Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#155dfc] to-blue-500">Furry Friend</span> Deserves
            </h1>
            
            <p className="text-base sm:text-lg text-gray-500 mt-6 leading-relaxed max-w-xl">
              Book certified pet groomers, keep track of vaccinations with our smart wellness dashboard, and connect with a loving pet community—all in one elegant platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 rounded-full text-white bg-[#155dfc] hover:bg-blue-600 hover:scale-[1.02] shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-300 font-bold text-base flex items-center justify-center gap-2 group cursor-pointer"
              >
                Get Started Now
                <LuArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#services"
                className="px-8 py-4 rounded-full text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all duration-300 font-bold text-base text-center"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-6">
              <div className="flex -space-x-3">
                <img src={dogPic1} alt="Pet" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <img src={catPic3} alt="Pet" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <img src={dogPicture} alt="Pet" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Over 1,200+ Happy Pets Cared For</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <LuStar key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1.5">(4.9/5 Average Rating)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[450px] sm:h-[550px] w-full flex items-center justify-center">

            <div className="absolute -inset-10 bg-gradient-to-tr from-blue-300/10 to-[#155dfc]/5 rounded-full blur-3xl opacity-70"></div>


            <div className="absolute w-[80%] h-[80%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500 z-10">
              <img 
                src={dogPic5} 
                alt="Happy dog and owner" 
                className="w-full h-full object-cover transition-scale duration-700 hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <p className="text-white text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full w-fit mb-1.5">Feature Spotlight</p>
                <h3 className="text-white text-lg font-black leading-tight">Professional Home & Center Grooming</h3>
              </div>
            </div>

            <div className="absolute top-[8%] left-[-5%] w-[180px] rounded-3xl bg-white p-3.5 shadow-xl border border-gray-100 -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 z-20 hidden sm:block text-left">
              <div className="h-32 rounded-2xl overflow-hidden mb-2.5">
                <img src={dogPic1} alt="Golden Retriever" className="w-full h-full object-cover" />
              </div>
              <p className="font-extrabold text-sm text-gray-900">Snowy</p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-gray-400">Golden Retriever</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Groomed</span>
              </div>
            </div>

            <div className="absolute bottom-[8%] right-[-5%] w-[185px] rounded-3xl bg-white p-3.5 shadow-xl border border-gray-100 rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 z-20 hidden sm:block text-left">
              <div className="h-32 rounded-2xl overflow-hidden mb-2.5">
                <img src={catPic3} alt="Siberian Cat" className="w-full h-full object-cover" />
              </div>
              <p className="font-extrabold text-sm text-gray-900">Milo</p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-gray-400">Persian Cat</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">Pending</span>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="bg-[#155dfc]/5 border-y border-blue-100/50 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#155dfc]">1,200+</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider mt-1.5">Happy Pets Registered</p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#155dfc]">99%</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider mt-1.5">Satisfaction Rate</p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#155dfc]">25+</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider mt-1.5">Certified Groomers</p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#155dfc]">5 Star</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider mt-1.5">Average Rated Services</p>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#155dfc]">OUR SERVICES</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">Tailored Services for Every Pet</h2>
          <p className="text-gray-500 mt-4 text-base sm:text-lg">Discover our premium features designed to make pet grooming, vaccination tracking, and care management effortless.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-3xl bg-white border border-gray-100/80 shadow-md shadow-gray-100/50 hover:shadow-xl transition-all duration-300 text-left hover:-translate-y-1.5 border-b-4 ${feature.border}`}
            >
              <div className={`p-3.5 rounded-2xl w-fit ${feature.bg} mb-6 flex items-center justify-center shadow-inner`}>
                {feature.icon}
              </div>
              <h3 className="font-extrabold text-xl text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#155dfc]">PAWPAL GALLERY</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">Groomed with Perfection</h2>
            <p className="text-gray-500 mt-4">Take a look at some of our beautiful, clean, and happy friends after their customized grooming sessions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group overflow-hidden rounded-3xl bg-white p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden rounded-2xl mb-4 relative">
                <img src={dogPicture} alt="Shampooed and Dried Dog" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 px-4 py-2 rounded-full text-xs font-extrabold text-gray-900 shadow-lg">Grooming Masterclass</span>
                </div>
              </div>
              <div className="text-left px-2">
                <h4 className="font-extrabold text-lg text-gray-900">Cozy Bubble Bath</h4>
                <p className="text-xs text-gray-400 mt-1">Deep cleansing & standard hydration treatment.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-3xl bg-white p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden rounded-2xl mb-4 relative">
                <img src={catPic3} alt="Happy Fluffy Cat" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 px-4 py-2 rounded-full text-xs font-extrabold text-gray-900 shadow-lg">Gentle Care</span>
                </div>
              </div>
              <div className="text-left px-2">
                <h4 className="font-extrabold text-lg text-gray-900">De-shedding & Trim</h4>
                <p className="text-xs text-gray-400 mt-1">Reducing cat-shedding while enhancing fur volume.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-3xl bg-white p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden rounded-2xl mb-4 relative">
                <img src={dogPic1} alt="Happy Poodle" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 px-4 py-2 rounded-full text-xs font-extrabold text-gray-900 shadow-lg">Signature Styling</span>
                </div>
              </div>
              <div className="text-left px-2">
                <h4 className="font-extrabold text-lg text-gray-900">Teddy Bear Cut</h4>
                <p className="text-xs text-gray-400 mt-1">Certified breed-specific professional styling.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-[2.5rem] -rotate-3 z-0"></div>
            <div className="h-[480px] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border-4 border-white">
              <img src={homeImg} alt="Pet Clinic and Grooming Team" className="w-full h-full object-cover" />
            </div>

            <div className="absolute bottom-6 right-6 bg-white p-4.5 rounded-2xl shadow-xl z-20 border border-gray-100 max-w-[200px] text-left">
              <h5 className="font-extrabold text-[#155dfc] text-sm">Professional Standards</h5>
              <p className="text-[11px] text-gray-500 mt-1 leading-normal">Certified pet handling protocols to keep every friend happy and safe.</p>
            </div>
          </div>

          <div className="lg:col-span-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#155dfc]">ABOUT PAWPAL</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">The ultimate dashboard built for caring pet owners.</h2>
            
            <p className="text-gray-500 mt-6 leading-relaxed">
              At PawPal GH, we understand that pets are cherished family members. That's why we engineered a seamless platform that bridges the gap between premium groomers and pet owners, complete with diagnostic tracking, medical charts, and customizable services.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="bg-blue-50 text-[#155dfc] h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-extrabold text-gray-900">Custom Pet Profiles</h4>
                  <p className="text-sm text-gray-500 mt-0.5">Build distinct digital identities for multiple pets, storing specific grooming styles, treats, allergies, and size metrics.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-50 text-[#155dfc] h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-extrabold text-gray-900">Instant Digital Invoicing</h4>
                  <p className="text-sm text-gray-500 mt-0.5">Full financial transparency with automated billing, booking histories, and payment receipts in a clicks.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#155dfc]">SUCCESS STORIES</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">Loved by Pets, Trusted by Owners</h2>
            <p className="text-gray-500 mt-4">Hear what our amazing pet parent community has to say about their groomers and tracking experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((test, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-md shadow-gray-100/50 text-left flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-0.5 mb-5">
                    {[...Array(test.stars)].map((_, idx) => (
                      <LuStar key={idx} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-base leading-relaxed">"{test.quote}"</p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-50 text-[#155dfc] font-black flex items-center justify-center text-sm">
                    {test.name[0]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">{test.name}</h4>
                    <p className="text-xs text-gray-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-[#155dfc] text-white">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-600/30 skew-x-12 origin-top-right"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">Ready to Give Your Companion The Best Grooming Care?</h2>
          <p className="text-blue-100 mt-6 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Create an account today to build your pet's wellness profile and unlock appointments with vetted professionals.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-white text-[#155dfc] hover:bg-gray-50 active:scale-95 transition-all duration-300 rounded-full font-bold text-base shadow-xl flex items-center gap-2 cursor-pointer"
            >
              Get Started Now <LuArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 border border-white/30 bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-300 rounded-full font-bold text-base"
            >
              Sign In to Account
            </button>
          </div>
        </div>
      </section>


      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">

          <div className="md:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="bg-blue-600/10 p-2 rounded-xl border border-blue-500/20 flex items-center justify-center">
                <LuPawPrint size={24} color="#155dfc" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                PAWPAL <span className="text-[#155dfc]">GH</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Connecting pet owners with standard certified groomers in Ghana. Manage bookings, vaccine records, and grooming cards on a simplified platform.
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Quick Navigation</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Services & Features</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Client Gallery</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col items-start text-left">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Get In Touch</h5>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center gap-3">
                <LuMapPin size={16} className="text-[#155dfc]" />
                <span>Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-3">
                <LuPhone size={16} className="text-[#155dfc]" />
                <span>+233 244 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <LuMail size={16} className="text-[#155dfc]" />
                <span>support@pawpal.gh</span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:text-left text-xs text-gray-600">
          <p>© {new Date().getFullYear()} PawPal GH. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Landing;
