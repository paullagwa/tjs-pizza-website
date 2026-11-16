import Photo from "@/components/Photo";

const photos: Array<{
  src: string;
  alt: string;
  ratio: "4/5" | "3/2";
  grade: "dough" | "baked";
  position?: string;
}> = [
  { src: "/images/TJs-Pizza-Products-9.jpg", alt: "A baker in an apron stretching pizza dough by hand", ratio: "4/5", grade: "dough" },
  { src: "/images/TJs-Pizza-Products-3.jpg", alt: "A margherita with fresh basil on a wooden board", ratio: "4/5", grade: "baked" },
  { src: "/images/TJs-Pizza-Products-14.jpg", alt: "A chef spreading tomato sauce in a spiral over a pizza base", ratio: "4/5", grade: "baked" },
  { src: "/images/TJs-Pizza-Products-13-oct.jpg", alt: "A ham and pineapple pizza coming out on a peel", ratio: "4/5", grade: "baked" },
  { src: "/images/TJs-Pizza-Products-4.jpg", alt: "A sliced pizza with a blistered crust on a stone bench", ratio: "3/2", grade: "baked" },
  { src: "/images/TJs-Pizza-Products-2.jpg", alt: "A golden calzone lifted off a tray with tongs", ratio: "3/2", grade: "baked" },
  { src: "/images/IMG_6172.jpg", alt: "A square ham and pineapple pizza cut into portions", ratio: "3/2", grade: "baked" },
  { src: "/images/TJs-Pizza-Products-7.jpg", alt: "A pizza travelling through a conveyor oven", ratio: "3/2", grade: "baked" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="border-t border-line py-24">
      <div className="container-site reveal">
        <p className="eyebrow">From the pass</p>
        <h2 className="h-section mt-3">What it turns into.</h2>
        <p className="lead mt-5 max-w-2xl text-warm/80">
          Wood-fired rounds, pub slabs, calzones and kids&rsquo; pizzas. Same
          dough, whatever your oven.
        </p>
        <ul className="reveal-stagger mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((p) => (
            <li key={p.src}>
              <Photo
                src={p.src}
                alt={p.alt}
                ratio={p.ratio}
                grade={p.grade}
                position={p.position}
                sizes="(min-width: 1024px) 18rem, 46vw"
                className="rounded-md"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
