import { useState } from 'react';

const WHATSAPP_NUMBER = '4407588635343';
const DEFAULT_MESSAGE = 'Hi Mide! I saw your products and I\'d love to place an order. Could you help me? 😊';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <div className="bg-white text-charcoal text-sm font-medium px-4 py-2 rounded-full shadow-md whitespace-nowrap border border-gray-100">
          Chat with us on WhatsApp
        </div>
      </div>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />

        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Chat on WhatsApp"
          className="relative w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <i className="ri-whatsapp-line text-2xl" />
        </button>
      </div>
    </div>
  );
}