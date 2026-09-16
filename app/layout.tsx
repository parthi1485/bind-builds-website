import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata={title:'Bind Builds | Architect-Led Construction Chennai',description:'Bind Builds brings architecture, engineering and execution together for thoughtful construction in Chennai.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}