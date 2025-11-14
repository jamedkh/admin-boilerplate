import React from "react";

function LogoSymbol({ className }: { className?: string }) {
  return (
    <div className="logo-symbol-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 120"
        className={className}
      >
        <path d="M100.201,2.276l-18.268,56.647-8.06-25.037h-17.522l4.059,12.608c.354-.025.708-.054,1.068-.054,8.457,0,15.314,6.856,15.314,15.314,0,5.506-2.916,10.32-7.279,13.018l3.651,11.342h17.522L117.723,2.276h-17.522Z" />
        <path d="M46.164,61.754c0-4.853,2.264-9.171,5.787-11.977l-5.115-15.891h-17.522L2.277,117.724h17.522l18.268-56.646,8.06,25.037h17.521l-2.924-9.085c-8.105-.396-14.56-7.073-14.56-15.276Z" />
      </svg>
    </div>
  );
}

export default LogoSymbol;
