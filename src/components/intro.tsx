import Bunny from "@/components/bunny";
import TextLink from "@/components/text/text-link";

export default function Intro() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20 text-center">
        <p className="max-w-[88ch]">
          <span className="text-primary">Welcome!</span> I&apos;m a software
          engineering manager in Cambridge, MA. I currently work at{" "}
          <TextLink href="https://www.nuna.com">Nuna</TextLink> where I lead a
          full-stack engineering team. Check in to see my{" "}
          <TextLink href="/projects">coding adventures</TextLink>, thoughts on{" "}
          <TextLink href="/posts">management</TextLink>, and{" "}
          <TextLink href="/posts">personal milestones</TextLink>.
        </p>
      </div>
      <Bunny />
    </>
  );
}