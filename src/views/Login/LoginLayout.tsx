const LoginLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      
      <img
        src="/images/logo-clear.png"
        alt="Logo decorativo"
        className="fixed top-25 left-[-130px] origin-top-right scale-[1.2] opacity-10 rotate-45 "
        />
  
      <img
        src="/images/logo-black.png"
        alt="Logo decorativo inferior"
        className="fixed bottom-0 left-10 opacity-10  origin-top-right scale-[1.2] pointer-events-none select-none"
      />
  
      <img
        src="/images/logo-clear.png"
        alt="Logo decorativo central"
        className="absolute top-50 opacity-10 scale-[0.5] pointer-events-none select-none"
      />
  
      <div className="z-10 flex flex-col items-center text-center">
        <h2 className="text-6xl font-conthrax w-max">ROUTEEN</h2>
        <h2 className="text-xl font-bebas tracking-[0.5em]">-FITNESS MANAGER-</h2>
        {children}
      </div>
    </div>
  );

  
  
export default LoginLayout;