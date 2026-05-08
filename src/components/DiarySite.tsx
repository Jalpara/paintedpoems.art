"use client";

import { useMemo, useState } from "react";
import type { DiaryDay, DiaryImage, Painting } from "@/data/diary";

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="chip">{children}</span>;
}

function ImageFrame({ image, priority = false }: { image: DiaryImage; priority?: boolean }) {
  return (
    <figure className="imageFrame">
      <img src={image.src} alt={image.alt} loading={priority ? "eager" : "lazy"} />
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function ZoomableImageFrame({
  image,
  onZoom,
  priority = false
}: {
  image: DiaryImage;
  onZoom: (image: DiaryImage) => void;
  priority?: boolean;
}) {
  return (
    <button className="zoomableImageFrame" type="button" onClick={() => onZoom(image)} aria-label={`Zoom ${image.alt}`}>
      <ImageFrame image={image} priority={priority} />
    </button>
  );
}

function PaintingCard({ painting, onZoom }: { painting: Painting; onZoom?: (painting: Painting) => void }) {
  return (
    <article className="paintingCard">
      <button
        className="paintingImage"
        type="button"
        onClick={() => onZoom?.(painting)}
        aria-label={`Zoom ${painting.title}`}
      >
        <img src={painting.image.src} alt={painting.image.alt} loading="lazy" />
      </button>
      <div>
        <p className="stamp">{painting.year}</p>
        <h3>{painting.title}</h3>
        <p>{painting.medium}</p>
      </div>
    </article>
  );
}

function PaintingZoomModal({ painting, onClose }: { painting: Painting; onClose: () => void }) {
  const [lensPosition, setLensPosition] = useState({ x: 50, y: 50 });

  return (
    <div className="zoomOverlay" role="dialog" aria-modal="true" aria-label={painting.title}>
      <button className="zoomBackdrop" type="button" onClick={onClose} aria-label="Close" />
      <div className="zoomFrame">
        <button className="zoomClose" type="button" onClick={onClose}>
          Close
        </button>
        <div
          className="zoomPaintingPane"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            setLensPosition({
              x: ((event.clientX - rect.left) / rect.width) * 100,
              y: ((event.clientY - rect.top) / rect.height) * 100
            });
          }}
          style={
            {
              "--lens-x": `${lensPosition.x}%`,
              "--lens-y": `${lensPosition.y}%`,
              "--zoom-image": `url("${painting.image.src}")`
            } as React.CSSProperties
          }
        >
          <img src={painting.image.src} alt={painting.image.alt} />
        </div>
        <aside className="poemPane">
          <p className="stamp">Poem Pairing</p>
          <h3>{painting.title}</h3>
          <p>
            Poem text will appear here. This panel is prepared for the verse, translation, or curatorial note that
            belongs with this painting.
          </p>
          <div className="poemRule" aria-hidden="true" />
          <p className="poemMeta">{painting.medium}</p>
        </aside>
      </div>
    </div>
  );
}

function ImageZoomModal({ image, onClose }: { image: DiaryImage; onClose: () => void }) {
  return (
    <div className="zoomOverlay" role="dialog" aria-modal="true" aria-label={image.caption}>
      <button className="zoomBackdrop" type="button" onClick={onClose} aria-label="Close" />
      <div className="pressZoomFrame">
        <button className="zoomClose" type="button" onClick={onClose}>
          Close
        </button>
        <img src={image.src} alt={image.alt} />
        <p>{image.caption}</p>
      </div>
    </div>
  );
}

