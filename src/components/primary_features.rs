use leptos::{component, view, IntoView};
use crate::components::container::Container;

#[derive(Debug)]
struct Feature {
    title: &'static str,
    description: &'static str,
    image: &'static str,
}

static FEATURES: &[Feature] = &[
    Feature {
        title: "Payroll",
        description: "Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.",
        image: "/images/screenshots/payroll.png",
    },
    Feature {
        title: "Claim expenses",
        description: "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
        image: "/images/screenshots/expenses.png",
    },
    Feature {
        title: "VAT handling",
        description: "We only sell our software to companies who don't deal with VAT at all, so technically we do all the VAT stuff they need.",
        image: "/images/screenshots/vat-returns.png",
    },
    Feature {
        title: "Reporting",
        description: "Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.",
        image: "/images/screenshots/reporting.png",
    }
];

#[component]
pub fn PrimaryFeatures() -> impl IntoView {
    view! {
    <section
      id="features"
      aria-label="Features for running your books"
      class="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32"
    >
      <img
        class="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src="/images/background-features.jpg"
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container class=String::from("relative")>
        <div class="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Everything you need to run your books.
          </h2>
          <p class="mt-6 text-lg tracking-tight text-blue-100">
            "Well everything you need if you aren't that picky about minor details like tax compliance."
          </p>
        </div>
      </Container>
    </section>
    }
}
