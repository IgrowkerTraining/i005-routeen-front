import { useEffect } from "react";

export function useBlockBackNavigation(enabled: boolean = true) {
    useEffect(() => {
        if (!enabled) return;

        const handlePopState = () => {
            window.history.pushState(null, "", window.location.href)
        };

        window.history.pushState(null, "", window.location.href)
        window.addEventListener("popstate", handlePopState)

        return () => {
            window.removeEventListener("popstate", handlePopState)
        };
    }, [enabled])
}
