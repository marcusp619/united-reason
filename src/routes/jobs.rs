use leptos::{component, view, IntoView};
use crate::components::header::Header;
use crate::components::hero::Hero;
use crate::components::primary_features::PrimaryFeatures;
use crate::components::upload_resume::UploadResume;

#[component]
pub fn Jobs() -> impl IntoView {
    view! {
        <Header />
        JOBS!
        <UploadResume />
    }
}
