use leptos::{component, view, IntoView};
use crate::components::header::Header;
use crate::components::hero::Hero;
use crate::components::primary_features::PrimaryFeatures;

#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <Header />
        <Hero />
        <PrimaryFeatures />
    }
}
