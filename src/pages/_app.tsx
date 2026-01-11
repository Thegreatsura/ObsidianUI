import 'nextra-theme-docs/style.css'
import '@/app/globals.css'
import type { AppProps } from 'next/app'
import { SidebarHoverIndicator } from '@/components/docs/sidebar-hover-indicator'
import { ClickSpark } from '@/components/ui/click-spark'

import { Analytics } from "@vercel/analytics/react"

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ClickSpark
                sparkColor={undefined}
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
            />
            <SidebarHoverIndicator />
            <Component {...pageProps} />
            <Analytics />
        </>
    )
}

