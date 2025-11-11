import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Github, Linkedin, Instagram, Mail, ChevronRight, ChevronLeft } from "lucide-react";
import profileImage from "figma:asset/983630c8893b1dbcb28babaeae6aaa12d36cf232.png";

interface MenuItem {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  url: string;
}

const menuItems: MenuItem[] = [
  { id: "email", label: "Email", description: "Contact  me ", icon: Mail, color: "from-red-500 to-orange-600", url: "mailto:ritomborgohain@gmail.com" },
  { id: "github", label: "GitHub", description: "Check my repositories", icon: Github, color: "from-gray-700 to-gray-900", url: "https://github.com/chowritam" },
  { id: "linkedin", label: "LinkedIn", description: "Connect with me", icon: Linkedin, color: "from-blue-600 to-blue-800", url: "https://www.linkedin.com/in/debanil-ritam-borgohain-01699637a" },
  { id: "instagram", label: "Instagram", description: "Follow my journey", icon: Instagram, color: "from-pink-500 via-purple-500 to-orange-500", url: "https://instagram.com/chowritam" },
];

export default function ProfilePanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [repoCount, setRepoCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleMenuClick = (id: string, url: string) => {
    setActiveItem(id);
    if (id === "email") {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.github.com/users/chowritam');
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }
        const data = await response.json();
        setRepoCount(data.public_repos);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        setRepoCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  return (
    <div className="relative w-full max-w-[320px] mx-auto" style={{ aspectRatio: '320/450' }}>
      {/* Menu Panel - Moves to left when expanded */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl overflow-hidden z-0 border border-white/15"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isExpanded ? 1 : 0.95,
          scale: isExpanded ? 1 : 0.98,
          x: isExpanded ? '-43.75%' : 0
        }}
        transition={{
          type: "spring", 
          stiffness: 260, 
          damping: 26,
          mass: 0.8
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950" />
        
        {/* Menu Items */}
        <div className="relative pt-24 px-4 sm:px-6 space-y-3 sm:space-y-4 flex flex-col items-center">
          <AnimatePresence>
            {isExpanded && menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id, item.url)}
                  className="relative w-full max-w-[280px] group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ 
                    delay: 0.15 + (index * 0.06),
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  whileHover={{ scale: 1.03, x: 6 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className={`
                    relative overflow-hidden rounded-xl px-4 py-3
                    backdrop-blur-md bg-white/5
                    shadow-lg border border-white/15
                    transition-all duration-300
                    ${isActive ? 'ring-2 ring-white/40 bg-white/15' : ''}
                  `}>
                    {/* Gradient overlay matching social media brand */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-40 mix-blend-overlay`} />
                    
                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.7 }}
                    />
                    
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-xl"
                    />
                    
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/25 flex-shrink-0">
                          <Icon className="w-4 h-4 text-white/90" />
                        </div>
                        <div className="flex flex-col items-start min-w-0 flex-1">
                          <span className="text-white/95 text-sm">{item.label}</span>
                          <span className="text-white/60 text-xs truncate w-full">{item.description}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Profile Card - Front */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl cursor-pointer overflow-hidden z-10 border border-white/20"
        animate={{ 
          x: isExpanded ? '43.75%' : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 26,
          mass: 0.8
        }}
        whileHover={{ 
          scale: isExpanded ? 1 : 1.02,
          boxShadow: isExpanded 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            : "0 30px 60px -15px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
        
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/3 to-transparent" />

        <div className="relative h-full flex flex-col items-center justify-center p-6 sm:p-8 py-8 sm:py-12">
          {/* Top Section - Profile */}
          <div className="flex flex-col items-center">
            {/* Profile Picture */}
            <motion.div
              className="relative mb-5"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white backdrop-blur-xl flex items-center justify-center">
                <img 
                  src={profileImage}
                  alt="Debanil Ritam Borgohain" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to User icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    const icon = e.currentTarget.nextElementSibling as HTMLElement;
                    if (icon) icon.style.display = 'block';
                  }}
                />
                <User className="w-10 h-10 sm:w-14 sm:h-14 text-white/90 drop-shadow-lg hidden" strokeWidth={1.5} />
              </div>
              
              {/* Pulse ring - Static */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20" />
            </motion.div>

            {/* Name */}
            <motion.h2
              className="text-white/95 mb-1 drop-shadow-lg text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Debanil Ritam Borgohain
            </motion.h2>
            
            <motion.p
              className="text-white/75 mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              FullStack developer
            </motion.p>

            {/* See More Button */}
            <motion.button
              onClick={toggleExpanded}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative overflow-hidden rounded-full px-4 py-1.5 sm:px-6 sm:py-2 backdrop-blur-xl bg-white/15 border border-white/30 shadow-xl group-hover:bg-white/25 group-hover:border-white/50 transition-all duration-300">
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                
                <span className="relative flex items-center gap-2 text-white/90 drop-shadow-md text-sm">
                  {isExpanded ? (
                    <>
                      <ChevronLeft className="w-4 h-4" />
                      Close Menu
                    </>
                  ) : (
                    <>
                      See More
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </span>
              </div>
            </motion.button>
          </div>

          {/* Bottom Section - Projects */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                className="flex justify-center w-full mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-center">
                  <div className="backdrop-blur-sm bg-white/10 rounded-2xl py-4 px-8 sm:py-5 sm:px-10 border border-white/20">
                    <div className="text-white/95 drop-shadow-md text-4xl sm:text-5xl mb-1">
                      {isLoading ? (
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ...
                        </motion.div>
                      ) : (
                        repoCount ?? 0
                      )}
                    </div>
                    <div className="text-white/75 text-xs sm:text-sm mt-1">GitHub Repositories</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}