function DayPanel({ day, onPaintingZoom }: { day: DiaryDay; onPaintingZoom: (painting: Painting) => void }) {
  return (
    <section className="dayPanel" id={`day-${day.day}`}>
      <div className="dayCopy">
        <div className="dayHeader">
          <p className="stamp">{day.date} / {day.location}</p>
          <h2>{day.title}</h2>
          <p className="lede">{day.summary}</p>
        </div>
        <div className="storyCard">
          <div className="storyStack">
            {day.story.map((paragraph, index) => (
              <p key={`${day.day}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="metadataGrid">
          <div>
            <h3>People</h3>
            <div className="chipRow">{day.people.map((person) => <Chip key={person}>{person}</Chip>)}</div>
          </div>
          <div>
            <h3>Places</h3>
            <div className="chipRow">{day.places.map((place) => <Chip key={place}>{place}</Chip>)}</div>
          </div>
          <div>
            <h3>Things Done</h3>
            <div className="chipRow">{day.activities.map((activity) => <Chip key={activity}>{activity}</Chip>)}</div>
          </div>
        </div>
      </div>

      <div className="dayVisuals">
        <div className="imageGallery">
          {day.images.map((image, index) => (
            <ImageFrame image={image} priority={day.day === 1 && index === 0} key={image.src} />
          ))}
        </div>
        {day.paintings.length > 0 ? (
          <div className="miniPaintings">
            {day.paintings.map((painting) => (
              <PaintingCard painting={painting} key={painting.image.src} onZoom={onPaintingZoom} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

type DiarySiteProps = {
  diaryDays: DiaryDay[];
  featuredPaintings: Painting[];
  posterImages: DiaryImage[];
  pressImages: DiaryImage[];
  pressVideos: string[];
};

export default function DiarySite({
  diaryDays,
  featuredPaintings,
  posterImages,
  pressImages,
  pressVideos
}: DiarySiteProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [zoomedPainting, setZoomedPainting] = useState<Painting | null>(null);
  const [zoomedPressImage, setZoomedPressImage] = useState<DiaryImage | null>(null);
  const activeDay = useMemo(
    () => diaryDays.find((entry) => entry.day === selectedDay) ?? diaryDays[0],
    [diaryDays, selectedDay]
  );

  return (
    <main>
      <section className="heroShell">
        <div className="hero">
          <div className="heroText">
            <p className="stamp">Poemas Pintados / Omkar Bhatkar</p>
            <h1>Painted Poems</h1>
            <p className="artistLine">Omkar Bhatkar</p>
            <p>
              Spanish mystical poems seen through Indian Gond visual language, carried across monastery, public
              exhibitions, travel notes, and paintings made in response to the journey.
            </p>
            <div className="heroActions">
              <a href="#paintings">View Paintings</a>
              <a href="#diary">Enter Diary</a>
            </div>
          </div>
          <figure className="heroPoster">
            <img src={posterImages[0]?.src ?? featuredPaintings[0]?.image.src} alt="Painted Poems exhibition poster" />
            <figcaption>Exhibition poster archive</figcaption>
          </figure>
        </div>
      </section>

      <section className="poemsSection">
        <div className="sectionHeader">
          <p className="stamp">Painted Poems</p>
          <h2>Los Místicos Españoles Through Gond Art</h2>
        </div>
        <div className="poemsGrid">
          <div className="poemsCopy">
            <p>
              The exhibition frames poems as painted worlds: lines become branches, saints become witnesses, rooms
              become inner landscapes, and the written word enters color through the visual grammar of Gond art from
              India.
            </p>
            <p>
              Across Ubeda, Fontiveros, and the later exhibition stops, the project carries Spanish mystical writing
              into a contemporary Indian hand, preserving both devotion and personal travel diary.
            </p>
          </div>
          <div className="posterRail" aria-label="Painted Poems posters">
            {posterImages.map((poster) => (
              <figure key={poster.src}>
                <img src={poster.src} alt={poster.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="paintingsSection" id="paintings">
        <div className="sectionHeader">
          <p className="stamp">Exhibited Works</p>
          <h2>Paintings As The Main Text</h2>
        </div>
        <div className="paintingsGrid">
          {featuredPaintings.map((painting) => (
            <PaintingCard painting={painting} key={painting.image.src} onZoom={setZoomedPainting} />
          ))}
        </div>
      </section>

      <section className="timelineSection" id="diary">
        <div className="sectionHeader">
          <p className="stamp">Interactive Timeline</p>
          <h2>Day By Day Across Spain</h2>
        </div>
        <div className="diaryLayout">
          <aside className="timeline" aria-label="Select a diary day">
            {diaryDays.map((day) => (
              <button
                className={day.day === selectedDay ? "timelineButton active" : "timelineButton"}
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                aria-pressed={day.day === selectedDay}
              >
                <span>{String(day.day).padStart(2, "0")}</span>
                <strong>{day.date}</strong>
                <em>{day.location}</em>
              </button>
            ))}
          </aside>
          <DayPanel day={activeDay} onPaintingZoom={setZoomedPainting} />
        </div>
      </section>

      {pressImages.length > 0 || pressVideos.length > 0 ? (
        <section className="pressSection">
          <div className="sectionHeader">
            <p className="stamp">Press And Public Record</p>
            <h2>The Public Life Of Painted Poems</h2>
          </div>
          <div className="pressFeature">
            <div className="pressCopy">
              <p>
                Newspaper clippings, public photographs, and video records sit alongside the diary so the exhibition is
                seen both as an intimate journey and as a public cultural event.
              </p>
              <div className="chipRow">
                <Chip>{pressImages.length} press images</Chip>
                <Chip>{pressVideos.length} video record</Chip>
                <Chip>Spain exhibition archive</Chip>
              </div>
            </div>
            <div className="pressMedia">
              {pressVideos.map((video) => (
                <video controls className="pressVideo" key={video}>
                  <source src={video} />
                </video>
              ))}
              <div className="pressGrid">
                {pressImages.map((image) => (
                  <ZoomableImageFrame image={image} onZoom={setZoomedPressImage} key={image.src} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {zoomedPainting ? <PaintingZoomModal painting={zoomedPainting} onClose={() => setZoomedPainting(null)} /> : null}
      {zoomedPressImage ? <ImageZoomModal image={zoomedPressImage} onClose={() => setZoomedPressImage(null)} /> : null}
    </main>
  );
}
