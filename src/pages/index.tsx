import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import ProjectCarousel from "@/components/ProjectCarousel";

const prefix = "/public/assets/"


const aboutStats = [
  { label: "Years of experience", value: "10+" },
  { label: "Years with Luau", value: "4+" },
  { label: "Technologies Mastered", value: "12+" },
];

const supercut = [
  {
    title: "Supercut",
    tooltip: "Download video!",
    image: prefix + "supercut.webm",
    href: "https://www.roblox.com/games/18758755773/Threadville-OUT-NOW"
  }
]

const presentationcut = [
  {
    title: "PresentationCut",
    tooltip: "Go to presentation!",
    image: prefix + "presentation_cut.webm",
    href: "https://www.youtube.com/watch?v=OyuQPOQxck8",
    description: "Watch the presentation on YouTube!",
  }
]

const presentationpieces = [
  {
    title: "Orca",
    tooltip: "Download video!",
    image: prefix + "openworlds/orca.webm",
    href: "https://www.youtube.com/watch?v=OyuQPOQxck8",
    description: "Optimal Reciprocal Collision Avoidance (ORCA)",
  },
  {
    title: "Crowd Data",
    tooltip: "Download video!",
    image: prefix + "openworlds/crowddata.webm",
    href: "https://www.youtube.com/watch?v=OyuQPOQxck8",
    description: "Comparing to real life data for possible finetuning.",
  },
  {
    title: "Orca Cross",
    tooltip: "Download video!",
    image: prefix + "openworlds/3dpathfinding.webm",
    href: "https://www.youtube.com/watch?v=OyuQPOQxck8",
    description: "3d pathfinding for flying NPCs.",
  },
  {
    title: "Orca Cross",
    tooltip: "Download video!",
    image: prefix + "openworlds/orcacross.webm",
    href: "https://www.youtube.com/watch?v=OyuQPOQxck8",
    description: "ORCA crowds crossing paths simulation.",
  }
]

