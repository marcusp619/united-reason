use std::collections::HashMap;

use leptos::{component, view, IntoView};

#[derive(Clone)]
struct Feature {
    name: &'static str,
    summary: &'static str,
    description: &'static str,
    image: &'static str,
}

static FEATURES: [Feature; 3] = [
    Feature {
        name: "Reporting",
        summary: "Stay on top of things with always up-to-date reporting features.",
        description:
          "We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity.",
        image: "/images/screenshot/profit-loss.png"
    },
    Feature {
        name: "Inventory",
        summary:
        "Never lose track of what’s in stock with accurate inventory tracking.",
        description:
        "We don’t offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure.",
        image: "/images/screenshot/inventory.png",
    },
    Feature {
        name: "Contacts",
        summary:
        "Organize all of your contacts, service providers, and invoices in one place.",
        description:
        "This also isn’t actually a feature, it’s just some friendly advice. We definitely recommend that you do this, you’ll feel really organized and professional.",
        image: "/images/screenshot/contacts.png",
    }
];

#[component]
fn Feature(
    feature: Feature,
    is_active: bool,
    class_name: Option<String>,
    #[prop(optional)]
    additional_props: HashMap<String, String>,
) -> impl IntoView {
    let mut class_list = vec![
        class_name,
        if !is_active {
            Some("opacity-75 hover:opacity-100".into())
        } else {
            Some("".into())
        },
    ];

    let additional_props_to_str = additional_props
        .iter()
        .map(|(k, v)| format!("{}=\"{}\"", k, v))
        .collect::<Vec<_>>()
        .join(" ");

    view! {
        <div class={class_list.join(" ")} additional_props={additional_props_to_str}>
            <div class={if is_active { "w-9 rounded-lg bg-blue-600" } else { "w-9 rounded-lg bg-slate-500" }}>
                <svg aria-hidden="true" class="h-9 w-9" fill="none">
                    // Assume `feature.icon` is a function that returns a `View`
                    // {(feature.icon)()}
                </svg>
            </div>
            <h3 class={if is_active { "mt-6 text-sm font-medium text-blue-600" } else { "mt-6 text-sm font-medium text-slate-600" }}>
                {feature.name}
            </h3>
            <p class="mt-2 font-display text-xl text-slate-900">
                {feature.summary}
            </p>
            <p class="mt-4 text-sm text-slate-600">
                {feature.description}
            </p>
        </div>
    }
}

#[component]
fn FeaturesMobile() -> impl IntoView {
    view! {
        <div class="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
            {FEATURES.iter().map(|feature| {
                view! {
                    <div key={feature.summary.clone()}>
                        <Feature
                            feature=feature.clone()                            
                            is_active=true
                            class_name=Some("mx-auto max-w-2xl".into())
                        />
                        <div class="relative mt-10 pb-10">
                            <div class="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
                            <div class="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                                <img class="w-full" src={feature.image} alt="" sizes="52.75rem" />
                            </div>
                        </div>
                    </div>
                }
            }).collect::<Vec<_>>()}
        </div>
    }
}