use leptos::{component, ev, view, Children, IntoView, Callback};
use leptos::ev::MouseEvent;
use leptos_icons::{Icon, HeroiconsFolderPlusSolid, HeroiconsPlusSolid};

#[component]
pub fn UploadResume() -> impl IntoView {
    view! {
        <div class="text-center">
          <Icon path=HeroiconsPlusSolid class="mx-auto h12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
          <div class="mt-6">
            <button type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <Icon path=HeroiconsPlusSolid class="-ml-0.5 mr-1.5 h-5 w-5" />
              New Project
            </button>
          </div>
        </div>
    }
}
