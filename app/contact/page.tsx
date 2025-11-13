export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-(--color-background) text-center px-6">
      <h1 className="text-4xl font-bold text-(--color-primary)] mb-4">
        Contact Us
      </h1>
      <p className="max-w-2xl text-(--color-secondary-text)">
        Have questions or want to collaborate? Reach us at
        <span className="font-semibold text-(--color-primary)]"> support@handcraftedhaven.com</span>.
      </p>
    </div>
  );
}
