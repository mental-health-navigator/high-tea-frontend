export const runtime = 'edge';

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <a
          href="/"
          className="text-primary hover:underline"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
