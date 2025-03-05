import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
/* falta el componente de botones de embla */
/* import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./vecindario-carousel-arrow-buttons"; */

type PropType = {
  slides?: number[];
  options?: EmblaOptionsType;
};

const videos = [
  "/videos/barrio/an-vecindario-1.mp4",
  "/videos/barrio/an-vecindario-2.mp4",
  "/videos/barrio/an-vecindario-3.mp4",
];

const VecindarioCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

  /* const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi); */

  // Dentro de tu componente VecindarioCarousel, después de obtener emblaApi:
  useEffect(() => {
    if (!emblaApi) return;

    const playActiveVideo = () => {
      // Seleccionamos todos los slides
      const slides = document.querySelectorAll(".embla__slide");
      slides.forEach((slide, index) => {
        const videoEl = slide.querySelector("video");
        if (!videoEl) return;

        // Reproducimos el video del slide activo y pausamos los demás
        if (emblaApi.selectedScrollSnap() === index) {
          videoEl.play().catch((err) => {
            // A veces la reproducción automática puede fallar si el navegador bloquea autoplay.
            console.error("Error reproduciendo video:", err);
          });
        } else {
          videoEl.pause();
        }
      });
    };

    // Ejecutamos la función al inicio y cada vez que se selecciona un slide
    playActiveVideo();
    emblaApi.on("select", playActiveVideo);

    return () => {
      emblaApi.off("select", playActiveVideo);
    };
  }, [emblaApi]);

  return (
    <div className="embla w-full max-w-full lg:max-w-3xl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {videos.map((video, index) => (
            <div className="embla__slide" key={index}>
              <video autoPlay muted playsInline className="embla__slide__img">
                <source src={video} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          {/* <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} /> */}
          {/* <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} /> */}
        </div>
      </div>
    </div>
  );
};

export default VecindarioCarousel;
