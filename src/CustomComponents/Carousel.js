import { Blocks } from "@builder.io/sdk-react";
import { useState } from "react";

export const Carousel = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % props?.slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + props?.slides?.length) % props?.slides?.length);
    };

    return (
        <section className="h-[300px] bg-red-400">
            <button onClick={prevSlide}>Previous</button>
            <div className="carousel-slides">
                {props?.slides && props?.slides.map((slide, index) => {
                    console.log("slide", slide);
                    return (
                        <div key={index} style={{ display: index === currentSlide ? 'block' : 'none' }}>
                            <Blocks
                                parent={props.builderBlock?.id}
                                path={`component.options.slides.${index}.content`}
                                blocks={slide.children}
                            />
                        </div>
                    );
                })}
            </div>
            <button onClick={nextSlide}>Next</button>
        </section>
    );
};
