import Image from "next/image";
import Link from "next/link";

const portfolioProjects = [
  {
    title: "Davidson van de ven",
    description: "Website for a freelance photographer",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/6812278a7aae3e1d54df024e_Photography-editorial-layout-min.webp",
    href: "#",
  },
  {
    title: "Strive",
    description: "Website design for a digital agency",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a34653643c9cb6a1cd_Editorial-layout-16apr-final.webp",
    href: "#",
  },
  {
    title: "Nord studio",
    description: "Premium creative agency website",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a32d29f327a2411cdc_Editorial-layout-16apr-final-2.webp",
    href: "#",
  },
  {
    title: "Verts",
    description: "Premium website for freelance photographer",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a21abff04c72d27109_Editorial-layout-16apr-final-11.webp",
    href: "#",
  },
  {
    title: "Architects",
    description: "Website design for architecture company",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a26701da9b84bab555_Editorial-layout-16apr-final-1.webp",
    href: "#",
  },
  {
    title: "Agency",
    description: "Projects section design for creative agency",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a2d73c1649cc89ef27_Editorial-layout-16apr-final-7.webp",
    href: "#",
  },
  {
    title: "Agency",
    description: "Premium editorial design for agency website",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a273d343f8be4e7938_Editorial-layout-16apr-final-5.webp",
    href: "#",
  },
  {
    title: "Agency",
    description: "Editorial design with a focus on storytelling",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a321438028d4c5e41b_Editorial-layout-16apr-final-4.webp",
    href: "#",
  },
];

type PortfolioProject = (typeof portfolioProjects)[0];

const ProjectCard = ({ project }: { project: PortfolioProject }) => (
  <Link href={project.href} className="flex flex-col group">
    <div className="overflow-hidden relative aspect-square rounded-lg">
      <Image
        src={project.imageUrl}
        alt={project.title || "Portfolio project image"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
    </div>
    <div className="flex items-center gap-2 mt-6 text-base font-normal">
      <p className="text-text-primary">{project.title}</p>
      <p className="text-text-primary">→</p>
      <p className="text-text-secondary">{project.description}</p>
    </div>
  </Link>
);

const Portfolio = () => {
  return (
    <section className="bg-background py-0">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;