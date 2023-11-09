import { Badge } from "./ui/badge";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto mb-20 max-w-[30rem] px-4 text-center text-muted-foreground sm:max-w-[50rem]">
      <div className="mb-2 flex items-center justify-center gap-4 text-xs">
        <div>
          &copy; {year} Created by{" "}
          <a
            href="https://github.com/JAHMD"
            target="_blank"
            className="font-semibold text-muted-foreground transition-colors hover:text-white"
          >
            Ahmed Wael
          </a>
          .
        </div>
        <Badge variant="secondary">v1.3.0</Badge>
      </div>
      <p className="text-xs leading-6">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router), TypeScript, Prisma, Tailwind CSS and
        Vercel hosting.
      </p>
    </footer>
  );
}
