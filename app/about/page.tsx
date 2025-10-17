import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      {/* Top right brush, always visible and responsive */}
      <div
        className="pointer-events-none fixed"
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
      <div className="pointer-events-none fixed" style={{left:100, bottom: 250, width: '700px', height: '700px', transform: 'translate(-50%,50%) rotate(180deg)', zIndex: -10}}>
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
        {/* Why We Exist Section */}
        <section className="w-full max-w-4xl mx-auto px-4 md:px-8 flex flex-col justify-center items-start py-16 md:py-16 md:h-[85vh] md:min-h-[600px]">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-6">
            <span style={{color: '#B7C97C'}}>Why</span>{' '}
            <span style={{color: '#2B3A2B'}}>We Exist?</span>
          </h1>
          <div className="max-w-md">
            <p className="text-sm md:text-base font-normal leading-relaxed" style={{color: '#2B3A2B'}}>
              Finding the right mental health support should be simple and stress-free. 
              Our mission is to connect people with services that truly match their 
              needs, using an intuitive chatbot interface to make the search process 
              easier, faster, and more accessible.
            </p>
          </div>
        </section>

        {/* Hero Section with Gradient Background */}
        <section className="w-full relative bg-gradient-to-br from-[#6B8F4E] via-[#8FAA6B] to-[#B7C97C] h-screen overflow-hidden flex items-center justify-center">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
            <div className="mb-4">
              <p className="text-white/90 text-sm md:text-base font-medium tracking-wide">
                HealHub
              </p>
            </div>
            <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
              Healing starts with a conversation.
            </h2>
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