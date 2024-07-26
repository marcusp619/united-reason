use leptos::{component, view, IntoView};
use crate::components::lib::button::{ButtonLink, Color};
use crate::components::container::Container;

#[component]
pub fn Header() -> impl IntoView {
    view! {
    <header class="py-10">
        <Container>
            <nav class="relative z-50 flex justify-between">
                <div class="flex items-center md:gap-x-12">
                    <a href="/" class="flex items-center">
                        // <!-- <img src="#" alt="logo" class="h-10 w-auto" /> -->
                        <span class="ml-2 text-2xl font-bold text-gray-800">
                            United 
                            <span class="text-2xl font-bold text-blue-600">Reason</span>
                        </span>
                    </a>
                    <div class="hidden md:flex md:gap-x-6">
                        <a href="#Articles" class="ml-12 text-gray-600 hover:text-gray-800">Articles</a>
                        <a href="/jobs" class="ml-12 text-gray-600 hover:text-gray-800">Find a job</a>
                        <a href="#About" class="ml-12 text-gray-600 hover:text-gray-800">About</a>
                    </div>
                </div>
                <div class="flex items-center gap-x-5 md:gap-x-8">
                    <div class="hidden md:block">
                        <a href="/login"> Sign in</a>
                    </div>
                    <ButtonLink href=String::from("/register") color=Color::Blue>
                        <span>
                            Get started <span class="hidden lg:inline">today</span>
                        </span>
                    </ButtonLink>
                </div>
            </nav>
         </Container>
    </header>
    }
}
