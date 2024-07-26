use leptos::{component, ev, view, Callback, Children, IntoView};

#[component]
pub fn Label(children: Children, id: String) -> impl IntoView {
    view! {
    <label
      for=id
      class="mb-3 block text-sm font-medium text-gray-700"
    >
      {children()}
    </label>
    }
}
