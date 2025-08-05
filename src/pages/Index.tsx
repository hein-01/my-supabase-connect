import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, Compass } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import BusinessDirectory from "./BusinessDirectory";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("product");
  
  const categories = [
    { value: "product", label: "Product" },
    { value: "service", label: "Service" },
    { value: "business", label: "Business" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 max-w-4xl mx-auto leading-tight">
            Exclusively businesses with both online and in-store sales
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center mb-12">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-1">
              <ShoppingBag className="h-5 w-5" />
              <span>Start Shopping</span>
            </Button>
            <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg font-medium flex items-center space-x-1">
              <Compass className="h-5 w-5" />
              <span>Explore Shopping</span>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-2 flex items-center space-x-2">
            <div className="bg-yellow-400 rounded-md overflow-hidden">
              <Swiper
                direction="vertical"
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="h-10"
                modules={[Autoplay]}
              >
                {categories.map((category) => (
                  <SwiperSlide key={category.value} className="flex items-center justify-center">
                     <button
                       onClick={() => setSelectedCategory(category.value)}
                       className={`w-full h-full text-black font-medium text-sm flex items-center justify-center px-3 ${
                         selectedCategory === category.value ? 'bg-yellow-500' : 'bg-yellow-400'
                       }`}
                     >
                      {category.label}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
            <Input
              type="text"
              placeholder="iPhone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-0 text-gray-600 placeholder-gray-400 focus-visible:ring-0"
            />
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Did You Know Section */}
      <section className="hidden md:block w-full min-h-[300px] bg-background">
        <div className="w-full h-full flex items-center justify-center px-4 py-12">
          <div className="w-full bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center gap-8">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                DID YOU<br />KNOW
              </h2>
            </div>
            
            <div className="flex items-center justify-center">
              <p className="text-gray-600 text-lg">
                We have an app.<br />
                Please download from<br />
                Google Play Store.
              </p>
            </div>
            
            <div className="flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-12 transition-transform duration-200 hover:scale-90 cursor-pointer"
              />
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 bg-black rounded-lg flex items-center justify-center">
                <div className="text-white text-xs grid grid-cols-8 gap-1 p-2">
                  {/* QR Code pattern */}
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Popular Categories</h2>
          
          <div className="relative group">
            <Swiper
              spaceBetween={15}
              slidesPerView="auto"
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                reverseDirection: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              allowTouchMove={true}
              grabCursor={true}
              touchRatio={1}
              modules={[Autoplay, Navigation]}
              className="popular-categories-swiper !overflow-visible"
            >
              {[
                { id: 1, image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=310&h=160&fit=crop", link: "https://example.com/category1" },
                { id: 2, image: "https://images.unsplash.com/photo-1509316975850-ff9c5bee0cd9?w=310&h=160&fit=crop", link: "https://example.com/category2" },
                { id: 3, image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=310&h=160&fit=crop", link: "https://example.com/category3" },
                { id: 4, image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=310&h=160&fit=crop", link: "https://example.com/category4" },
                { id: 5, image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=310&h=160&fit=crop", link: "https://example.com/category5" },
                { id: 6, image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=310&h=160&fit=crop", link: "https://example.com/category6" },
                { id: 7, image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=310&h=160&fit=crop", link: "https://example.com/category7" },
                { id: 8, image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=310&h=160&fit=crop", link: "https://example.com/category8" },
                { id: 9, image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=310&h=160&fit=crop", link: "https://example.com/category9" },
                { id: 10, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=310&h=160&fit=crop", link: "https://example.com/category10" },
                { id: 11, image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=310&h=160&fit=crop", link: "https://example.com/category11" },
                { id: 12, image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=310&h=160&fit=crop", link: "https://example.com/category12" }
              ].map((category) => (
                <SwiperSlide key={category.id} className="!w-[310px]">
                  <a 
                    href={category.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                  >
                    <img
                      src={category.image}
                      alt={`Category ${category.id}`}
                      className="w-[310px] h-[160px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Business Directory Section */}
      <section className="py-12">
        <BusinessDirectory />
      </section>
    </div>
  );
};

export default Index;
