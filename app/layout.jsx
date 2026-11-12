import "./globals.css";

export const metadata = {
  title: "Rayara Vilar — Frontend Developer",
  description: "Portfólio de Rayara Vilar. Frontend, design de interfaces e uma trajetória que começou na comunicação.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
