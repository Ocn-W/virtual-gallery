import { useState } from "react";
import { artworkImages } from "../paintings/artwork-images";
import BibAccAngels from "../paintings/BiblicallyAccurateAngels";
import ThreeRs from "../paintings/Race,Races,Racer";
import Go from "../paintings/Go!";
import Essay from "../paintings/Essay";
import EndGame from "../paintings/EndGame";

export default function ArtworkViewer() {
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    async function selectArtwork(selectedArtwork) {
        switch(selectedArtwork){
            case '0': return <BibAccAngels/>;
            case '1': return <EndGame/>;
            case '2': return <Go/>;
            case '3': return <Essay/>;
            case '4': return <ThreeRs/>;
            default: return <p>Select a photo to view an artwork!</p>;
        }
    }

    return (
        <>
        <div className="artview-container">
            <section className="art-selection">
                <div className="art-image">
                    {artworkImages.map((img,index) => (
                        <img src={img} key={index} onClick={() => setSelectedArtwork(index)}/>
                    ))}
                </div>   
            </section>
            <section className="art-view">
                <div className="artwork">
                    {selectedArtwork !== null ? selectArtwork(selectedArtwork) :
                    <p>Select a photo to view an artwork!</p>
                    }
                </div>
            </section>
        </div>
        </>
    )
};