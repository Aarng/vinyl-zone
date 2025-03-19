import { BoxReveal } from "../magicui/box-reveal";


const Jumbotron = () => {
    return (
        <section className="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1545415631-c5afde011f5d?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-700 bg-blend-multiply">
            <div className="px-36 mx-auto max-w-screen-xl text-center py-24 lg:py-56 mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl whitespace-nowrap overflow-hidden">
                <BoxReveal >
                    {/* Ajuste para mantener el título en una sola línea */}
                    <h1 >
                        Bienvenido a The <span className="text-saffron">Vinyl</span> Zone
                    </h1>
                    <p className="mb-8 text-lg font-bold text-gray-300 lg:text-xl sm:justify-center px-16 py-12 lg:px-48">
                        Más que una tienda, una experiencia.
                    </p>
                </BoxReveal>
               
            </div>
        </section>
    );
};

export default Jumbotron;