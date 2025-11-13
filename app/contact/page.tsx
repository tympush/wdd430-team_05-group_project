export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ backgroundColor: "var(--color-light)", color: "var(--color-dark)" }}>
      <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
        Contact Us
      </h1>
      <p className="max-w-2xl" style={{ color: "var(--color-dark)" }}>
        Have questions or want to collaborate? Reach us at
        <span className="font-semibold" style={{ color: "var(--color-primary)" }}> support@handcraftedhaven.com</span>.
      </p>
    </div>
  );
}
