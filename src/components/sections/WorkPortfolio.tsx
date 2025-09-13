import Image from "next/image";
import Link from "next/link";

const portfolioProjects = [
  {
    title: "Davidson van de ven",
    description: "Website for a freelance photographer",
    imageUrl: "/projects/classcoverimage.webp",
    href: "#",
  },
  {
    title: "Strive",
    description: "Website design for a digital agency",
    imageUrl: "/projects/creacyphotographyimage.webp",
    href: "#",
  },
  {
    title: "Nord studio",
    description: "Premium creative agency website",
    imageUrl: "/projects/classcoverimage.webp",
    href: "#",
  },
  {
    title: "Verts",
    description: "Premium website for freelance photographer",
    imageUrl: "/projects/eliraurichimage.webp",
    href: "#",
  },
];

type PortfolioProject = typeof portfolioProjects[0];

const ProjectCard = ({ project }: { project: PortfolioProject }) => {
  return (
    <Link href={project.href} className="block group">
      <div className="relative w-full h-[80vh] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end p-8 md:p-12">
          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-2xl md:text-3xl font-medium">{project.title}</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const WorkPortfolio = () => {
  return (
    <section className="relative -mt-4">
      <div className="w-full -mb-4">
        {portfolioProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default WorkPortfolio;
