type LoginLayoutProps = {
    children: React.ReactNode
    className?: string
}

const LoginLayout = ({ children, className }: LoginLayoutProps) => (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-notwhite-400 ">
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
            className="fixed top-[280px] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.4]"
        />

        <div className={`z-10 flex flex-col items-center text-center ${className}`}>
            <h2 className="text-6xl font-conthrax w-max">ROUTEEN</h2>
            <h2 className="text-[19px] font-bebas tracking-[0.45em] mb-5 ransform scale-y-125">-FITNESS MANAGER-</h2>
            {children}
        </div>
    </div>
)

export default LoginLayout