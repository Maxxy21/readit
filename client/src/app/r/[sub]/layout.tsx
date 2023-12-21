import {Metadata} from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: 'Readit: The front page of the internet',
}


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className="font-ibmPlexSans" style={{backgroundColor: '#DAE0E6'}}>
        <Navbar/>
        {children}
        </body>

        </html>
    )
}
