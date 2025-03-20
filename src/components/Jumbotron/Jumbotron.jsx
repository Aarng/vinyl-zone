import { BoxReveal } from "../magicui/box-reveal";

const Jumbotron = () => {
  return (
    <section
      className="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1545415631-c5afde011f5d?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-700 bg-blend-multiply"
    >
      {/* Container with responsive padding and max-width */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-36 mx-auto max-w-screen-xl text-center py-12 sm:py-16 lg:py-24 mb-4">
        {/* Title with responsive font size */}
        <BoxReveal>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white whitespace-nowrap overflow-hidden">
            Bienvenido a The <span className="text-saffron">Vinyl</span> Zone
          </h1>
          {/* Subtitle with responsive font size and padding */}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl font-bold text-gray-300 px-4 sm:px-8 md:px-16 lg:px-48">
            Más que una tienda, una experiencia.
          </p>
        </BoxReveal>
      </div>
    </section>
  );
};

export default Jumbotron;