use super::label::Label;
use leptos::{component, logging::log, view, IntoView};

#[component]
pub fn Input(
    id: String,
    #[prop(optional)] label: Option<String>,
    #[prop(optional)] class: Option<String>,
) -> impl IntoView {
    view! {
        <div class=class>
          {label.map(|label| view! { <Label id=id.clone()>{label}</Label> })}
          <input
              id=id
              type="text"
              class="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
    }
}
