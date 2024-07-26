use leptos::{component, ev, view, Children, IntoView, Callback};
use leptos::ev::MouseEvent;

pub enum Variant {
    Solid,
    Outline
}

pub enum Color {
    Slate,
    White,
    Blue
}

fn get_variant_style(variant: &Variant) -> String {
    match variant {
        Variant::Solid => "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2".to_owned(),
        Variant::Outline => "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none".to_owned()
    }
}

fn get_color_style<'a, 'b>(color: &'a Color, variant: &'a Variant) -> &'b str {
    match variant {
        Variant::Solid => match color {
            Color::Slate => "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
            Color::Blue => "bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",
            Color::White => "bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white"
        },
        Variant::Outline => match color {
            Color::Slate => "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
            Color::White => "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
            // TODO: Outline + blue not included in template?
            Color::Blue => ""
        }
    }
}

// TODO: Not sure how to handle rendering either <a> or <button> in component
// this throws errors.
//
// Creating separate <ButtonLink /> for now
#[component]
pub fn Button(
    children: Children,
    #[prop(default = Variant::Solid)]
    variant: Variant,
    #[prop(default = Color::Slate)]
    color: Color,
    #[prop(into, optional)]
    on_click: Option<Callback<MouseEvent>>
) -> impl IntoView {
    let variantStyle = get_variant_style(&variant);
    let colorStyle = get_color_style(&color, &variant);

    view! {
        <button class={variantStyle + " " + colorStyle}>
            {children()}
        </button>
    }.optional_event(ev::click, on_click)
}


#[component]
pub fn ButtonLink(
    children: Children,
    #[prop(default = Variant::Solid)]
    variant: Variant,
    #[prop(default = Color::Slate)]
    color: Color,
    href: String,
    #[prop(into, optional)]
    on_click: Option<Callback<MouseEvent>>
) -> impl IntoView {
    let variantStyle = get_variant_style(&variant);
    let colorStyle = get_color_style(&color, &variant);

    view! {
        <a class={variantStyle + " " + colorStyle} href={href}>
            {children()}
        </a>
    }.optional_event(ev::click, on_click)
}
