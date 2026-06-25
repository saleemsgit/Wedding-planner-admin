import VendorNavigation from "../../vendor-components/VendorNavigation";

const metrics = [
  { label: "Total Revenue", value: "LKR 328,000", detail: "+12.5% vs last month" },
  { label: "Active Bookings", value: "24", detail: "8 new this week" },
  { label: "Active Deals", value: "12", detail: "3 expiring soon" },
  { label: "Average Rating", value: "4.8", detail: "from 156 reviews" },
];

const recentBookings = [
  { customer: "Fatima & Ahmed", service: "Premium Wedding Hall", date: "15 Jun 2026", amount: "LKR 150,000", status: "Confirmed" },
  { customer: "Zainab & Hassan", service: "Mehndi Artist - Bridal Package", date: "20 Jun 2026", amount: "LKR 25,000", status: "Pending" },
  { customer: "Ayesha & Omar", service: "Wedding Photography", date: "01 Jul 2026", amount: "LKR 85,000", status: "Confirmed" },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <VendorNavigation />

      <div className="mx-auto max-w-350 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-[#2C5F2D]">Welcome back, Al-Noor Events</h1>
          <p className="text-gray-600">Here’s what’s happening with your business today.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="mt-1 text-sm text-gray-500">{metric.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold text-gray-900">Recent Bookings</h2>
              <p className="text-sm text-gray-500">Latest customer bookings and their status.</p>
            </div>

            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={`${booking.customer}-${booking.service}`} className="rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-900">{booking.customer}</p>
                      <p className="mt-1 text-sm text-gray-600">{booking.service}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${booking.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span>{booking.date}</span>
                    <span>{booking.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              <div className="mt-4 space-y-3">
                <a href="/vendor/deals" className="block rounded-2xl bg-[#2C5F2D] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1E4620]">Manage deals</a>
                <a href="/vendor/bookings" className="block rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50">Review bookings</a>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Performance Notes</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>Bookings are trending up compared with last week.</li>
                <li>Two deals expire in the next 7 days.</li>
                <li>Average review score remains above 4.5.</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
