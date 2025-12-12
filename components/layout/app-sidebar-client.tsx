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
import { ChartColumnBigIcon, Mail, FileSliders, User } from "lucide-react";
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
    <Sidebar>
      <SidebarHeader>
        <div className="flex py-3 justify-center items-center gap-3">
          <Logo />
          <span className="text-xl font-bold text-gray-600 whitespace-nowrap">
            Nexus
          </span>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        {/** Principal Group */}
        <SidebarGroup>
          <SidebarGroupLabel>PRINCIPAL</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/** Dashboard Items */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <ChartColumnBigIcon />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>PROJECTS</SidebarGroupLabel>
          <SidebarGroupContent>
            {/** Projects Items */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/project">
                  <FileSliders />
                  <span>All projects</span>
                </Link>
              </SidebarMenuButton>
              {/** List of project */}
              <SidebarMenuSub>
                {projects.length > 0
                  ? projects.map((element) => (
                      <SidebarMenuSubItem key={element.id}>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/project/${element.id}`}>
                            <span className="w-1 h-1 rounded-full shrink-0 bg-zinc-700"></span>
                            <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                              {element.title}
                            </span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))
                  : null}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>

        {/** Settings Group */}
        <SidebarGroup>
          <SidebarGroupLabel>SETTINGS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/** Profil Items */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/profil">
                    <User />
                    <span>Profil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/** Profil */}
      <SidebarFooter>
        <Card className="px-4">
          <div className="w-full flex items-center gap-3">
            {/* Avatar avec animation */}
            <div className="relative">
              <Avatar className="relative border-2 border-primary h-11 w-11">
                <AvatarImage
                  src={session?.image?.toString()}
                  alt={session?.name}
                />
                <AvatarFallback className="bg-linear-to-br from-blue-500 to-zinc-500 text-white font-bold">
                  {session?.name?.[0]?.toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Indicateur en ligne */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-sidebar"></div>
            </div>

            {/* Info utilisateur */}
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                {session?.name}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {session?.email}
              </p>
            </div>
          </div>
          <SignOutButton />
        </Card>
      </SidebarFooter>
    </Sidebar>
  );
}
