use leptos::{component, view, IntoView};
use crate::components::container::Container;
use std::collections::HashMap;

// Define the Feature interface to a struct
struct Feature {
    name: String,
    summary: String,
    description: String,
    image: String,
}

// Implement the Feature struct 
impl Feature {
    fn new(name: &str, summary: &str, description: &str, image: &str) -> Self {
        Self {
            name: name.to_string(),
            summary: summary.to_string(),
            description: description.to_string(),
            image: image.to_string(),
        }
    }
}

// Define a vector(aka an array) of features
static features: Vec<Feature> = vec![
    Feature::new(
        "Reporting",
        "Stay on top of things with always up-to-date reporting features.",
        "We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity.",
        "screenshotProfitLoss",
    ),
    Feature::new(
        "Inventory",
        "Never lose track of what’s in stock with accurate inventory tracking.",
        "We don’t offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure.",
        "screenshotInventory",
    ),
    Feature::new(
        "Contacts",
        "Organize all of your contacts, service providers, and invoices in one place.",
        "This also isn’t actually a feature, it’s just some friendly advice. We definitely recommend that you do this, you’ll feel really organized and professional.",
        "screenshotContacts",
    ),
]; 


 
struct SecondaryFeatureProps {
    feature: Feature,
    is_active: bool,
    class_name: String,
    // recreating reacts ...props
    attributes: HashMap<String, String>,
}


#[component]
pub fn SecondaryFeatures(props: SecondaryFeatureProps) -> impl IntoView {
    view! {
        <div
            class{format!("{} {}", props.class_name, !props.is_active && "opacity-75 hover:opacity-100")}
            {...props.attributes}
        >
            <div
                class={format!("w-9 rounded-lg {}", if props.is_active "bg-blue-600" else "bg-slate-500" )}
            >
                <svg
                    aria-hidden="true"
                    class="h-9 w-9"
                    fill="none"
                >
                    <props.feature.icon />
                </svg>
            </div>
            <h3
            class={format!("mt-6 text-sm font-medium", if props.is_active "text-blue-600" else "text-slate-500" )}
            >
                {props.feature.name}
            </h3>
            <p class=("mt-2 font-display text-xl text-slate-900")>
                {props.feature.summary}
            </p>
        </div>
    }
}

#[component]
pub fn FeaturesMobile() -> impl IntoView {
    view! {
        <div class=("-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden")>
            {features.into_iter().map(|feature| {
                view! {
                    <div>
                    </div>
                }
            }).collect_view()}
        </div>
    }
}