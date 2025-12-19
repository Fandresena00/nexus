"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { ChartColumnBigIcon, Mail, FileSliders, User, Zap } from "lucide-react";
import { Card } from "../ui/card";
import SignOutButton from "../actions/sign-out-button";
import Logo from "@/components/ui/logo";

type AppSidebarClientProps = {
  session:
    | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null;
      }
    | undefined;
  projects: Array<{
    id: string;
    title: string;
  }>;
};

export default function AppSidebarClient({
  session,
  projects,
}: AppSidebarClientProps) {
  return (
    <Sidebar className="border-r border-border dark">
      {/* Animated linear overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background:
            "linear-linear(180deg, rgba(6,182,212,0.1) 0%, transparent 50%, rgba(139,92,246,0.1) 100%)",
          animation: "pulse-slow 4s ease-in-out infinite",
        }}
      />

      <SidebarHeader className="relative">
        <div
          className="flex py-4 px-3 justify-start items-center gap-3 group cursor-pointer"
          style={{
            animation: "fade-in-down 0.6s cubic-bezier(0.2, 0, 0, 1) forwards",
          }}
        >
          {/* Logo with glow */}
          <div className="relative">
            <Logo />
          </div>

          <span className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nexus
          </span>

          {/* Status indicator */}
          <div className="ml-auto flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
              style={{
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
            <span className="text-[10px] text-green-400 font-medium uppercase tracking-wider">
              Live
            </span>
          </div>
        </div>
      </SidebarHeader>

      <Separator className="bg-linear-to-r from-transparent via-primary/20 to-transparent" />

      <SidebarContent className="relative px-2 py-4">
        {/* Principal Group */}
        <SidebarGroup
          style={{
            animation:
              "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.1s forwards",
            opacity: 0,
          }}
        >
          <SidebarGroupLabel className="px-3 mb-2 text-xs font-bold text-primary/80 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-3 h-3" />
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="group relative overflow-hidden hover:bg-primary/10 data-[active=true]:bg-primary/10 transition-all duration-300"
                >
                  <Link href="/dashboard" className="relative">
                    {/* Neon hover effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex items-center gap-3 py-2.5">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/20 transition-all duration-300">
                        <ChartColumnBigIcon className="w-4 h-4 text-primary group-hover:text-primary/80" />
                      </div>
                      <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                        Dashboard
                      </span>
                    </div>

                    {/* Active indicator line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity duration-300" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Group */}
        <SidebarGroup
          className="mt-4"
          style={{
            animation:
              "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
            opacity: 0,
          }}
        >
          <SidebarGroupLabel className="px-3 mb-2 text-xs font-bold text-accent/80 uppercase tracking-wider flex items-center gap-2">
            <FileSliders className="w-3 h-3" />
            Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="group relative overflow-hidden hover:bg-accent/10 data-[active=true]:bg-accent/10 transition-all duration-300"
              >
                <Link href="/project" className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-center gap-3 py-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 group-hover:border-accent/40 group-hover:bg-accent/20 transition-all duration-300">
                      <FileSliders className="w-4 h-4 text-accent group-hover:text-accent/80" />
                    </div>
                    <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                      All projects
                    </span>
                  </div>

                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent to-accent/50 opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity duration-300" />
                </Link>
              </SidebarMenuButton>

              {/* List of projects */}
              {projects.length > 0 && (
                <SidebarMenuSub className="ml-6 mt-2 space-y-1 border-l border-border">
                  {projects.map((element, index) => (
                    <SidebarMenuSubItem
                      key={element.id}
                      style={{
                        animation: `fade-in-left 0.4s cubic-bezier(0.2, 0, 0, 1) ${0.3 + index * 0.05}s forwards`,
                        opacity: 0,
                      }}
                    >
                      <SidebarMenuSubButton
                        asChild
                        className="group relative hover:bg-muted data-[active=true]:bg-muted transition-all duration-300"
                      >
                        <Link
                          href={`/project/${element.id}`}
                          className="relative pl-4"
                        >
                          <div className="flex items-center gap-2.5 py-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-secondary group-hover:shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all duration-300" />
                            <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                              {element.title}
                            </span>
                          </div>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Group */}
        <SidebarGroup
          className="mt-4"
          style={{
            animation:
              "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.3s forwards",
            opacity: 0,
          }}
        >
          <SidebarGroupLabel className="px-3 mb-2 text-xs font-bold text-secondary/80 uppercase tracking-wider flex items-center gap-2">
            <User className="w-3 h-3" />
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="group relative overflow-hidden hover:bg-secondary/10 data-[active=true]:bg-secondary/10 transition-all duration-300"
                >
                  <Link href="/profil" className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-secondary/0 via-secondary/10 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex items-center gap-3 py-2.5">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 group-hover:border-secondary/40 group-hover:bg-secondary/20 transition-all duration-300">
                        <User className="w-4 h-4 text-secondary group-hover:text-secondary/80" />
                      </div>
                      <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                        Profil
                      </span>
                    </div>

                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-secondary to-primary opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity duration-300" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Profile Footer */}
      <SidebarFooter
        className="p-3"
        style={{
          animation: "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards",
          opacity: 0,
        }}
      >
        <Card className="relative overflow-hidden bg-black backdrop-blur-xs border border-primary/20 p-3">
          {/* Neon glow overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />

          <div className="relative w-full flex items-center gap-3 mb-3">
            {/* Avatar with glow */}
            <div className="relative">
              <Avatar className="relative border-2 border-primary/50 h-11 w-11 ">
                <AvatarImage
                  src={session?.image?.toString()}
                  alt={session?.name}
                />
                <AvatarFallback className="bg-linear-to-br from-primary to-secondary text-primary-foreground font-bold text-sm">
                  {session?.name?.[0].toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Online indicator */}
              <div
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-card shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
            </div>

            {/* User info */}
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {session?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-secondary" />
                <span className="text-ellipsis overflow-hidden">
                  {session?.email}
                </span>
              </p>
            </div>
          </div>

          {/* Sign out button */}
          <SignOutButton />
        </Card>
      </SidebarFooter>
    </Sidebar>
  );
}
