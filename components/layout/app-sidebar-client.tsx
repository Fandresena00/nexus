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
    <Sidebar className="border-r border-border">
      {/* Subtle linear overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none linear-primary" />

      <SidebarHeader className="relative">
        <div
          className="flex py-4 px-3 justify-start items-center gap-3 group cursor-pointer"
          style={{ animation: "fade-in-down 0.4s ease-out forwards" }}
        >
          <Logo />
          <span className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nexus
          </span>

          {/* Status indicator */}
          <div className="ml-auto flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm"
              style={{ animation: "pulse-slow 3s ease-in-out infinite" }}
            />
            <span className="text-[10px] text-green-500 font-medium uppercase tracking-wider">
              Live
            </span>
          </div>
        </div>
      </SidebarHeader>

      <Separator />

      <SidebarContent className="relative px-2 py-4">
        {/* Principal Group */}
        <SidebarGroup
          style={{
            animation: "fade-in-up 0.4s ease-out 0.1s forwards",
            opacity: 0,
          }}
        >
          <SidebarGroupLabel className="px-3 mb-2 text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-3 h-3" />
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="group relative overflow-hidden hover:bg-primary/10 data-[active=true]:bg-primary/10 transition-all duration-200"
                >
                  <Link href="/dashboard" className="relative">
                    <div className="relative flex items-center gap-3 py-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-200">
                        <ChartColumnBigIcon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-200">
                        Dashboard
                      </span>
                    </div>

                    {/* Active indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-primary to-secondary opacity-0 group-data-[active=true]:opacity-100 transition-opacity duration-200 rounded-r" />
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
            animation: "fade-in-up 0.4s ease-out 0.15s forwards",
            opacity: 0,
          }}
        >
          <SidebarGroupLabel className="px-3 mb-2 text-xs font-semibold text-secondary uppercase tracking-wider flex items-center gap-2">
            <FileSliders className="w-3 h-3" />
            Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="group relative overflow-hidden hover:bg-secondary/10 data-[active=true]:bg-secondary/10 transition-all duration-200"
              >
                <Link href="/project" className="relative">
                  <div className="relative flex items-center gap-3 py-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 group-hover:bg-secondary/20 transition-all duration-200">
                      <FileSliders className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-200">
                      All projects
                    </span>
                  </div>

                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-secondary to-accent opacity-0 group-data-[active=true]:opacity-100 transition-opacity duration-200 rounded-r" />
                </Link>
              </SidebarMenuButton>

              {/* Project list */}
              {projects.length > 0 && (
                <SidebarMenuSub className="ml-6 mt-2 space-y-1 border-l border-border">
                  {projects.map((element, index) => (
                    <SidebarMenuSubItem
                      key={element.id}
                      style={{
                        animation: `fade-in-left 0.3s ease-out ${0.2 + index * 0.03}s forwards`,
                        opacity: 0,
                      }}
                    >
                      <SidebarMenuSubButton
                        asChild
                        className="group relative hover:bg-muted data-[active=true]:bg-muted transition-all duration-200"
                      >
                        <Link
                          href={`/project/${element.id}`}
                          className="relative pl-4"
                        >
                          <div className="flex items-center gap-2.5 py-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-secondary transition-all duration-200" />
                            <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
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
            animation: "fade-in-up 0.4s ease-out 0.2s forwards",
            opacity: 0,
          }}
        >
          <SidebarGroupLabel className="px-3 mb-2 text-xs font-semibold text-accent uppercase tracking-wider flex items-center gap-2">
            <User className="w-3 h-3" />
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="group relative overflow-hidden hover:bg-accent/10 data-[active=true]:bg-accent/10 transition-all duration-200"
                >
                  <Link href="/profil" className="relative">
                    <div className="relative flex items-center gap-3 py-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-all duration-200">
                        <User className="w-4 h-4 text-accent" />
                      </div>
                      <span className="font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-200">
                        Profil
                      </span>
                    </div>

                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-accent to-primary opacity-0 group-data-[active=true]:opacity-100 transition-opacity duration-200 rounded-r" />
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
          animation: "fade-in-up 0.4s ease-out 0.25s forwards",
          opacity: 0,
        }}
      >
        <Card className="relative overflow-hidden bg-card border border-primary/20 p-3">
          {/* Subtle linear */}
          <div className="absolute inset-0 linear-primary pointer-events-none opacity-50" />

          <div className="relative w-full flex items-center gap-3 mb-3">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="relative border-2 border-primary/30 h-10 w-10">
                <AvatarImage
                  src={session?.image?.toString()}
                  alt={session?.name}
                />
                <AvatarFallback className="bg-linear-to-br from-primary to-secondary text-primary-foreground font-semibold text-sm">
                  {session?.name?.[0].toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Online indicator */}
              <div
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card"
                style={{ animation: "pulse-slow 3s ease-in-out infinite" }}
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
