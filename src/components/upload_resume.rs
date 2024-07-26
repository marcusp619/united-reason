use leptos::{component, ev, view, Callback, Children, IntoView};
use leptos_icons::*;

#[component]
pub fn UploadResume() -> impl IntoView {
    view! {
        <button class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex flex-col justify-items-center content-center text-center max-w-96">
          <Icon
              icon=icondata::HiDocumentTextOutlineLg
              class="mx-auto stroke-gray-400"
              width="48"
              height="48"
          />
          <h3 class="mt-2 text-sm font-semibold text-gray-900">No resume</h3>
          <p class="mt-1 text-sm text-gray-500">Click to attach a resume to your application</p>
        </button>
    }
}
