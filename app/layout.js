export const metadata = {
    title: 'Key Generator',
    description: 'A Next.js app with the App Router',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    );
  }
  