use leptos::{component, view, IntoView};
use crate::components::container::Container;

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
let features: Vec<Feature> = vec![
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


#[component]
pub fn SecondaryFeatures() -> impl IntoView {
    view! {
        <div
            class=:
        >
        
        </div>
    }
}