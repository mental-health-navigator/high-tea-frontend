
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <>
      {/* Top right brush, always visible and responsive */}
      <div
        className="pointer-events-none fixed z-0"
        style={{
          top: -80,
          right: -150,
          width: '700px', 
          height: '700px',
          maxWidth: '100vw',
          zIndex: 0,
        }}
      >
        <Image
          src="/images/brush-new.png"
          alt="Brush Top Right"
          width={1000}
          height={1000}
          className="animate-floatY"
          priority
        />
      </div>
      {/* Bottom left brush, center aligned to bottom left, moved up */}
      <div className="pointer-events-none fixed z-0" style={{left:100, bottom: 250, width: '700px', height: '700px', transform: 'translate(-50%,50%) rotate(180deg)'}}>
        <Image
          src="/images/brush-new.png"
          alt="Brush Bottom Left"
          width={1000}
          height={1000}
          className="animate-floatY"
          priority
        />
      </div>
      
      <main className="flex-1 overflow-auto relative z-10">
      {/* Main content section */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-0 flex flex-col items-center mt-16 mb-12">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-center mb-12 mt-24" style={{color: '#2B3A2B'}}>
          How to use HealHub
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 w-full justify-center mb-16">
          <Card className="flex-1 bg-[#2B3A2B] text-white shadow-lg w-full lg:min-w-[280px] h-[200px] md:h-[160px] lg:h-[380px] rounded-2xl lg:rounded-[2.5rem_6rem_2.5rem_6rem] relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <CardContent className="p-6 pl-8 pb-16 h-full flex flex-col justify-end">
              <div>
                <h3 className="text-base md:text-lg xl:text-xl font-semibold mb-2 sm:mb-3 text-white leading-tight">Ask a question</h3>
                <p className="text-xs md:text-sm xl:text-sm font-medium text-white/90 leading-relaxed">
                  Go to Search and type what you're looking for in the chat. For example, 
                  "Free counselling in Carlton" or "Youth support near me."
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 bg-[#6B8F4E] text-white shadow-lg w-full lg:min-w-[280px] h-[200px] md:h-[160px] lg:h-[380px] rounded-2xl lg:rounded-[2.5rem_6rem_2.5rem_6rem] relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <CardContent className="p-6 pl-8 pb-16 h-full flex flex-col justify-end">
              <div>
                <h3 className="text-base md:text-lg xl:text-xl font-semibold mb-2 sm:mb-3 text-white leading-tight">Explore safe options</h3>
                <p className="text-xs md:text-sm xl:text-sm font-medium text-white/90 leading-relaxed">
                  The chatbot will guide you through services that match your needs, 
                  all explained in simple language.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 bg-[#B7C97C] text-[#2B3A2B] shadow-lg w-full lg:min-w-[280px] h-[200px] md:h-[160px] lg:h-[380px] rounded-2xl lg:rounded-[2.5rem_6rem_2.5rem_6rem] relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <CardContent className="p-6 pl-8 pb-16 h-full flex flex-col justify-end">
              <div>
                <h3 className="text-base md:text-lg xl:text-xl font-semibold mb-2 sm:mb-3 text-[#2B3A2B] leading-tight">Take the next step</h3>
                <p className="text-xs md:text-sm xl:text-sm font-medium text-[#2B3A2B]/80 leading-relaxed">
                  Save details or get connected with the right support whenever you're ready.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy Policy section */}
      <section className="w-full bg-[#2B3A2B] text-[#E6F0D9] py-16 px-4 md:px-0 rounded-t-[2.5rem] flex flex-col items-center">
        <div className="max-w-4xl w-full">
          <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold mb-4" style={{color: '#C7E59C'}}>
            Privacy Policy
          </h2>
          <p className="mb-4 text-sm md:text-base xl:text-base font-semibold">
            We don't store your conversations or personal data.
          </p>
          <p className="mb-6 text-sm md:text-base xl:text-base font-normal opacity-90">
            Your chats are processed in real-time and aren't saved to our servers. 
            When you close your browser or end your session, your conversation history is gone.
          </p>
          
          <div className="mb-6">
            <p className="text-sm md:text-base xl:text-base font-normal opacity-90 mb-2">What this means:</p>
            <ul className="list-disc pl-6 text-sm md:text-base xl:text-base font-normal opacity-90 space-y-1">
              <li>No chat logs or personal information stored</li>
              <li>No conversation history accessible to us</li>
              <li>Your data stays private and secure</li>
            </ul>
          </div>
          
          <p className="text-sm md:text-base xl:text-base font-normal opacity-90">
            We're committed to protecting your privacy while providing you with the best AI experience.
          </p>
        </div>
      </section>

      {/* Contact Us section */}
      <section className="w-full max-w-4xl mx-auto px-4 md:px-0 py-16 flex flex-col items-start">
        <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold mb-4" style={{color: '#2B3A2B'}}>
          Contact Us
        </h2>
        <div className="text-sm md:text-base xl:text-base font-normal text-gray-600 space-y-2">
          <div>
            <span className="font-medium">Email</span>
          </div>
          <div>
            <span className="font-medium">Phone</span>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
