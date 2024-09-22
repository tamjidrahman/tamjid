import Bunny from "@/components/bunny";

export default function Intro() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20 text-center">
        <p className="max-w-[88ch]">
          <span className="text-primary">Welcome!</span> I&apos;m a software
          engineering manager in Cambridge, MA. I currently work at{" "}
          <a className="text-accent" href="https://www.nuna.com">
            Nuna
          </a>{" "}
          where I lead a full-stack engineering team. I&apos;ll use this site to
          post my thoughts on coding adventures, management, and personal
          milestones.
        </p>
      </div>
      <Bunny />
    </>
  );
}
