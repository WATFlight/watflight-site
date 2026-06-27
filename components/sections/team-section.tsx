import Image from "next/image";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { joinSteps, socialLinks, teamMembers } from "@/content/site-content";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  discord: DiscordIcon,
  github: Github,
};

function TeamMemberCard({ member }: { member: (typeof teamMembers)[number] }) {
  return (
    <article className="flex flex-col items-center rounded-2xl bg-muted/30 p-6 text-center">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <span className="text-3xl font-medium text-muted-foreground">
          {member.name.charAt(0)}
        </span>
      </div>
      <h3 className="text-lg font-medium text-foreground">{member.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{member.title}</p>
      <div className="mt-4 flex items-center gap-3">
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-muted p-2 transition-colors hover:bg-muted/80"
          aria-label={`${member.name}'s LinkedIn`}
        >
          <Linkedin className="h-4 w-4 text-foreground" />
        </a>
        <a
          href={`mailto:${member.email}`}
          className="rounded-full bg-muted p-2 transition-colors hover:bg-muted/80"
          aria-label={`Email ${member.name}`}
        >
          <Mail className="h-4 w-4 text-foreground" />
        </a>
      </div>
    </article>
  );
}

function JoinStepCard({ step }: { step: (typeof joinSteps)[number] }) {
  const emphasis = "emphasis" in step ? step.emphasis : undefined;
  const [before = step.description, after = ""] = emphasis
    ? step.description.split(emphasis)
    : [step.description, ""];

  return (
    <article className="bg-background p-8">
      <p className="mb-4 font-mono text-xs text-muted-foreground">{step.id}</p>
      <h3 className="mb-3 text-lg font-semibold text-foreground">{step.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {before}
        {emphasis ? <span className="font-medium text-foreground">{emphasis}</span> : null}
        {after}
      </p>
    </article>
  );
}

function SocialLink({ link }: { link: (typeof socialLinks)[number] }) {
  const Icon = socialIcons[link.icon];

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-muted px-3 py-2 transition-colors hover:bg-muted/80 sm:min-h-10"
    >
      <Icon className="h-4 w-4 text-foreground" />
      <span className="text-sm font-medium text-foreground">{link.label}</span>
    </a>
  );
}

export function TeamSection() {
  return (
    <section id="team" className="bg-background pb-14 pt-0 md:pb-32 md:pt-0 lg:pb-40 lg:pt-0">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="mb-16 text-center md:mb-20">
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/uw-engineering-logo-white.png"
              alt="University of Waterloo Faculty of Engineering"
              width={320}
              height={88}
              sizes="320px"
              className="object-contain"
            />
          </div>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            The people behind WATFlight
          </p>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            With a team like this,<br />there&apos;s nowhere to go but up.
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.email} member={member} />
          ))}
        </div>

        <div id="join" className="mx-auto mt-24 max-w-6xl border-t border-border pt-20">
          <SectionHeading
            eyebrow="Get Involved"
            title="Want to join WATFlight?"
            description="We're always looking for passionate engineers, designers, and builders. Here's how to get started:"
            descriptionClassName="max-w-xl"
            className="mb-12"
          />

          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
            {joinSteps.map((step) => (
              <JoinStepCard key={step.id} step={step} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center md:mt-16">
          <p className="mb-4 text-sm text-muted-foreground">Connect with the team</p>
          <div className="grid w-full max-w-sm grid-cols-2 gap-3 sm:max-w-xl sm:grid-cols-4">
            {socialLinks.map((link) => (
              <SocialLink key={link.href} link={link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
