use crate::components::header::Header;
use crate::components::lib::input::Input;
use crate::components::upload_resume::UploadResume;
use leptos::{component, view, IntoView};

#[component]
pub fn Jobs() -> impl IntoView {
    view! {
        <Header />
        <Input
            id="id".to_string()
            label="label".to_string()
        />
        <UploadResume />
    }
}
