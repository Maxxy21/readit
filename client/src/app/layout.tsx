import type {Metadata} from 'next'
import {IBM_Plex_Sans} from 'next/font/google'
import '../styles/globals.css'
import '../styles/icons.css'

import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";


config.autoAddCss = false;


const ibmPlexSans = IBM_Plex_Sans(
    {
        weight: ['100', '200', '300', '400', '500', '600'],
        subsets: ['latin'],
        display: 'swap',
        variable: '--font-ibm-plex-sans',

    })


export const metadata: Metadata = {
    title: 'Readit: The front page of the internet',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${ibmPlexSans.variable}`}>
        <body className="font-ibmPlexSans" style={{backgroundColor: '#DAE0E6'}}>
        <>
            {children}
        </>
        </body>

        </html>
    )
}
