import "./globals.css";
import Navbar from "@/app/Components/Navbar";
import Providers from "@/app/Providers/ReduxProvider";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
