use crate::components::header::Header;
use crate::components::hero::Hero;
use crate::components::primary_features::PrimaryFeatures;
use leptos::{component, view, IntoView};

#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <Header />
        <Hero />
        <PrimaryFeatures />
    }
}
