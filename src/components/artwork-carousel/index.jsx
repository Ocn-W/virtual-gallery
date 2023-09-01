import React from "react";
import BibAccAngels from "../paintings/BiblicallyAccurateAngels";
import ThreeRs from "../paintings/Race,Races,Racer";
import Go from "../paintings/Go!";
import Essay from "../paintings/Essay";
import EndGame from "../paintings/EndGame";

export default function ArtworkCarousel() {
    return (
        <>
            <section className="carousel">
                <BibAccAngels/>
                <ThreeRs/>
                <Go/>
                <Essay/>
                <EndGame/>
            </section>
        </>
    )
};