use leptos::{component, view, IntoView};
use crate::components::header::Header;
use crate::components::upload_resume::UploadResume;
use crate::components::lib::input::Input;

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
