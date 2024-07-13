use leptos::{component, view, Children, IntoView};

#[component]
pub fn Container(
    #[prop(optional)]
    class: String, 
    children: Children
    ) -> impl IntoView {
    view! {
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" class={class}>
            {children()}
        </div>
    }
}
