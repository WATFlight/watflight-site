"use client";

import Image from "next/image";
import { Linkedin, Mail, Instagram, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Jackie",
    title: "Team Lead",
    linkedIn: "https://www.linkedin.com/in/jingkai-shao3/",
    email: "j66shao@uwaterloo.ca",
  },
  {
    name: "Shaofu",
    title: "Mechanical Lead",
    linkedIn: "https://www.linkedin.com/in/shaofuwang/",
    email: "shaofu.wang@uwaterloo.ca",
  },
  {
    name: "Hiram",
    title: "Electrical Lead",
    linkedIn: "https://www.linkedin.com/in/hiram-xu-97821832a/",
    email: "h457xu@uwaterloo.ca",
  },
  {
    name: "Molly",
    title: "Software Lead",
    linkedIn: "https://www.linkedin.com/in/molly-xie-uw",
    email: "z95xie@uwaterloo.ca",
  },
];

// Discord icon component since lucide-react doesn't have one
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function TeamSection() {
  return (
    <section id="team" className="bg-background pt-0 pb-14 md:pt-0 md:pb-32 lg:pt-0 lg:pb-40">
      <div className="px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/uw-engineering-logo-white.png"
              alt="University of Waterloo Faculty of Engineering"
              width={320}
              height={88}
              className="object-contain"
            />
          </div>
          <p className="text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground mb-6">
            The people behind WATFlight
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-4">
            With a team like this,<br />there&apos;s nowhere to go but up.
          </h2>
        </div>

        {/* Team Grid */}
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30"
            >
              {/* Avatar placeholder */}
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-3xl font-medium text-muted-foreground">
                  {member.name.charAt(0)}
                </span>
              </div>

              {/* Name & Title */}
              <h3 className="text-lg font-medium text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {member.title}
              </p>

              {/* Individual Links */}
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  <Linkedin className="w-4 h-4 text-foreground" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="w-4 h-4 text-foreground" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Join the Team */}
        <div id="join" className="mx-auto mt-24 max-w-6xl border-t pt-20" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground mb-6">
            Get Involved
          </p>
          <h2 className="mb-6 max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Want to join WATFlight?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mb-12">
            We&apos;re always looking for passionate engineers, designers, and builders. Here&apos;s how to get started:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
            {/* Step 1 */}
            <div className="p-8" style={{ background: "var(--background)" }}>
              <p className="text-xs font-mono text-muted-foreground mb-4">01</p>
              <h3 className="text-lg font-semibold text-foreground mb-3">Email a Lead</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reach out directly to any of our team leads above. Tell us about yourself, your skills, and what you&apos;re excited to work on.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8" style={{ background: "var(--background)" }}>
              <p className="text-xs font-mono text-muted-foreground mb-4">02</p>
              <h3 className="text-lg font-semibold text-foreground mb-3">Join our Discord</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Join the WATFlight Discord server and send a message to the leads. Introduce yourself and we&apos;ll get back to you shortly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8" style={{ background: "var(--background)" }}>
              <p className="text-xs font-mono text-muted-foreground mb-4">03</p>
              <h3 className="text-lg font-semibold text-foreground mb-3">Visit Us in Person</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Come find us at <span className="text-foreground font-medium">EC4, Room 1047</span> at the University of Waterloo. Notify Jackie beforehand so we can be ready for you.
              </p>
            </div>
          </div>
        </div>

        {/* Team Social Links */}
        <div className="mt-12 flex flex-col items-center md:mt-16">
          <p className="text-sm text-muted-foreground mb-4">
            Connect with the team
          </p>
          <div className="grid w-full max-w-sm grid-cols-2 gap-3 sm:max-w-xl sm:grid-cols-4">
            <a
              href="https://linkedin.com/company/watflight"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-muted px-3 py-2 transition-colors hover:bg-muted/80 sm:min-h-10"
            >
              <Linkedin className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">LinkedIn</span>
            </a>
            <a
              href="https://instagram.com/watflight"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-muted px-3 py-2 transition-colors hover:bg-muted/80 sm:min-h-10"
            >
              <Instagram className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">Instagram</span>
            </a>
            <a
              href="https://discord.gg/dhVNt6fkwj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-muted px-3 py-2 transition-colors hover:bg-muted/80 sm:min-h-10"
            >
              <DiscordIcon className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">Discord</span>
            </a>
            <a
              href="https://github.com/WATFlight"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-muted px-3 py-2 transition-colors hover:bg-muted/80 sm:min-h-10"
            >
              <Github className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
