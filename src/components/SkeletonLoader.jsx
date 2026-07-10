export function SkeletonBlock({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

export function QRPreviewSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4" aria-busy="true" aria-label="Generating QR code">
      <SkeletonBlock className="h-64 w-64" />
      <SkeletonBlock className="h-4 w-40" />
      <div className="flex gap-2">
        <SkeletonBlock className="h-9 w-24" />
        <SkeletonBlock className="h-9 w-24" />
        <SkeletonBlock className="h-9 w-24" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true">
      <SkeletonBlock className="h-4 w-24" />
      <SkeletonBlock className="h-10 w-full" />
      <SkeletonBlock className="h-4 w-24" />
      <SkeletonBlock className="h-10 w-full" />
    </div>
  );
}
