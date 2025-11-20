export default function DashboardPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-semibold" style={{ color: "var(--color-primary)" }}>
          Dashboard
        </h1>
        <p className="mt-4" style={{ color: "var(--color-dark)" }}>
          This is a placeholder dashboard. Only authenticated users should be able to reach this page.
        </p>
      </div>
    </main>
  );
}
