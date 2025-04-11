type LoginLayoutProps = {
    children: React.ReactNode
    className?: string
}

const LoginLayout = ({ children, className }: LoginLayoutProps) => (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-notwhite-400 overflow-hidden">
        <img
            src="/images/logo-clear.png"
            alt="Logo decorativo"
            className="fixed top-25 left-[-130px] origin-top-right scale-[1.2] opacity-10 rotate-45 "
        />

        <img
            src="/images/logo-black.png"
            alt="Logo decorativo inferior"
            className="fixed bottom-0 left-10 opacity-10 origin-top-right scale-[1.2]"
        />

        <div className="flex flex-col items-center justify-center w-full gap-2">
            <div className="flex flex-col justify-end">
                <img
                    src="/images/logo-clear.png"
                    alt="Logo decorativo central"
                    className="w-[160px]"
                />
            </div>
            <div className={`z-10 flex flex-col items-center text-center ${className}`}>
                <h2 className="text-6xl font-conthrax w-max">ROUTEEN</h2>
                <h2 className="text-[19px] font-bebas tracking-[0.45em] mb-5 ransform scale-y-125">-FITNESS MANAGER-</h2>
                {children}
            </div>
        </div>
    </div>
)

export default LoginLayout