const threadville = [
  {
    title: "Game",
    description: "Try it out on Roblox!",
    image: prefix + "shed_kick.webm",
    href: "https://www.roblox.com/games/18758755773/Threadville-OUT-NOW"
  },
  {
    title: "Trailer",
    description: "Watch the first trailer!",
    image: prefix + "threadville_trailer.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  }
]

const harpisles = [
  {
    title: "Movement",
    //description: "Creature movement and foliage simulation",
    tooltip: "Download video!",
    image: prefix + "harpisles/terrestrialdemo.webm",
    href: "https://www.roblox.com/games/18758755773/Threadville-OUT-NOW"
  },
  {
    title: "UI",
    tooltip: "Download video!",
    //description: "Spawning, HUD and inventory UI",
    image: prefix + "harpisles/harpui.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  }
]

const tps = [
  {
    title: "Jumping",
    tooltip: "Download video!",
    //description: "Jumping",
    image: prefix + "tps/jumping.webm",
    href: "https://www.roblox.com/games/18758755773/Threadville-OUT-NOW"
  },
  {
    title: "Splatter",
    tooltip: "Download video!",
    //description: "Shooting and splatter effects",
    image: prefix + "tps/splatter.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Timer",
    tooltip: "Download video!",
    description: "Game timer",
    image: prefix + "tps/timer.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Pivoting",
    tooltip: "Download video!",
    description: "Dynamic pivoting foot motion",
    image: prefix + "tps/pivot.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Covering",
    tooltip: "Download video!",
    description: "Automatic covering (calculated based on geometry)",
    image: prefix + "tps/cover.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  }
]

const misc = [
  {
    title: "Skill Tree",
    tooltip: "Download video!",
    description: "Skill tree UI",
    image: prefix + "skill_tree.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Scifi Suit Construction",
    tooltip: "Download video!",
    description: "Scifi Suit Construction",
    image: prefix + "scifisuitconstruction.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Killcam Prototype",
    tooltip: "Download video!",
    description: "Killcam Prototype",
    image: prefix + "killcamprototype.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Procedural House Construction",
    tooltip: "Download video!",
    description: "Procedural House Construction",
    image: prefix + "medeivalhouseconstruction2.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Planetary HUD",
    tooltip: "Download video!",
    description: "Planetary HUD",
    image: prefix + "planetaryhud.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Animated Mouth Articulation",
    tooltip: "Download video!",
    description: "Animated Mouth Articulation",
    image: prefix + "moutharticulation.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Procedural Wendigo Arms",
    tooltip: "Download video!",
    description: "Procedural Wendigo Arms",
    image: prefix + "wendigoarms.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Procedural Tool Holding",
    tooltip: "Download video!",
    description: "Procedural Tool Holding",
    image: prefix + "tools.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Hair Dynamics",
    tooltip: "Download video!",
    description: "Hair Dynamics",
    image: prefix + "hairdynamics.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  },
  {
    title: "Animated Pet Face",
    tooltip: "Download video!",
    description: "Animated Pet Face",
    image: prefix + "animatedpetface.webm",
    href: "https://www.youtube.com/watch?v=X6ZASHzg9w0"
  }
]

const services = [
  {
    service: "Languages",
    description:
      "Luau, C, C++, C#, Java, Python, JavaScript, HTML/CSS, SQL, PHP.",
    icon: Frame,
  },
  {
    service: "Technologies and Platforms",
    description:
      "Rojo, Visual Studio, Git, Bash, Next, React, LaTeX, IntelliJ, Microsoft Office Suite, Adobe Suite, and more.",
    icon: Code2,
  },
  {
    service: "Frontend Development",
    description:
      "Experienced in responsive UI/UX design and animation, and cross-platform support for mobile and consoles. Additional graphic design and 3D modeling experience for engineering support.",
    icon: Code2,
  },
  {
    service: "Backend Development",
    description:
      "Experienced in backend development for Roblox games, including data storage, data handling, API integration, streaming services, and replication.",
    icon: MonitorSmartphone,
  },
  {
    service: "Deployment",
    description:
      "Experienced in hosting QA sessions, debugging under pressure and time constraints, hotfixing, LiveOps and player engagement strategies.",
    icon: Eye,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="relative mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-center"
        >
          {/* Spline Background */}
          <div
            data-scroll
            data-scroll-speed="-.01"
            className={styles["spline-background"]}
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene={prefix + "skeletal.splinecode"} />
            </Suspense>
          </div>

          {/* Content */}
          <div className="flex items-start justify-center h-screen pt-20">
            <div className={`${styles.intro} relative z-10`}>
              <div
                data-scroll
                data-scroll-direction="horizontal"
                data-scroll-speed=".09"
                className="flex flex-row items-center space-x-1.5"
              >
                <span className={styles.pill}>Full Stack Developer</span>
                <span className={styles.pill}>3D Modeller</span>
                <span className={styles.pill}>UI/UX Designer</span>
              </div>
              <div>
                <h1
                  data-scroll
                  data-scroll-enable-touch-speed
                  data-scroll-speed=".06"
                  data-scroll-direction="horizontal"
                >
                  <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                    Hello, I&apos;m
                    <br />
                  </span>
                  <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                    SkeletalReality.
                  </span>
                </h1>
                <p
                  data-scroll
                  data-scroll-enable-touch-speed
                  data-scroll-speed=".06"
                  className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
                >
                  An experienced programmer on the Roblox platform with a passion for
                  bringing cutting edge experiences to the platform.
                </p>
              </div>
              <span
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="flex flex-row items-center space-x-1.5 pt-6"
              >
                <Link href="mailto:skeletalreality4x5@gmail.com" passHref>
                  <Button>
                    Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => scrollTo(document.querySelector("#about"))}
                >
                  Learn more
                </Button>
              </span>

            </div>
          </div>
          
          <div
            className={cn(
              styles.scroll,
              isScrolled && styles["scroll--hidden"],
            )}
          >
            Scroll to discover{" "}
            <TriangleDownIcon className="mt-1 animate-bounce" />
          </div>
        </section>

        {/* About Roblox */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex w-full flex-col items-center justify-center space-y-10"
          >
            <div className="flex w-full flex-col items-center space-y-8">
              <div className="flex w-full justify-center">
                {/* Threadville Carousel */}
                <div className="relative w-full max-w-4xl [&>div]:mt-0">
                  <div className="flex justify-center">
                    <ProjectCarousel
                      items={supercut}
                      setApi={setCarouselApi}
                      className="w-full max-w-2xl"
                      mdBasis="1/"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center px-4">
                <h2 className="py-16 pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px] max-w-4xl text-center">
                  I&apos;m an experienced full-stack developer proficient in{" "}
                  <Link
                    href="create.roblox.com"
                    target="_blank"
                    className="underline"
                  >
                    Roblox Studio
                  </Link>{""}
                  . I work to bring cutting edge technology to several genres of
                  Roblox games and try to accomplish what has not yet been achieved
                  on the platform. I have advanced proficiency in programming, UI/UX design,
                  and mathematics, as well as collaborative skills, to bring the technical
                  features that are needed and more.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Me */}
        <section id="aboutpersonal" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex w-full flex-col items-center justify-center space-y-10"
          >
            <div className="flex max-w-6xl mx-auto flex-row items-center space-y-2">
              <div className="flex-shrink-0">
                {/* Image */}
                <Image
                  src={prefix + "aboutme.png"}
                  alt="aboutme"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                  priority
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Me at Roblox Developers Conference 2024! :D
                </p>
              </div>
              <div className="flex-1 px-6">
                <h2 className="py-16 pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[35px] max-w-4xl text-left">
                  I have always had a deep interest in computer science and game development! I am nearing graduation from the{" "}
                  <Link
                    href="https://www.cs.washington.edu/"
                    target="_blank"
                    className="underline"
                  >
                    Paul Allen School in University of Washington, Seattle
                  </Link>{""}
                  , and I am now looking for freelance or full-time work (40hrs/week).
                  I am motivated to bring my skills to the table and help you achieve goals
                  expressed by teams on the Roblox platform.
                </h2>
              </div>
            </div>
            <div className="flex-shrink-0">
                {/* Image */}
                <Image
                  src={prefix + "allen-school-logo.jpg"}
                  alt="aboutme"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-1">
              <div
                key="allen-school"
                className="col-span-2 xl:col-span-1 flex flex-col items-center text-center"
              >
                <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-4xl">
                  B.S. Computer Science
                </span>
                <span className="tracking-tight text-muted-foreground xl:text-lg">
                  Expected Graduation: June 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Threadville */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Favorite Project
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Threadville is one of my games!
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I worked alongside an incredibly talented team of three to bring this story game to life. Threadville tells a linear story that brings unique characters and a wonderful IP to life.
            </p>

            {/* Threadville Carousel */}
            <ProjectCarousel
              items={threadville}
              setApi={setCarouselApi}
            />
          </div>
        </section>

        {/* Presentation */}
        <section id="threadville" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Presentation
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Lifelike Open Worlds at RDC
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                I did a talk at Roblox Developers Conference 2024 about how to use industry standard algorithms for NPC AIs to bring lifelike open worlds to Roblox.
                <br />
                <br />
                I implemented algorithms used by games like Horizon Zero Dawn to have quickly reactive and realistic avoidance of dynamic obstacles. One such algorithm is Optimal Reciprocal Collision Avoidance (ORCA),
                which allows NPCs to calculate the best direction to move to reduce crowd congestion without central coordination. The NPCs take both position and velocity into account to avoid collisions, allowing for
                realistic avoidance that we would see in real life between humans.
                <br />
                <br />
                This presentation also features a demonstration of 3d pathfinding by generating a navmesh from the world and having NPCs perform an A* algorithm to find the shortest path.
                Several optimization are made to have this perform well even with 50 flying NPCs in the world. For example, the navmesh is divided into chunks, the A* heuristic is limited to certain segments, and the closest
                point on the navmesh to the NPC in world space is found using a kd-tree.
                <br />
                <br />
                There is a lot of complexity in data structures and algorithms, but the results ultimately lead to very enjoyable and realistic NPCs, from ones that can avoid crowd congestion to one that can fly through caves
                and complex terrain to get to their destination.
            </p>
          <div className="flex w-full flex-col items-center space-y-8">
            <div className="flex w-full justify-center">
              {/* Presentation Cut Carousel */}
              <div className="relative w-full max-w-4xl [&>div]:mt-0">
                <div className="flex justify-center">
                  <ProjectCarousel
                    items={presentationcut}
                    setApi={setCarouselApi}
                    className="w-full max-w-2xl"
                    mdBasis="1/"
                  />
                </div>
              </div>
            </div>
          </div>

            {/* Presentation Pieces Carousel */}
            <ProjectCarousel
              items={presentationpieces}
              setApi={setCarouselApi}
              mdBasis="1/2"
              showCounter={true}
            />
          </div>
        </section>

        {/* Harp Isles */}
        <section id="harpisles" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Harp Isles
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Harp Isles
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                Harp Isles is a scifi creature survival game that features procdural movement of creature rigs and some UI that I definitely wanted to go all out on.
            </p>
          <div className="flex w-full flex-col items-center space-y-8">
            <div className="flex w-full justify-center">
              {/* Harp Isles Carousel */}
              <div className="relative w-full max-w-6xl [&>div]:mt-0">
                <div className="flex justify-center">
                  <ProjectCarousel
                    items={harpisles}
                    setApi={setCarouselApi}
                    className="w-full max-w-8xl"
                    mdBasis="1/2"
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* TPS System */}
        <section id="harpisles" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ TPS System
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              TPS System
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                A third-person shooter system using 100% procedural animation.
            </p>
          <div className="flex w-full flex-col items-center space-y-8">
            <div className="flex w-full justify-center">
              {/* TPS System Carousel */}
              <div className="relative w-full max-w-6xl [&>div]:mt-0">
                <div className="flex justify-center">
                  <ProjectCarousel
                    items={tps}
                    setApi={setCarouselApi}
                    className="w-full max-w-8xl"
                    mdBasis="1/2"
                    showCounter={true}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* More Projects */}
        <section id="harpisles" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ More Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              More Projects
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                A bunch of other things I've worked on!
            </p>
          <div className="flex w-full flex-col items-center space-y-8">
            <div className="flex w-full justify-center">
              {/* TPS System Carousel */}
              <div className="relative w-full max-w-6xl [&>div]:mt-0">
                <div className="flex justify-center">
                  <ProjectCarousel
                    items={misc}
                    setApi={setCarouselApi}
                    className="w-full max-w-8xl"
                    mdBasis="1/2"
                    showCounter={true}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  More about me!
                  <br />
                  {/* <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span> */}
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are my qualifications in more detail, from platforms and technologies to my skills and experience.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently available for freelance work and open to
              discussing new projects.
            </p>
            <Link href="mailto:skeletalreality4x5@gmail.com" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
